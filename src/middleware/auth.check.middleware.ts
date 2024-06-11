import { NextFunction, Response, Request } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.AUTH_ACCESS_TOKEN_SECRET as string;

if (!ACCESS_TOKEN_SECRET) throw new Error("some secrets are missing");

export interface AuthenticatedRequest<T = any> extends Request {
  userId?: string;
  token?: string;
  body: T;
}

interface CustomPayload extends JwtPayload {
  _id: string;
}

export default async function checkAuthentication(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader?.startsWith("Bearer "))
      throw new Error("You are not Authenticated");
    const accessTokenSplit = authHeader.split(" ");
    const acTkn = accessTokenSplit[1];

    const decoded = Jwt.verify(acTkn, ACCESS_TOKEN_SECRET) as CustomPayload;

    if (decoded && decoded._id) {
      req.userId = decoded._id;
      req.token = acTkn;
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error: any) {
    console.log(error);
    next(error);
  }
}
