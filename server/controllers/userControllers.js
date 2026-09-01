
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @description    Get all users
// @route          GET /api/v1/users
// @access         Private/Admin

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    isSuccess: true,
    data: users,
    message: "Users retrieved successfully",
  });
});


// @description    Get single user
// @route          GET /api/v1/users/:id
// @access         Private/Admin

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      isSuccess: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    isSuccess: true,
    data: user,
    message: "User retrieved successfully",
  });
});


// @description    Create user
// @route          POST /api/v1/users
// @access         Private/Admin

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      isSuccess: false,
      message: "Please provide all required fields",
    });
  }

  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    isSuccess: true,
    data: newUser,
    message: "User created successfully",
  });
});


// @description    Update user
// @route          PATCH /api/v1/users/:id
// @access         Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findById(req.params.id);

  if (!existingUser) {
    return res.status(404).json({
      isSuccess: false,
      message: "User not found",
    });
  }

  const { name, email, password, role } = req.body;

  const updatedUserData = {
    name: name ?? existingUser.name,
    email: email ?? existingUser.email,
    password: password ?? existingUser.password,
    role: role ?? existingUser.role,
  };

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    updatedUserData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    isSuccess: true,
    data: updatedUser,
    message: "User updated successfully",
  });
});


// @description    Delete user
// @route          DELETE /api/v1/users/:id
// @access         Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return res.status(404).json({
      isSuccess: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    isSuccess: true,
    data: deletedUser,
    message: "User deleted successfully",
  });
});


module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};

