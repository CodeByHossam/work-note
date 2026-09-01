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
} = require("../controllers/noteController");

const router = express.Router();

// GET all notes
router.get("/", auth, getAllNotes);

// GET one note
router.get("/:id", getNoteById);

// CREATE note
router.post(
  "/",
  auth,
  authorize(allowedRoles.admin),
  validateCreateNote,
  createNote,
);

// UPDATE note
router.patch("/:id", validateUpdateNote, updateNote);

// DELETE note
router.delete("/:id", deleteNote);

module.exports = router;
