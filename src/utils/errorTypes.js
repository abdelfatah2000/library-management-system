const AppError = require("./appError");
const { StatusCodes } = require("http-status-codes");
const handleUniqueConstraintError = (err) => {
  return new AppError(
    "Duplicate value",
    StatusCodes.BAD_REQUEST,
    'fail',
    true
  );
};

const handleForeignKeyConstrainError = (err) => {
  return new AppError(
    "Invalid reference",
    StatusCodes.BAD_REQUEST,
    'fail',
    true
  );
};

const handleInvalidInputError = (err) => {
  return new AppError(
    "Invalid value",
    StatusCodes.BAD_REQUEST,
    'fail',
    true
  );
};

module.exports = {
  handleUniqueConstraintError,
  handleForeignKeyConstrainError,
  handleInvalidInputError,
};
