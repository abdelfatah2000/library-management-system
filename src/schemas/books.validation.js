const Joi = require("joi");

const bookSchema = {
  create: {
    body: Joi.object({
      title: Joi.string().min(5).required(),
      isbn: Joi.string().min(9).required(),
      status: Joi.string()
        .valid("available", "loaned", "unavailable")
        .default("available"),
      published_at: Joi.date().required(),
      author_id: Joi.number().integer().positive().required(),
      category_id: Joi.number().integer().positive().required(),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
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
  search: {
    query: Joi.object({
      s: Joi.string().trim(),
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
  update: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
      title: Joi.string().min(5).required(),
      isbn: Joi.string().min(9).required(),
      status: Joi.string()
        .valid("available", "loaned", "unavailable")
        .default("available"),
      published_at: Joi.date().required(),
      author_id: Joi.number().integer().positive().required(),
      category_id: Joi.number().integer().positive().required(),
    }),
  },
};

module.exports = bookSchema;
