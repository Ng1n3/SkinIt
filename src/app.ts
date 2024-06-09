import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import userRouter from "./routes/user.route";
import connect from "./utils/connect";
import productRouter from "./routes/product.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import redisClient from "./utils/redisClient";
import morganMiddleWare from "./middleware/MorganMiddleware";
import Logger from "./utils/logger";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morganMiddleWare);
app.use(cookieParser());
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  Logger.error("Resource not found");
  res.status(404).send({
    status: "FAILED",
    message: "sorry, resource is not found 😟",
  });
});

(async () => {
  if (!redisClient.isOpen) await redisClient.connect();
  await connect();
  app.listen(PORT, async () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
})();
