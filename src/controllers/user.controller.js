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

const getAllMembers = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);

  const members = await userService.getAllMembers(page, limit);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "All members",
    ...members,
  });
});

const getAllStaff = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);

  const staff = await userService.getAllStaff(page, limit);
  res.status(StatusCodes.OK).json({
    status: "sucess",
    message: "Get all library staff",
    ...staff,
  });
});

const getStaffByID = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await userService.getStaffByID(id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Get staff data",
    data,
  });
});

const getMemberByID = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await userService.getMemberByID(id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Get member data",
    data,
  });
});

const deleteMember = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await userService.deleteMember(id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Member is deleted successfully",
  });
});

const deleteStaff = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await userService.deleteStaff(id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Staff is deleted successfully",
  });
});

const updateMember = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { name, email, phone, is_verified } = req.body;
  const data = await userService.updateMember(
    id,
    name,
    email,
    phone,
    is_verified
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Member updated successfully",
    data,
  });
});

const updateStaff = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { name, email, phone, role_id } = req.body;
  const data = await userService.updateStaff(id, name, email, phone, role_id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Staff updated successfully",
    data,
  });
});

module.exports = {
  getMemberByID,
  getAllMembers,
  addLibrarian,
  getStaffByID,
  deleteMember,
  updateMember,
  deleteStaff,
  updateStaff,
  verifyEmail,
  getAllStaff,
  addMember,
  login,
};
