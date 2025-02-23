import { prisma } from '../database/instance';

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
    const offset = (page - 1) * rowsPerPage

    const result = await prisma.driver.findMany({ skip: offset, take: rowsPerPage })

    console.log(result)
  }

  async function storeDriver(driver: DriverInterface) {
    await prisma.driver.create({
      data: { ...driver, hash: crypto.randomUUID() },
    });
  }

  return { getDrivers, storeDriver };
};
