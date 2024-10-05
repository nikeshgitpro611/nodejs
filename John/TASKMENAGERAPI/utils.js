const errorHandler = (err, req, res, next) => { //use for global error
  return res.status(500).json({
    message: err._message,
    validation: err?.name
    // message : 'err'
  });
};

const asyncWrapper = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next)
      } catch (error) {
        next(error) //global error connect from here!!
      }
    }
  }

module.exports = { errorHandler, asyncWrapper };
