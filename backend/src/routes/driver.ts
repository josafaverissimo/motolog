import type { Static } from '@sinclair/typebox';
import { Elysia, t } from 'elysia';
import { BUCKET_NAME } from '../constants';
import { useS3Client } from '../facades/s3';
import { useDriversRepository } from '../repositories/drivers';
import type { DriverInterface } from '../repositories/drivers';

const driverPostBodySchema = t.Object({
	name: t.String(),
	cpf: t.String(),
	birthdate: t.String(),
	phone: t.Optional(t.String()),
	email: t.String(),
	address: t.String(),
	status: t.Optional(t.BooleanString()),
	cnh: t.File(),
	crlv: t.File(),
});

const driverPatchBodySchema = t.Object({
	name: t.Optional(t.String()),
	cpf: t.Optional(t.String()),
	birthdate: t.Optional(t.String()),
	phone: t.Optional(t.String()),
	email: t.Optional(t.String()),
	address: t.Optional(t.String()),
	status: t.Optional(t.BooleanString()),
	cnh: t.Optional(t.File()),
	crlv: t.Optional(t.File()),
});

export type DriverPostBodySchemaType = Static<typeof driverPostBodySchema>;
export type DriverPatchBodySchemaType = Static<typeof driverPatchBodySchema>;

const ROWS_PER_PAGE = 25;

class Driver {
	constructor(
		private driversRepository = useDriversRepository(),
		private s3Client = useS3Client(),
	) {}

	async retrieve(page: number) {
		const drivers = await this.driversRepository.getDrivers(
			page,
			ROWS_PER_PAGE,
		);

		return { drivers };
	}

	async add(driverBody: DriverPostBodySchemaType) {
		const uploadCnhResult = await this.s3Client.uploadFile(
			BUCKET_NAME,
			driverBody.cnh,
		);
		const uploadCrlvResult = await this.s3Client.uploadFile(
			BUCKET_NAME,
			driverBody.crlv,
		);

		if (uploadCnhResult.error || uploadCrlvResult.error) {
			const error = uploadCnhResult.error || uploadCrlvResult.error;
			console.error(error);

			return { error: `Failed to upload documents: ${error}` };
		}

		const driverToStore: DriverInterface = {
			name: driverBody.name,
			cpf: driverBody.cpf,
			birthdate: new Date(driverBody.birthdate).toISOString(),
			email: driverBody.email,
			address: driverBody.address,
			status: driverBody.status || false,
			phone: driverBody.phone,
			cnhImageUrl: uploadCnhResult.value as string,
			crlvImageUrl: uploadCrlvResult.value as string,
		};

		this.driversRepository.storeDriver(driverToStore);
	}

	async update(driverBody: DriverPatchBodySchemaType, hash: string) {
		const driverToUpdate: Partial<DriverInterface> = {};

		const imageFields: ['cnh', 'crlv'] = ['cnh', 'crlv'];
		const driverImageFieldByBodyImageField: {
			cnh: 'cnhImageUrl';
			crlv: 'crlvImageUrl';
		} = { cnh: 'cnhImageUrl', crlv: 'crlvImageUrl' };

		for (const imageField of imageFields) {
			if (driverBody[imageField]) {
				const uploadResult = await this.s3Client.uploadFile(
					BUCKET_NAME,
					driverBody[imageField],
				);

				if (uploadResult.error) {
					const error = uploadResult.error;
					console.error(error);

					return { error: `Failed to upload documents: ${error}` };
				}

				const driverImageField = driverImageFieldByBodyImageField[imageField];
				driverToUpdate[driverImageField] = uploadResult.value as string;
			}
		}

		driverToUpdate.name = driverBody.name
		driverToUpdate.cpf = driverBody.cpf
		driverToUpdate.birthdate = driverBody.birthdate
		driverToUpdate.email = driverBody.email;
		driverToUpdate.address = driverBody.address;
		driverToUpdate.status = driverBody.status;
		driverToUpdate.phone = driverBody.phone;

		this.driversRepository.updateDriver(driverToUpdate, hash)
	}
}

export const driver = new Elysia({ prefix: '/driver' })
	.decorate('driver', new Driver())
	.get('/', ({ driver, query: { page } }) => driver.retrieve(page), {
		query: t.Object({
			page: t.Number(),
		}),
		beforeHandle({ error, query: { page } }) {
			if (page <= 0) {
				return error(400, { error: 'Page must be greater than 0' });
			}
		},
	})
	.patch(
		'/:hash',
		({ driver, params: { hash }, body }) => driver.update(body, hash),
		{
			params: t.Object({
				hash: t.String(),
			}),
			body: driverPatchBodySchema,
		},
	)
	.post('/', ({ driver, body }) => driver.add(body), {
		parse: 'multipart/form-data',
		body: driverPostBodySchema,
	});
