import winston, { info } from "winston";
import path from "path";
import fs from "fs";

// Define the log directory path
const logDirectory = path.join(__dirname, "../../logs");

// Function to create log directory if it doesn't exist
const createLogDirectory = (dir: string) => {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (error) {
    console.error(`Failed to create log directory at ${dir}:`, error);
    process.exit(1); // Exit the application if directory creation fails
  }
};

// Create log directory
createLogDirectory(logDirectory);

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: path.join(logDirectory, "error.log"),
    level: "error",
  }),
  new winston.transports.File({
    filename: path.join(logDirectory, "allLogs.log"),
  }),
];

const Logger = winston.createLogger({
  levels,
  format,
  transports,
});

export default Logger;
