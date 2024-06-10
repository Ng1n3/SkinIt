import morgan, { StreamOptions, token } from "morgan";
import logger from "../utils/logger";

const stream: StreamOptions = {
  write: (message) => {
    const statusCode = parseInt(message.split(" ")[2], 10);
    if (statusCode >= 400) {
      logger.error(message.trim());
    } else {
      logger.info(message.trim());
    }
  },
};

const morganMiddleWare = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

export default morganMiddleWare;
