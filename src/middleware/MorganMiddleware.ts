import morgan, { StreamOptions, token } from "morgan";
import Logger from "../utils/logger";
import { Request, Response } from "express";

const stream: StreamOptions = {
  write: (message) => Logger.info(message.trim()),
};

const morganMiddleWare = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

export default morganMiddleWare;