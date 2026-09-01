const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    state: {
      type: String,
      enum: ["pending", "started", "completed"],
      default: "pending",
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// method to check if the user is the owner of the note
NoteSchema.methods.isOwner = function (userId) {
  return this.creator.toString() === userId.toString();
};

NoteSchema.methods.isAssignedTo = function (userId) {
  return this.assignedTo.toString() === userId.toString();
};

// method to generate a report of the note
NoteSchema.methods.noteReport = function () {
  return {
    reportTitle: "Note Status Report",

    note: {
      title: this.title,
      description: this.description,
      state: this.state,
      completed: this.completed,
    },

    ownership: {
      creator: this.creator,
      assignedTo: this.assignedTo,
    },

    dates: {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    },

    summary: `
Note Status Report

Title: ${this.title}

Description:
${this.description}

Created By: ${this.creator}
Assigned To: ${this.assignedTo}

Current State: ${this.state}
Completed: ${this.completed ? "Yes" : "No"}

Created On: ${this.createdAt}
Last Updated: ${this.updatedAt}
`,
  };
};

// Notes created by the user
NoteSchema.statics.getCreatedByUser = function (userId) {
  return this.find({ creator: userId });
};

// Notes accessible to the user:
// user is either the creator OR the assigned user
NoteSchema.statics.getAccessibleByUser = function (user) {
  if (user.role === "admin") {
    return this.find();
  }

  return this.find({
    $or: [{ creator: user._id }, { assignedTo: user._id }],
  });
};

// Notes assigned to the user
NoteSchema.statics.getAssignedToUser = function (userId) {
  return this.find({ assignedTo: userId });
};

module.exports = mongoose.model("Note", NoteSchema);
