// DONE: fill the user routes and link with controllers
// DONE : TEST ALL ROUTES IN POSTMAN

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddelware");
const authorize = require("../middlewares/authorizeMiddelware");
const allowedRoles = require("../config/allowedRoles");

const {
  validateCreateUser,
  validateUpdateUser,
} = require("../middlewares/validate");

const {
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUsersDropdown,
} = require("../controllers/userControllers");

// @route   GET api/users
// @desc    Get all users
// @access  Private/Admin
router.get("/", auth, authorize(allowedRoles.admin), getAllUsers);

// @route   GET api/users/dropdown
// @desc    Get users for assignment dropdown
// @access  Private/Admin + User
router.get(
  "/dropdown",
  auth,
  authorize(allowedRoles.adminAndUser),
  getUsersDropdown,
);

// @route   GET api/users/:id
// @desc    Get single user
// @access  Private/Admin
router.get("/:id", auth, authorize(allowedRoles.admin), getSingleUser);

// @route   POST api/users
// @desc    Create new user
// @access  Private/Admin
router.post(
  "/",
  auth,
  authorize(allowedRoles.admin),
  validateCreateUser,
  createUser,
);

// @route   PATCH api/users/:id
// @desc    Update user
// @access  Private/Admin
router.patch(
  "/:id",
  auth,
  authorize(allowedRoles.admin),
  validateUpdateUser,
  updateUser,
);

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete("/:id", auth, authorize(allowedRoles.admin), deleteUser);

module.exports = router;
