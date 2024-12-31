const app = require("express").Router();
const userController = require("../controllers/user.controller");
const userSchema = require("../schemas/user.validation");
const validator = require("../middlewares/validation");
const hasPermission = require("../middlewares/permissions");
const passport = require("passport");

const authenticated = passport.authenticate("jwt", { session: false });

app.post(
  "/add-member",
  validator(userSchema.addMember),
  authenticated,
  hasPermission("manage_members"),
  userController.addMember
);
app.post(
  "/add-librarian",
  validator(userSchema.addLibrarian),
  authenticated,
  hasPermission("manage_staff"),
  userController.addLibrarian
);
app.post("/login", validator(userSchema.login), userController.login);
app.post(
  "/verify-email/:token",
  validator(userSchema.token),
  userController.verifyEmail
);
app.get(
  "/get-members",
  validator(userSchema.getAll),
  authenticated,
  hasPermission("view_members"),
  userController.getAllMembers
);

app.get(
  "/get-staff",
  validator(userSchema.getAll),
  authenticated,
  hasPermission("view_staff"),
  userController.getAllStaff
);

app.get(
  "/get-staff/:id",
  validator(userSchema.delete),
  authenticated,
  hasPermission("view_staff"),
  userController.getStaffByID
);

app.get(
  "/get-member/:id",
  validator(userSchema.delete),
  authenticated,
  hasPermission("view_members"),
  userController.getMemberByID
);

app.delete(
  "/delete-member/:id",
  validator(userSchema.delete),
  authenticated,
  hasPermission("manage_members"),
  userController.deleteMember
);

app.delete(
  "/delete-staff/:id",
  validator(userSchema.delete),
  authenticated,
  hasPermission("manage_members"),
  userController.deleteStaff
);

app.put(
  "/update-staff/:id",
  validator(userSchema.updateStaff),
  authenticated,
  hasPermission("manage_staff"),
  userController.updateStaff
);

app.put(
  "/update-member/:id",
  validator(userSchema.updateMember),
  authenticated,
  hasPermission("manage_members"),
  userController.updateMember
);
module.exports = app;
