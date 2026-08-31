const express = require("express");

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

// GET all notes
router.get("/", getAllNotes);

// GET one note
router.get("/:id", getNoteById);

// CREATE note
router.post("/", createNote);

// UPDATE note
router.patch("/:id", updateNote);

// DELETE note
router.delete("/:id", deleteNote);

module.exports = router;
