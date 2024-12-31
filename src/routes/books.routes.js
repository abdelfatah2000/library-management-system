const app = require("express").Router();
const bookController = require("../controllers/books.controller");
const validator = require("../middlewares/validation");
const hasPermission = require("../middlewares/permissions");
const passport = require("passport");
const bookSchema = require("../schemas/books.validation");

const authenticated = passport.authenticate("jwt", { session: false });
app.post(
  "/add-book",
  validator(bookSchema.create),
  authenticated,
  hasPermission("manage_books"),
  bookController.addBook
);
app.get(
  "/get-books",
  validator(bookSchema.getAll),
  authenticated,
  hasPermission("view_books"),
  bookController.getAllBooks
);
app.get(
  "/search-books",
  validator(bookSchema.search),
  bookController.searchBook
);
app.get(
  "/get-book/:id",
  validator(bookSchema.delete),
  authenticated,
  hasPermission("view_books"),
  bookController.getBook
);
app.delete(
  "/delete-book/:id",
  validator(bookSchema.delete),
  authenticated,
  hasPermission("manage_books"),
  bookController.deleteBook
);

app.put(
  "/update-book/:id",
  authenticated,
  hasPermission("manage_books"),
  bookController.updateBook
);
module.exports = app;
