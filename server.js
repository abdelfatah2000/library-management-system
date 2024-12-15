require("dotenv").config();
const app = require("./src/app.js");
const { close } = require("./src/config/db.js");
const looger = require("./src/utils/logger.js");

const PORT = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
  looger.error("UNCAUGHT EXCEPTION Shutting down....", err);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  looger.error("UNCAUGHT REJECTION Shutting down....", err);

  server.close(() => {
    close();
    process.exit(1);
  });
});
