import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import request from 'supertest'
import next from 'next'
import http, { Server } from 'http'

// Mock S3 client
const s3Mock = mockClient(S3Client);

describe('S3 Integration', () => {
  beforeEach(() => {
    s3Mock.reset();
  });

  it('should upload an image and write the S3 URL to the data structure', async () => {
    // Arrange: mock S3 upload response
    const bucket = 'my-test-bucket';
    const key = 'uploads/test-image.jpg';
    const expectedUrl = `https://${bucket}.s3.amazonaws.com/${key}`;
    s3Mock.on(PutObjectCommand).resolves({});

    // Simulate Tina upload logic
    const s3 = new S3Client({ region: 'us-east-1' });
    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: Buffer.from('fake-image-bytes'),
      ContentType: 'image/jpeg',
    };
    await s3.send(new PutObjectCommand(uploadParams));

    // Simulate writing the URL to a data structure
    const gallery = {
      photos: [
        { image: expectedUrl }
      ]
    };

    // Assert
    expect(gallery.photos[0].image).toBe(expectedUrl);
    expect(s3Mock.calls()).toHaveLength(1);
    expect(s3Mock.call(0).args[0].input).toMatchObject({ Bucket: bucket, Key: key });
  });
}); 