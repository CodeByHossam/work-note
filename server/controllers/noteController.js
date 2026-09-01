const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @description: Get all notes
// @route: GET /api/notes
// @access: Private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();

  res.status(200).json({
    isSuccess: true,
    data: notes,
    message:
      notes.length === 0
        ? "No notes found"
        : "All notes retrieved successfully",
  });
});

// @description: Get note by ID
// @route: GET /api/notes/:id
// @access: Private
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      isSuccess: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    isSuccess: true,
    data: note,
    message: "Note retrieved successfully",
  });
});

// @description: Create new note
// @route: POST /api/notes
// @access: Private
const createNote = asyncHandler(async (req, res) => {
  const { title, description, assignedTo } = req.body;

  const note = await Note.create({
    title,
    description,
    assignedTo,
    creator: req.user._id,
  });

  res.status(201).json({
    isSuccess: true,
    data: note,
    message: "Note created successfully",
  });
});

// @description: Update note
// @route: PUT /api/notes/:id
// @access: Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!note) {
    return res.status(404).json({
      isSuccess: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    isSuccess: true,
    data: note,
    message: "Note updated successfully",
  });
});

// @description: Delete note
// @route: DELETE /api/notes/:id
// @access: Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);

  if (!note) {
    return res.status(404).json({
      isSuccess: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    isSuccess: true,
    message: "Note deleted successfully",
  });
});

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
