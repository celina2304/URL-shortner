const winston = require("winston");

// Configure logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(), // logs to console
    new winston.transports.File({ filename: "error.log", level: "error" }), // logs errors to file
    new winston.transports.File({ filename: "combined.log" }), // logs everything to combined.log
  ],
});

module.exports = { logger };
