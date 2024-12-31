const app = require("express").Router();
const categoryController = require("../controllers/categories.controller");
const validator = require("../middlewares/validation");
const hasPermission = require("../middlewares/permissions");
const passport = require("passport");
const categorySchema = require("../schemas/categories.validation");

const authenticated = passport.authenticate("jwt", { session: false });

app.post(
  "/add-category",
  validator(categorySchema.add),
  authenticated,
  hasPermission("manage_categories"),
  categoryController.addCategory
);
app.get(
  "/get-category/:id",
  validator(categorySchema.delete),
  authenticated,
  categoryController.getCategory
);

app.get(
  "/get-categories",
  validator(categorySchema.getAll),
  authenticated,
  categoryController.getAllCategories
);

app.get(
  "/get-category-books/:id",
  validator(categorySchema.delete),
  categoryController.getCategoryBooks
);

app.put(
  "/update-category",
  validator(categorySchema.update),
  authenticated,
  hasPermission("manage_categories"),
  categoryController.updateCategory
);

app.delete(
  "/delete-category",
  validator(categorySchema.delete),
  authenticated,
  hasPermission("manage_categories"),
  categoryController.updateCategory
);
module.exports = app;
