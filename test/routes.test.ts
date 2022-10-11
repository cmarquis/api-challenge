import request from 'supertest';
import express from 'express';
import router from '../src/routes';

const app = express();
app.use(express.json());
app.use('/', router);

describe('getReference', function () {
  it('should respond with properly formatted body', async () => {
    let res = await request(app).post('/get-reference').send({ url: "https://vizionapi.com" });
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});