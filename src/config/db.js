const { Pool } = require("pg");
const logger = require("../utils/logger");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  // ssl:
  //   process.env.NODE_ENV === "production"
  //     ? { rejectUnauthorized: false }
  //     : false,
});

pool.on("error", (err) => {
  logger.error("Unexpected error".err);
  process.exit(-1);
});

const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = (Date.now() - start) / 1000;
    logger.info = ("Executed query", { text, duration, rows: res.rowCount });

    return res;
  } catch (error) {
    logger.error("Query error", { text, params });
    throw error;
  }
};

const close = async () => {
  await pool.end();
  logger.info("Database pool closed");
};
module.exports = { query, close };
