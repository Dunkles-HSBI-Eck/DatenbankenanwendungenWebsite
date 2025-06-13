import * as Minio from 'minio';
import { env } from '$env/dynamic/private';

const minioClient = new Minio.Client({
    endPoint: env.MINIO_URL,
    port: env.MINIO_PORT,
    useSSL: env.MINIO_SSL === 'true',
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY
});

export async function getObject(bucketName, objectName) {
    try {
        const stream = await minioClient.getObject(bucketName, objectName);
        return stream;
    } catch (error) {
        console.error(`Error getting object ${bucketName}/${objectName}:`, error);
        throw error;
    }
}
