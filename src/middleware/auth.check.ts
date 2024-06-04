import { NextFunction, Response, Request } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.AUTH_ACCESS_TOKEN_SECRET as string;

if (!ACCESS_TOKEN_SECRET) throw new Error("some secrets are missing");

interface AuthenticatedRequest extends Request {
  userId?: string;
  token?: string;
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
    console.log("authHeader: ", authHeader);
    if (!authHeader?.startsWith("Bearer "))
      throw new Error("You are not Authenticated");
    const accessTokenSplit = authHeader.split(" ");
    const acTkn = accessTokenSplit[1];

    const decoded = Jwt.verify(acTkn, ACCESS_TOKEN_SECRET);

    if (typeof decoded === "object" && "_id" in decoded) {
      const payload = decoded as CustomPayload;
      req.userId = payload._id;
      req.token = acTkn;
    } else {
      throw new Error("Invalid token");
    }

    next();
  } catch (error: any) {
    console.log("auth Error:")
    next(error.message);
  }
}
