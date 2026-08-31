const Note = require("../models/Note");

// GET all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({"isSucess":true,'data':notes,"meta":req.baseUrl});
  } catch (error) {
    res.status(500).json({
      message: "Failed to get notes",
      error: error.message,
    });
  }
};

// GET one note
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get note",
      error: error.message,
    });
  }
};

// CREATE note
const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
};

// UPDATE note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update note",
      error: error.message,
    });
  }
};

// DELETE note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
      error: error.message,
    });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
