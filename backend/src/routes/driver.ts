import type { Static } from '@sinclair/typebox';
import { Elysia, t } from 'elysia';
import { z } from 'zod';
import { BUCKET_NAME } from '../constants';
import { useS3Client } from '../facades/s3';
import { useDriversRepository } from '../repositories/drivers';
import type { DriverInterface } from '../repositories/drivers';

const driverBodySchema = t.Object({
	name: t.String({
		custom: (value: string) => {
			console.log('helo');
			value.length < 10;
		},
	}),
	cpf: t.String(),
	birthdate: t.String(),
	phone: t.Optional(t.String()),
	email: t.String(),
	address: t.String(),
	status: t.Optional(t.BooleanString()),
	cnh: t.File(),
	crlv: t.File(),
});

export type DriverBodySchemaType = Static<typeof driverBodySchema>;

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

	async add(driverBody: DriverBodySchemaType) {
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

		return {
			message: 'Hello',
			success: true,
		};
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
	.post('/', ({ driver, body }) => driver.add(body), {
		parse: 'multipart/form-data',
		body: driverBodySchema,
		beforeHandle({ body, error }) {},
	});
