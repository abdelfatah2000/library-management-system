const userService = require("../services/user.service");
const catchAsync = require("../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");

const addMember = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;
  const user = await userService.addMember(name, email, phone);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Member added successfully",
    user,
  });
});

const addLibrarian = catchAsync(async (req, res) => {
  const { name, email, phone, password, role_id } = req.body;
  const user = await userService.addLibrarian(
    name,
    email,
    phone,
    password,
    role_id
  );
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Librarian added successfully",
    user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "successful login",
    token,
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.params;
  await userService.verifyEmail(token);
  res.status(StatusCodes.ACCEPTED).json({
    status: "success",
    message: "User verified successfully",
  });
});

module.exports = {
  addLibrarian,
  verifyEmail,
  addMember,
  login,
};
