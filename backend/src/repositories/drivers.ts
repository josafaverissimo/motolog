import { prisma } from '../database/instance';
import { baseUrl } from '../lib/utils';

export interface DriverInterface {
	name: string;
	cpf: string;
	birthdate: string;
	email: string;
	address: string;
	status: boolean;
	phone?: string;
	cnhImageUrl: string;
	crlvImageUrl: string;
}

export const useDriversRepository = () => {
	async function getDrivers(page: number, rowsPerPage: number) {
		const offset = (page - 1) * rowsPerPage;

		const result = await prisma.driver.findMany({
			skip: offset,
			take: rowsPerPage,
			omit: {
				id: true,
				deletedAt: true,
			},
		});

		return result.map((driver) => ({
			...driver,
			cnhImageUrl: baseUrl(`/files/${driver.cnhImageUrl}`),
			crlvImageUrl: baseUrl(`/files/${driver.crlvImageUrl}`),
		}));
	}

	async function updateDriver(driver: Partial<DriverInterface>, hash: string) {
		await prisma.driver.update({
			where: { hash },
			data: { ...driver },
		});
	}

	async function storeDriver(driver: DriverInterface) {
		await prisma.driver.create({
			data: { ...driver, hash: crypto.randomUUID() },
		});
	}

	return { getDrivers, storeDriver, updateDriver };
};
