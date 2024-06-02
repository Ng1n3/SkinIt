import dotenv from "dotenv";
import express, { Application } from "express";
import userRouter from "./routes/user.route";
import connect from "./utils/connect";
import productRouter from "./routes/product.route";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter)

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is listening on http://localhost:${PORT}`);
});
