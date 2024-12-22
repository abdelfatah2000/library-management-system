const db = require("../config/db");
const { StatusCodes } = require("http-status-codes");

const hasPermission = (permissionName) => async (req, res, next) => {
  const text = `
      SELECT p.name FROM permissions p 
      JOIN role_permissions r
      ON r.permission_id = p.id
      WHERE r.role_id = $1
  `;
  const { rows } = await db.query(text, [req.user.role_id]);
  const permissions = rows.map((item) => item.name);
  if (!permissions.includes(permissionName)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: "fail",
      message: "Unauthorized access",
    });
  }
  next();
};

module.exports = hasPermission;
