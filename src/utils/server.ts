import express, { Application } from "express";
import cors from "cors";

import morganMiddleWare from "../middleware/MorganMiddleware";
import cookieParser from "cookie-parser";
import userRouter from "../routes/user.route";
import productRouter from "../routes/product.route";

export default function createServer() {
  const app: Application = express();

  app.use(cors());
  app.use(express.json());
  app.use(morganMiddleWare);
  app.use(cookieParser());
  app.use("/api/v1", userRouter);
  app.use("/api/v1", productRouter);

  return app;
}
