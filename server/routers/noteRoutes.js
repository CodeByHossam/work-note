const express = require("express");
const auth = require("../middlewares/authMiddelware");
const {
  validateCreateNote,
  validateUpdateNote,
} = require("../middlewares/validate");
const authorize = require("../middlewares/authorizeMiddelware");
const allowedRoles = require("../config/allowedRoles");

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  getAssignedNotes,
} = require("../controllers/noteController");

const router = express.Router();
// DONE : TEST ALL ROUTES IN POSTMAN

// @route : GET /api/notes
// @describe : Get all notes
// @access : Private
router.get("/", auth, authorize(allowedRoles.adminAndUser), getAllNotes);

// @route : GET /api/notes/:id
// @describe : Get note by id
// @access : Private
router.get("/:id", auth, authorize(allowedRoles.adminAndUser), getNoteById);

// @route : POST /api/notes
// @describe : Create note
// @access : Private
router.post(
  "/",
  auth,
  authorize(allowedRoles.adminAndUser),
  validateCreateNote,
  createNote,
);

// @route : PATCH /api/notes/:id
// @describe : Update note
// @access : Private
router.patch(
  "/:id",
  auth,
  authorize(allowedRoles.adminAndUser),
  validateUpdateNote,
  updateNote,
);

// @route : DELETE /api/notes/:id
// @describe : Delete note
// @access : Private
router.delete("/:id", auth, authorize(allowedRoles.adminAndUser), deleteNote);

// @route : GET /api/notes/assinedto/:id
// @describe : Get all notes assined to a user
// @access : Private
router.get(
  "/assined/to",
  auth,
  authorize(allowedRoles.adminAndUser),
  getAssignedNotes,
);

module.exports = router;
