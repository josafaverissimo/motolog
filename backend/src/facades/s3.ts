import { ResultInterface } from '../lib/utils';
import {
  S3Client,
  CreateBucketCommand,
  ListBucketsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

export const useS3Client = () => {
  const client = new S3Client({
    region: 'us-east-1',
    endpoint: 'http://localhost:9000',
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

  return { createBucket, checkBucketExists };
};
