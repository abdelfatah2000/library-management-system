const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);  // If there's an error, pass it to the next middleware
  };
};

module.exports = catchAsync;