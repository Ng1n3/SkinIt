import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import userRouter from "./routes/user.route";
import connect from "./utils/connect";
import productRouter from "./routes/product.route";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    status: "FAILED",
    message: "sorry, resource is not found 😟",
  });
});

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is listening on http://localhost:${PORT}`);
});
