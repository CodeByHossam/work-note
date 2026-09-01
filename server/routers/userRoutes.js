// DONE: fill the user routes and link with controllers
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
  getAllUsers
} = require("../controllers/userControllers");

router.get("/", auth, authorize(allowedRoles.admin), getAllUsers);
router.get("/:id", auth, authorize(allowedRoles.admin), getSingleUser);
router.post(
  "/",
  auth,
  authorize(allowedRoles.admin),
  validateCreateUser,
  createUser,
);
router.patch(
  "/:id",
  auth,
  authorize(allowedRoles.admin),
  validateUpdateUser,
  updateUser,
);
router.delete("/:id", auth, authorize(allowedRoles.admin), deleteUser);

module.exports = router;
