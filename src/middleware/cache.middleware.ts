import { NextFunction, Request, Response } from "express";
import redisClient from "../utils/redisClient";

const cacheMiddleware = (key: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cachedkey = `${key}:${req.originalUrl}`;
    const cachedData = await redisClient.get(cachedkey)
    
    if(cachedData) {
      console.log("cache hit")
      res.json(JSON.parse(cachedData))
    } else {
      console.log("cache miss")
      res.locals.cacheKey = cachedkey
      return next()
    }
  } catch (error:any) {
    console.error("cache error", error)
    next()
  }
} 

export default cacheMiddleware;