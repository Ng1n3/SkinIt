import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import connect from "./utils/connect";
import redisClient, { connectRedis } from "./utils/redisClient";
import logger from "./utils/logger";
import createServer from "./utils/server";

dotenv.config();
const PORT = process.env.PORT;

const app = createServer()

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  logger.error("Resource not found");
  res.status(404).send({
    status: "FAILED",
    message: "sorry, resource is not found 😟",
  });
});

(async () => {
  connectRedis()
  await connect();
  app.listen(PORT, async () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
})();
