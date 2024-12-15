const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class AppError extends Error {
  constructor(message, statusCode , phrase) {
    super(message);
    this.statusCode  = statusCode ;
    this.status = phrase;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
