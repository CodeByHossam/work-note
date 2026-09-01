const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401);
    throw new Error("No token, authorization denied");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);//throw automatically if token is invalid

  const user = await User.findById(decoded._id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  req.user = user;

  next();
});

module.exports = auth;