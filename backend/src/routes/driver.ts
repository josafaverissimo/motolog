import { Elysia, t } from 'elysia'
import { Static } from '@sinclair/typebox';

const DriverBodySchema = t.Object({
  name: t.String(),
  cpf: t.String(),
  birthdate: t.String(),
  phone: t.Optional(t.String()),
  address: t.String(),
  status: t.Optional(t.String()),
  cnh: t.File(),
  crlv: t.File()
});

class Driver {
  add(driverBody: Static<typeof DriverBodySchema>) {
    console.log(driverBody)
    return {
      message: 'Hello',
      success: true
    }
  }
}

export const driver = new Elysia({ prefix: '/driver'})
  .decorate('driver', new Driver())
  .get('/', ({ driver }) => 'hello')
  .post('/', ({ driver, body }) => driver.add(body), {
    parse: 'multipart/form-data',
    body: DriverBodySchema
  })
