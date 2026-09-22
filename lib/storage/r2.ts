import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const bucket = process.env.R2_BUCKET_NAME;
const client = accountId && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY ? new S3Client({ region: "auto", endpoint: `https://${accountId}.r2.cloudflarestorage.com`, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY } }) : null;
export function r2Configured() { return Boolean(client && bucket); }
export async function uploadToR2(key: string, body: Uint8Array, contentType: string) { if (!client || !bucket) throw new Error("R2 storage is not configured"); await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType })); return process.env.R2_PUBLIC_URL ? `${process.env.R2_PUBLIC_URL.replace(/\/$/, "")}/${key}` : key; }
export async function deleteFromR2(key: string) { if (!client || !bucket) throw new Error("R2 storage is not configured"); await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key })); }
export async function getFromR2(key: string) { if (!client || !bucket) throw new Error("R2 storage is not configured"); return client.send(new GetObjectCommand({ Bucket: bucket, Key: key })); }
