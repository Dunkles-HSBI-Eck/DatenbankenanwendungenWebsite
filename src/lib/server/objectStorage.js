import * as Minio from 'minio';
import {
	MINIO_URL,
	MINIO_PORT,
	MINIO_SSL,
	MINIO_ACCESS_KEY,
	MINIO_SECRET_KEY
} from '$env/static/private';

const minioClient = new Minio.Client({
	endPoint: MINIO_URL,
	port: MINIO_PORT,
	useSSL: MINIO_SSL === 'true',
	accessKey: MINIO_ACCESS_KEY,
	secretKey: MINIO_SECRET_KEY
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
