const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/appError");
const logger = require("../utils/logger");
const {
  handleForeignKeyConstrainError,
  handleInvalidInputError,
  handleUniqueConstraintError,
} = require("../utils/errorTypes");

const sanitizeRequest = (req) => {
  if (req) {
    delete req.password;
  }
  return req;
};

const developmentError = (err, res) => {
  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const productionError = (err, req, res) => {
  logger.error(
    `${err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR} - ${
      err.message
    } - ${req.originalUrl} - ${req.ip}`,
    {
      error: err,
      stack: err.stack,
      method: req.method,
      path: req.path,
      body: sanitizeRequest(req.body),
    }
  );

  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: err.status || "error",
    message: err.isOperational
      ? err.message
      : "Something went wrong, please try again later.",
  });
};

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";

  let error = err;

  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  } else {
    if (err.code === "23505") {
      error = handleUniqueConstraintError(err);
    } else if (err.code === "23503") {
      error = handleForeignKeyConstrainError(err);
    } else if (err.code === "22P02") {
      error = handleInvalidInputError(err);
    }
    productionError(error, req, res);
  }
};

const handleNotFound = (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server`,
    StatusCodes.NOT_FOUND,
    "error",
    true
  );
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = {
  handleNotFound,
  errorMiddleware,
};
