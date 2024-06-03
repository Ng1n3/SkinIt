import { NextFunction, Request, Response } from "express";
import { getAsync } from "../utils/redisClient";

const cacheMiddleware = (key: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const cachedkey = `${key}:${JSON.stringify(req.params)}`;
    const cachedkey = `${key}:${req.originalUrl}`;
    // const cachedData = await getAsync(cachedkey)
    const cachedData = await getAsync("users/af")
    console.log("cached Data: ", cachedData)
    if(cachedData) {
      console.log("cache hit")
      res.json(JSON.parse(cachedData))
      next()
    } else {
      console.log("cache miss")
      res.locals.cacheKey = cachedkey
      return next()
    }
  } catch (error:any) {
    console.error("cache error", error)
  }
} 

export default cacheMiddleware;