import { Elysia, t } from 'elysia';
import { BUCKET_NAME } from '../constants';
import { useS3Client } from '../facades/s3';

class FilesS3 {
	constructor(private s3Client = useS3Client()) {}

	async getByObjectKey(objectKey: string) {
		const getFileResult = await this.s3Client.getFile(BUCKET_NAME, objectKey);

		if (getFileResult.error) {
			return { error: getFileResult.error };
		}

		return getFileResult.value
	}
}

export const filesS3 = new Elysia({ prefix: '/files' })
	.decorate('files', new FilesS3())
	.get('/:objectKey', ({ files, params: { objectKey } }) =>	files.getByObjectKey(objectKey));
