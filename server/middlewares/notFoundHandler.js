const path = require("path");
const notFoundHandler = (req, res, next) => {
  return res
    .status(404)
    .sendFile(path.join(__dirname, "..", "public", "404.html"));
  //if you want to send error message
  //   const error = new Error(`Route not found: ${req.originalUrl}`);
  //   error.statusCode = 404;
  //next(error);
};

module.exports = notFoundHandler;
