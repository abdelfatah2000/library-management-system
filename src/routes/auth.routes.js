const app = require("express").Router();
const authController = require("../controllers/auth.controllers");

app.post("/register", authController.register);
app.post("/login", authController.login);
app.post("/verify-email/:token", authController.verifyEmail);
app.post("/forget-password", authController.forgetPassword);
app.post("/reset-password/:token", authController.confirmResetPassword);


module.exports = app;
