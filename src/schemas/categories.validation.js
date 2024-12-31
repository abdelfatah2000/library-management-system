const Joi = require("joi");

const categorySchema = {
  add: {
    body: Joi.object({
      name: Joi.string().min(3).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters",
      }),
    }),
  },

  delete: {
    params: Joi.object({
      id: Joi.number().integer().positive().required().messages({
        "number.base": "ID must be a number",
        "number.positive": "ID must be positive",
      }),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().positive().required().messages({
        "number.base": "ID must be a number",
        "number.positive": "ID must be positive",
      }),
    }),
    body: Joi.object({
      name: Joi.string().min(3).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters",
      }),
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
      sortBy: Joi.string().valid("id", "created_at", "name").default("id"),
      sortOrder: Joi.string().valid("ASC", "DSC").default("ASC"),
    }),
  },
};

module.exports = categorySchema;
