import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  res.status(400).send({ message: err.message });
  next();
};

export default errorHandler;
