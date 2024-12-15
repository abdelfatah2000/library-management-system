const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const logger = require("../utils/logger");

const developmentError = (err, res) => {
  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: err.status || ReasonPhrases.INTERNAL_SERVER_ERROR,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    logger.error("Error : ", err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: "Something went wrong, please try again later.",
    });
  }
};

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || ReasonPhrases.INTERNAL_SERVER_ERROR;

  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  } else {
    let error = { ...err, message: err.message, name: err.name };

    // Handle specific PostgreSQL errors
    if (err.code === "23505") {
      error = handleUniqueConstraintError(err);
    } else if (err.code === "23503") {
      error = handleForeignKeyConstrainError(err);
    } else if (err.code === "22P02") {
      error = handleInputError(err);
    }

    productionError(error, res);
  }
};

const handleUniqueConstraintError = (err) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    status: ReasonPhrases.BAD_REQUEST,
    message: "Duplicate value",
    isOperational: true,
  };
};

const handleForeignKeyConstrainError = (err) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    status: ReasonPhrases.BAD_REQUEST,
    message: "Invalid reference",
    isOperational: true,
  };
};

const handleInputError = (err) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    status: ReasonPhrases.BAD_REQUEST,
    message: "Invalid value",
    isOperational: true,
  };
};

const handleNotFound = (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server`,
    StatusCodes.NOT_FOUND,
    ReasonPhrases.NOT_FOUND
  );
  next(err);
};
module.exports = {errorMiddleware, handleNotFound };
