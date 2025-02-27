import {
	CreateBucketCommand,
	GetObjectCommand,
	ListBucketsCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import type { ResultInterface } from '../lib/utils';

export const useS3Client = () => {
	const client = new S3Client({
		region: 'us-east-1',
		endpoint: process.env.MINIO_BASE_URL,
		credentials: {
			accessKeyId: process.env.MINIO_ACCESS_KEY as string,
			secretAccessKey: process.env.MINIO_SECRET_KEY as string,
		},
		forcePathStyle: true,
	});

	async function createBucket(
		bucketName: string,
	): Promise<ResultInterface<boolean, string | null>> {
		try {
			await client.send(new CreateBucketCommand({ Bucket: bucketName }));

			return { value: true, error: null };
		} catch (error) {
			return {
				value: false,
				error: `Failed to create bucket '${bucketName}': ${error}`,
			};
		}
	}

	async function checkBucketExists(
		bucketName: string,
	): Promise<ResultInterface<boolean, string | null>> {
		try {
			const { Buckets } = await client.send(new ListBucketsCommand({}));

			const exists = Boolean(
				Buckets?.some((bucket) => bucket.Name === bucketName),
			);

			return { value: exists, error: null };
		} catch (error) {
			return {
				value: false,
				error: `Failed to check bucket '${bucketName}': ${error}`,
			};
		}
	}

	async function uploadFile(
		bucketName: string,
		file: File,
	): Promise<ResultInterface<string | null, string | null>> {
		const checkBucketResult = await checkBucketExists(bucketName);

		if (checkBucketResult.error) {
			console.warn(
				`Failed to check if bucket '${bucketName}' exists: ${checkBucketResult.error}`,
			);
		}

		if (!checkBucketResult.value) {
			const createBucketResult = await createBucket(bucketName);

			if (createBucketResult.error) {
				return {
					value: null,
					error: `Failed to create bucket '${bucketName}': ${createBucketResult.error}`,
				};
			}
		}

		const fileBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(fileBuffer);
		const filename = crypto.randomUUID();

		try {
			const command = new PutObjectCommand({
				Bucket: bucketName,
				Key: filename,
				Body: buffer,
			});

			await client.send(command);

			return { value: filename, error: null };
		} catch (error) {
			return { value: null, error: `Failed to upload file:, ${error}` };
		}
	}

	async function getFile(
		bucketName: string,
		objectKey: string,
	): Promise<ResultInterface<ReadableStream | null, string | null>> {
		try {
			const command = new GetObjectCommand({
				Bucket: bucketName,
				Key: objectKey,
			});
			const response = await client.send(command);

			return { value: response.Body as ReadableStream, error: null };
		} catch (error) {
			return {
				value: null,
				error: `Failed to get object '${objectKey}': ${error}`,
			};
		}
	}

	return { createBucket, checkBucketExists, uploadFile, getFile };
};
