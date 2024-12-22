const db = require("../config/db");
const AppError = require("./appError");
const { StatusCodes } = require("http-status-codes");

const getPagination = async (
  baseQuery,
  values = [],
  limit,
  page,
  sortBy,
  sortOrder
) => {
  const santiziedSortBy = sortBy.replace(/[^a-zA-Z0-9_]/g, "");
  const offest = (page - 1) * limit;
  try {
    const { rowCount } = await db.query(`${baseQuery};`, values);
    const query = `
      ${baseQuery}
      ORDER BY ${santiziedSortBy} ${sortOrder}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2};
  `;
    values.push(limit);
    values.push(offest);
    const { rows } = await db.query(query, values);
    const totalPages = Math.ceil(rowCount / limit);
    return {
      data: [rows[0]],
      pagination: {
        totalPages,
        totalRows: rowCount,
        page,
      },
    };
  } catch (error) {
    throw new AppError(
      "Error, please try again later",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "fail",
      true
    );
  }
};

module.exports = getPagination;