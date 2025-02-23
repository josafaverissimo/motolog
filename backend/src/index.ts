import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors'
import { driver } from './routes/driver'


const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(driver)
  .listen(8080);
