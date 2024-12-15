const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const {
  errorMiddleware,
  handleNotFound,
} = require("./middlewares/errorHandler");

const AppError = require("./utils/appError");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));








app.use(handleNotFound);
app.use(errorMiddleware);

module.exports = app;