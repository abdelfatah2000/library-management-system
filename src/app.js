const YAML = require("yamljs");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const passport = require("./config/passport");
const cleanupExpiredTokens = require("./utils/jobs");
const {
  errorMiddleware,
  handleNotFound,
} = require("./middlewares/errorHandler");

const app = express();

const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/books.routes");
// Load Swagger documentation from the YAML file
const swaggerDocument = YAML.load(path.join(__dirname, "docs/swagger.yml"));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes);

// Corn Jobs
cleanupExpiredTokens();

app.use(handleNotFound);
app.use(errorMiddleware);

module.exports = app;
