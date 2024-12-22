const app = require("express").Router();
const bookController = require("../controllers/books.controller");
const validator = require("../middlewares/validation");
const hasPermission = require("../middlewares/permissions");
const passport = require("passport");

const authenticated = passport.authenticate("jwt", { session: false });

app.get(
  "/get_books",
  authenticated,
  hasPermission("view_books"),
  bookController.getAllBooks
);

module.exports = app;
