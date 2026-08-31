//Error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log("ERROR HANDLER REACHED");
  console.log("ERROR:", err);
  res.status(statusCode);

  res.json({
    message: `[Error Handler] ${err.message || "Something went wrong with the server"}`,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = errorHandler;
