const catchAsync = require("../utils/catchAsync");
const bookService = require("../services/books.service");
const { StatusCodes } = require("http-status-codes");

const getAllBooks = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortBy = req.query.sortBy || "id";
  const sortOrder = req.query.sortOrder || "ASC";

  const result = await bookService.getAllBooks(page, limit, sortBy, sortOrder);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "All Books",
    ...result,
  });
});

module.exports = {
  getAllBooks,
};
