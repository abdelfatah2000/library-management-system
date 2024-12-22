const Joi = require("joi");

const userSchema = {
  user: Joi.object({
    name: Joi.string().trim().min(2).required().messages({
      "string.min": "Name must be at least 2 characters",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().trim().required().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    phone: Joi.string()
      .required()
      .pattern(new RegExp("^(012|010|011|015)\\d{8}$"))
      .messages({
        "string.pattern.base":
          "Phone must start with 012, 011, 010, or 015 and be 11 digits long",
        "any.required": "Phone is required",
      }),
    password: Joi.string()
      .min(6)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      )
      .messages({
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base":
          "Password must include uppercase, lowercase, number, and special character",
      }),
    role_id: Joi.number(),
  }),
  login: Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
  }),
};

module.exports = userSchema;
