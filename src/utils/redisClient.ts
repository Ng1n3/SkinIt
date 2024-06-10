import { createClient } from "@redis/client";
import * as util  from "util";

const redisClient = createClient();

redisClient.on("error", (error: any) => {
  console.error("reddis error", error);
});

export const connectRedis = async() => {
  if(!redisClient.isOpen){
    await redisClient.connect();
    console.log("Redis client connect")
  }
}

export const disConnectRedis = async() => {
  if(redisClient.isOpen) {
    await redisClient.disconnect()
  }
}

// (async () => {
//   if (!redisClient.isOpen) {
//     await redisClient.connect();
//     console.log("Redis client connected");
//   }
  
// })();


export default redisClient;
