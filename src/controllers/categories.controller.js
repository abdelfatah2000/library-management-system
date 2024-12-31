const catchAsync = require("../utils/catchAsync");
const categoryService = require("../services/categories.service");
const { StatusCodes } = require("http-status-codes");

const getAllCategories = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const sortBy = req.query.sortBy || "id";
  const sortOrder = req.query.sortOrder || "ASC";

  const result = await categoryService.getAllCategories(
    page,
    limit,
    sortBy,
    sortOrder
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "All categories",
    ...result,
  });
});

const addCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const data = await categoryService.addCategory(name);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Category is added successfully",
    data,
  });
});

const getCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await categoryService.getCategory(id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Category details",
    data,
  });
});

const getCategoryBooks = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const sortBy = req.query.sortBy || "name";
  const sortOrder = req.query.sortOrder || "ASC";
  const result = await categoryService.getCategoryBooks(
    id,
    page,
    limit,
    sortBy,
    sortOrder
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Books of that category",
    ...result,
  });
});

const deleteCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await categoryService.deleteCategory(id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Category is deleted successfully",
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const data = await categoryService.updateCategory(id, name);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Category is updated successfully",
    data,
  });
});

module.exports = {
  getCategoryBooks,
  getAllCategories,
  deleteCategory,
  updateCategory,
  addCategory,
  getCategory,
};
