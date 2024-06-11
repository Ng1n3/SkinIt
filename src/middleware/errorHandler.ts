import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  if (err.message === "You are not authenticated") {
    return res.status(401).json({ error: err.message });
  } else if (err.message === "Invalid token") {
    return res.status(401).json({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token has expired" });
  }

  // Default to 500 server error
  res.status(500).json({ error: "An unexpected error occurred" });
  next();
};

export default errorHandler;
