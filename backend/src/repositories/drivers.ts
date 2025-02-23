import { PrismaClient } from '@prisma/client'
import type { DriverBodySchemaType } from '../routes/driver'

const prisma = new PrismaClient()

export interface DriverInterface {
  name: string;
  cpf: string;
  birthdate: string; // A data está sendo convertida para ISO, então o tipo é string
  email: string;
  address: string;
  status: boolean; // Assumindo que 'status' é um booleano
  phone?: string; // 'phone' é opcional
  cnhImageUrl: string;
  crlvImageUrl: string;
}


export const useDriversRepository = () => {
async function storeDriver(driver: DriverInterface) {
    await prisma.driver.create({
      data: driver
    })

    console.log('driver stored')
    console.log(driver)
  }

  return { storeDriver }
}
