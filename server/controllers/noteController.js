const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

//  get all notes
const getAllNotes = asyncHandler(async (req, res) => {
  // req.user contains _id and role
  const notes = await Note.getAccessibleByUser(req.user)
    .populate("assignedTo", "name")
    .populate("creator", "name");

  res.status(200).json({
    isSuccess: true,
    data: notes,
    message: "Notes retrieved successfully",
  });
});

// get single note
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)
    .populate("assignedTo", "name")
    .populate("creator", "name");

  if (!note) {
    return res.status(404).json({
      isSuccess: false,
      message: "Note not found",
    });
  }

  // User must be the creator, assigned user, or admin
  if (
    !note.isOwner(req.user._id) &&
    !note.isAssignedTo(req.user._id) &&
    req.user.role !== "admin"
  ) {
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

// create new note
const createNote = asyncHandler(async (req, res) => {
  const { title, description, assignedTo } = req.body;

  // Create the document
  const note = await Note.create({
    title,
    description,
    assignedTo,
    creator: req.user._id,
  });

  // Populate the created document
  await note.populate([
    { path: "assignedTo", select: "name" },
    { path: "creator", select: "name" },
  ]);

  res.status(201).json({
    isSuccess: true,
    data: note,
    message: "Note created successfully",
  });
});

// update note
const updateNote = asyncHandler(async (req, res) => {
  // 1. Get the note
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      isSuccess: false,
      message: "Note not found",
    });
  }

  // 2. Authorization
  // Only the creator or admin can update the note
  if (!note.isOwner(req.user._id) && req.user.role !== "admin") {
    return res.status(403).json({
      isSuccess: false,
      message: "You are not authorized to update this note",
    });
  }

  const { title, description, assignedTo, state, completed } = req.body;

  // 3. Update the note
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
  )
    //opulate only after update because the user may changed them in the request
    .populate("assignedTo", "name")
    .populate("creator", "name");

  // 4. Send response
  res.status(200).json({
    isSuccess: true,
    data: updatedNote,
    message: "Note updated successfully",
  });
});

// delete note

const deleteNote = asyncHandler(async (req, res) => {
  // Get the document
  //populate the document before deleting becuse it will be stored in javascript only not in database
  const note = await Note.findById(req.params.id).populate([
    { path: "creator", select: "name" },
    { path: "assignedTo", select: "name" },
  ]);

  if (!note) {
    return res.status(404).json({
      isSuccess: false,
      message: "Note not found",
    });
  }

  // Only the creator or admin can delete the note
  if (!note.isOwner(req.user._id) && req.user.role !== "admin") {
    return res.status(403).json({
      isSuccess: false,
      message: "You are not authorized to delete this note",
    });
  }

  await note.deleteOne();

  res.status(200).json({
    isSuccess: true,
    data: note,
    message: "Note deleted successfully",
  });
});

// get all notes assined to a user
// Get notes assigned to a user
// FIXME:assined to cant get his notes
const getAssignedNotes = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.body.userId;

    if (
      userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        isSuccess: false,
        message: "You are not authorized to access this resource",
      });
    }

    const notes = await Note.getAssignedToUser(userId);

    res.status(200).json({
      isSuccess: true,
      count: notes.length,
      data: notes,
      message: "All user's notes have been retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
});
module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  getAssignedNotes,
};
