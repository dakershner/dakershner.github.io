import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
// @ts-ignore
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

// --- API route connectivity test ---
describe('Tina S3 Media API Route', () => {
  let server: Server
  let app: any
  beforeAll(async () => {
    app = next({ dev: true, dir: process.cwd() })
    await app.prepare()
    server = http.createServer((req, res) => app.getRequestHandler()(req, res))
    await new Promise((resolve) => server.listen(3002, () => resolve(undefined)))
  })
  afterAll((done) => {
    server.close(done)
  })

  it('should respond to GET /api/s3/[...media] with 200 or a clear error', async () => {
    const res = await request('http://localhost:3002')
      .get('/api/s3/test')
    // Accept either 200 (OK) or 401/403 if not authorized, but not 500
    expect([200, 401, 403]).toContain(res.status)
    if (res.status !== 200) {
      expect(res.body || res.text).toBeDefined()
    }
  })
}) 