const catchAsync = require("../utils/catchAsync");
const bookService = require("../services/books.service");
const { StatusCodes } = require("http-status-codes");

const addBook = catchAsync(async (req, res, next) => {
  const { title, author_id, published_at, isbn, category_id } = req.body;

  const book = await bookService.addBook(
    title,
    author_id,
    published_at,
    isbn,
    category_id
  );
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Book added successfully",
    book,
  });
});

const getAllBooks = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const sortBy = req.query.sortBy || "id";
  const sortOrder = req.query.sortOrder || "ASC";

  const result = await bookService.getAllBooks(page, limit, sortBy, sortOrder);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "All Books",
    ...result,
  });
});

const searchBook = catchAsync(async (req, res, next) => {
  const search = req.query.s;
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const sortBy = req.query.sortBy || "title";
  const sortOrder = req.query.sortOrder || "ASC";
  const result = await bookService.searchBook(search, {
    page,
    limit,
    sortBy,
    sortOrder,
  });
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "All Books",
    ...result,
  });
});

const deleteBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await bookService.deleteBook(id);
  if (result) {
    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Book is deleted successfully",
    });
  }
});
const getBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await bookService.getBook(id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Book details",
    data,
  });
});

const updateBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { title, isbn, published_at, status, author_id, category_id } =
    req.body;
  const result = await bookService.updateBook(
    id,
    title,
    isbn,
    published_at,
    status,
    author_id,
    category_id
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Book updated successfully",
    data: result,
  });
});
module.exports = {
  getAllBooks,
  updateBook,
  deleteBook,
  searchBook,
  addBook,
  getBook,
};
