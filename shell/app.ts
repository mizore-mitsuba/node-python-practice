import express, { NextFunction, RequestHandler } from 'express';
import { pythonShellWrapper } from './python/pythonShellWrapper';

type Error = {
    code: number,
    message: string
}

const app = express();
app.use(express.json());

app.post('/api/login', function (req, res) {
  console.log(req.body);
  if (req.body.id == 'test' && req.body.pass == 'test') {
    res.send({
      message: 'OK',
    });
  } else {
    res.send({
      message: '認証エラー',
    });
  }
});

// Invoke-WebRequest http://localhost:3030/api/pyshell/123
app.get('/api/pyshell/:num', (req: express.Request, res: express.Response, next) => {
  (async () => {
    console.log('request received: ' + req.params.num);

    if (!Number.isFinite(parseInt(req.params.num))) {
      res.status(400);
      const err: Error = {
        code: 400,
        message: '整数を入力してください'
      }
      res.send(err);
      throw new Error('不正な入力');
    }

    type PyParam = {
      num: number;
    };

    const pyParam: PyParam = { num: parseInt(req.params.num) };

    const result = await pythonShellWrapper('./shell/python/TestScript.py', JSON.stringify(pyParam), {
      mode: 'json',
    });

    res.send(result);
  })().catch(next);
});

export default app;
