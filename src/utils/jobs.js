const db = require("../config/db");
const cron = require("node-cron");

const cleanupExpiredTokens = () => {
  cron.schedule("0 0 1 * *", async () => {
    await db.query("SELECT cleanup_expired_tokens();", []);
    logger.info(`cleanup_expired_tokens function is started`);
  });
};

module.exports = cleanupExpiredTokens;
