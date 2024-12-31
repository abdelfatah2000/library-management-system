const Joi = require("joi");

const userSchema = {
  addMember: {
    body: Joi.object({
      name: Joi.string().min(3).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
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
    }),
  },
  addLibrarian: {
    body: Joi.object({
      name: Joi.string().alphanum().min(3).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters",
        "string.alphanum": "Username must only contain alphanumeric characters",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
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
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
          "string.pattern.base":
            "Password must be between 3-30 characters and contain only alphanumeric characters",
        }),
      role_id: Joi.number().integer().positive().required(),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email is required",
      }),
      password: Joi.string().required(),
    }),
  },
  getAll: {
    query: Joi.object({
      page: Joi.number().integer().positive().min(1).messages({
        "number.base": "Page must be a number",
        "number.positive": "Page must be positive",
        "number.min": "Page must be greater than 0",
      }),
      limit: Joi.number().integer().positive().min(5).max(100).messages({
        "number.base": "Limit must be a number",
        "number.positive": "Limit must be positive",
        "number.min": "Limit must be greater than 4",
        "number.max": "Limit cannot exceed 100",
      }),
      sortBy: Joi.string()
        .valid("id", "created_at", "title", "published_at")
        .default("id"),
      sortOrder: Joi.string().valid("ASC", "DSC").default("ASC"),
    }),
  },
  token: {
    params: Joi.object({
      token: Joi.string().alphanum().trim().required(),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },

  updateMember: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
      name: Joi.string().alphanum().min(3).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters",
        "string.alphanum": "Username must only contain alphanumeric characters",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
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
      is_verified: Joi.boolean(),
    }),
  },

  updateStaff: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
      name: Joi.string().alphanum().min(3).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters",
        "string.alphanum": "Username must only contain alphanumeric characters",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
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
      role_id: Joi.number().integer().positive().required(),
    }),
  },
};

module.exports = userSchema;
