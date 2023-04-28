import express, { NextFunction, RequestHandler } from "express";
//import bodyParser from "body-parser";

import { pythonShellWrapper } from "./shell/pythonShellWrapper";

const app = express();
//app.use(bodyParser.json());
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

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "User1", email: "user1@test.local" },
  { id: 2, name: "User2", email: "user2@test.local" },
  { id: 3, name: "User3", email: "user3@test.local" },
];

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

app.listen(process.env.PORT || 3030, () => {
  console.log("Start on port 3030.");
});
