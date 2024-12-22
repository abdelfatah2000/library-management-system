const { StatusCodes } = require("http-status-codes");
const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    const details = error.details.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));

    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "fail",
      message: "Validation Error",
      details,
    });
  }
  next();
};

module.exports = validator;
