const db = require("../config/db");
const getPagination = require("../utils/pagination");

const getAllBooks = async (page, limit, sortBy, sortOrder) => {
  const text = `
      SELECT b.id, b.title, a.name, b.isbn, b.status, b.published_at, c.name
      FROM books b 
      JOIN authors a ON b.author_id = a.id
      JOIN categories c ON b.category_id = c.id
  `;
  const result = await getPagination(text, [], page, limit, sortBy, sortOrder);
  return result;
};


module.exports = {
  getAllBooks,
}