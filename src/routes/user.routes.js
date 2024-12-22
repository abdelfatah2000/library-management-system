const app = require("express").Router();
const userController = require("../controllers/user.controller");
const userSchema = require("../schemas/user.validation");
const validator = require("../middlewares/validation");
const hasPermission = require("../middlewares/permissions");
const passport = require('passport');

const authenticated = passport.authenticate("jwt", { session: false });


app.post(
  "/add-member",
  validator(userSchema.user),
  authenticated,
  hasPermission("manage_members"),
  userController.addMember
);
app.post(
  "/add-librarian",
  validator(userSchema.user),
  authenticated,
  hasPermission("manage_staff"),
  userController.addLibrarian
);
app.post("/login", validator(userSchema.login), userController.login);
app.post("/verify-email/:token", userController.verifyEmail);

module.exports = app;
