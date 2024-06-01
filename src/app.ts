import dotenv from "dotenv";
import express, { Application } from "express";
import userRoutes from "./routes/user.route";
import connect from "./utils/connect";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, async () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
  await connect()
  userRoutes(app);
});
