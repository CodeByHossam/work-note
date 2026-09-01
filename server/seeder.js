const dotenv = require("dotenv");

const User = require("./models/User");
const Note = require("./models/Note");
const connectDB = require("./config/db");

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Note.deleteMany();
    await User.deleteMany();

    console.log("Old data deleted");

    // Create users
    const users = await User.create([
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "Admin123",
        role: "admin",
      },
      {
        name: "Ahmed Ali",
        email: "ahmed@example.com",
        password: "User123",
        role: "employee",
      },
      {
        name: "Mohamed Hassan",
        email: "mohamed@example.com",
        password: "User123",
        role: "employee",
      },
      {
        name: "Sara Ahmed",
        email: "sara@example.com",
        password: "User123",
        role: "employee",
      },
    ]);

    console.log(`${users.length} users created`);

    // Get users
    const admin = users.find(
      (user) => user.email === "admin@example.com"
    );

    const ahmed = users.find(
      (user) => user.email === "ahmed@example.com"
    );

    const mohamed = users.find(
      (user) => user.email === "mohamed@example.com"
    );

    const sara = users.find(
      (user) => user.email === "sara@example.com"
    );

    // Create notes
    const notes = await Note.create([
      {
        title: "Prepare project report",
        description: "Prepare the monthly project progress report.",
        creator: ahmed._id,
        assignedTo: mohamed._id,
        state: "started",
        completed: false,
      },

      {
        title: "Review technical drawings",
        description:
          "Review the latest technical drawings and provide comments.",
        creator: mohamed._id,
        assignedTo: ahmed._id,
        state: "pending",
        completed: false,
      },

      {
        title: "Update project documentation",
        description:
          "Update all project documentation with the latest revisions.",
        creator: sara._id,
        assignedTo: ahmed._id,
        state: "completed",
        completed: true,
      },

      {
        title: "Check pending tasks",
        description:
          "Review all pending tasks and update their status.",
        creator: ahmed._id,
        assignedTo: sara._id,
        state: "pending",
        completed: false,
      },

      {
        title: "Prepare meeting agenda",
        description:
          "Prepare the agenda for the upcoming project meeting.",
        creator: mohamed._id,
        assignedTo: sara._id,
        state: "started",
        completed: false,
      },

      {
        title: "System administration",
        description:
          "Review system users and permissions.",
        creator: admin._id,
        assignedTo: admin._id,
        state: "completed",
        completed: true,
      },
    ]);

    console.log(`${notes.length} notes created`);
    console.log("Data seeding completed successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();