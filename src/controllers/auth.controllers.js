const authService = require("../services/auth.services");
const catchAsync = require("../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");

const register = catchAsync(async (req, res) => {
  const { name, email, phone, password } = req.body;
  const user = await authService.register(name, email, phone, password);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "User created successfully",
    user,
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.params;
  await authService.verifyEmail(token);
  res.status(StatusCodes.ACCEPTED).json({
    status: "success",
    message: "User verified successfully",
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  await authService.initiateResetPassword(email);
  res.status(StatusCodes.ACCEPTED).json({
    status: "success",
    message: "Reset instructions send to your email",
  });
});

const confirmResetPassword = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  await authService.resetPassword(token, password);
  res.status(StatusCodes.ACCEPTED).json({
    status: "success",
    message: "Password changed",
  });
});

const resendEmail = catchAsync(async (req, res) => {
  const { email, type } = req.body;
  await authService.resendEmail(email, type);
  res.status(StatusCodes.ACCEPTED).json({
    status: "success",
    message: "Email is resend",
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  res.status(StatusCodes.ACCEPTED).json({
    status: "success",
    message: "successful login",
    token,
  });
});

module.exports = {
  confirmResetPassword,
  forgetPassword,
  verifyEmail,
  resendEmail,
  register,
  login,
};
