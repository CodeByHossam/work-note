const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
// GET all notes
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

// GET one note
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

// CREATE note
const createNote = asyncHandler(async (req, res) => {
const note = await Note.create(req.body);

res.status(201).json({
isSuccess: true,
data: note,
message: "Note created successfully",
});
});

// UPDATE note
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

// DELETE note
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
