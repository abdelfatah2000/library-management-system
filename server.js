require("dotenv").config();
const app = require("./src/app.js");
const { close } = require("./src/config/db.js");
const logger = require("./src/utils/logger.js");

const PORT = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION Shutting down....", err);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  logger.error("UNCAUGHT REJECTION Shutting down....", err);

  server.close(() => {
    close();
    process.exit(1);
  });
});
