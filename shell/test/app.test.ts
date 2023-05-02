import Request from 'supertest';
import app from '../app';

describe('pyshell', () => {
  it('/api/pyshell/:num - 正常系', async () => {
    const res = await Request(app).get('/api/pyshell/123');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('"{\\"num\\":123}"');
  });

  
  it('/api/pyshell/:num - 異常系', async () => {
    const res = await Request(app).get('/api/pyshell/text');
    expect(res.status).toEqual(400);
    expect(res.text).toEqual('{"code":400,"message":"整数を入力してください"}');
  });
});
