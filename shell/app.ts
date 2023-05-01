import express, { NextFunction, RequestHandler } from "express";
import { pythonShellWrapper } from "./python/pythonShellWrapper";

const app = express();
app.use(express.json());

app.post("/api/login", function (req, res) {
  console.log(req.body);
  if (req.body.id == "test" && req.body.pass == "test") {
    res.send({
      message: "OK",
    });
  } else {
    res.send({
      message: "認証エラー",
    });
  }
});

app.get(
  "/api/test/:num",
  (req: express.Request, res: express.Response, next) => {
    (async () => {
      console.log("request received: " + req.params.num);

      if (!Number.isFinite(parseInt(req.params.num))) {
        throw new Error("不正な入力");
      }

      type PyParam = {
        num: number;
      };

      const pyParam: PyParam = { num: parseInt(req.params.num) };

      const result = await pythonShellWrapper(
        "./shell/TestScript.py",
        JSON.stringify(pyParam),
        {
          mode: "json",
        }
      );

      res.send(result);
    })().catch(next);
  }
);

export default app;
