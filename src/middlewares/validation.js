const { StatusCodes } = require("http-status-codes");
const validator = (schema) => async (req, res, next) => {
  try {
    for (const [key, validationSchema] of Object.entries(schema)) {
      if (req[key]) {
        await validationSchema.validateAsync(req[key], {
          abortEarly: false,
          allowUnknown: false,
        });
      }
    }
    next();
  } catch (error) {
    if (error.details) {
      const details = error.details.map((err) => ({
        type: err.path[0],
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "fail",
        message: "Validation Error",
        details,
      });
    }
    next(error);
  }
};

module.exports = validator;