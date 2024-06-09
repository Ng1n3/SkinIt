import morgan, { StreamOptions, token } from "morgan";
import Logger from "../utils/logger";
import { Request, Response } from "express";

const stream: StreamOptions = {
  write: (message) => Logger.http(message.trim()),
};

// morgan.token("message", (req: Request, res: Response) => {
//   return `${req.method} ${req.url} ${res.statusCode}`;
// });

const morganMiddleWare = morgan(
  (token, req: Request, res: Response) => {
    return [
      token.method(req, res),
      token.url(req, res),
      token.status(req, res),
      token.res(req, res, "content-length"),
      "-",
      token["response-time"](req, res),
      "ms",
    ].join(" ");
  },
  { stream }
);

export default morganMiddleWare;
// ":method :url :status :res[content-length] - :response-time ms",