// import winston, { info, loggers } from "winston";
// import path from "path";
// import fs from "fs";

// // Define the log directory path
// const logDirectory = path.join(__dirname, "../../logs");

// // Function to create log directory if it doesn't exist
// const createLogDirectory = (dir: string) => {
//   try {
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }
//   } catch (error) {
//     console.error(`Failed to create log directory at ${dir}:`, error);
//     process.exit(1); // Exit the application if directory creation fails
//   }
// };

// // Create log directory
// createLogDirectory(logDirectory);

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   debug: 4,
// };

// const colors = {
//   error: "red",
//   warn: "yellow",
//   info: "green",
//   http: "magenta",
//   debug: "white",
// };

// winston.addColors(colors);

// const format = winston.format.combine(
//   winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//   winston.format.colorize({ all: true }),
//   winston.format.json()
// );

// const transports = [
//   new winston.transports.Console({
//     level: "debug",
//   }),
//   new winston.transports.File({
//     filename: path.join(logDirectory, "error.log"),
//     level: "error",
//     maxFiles: 1,
//     maxsize: 5242880,
//   }),
//   new winston.transports.File({
//     filename: path.join(logDirectory, "allLogs.log"),
//     level: "info",
//     maxFiles: 1,
//     maxsize: 5242880,
//   }),
// ];

// const Logger = winston.createLogger({
//   levels,
//   format,
//   transports,
//   handleExceptions: true,
//   exitOnError: false,
// });

// export default Logger;

import path from "path";
import fs from "fs";
import winston from "winston";
import { StreamOptions } from "morgan";

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

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json()
);

const options = {
  file: {
    level: "info",
    filename: path.join(logDirectory, "app.log"),
    handleExceptions: true,
    maxsize: 524880,
    maxFiles: 2,
    format: fileFormat,
  },
  console: {
    level: "info",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple()
    ),
  },
  error: {
    level: "error",
    handleExceptions: true,
    filename: path.join(logDirectory, "error.log"),
    maxsize: 524880,
    maxFiles: 2,
    format: fileFormat,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.File(options.error),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export default logger;
