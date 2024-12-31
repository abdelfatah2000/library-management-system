const { StatusCodes } = require("http-status-codes");
const db = require("../config/db");
const AppError = require("../utils/appError");
const getPagination = require("../utils/pagination");

const addBook = async (title, author_id, published_at, isbn, category_id) => {
  const text = `
      INSERT INTO books (title, author_id, published_at, isbn, category_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
  `;
  const { rows } = await db.query(text, [
    title,
    author_id,
    published_at,
    isbn,
    category_id,
  ]);
  return rows[0];
};

const getAllBooks = async (page, limit, sortBy, sortOrder) => {
  const text = `
      SELECT b.id, b.title, a.name author, b.isbn, b.status, b.published_at, c.name category, b.created_at, b.updated_at
      FROM books b 
      JOIN authors a ON b.author_id = a.id
      JOIN categories c ON b.category_id = c.id
  `;
  const result = await getPagination(text, [], page, limit, sortBy, sortOrder);
  return result;
};

const searchBook = async (query, options = {}) => {
  const { limit, page, sortBy = "title", sortOrder = "ASC" } = options;
  const searchQuery = `
      SELECT
        b.id,
        b.title,
        b.isbn,
        b.published_at,
        b.status,
        a.name AS author,
        c.name AS category
      FROM books b
      LEFT JOIN authors a ON a.id = b.author_id
      LEFT JOIN categories c ON c.id = b.category_id
      WHERE 
        b.title ILIKE $1 OR
        b.isbn ILIKE $1 OR
        a.name ILIKE $1 OR
        c.name ILIKE $1
  `;
  const result = await getPagination(
    searchQuery,
    [`%${query}%`],
    page,
    limit,
    sortBy,
    sortOrder
  );
  return result;
};

const deleteBook = async (id) => {
  const book = await db.query(`SELECT id FROM books WHERE id = $1;`, [id]);
  if (book.rowCount === 0) {
    throw new AppError(
      "Invalid input data",
      StatusCodes.BAD_REQUEST,
      "fail",
      true
    );
  }
  await db.query(`DELETE FROM books WHERE id = $1`, [id]);
  return true;
};

const getBook = async (id) => {
  const text = `
      SELECT 
        b.id,
        b.title, 
        b.status, 
        b.isbn, 
        b.published_at ,
        c.name AS category, 
        a.name AS author
      FROM books b
      JOIN authors a ON a.id = b.author_id
      JOIN categories c ON c.id = b.category_id
      WHERE b.id = $1;
  `;
  const { rows, rowCount } = await db.query(text, [id]);
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

const updateBook = async (
  id,
  title,
  isbn,
  published_at,
  status,
  author_id,
  category_id
) => {
  const book = await db.query(`SELECT id WHERE id = $1`, [id]);
  if (book.rowCount === 0) {
    throw new AppError(
      "Invalid input data",
      StatusCodes.BAD_REQUEST,
      "fail",
      true
    );
  }
  const text = `
      UPDATE books
      SET 
        title = $2,
        isbn = $3,
        published_at = $4,
        status = $5,
        author_id = $6,
        category_id = $7
      WHERE id = $1
      RETURNING
        id,
        title, 
        isbn, 
        published_at, 
        status, 
        author_id,
        category_id;
  `;
  const updatedBook = await db.query(text, [
    id,
    title,
    isbn,
    published_at,
    status,
    author_id,
    category_id,
  ]);
  return updatedBook.rows[0];
};

module.exports = {
  getAllBooks,
  updateBook,
  deleteBook,
  searchBook,
  addBook,
  getBook,
};
