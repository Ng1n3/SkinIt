import { createClient } from "@redis/client";
import { promisify } from "util";

const redisClient = createClient();

redisClient.on("error", (error: any) => {
  console.error("reddis error", error);
});

(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis client connected");
  }
  
  // await setAsync('test_key', JSON.stringify({test: 'value'}))
  // const result = await getAsync('test_key');
  // console.log("test key value: ", result);
})();

export const getAsync = promisify(redisClient.get).bind(redisClient);
export const setAsync = promisify(redisClient.set).bind(redisClient);

export default redisClient;
