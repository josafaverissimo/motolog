import { Elysia, t } from 'elysia'
import type { Static } from '@sinclair/typebox';
import { useDriversRepository } from '../repositories/drivers'
import type { DriverInterface } from '../repositories/drivers'
import { useS3Client } from '../facades/s3';

const DriverBodySchema = t.Object({
  name: t.String(),
  cpf: t.String(),
  birthdate: t.String(),
  phone: t.Optional(t.String()),
  email: t.String(),
  address: t.String(),
  status: t.Optional(t.BooleanString()),
  cnh: t.File(),
  crlv: t.File()
});

export type DriverBodySchemaType = Static<typeof DriverBodySchema>

const BUCKET_NAME = 'motolog'
const ROWS_PER_PAGE = 25

class Driver {
  constructor(
    private driversRepository = useDriversRepository(),
    private s3Client = useS3Client()
  ) { }

  async retrieve(page: number) {
    console.log('getting')
    await this.driversRepository.getDrivers(page, ROWS_PER_PAGE)
  }

  async add(driverBody: DriverBodySchemaType) {
    const uploadCnhResult = await this.s3Client.uploadFile(BUCKET_NAME, driverBody.cnh)
    const uploadCrlvResult = await this.s3Client.uploadFile(BUCKET_NAME, driverBody.crlv)

    if (uploadCnhResult.error || uploadCrlvResult.error) {
      const error = uploadCnhResult.error || uploadCrlvResult.error
      console.error(error)

      return { error: `Failed to upload documents: ${error}` }
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
      crlvImageUrl: uploadCrlvResult.value as string
    }

    this.driversRepository.storeDriver(driverToStore)

    return {
      message: 'Hello',
      success: true
    }
  }
}

export const driver = new Elysia({ prefix: '/driver' })
  .decorate('driver', new Driver())
  .get('/', ({ driver, params: { page } }) => driver.retrieve(page), {
    params: t.Object({
      page: t.Number()
    })
  })
  .post('/', ({ driver, body }) => driver.add(body), {
    parse: 'multipart/form-data',
    body: DriverBodySchema
  })
