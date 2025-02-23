import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';
import { driver } from './routes/driver';
import { filesS3 } from './routes/filesS3';

const app = new Elysia()
	.use(cors())
	.use(swagger())
	.use(driver)
	.use(filesS3)
	.listen(8080);
