import "reflect-metadata";
import express, { NextFunction } from "express";
import { Response } from "express";
import { AuthorizationPresentation } from "./AuthPresentation";
import { postAuthSchema } from "../schema/AuthSchema";
import { container } from "tsyringe";
import { setupContainer } from "../config/container";

// const app: express.Express = express()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use((req: express.Request, res: express.Response, next))

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupContainer();

app.post("/decision", async (req, res, next) => {
  const presentation = container.resolve(AuthorizationPresentation);
  return await presentation.decision(req, res);
});

app.post("/token", async (req, res, next) => {
  const presentation = container.resolve(AuthorizationPresentation);
  return await presentation.token(req, res);
});

app.listen(3010, () => {
  console.log("Server is running on http://localhost:3010");
});
