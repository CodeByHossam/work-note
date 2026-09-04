const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// @des: Register a new user
// @route: POST /api/users
// @access: Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //using collation to ignore case sensitive
  const existedUser = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .exec();

  if (existedUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isSuccess: true,
    message: `User ${user.name} created successfully`,
  });
});

// @des: Login a user
// @route: POST /api/users/login
// @access: Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      isSucess: false,
      message: "Invalid email or password",
    });
  }
  const verfiedUser = await bcrypt.compare(password, user.password);
  if (verfiedUser) {
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    res.status(200).json({
      _id: user._id,
      name: user.name,
      role: user.role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

module.exports = { login, register };
