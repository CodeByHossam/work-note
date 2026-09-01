const Note = require("../models/Note");

const asyncHandler = require("express-async-handler");

// @description: Get all notes accessible by the current user
// @route: GET /api/notes
// @access: Private

const getAllNotes = asyncHandler(async (req, res) => {
  // the user role is required not only the user id
  const notes = await Note.getAccessibleByUser(req.user);
  res.status(200).json({
    isSuccess: true,
    data: notes,
    message: "Notes retrieved successfully",
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

  // User must be the creator or assigned user
  if (!note.isOwner(req.user._id) && !note.isAssignedTo(req.user._id)) {
    return res.status(403).json({
      isSuccess: false,
      message: "You are not authorized to access this note",
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
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      isSuccess: false,
      message: "Note not found",
    });
  }

  // Only the creator can update the note
  if (!note.isOwner(req.user._id)) {
    return res.status(403).json({
      isSuccess: false,
      message: "You are not authorized to update this note",
    });
  }

  const { title, description, assignedTo, state, completed } = req.body;

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title: title ?? note.title,
      description: description ?? note.description,
      assignedTo: assignedTo ?? note.assignedTo,
      state: state ?? note.state,
      completed: completed ?? note.completed,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    isSuccess: true,
    data: updatedNote,
    message: "Note updated successfully",
  });
});

// @description: Delete note
// @route: DELETE /api/notes/:id
// @access: Private

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      isSuccess: false,
      message: "Note not found",
    });
  }

  // Only the creator can delete the note
  if (!note.isOwner(req.user._id)) {
    return res.status(403).json({
      isSuccess: false,
      message: "You are not authorized to delete this note",
    });
  }

  await Note.findByIdAndDelete(req.params.id);

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
