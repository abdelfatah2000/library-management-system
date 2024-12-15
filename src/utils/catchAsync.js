// src/utils/catchAsync.js
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next); // Pass the error to the next middleware
};
