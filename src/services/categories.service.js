const { StatusCodes } = require("http-status-codes");
const db = require("../config/db");
const AppError = require("../utils/appError");
const getPagination = require("../utils/pagination");

const addCategory = async (name) => {
  const { rows } = await db.query(
    `INSERT INTO categories (name) VALUES ($1) RETURNING id, name, created_at;`,
    [name]
  );
  return rows[0];
};

const getAllCategories = async (page, limit, sortBy, sortOrder) => {
  const baseQuery = `SELECT id, name, created_at FROM categories;`;
  const result = await getPagination(
    baseQuery,
    [],
    page,
    limit,
    sortBy,
    sortOrder
  );
  return result;
};

const getCategory = async (id) => {
  const { rows, rowCount } = await db.query(
    `SELECT id, name, created_at FROM categories WHERE id = $1;`,
    [id]
  );

  if (rowCount === 0) {
    throw new AppError(
      "Invalid input data",
      StatusCodes.BAD_REQUEST,
      "fail",
      true
    );
  }
  return rows[0];
};

const getCategoryBooks = async (id, page, limit, sortBy, sortOrder) => {
  const baseQuery = `
    SELECT
      b.id, b.title, b.published_at, b.isbn, b.status, a.name AS author, c.name AS category
    FROM categories c 
    JOIN books b ON b.category_id = c.id
    JOIN authors a ON b.author_id = a.id
    WHERE c.id = $1
  `;
  // const result = await getPagination(
  //   baseQuery,
  //   [id],
  //   page,
  //   limit,
  //   sortBy,
  //   sortOrder
  // );
  // return result;
  const { rows } = await db.query(baseQuery, [id]);
  return rows;
};

const deleteCategory = async (id) => {
  const { rowCount } = await db.query(`DELETE FROM categories WHERE id = $1;`, [
    id,
  ]);
  if (rowCount === 0) {
    throw new AppError(
      "Invalid input data",
      StatusCodes.BAD_REQUEST,
      "fail",
      true
    );
  }
  return true;
};

const updateCategory = async (id, name) => {
  const { rowCount, rows } = await db.query(
    `UPDATE categories SET name = $2 WHERE id = $1 RETURNING id, name;`,
    [id, name]
  );

  if (rowCount === 0) {
    throw new AppError(
      "Invalid input data",
      StatusCodes.BAD_REQUEST,
      "fail",
      true
    );
  }
  return rows[0];
};

module.exports = {
  getAllCategories,
  getCategoryBooks,
  deleteCategory,
  updateCategory,
  addCategory,
  getCategory,
};
