import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucket = process.env.AWS_S3_BUCKET;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `${uuid()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      url: `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
      key,
    };
  }
}
