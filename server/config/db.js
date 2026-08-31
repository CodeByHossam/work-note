const mongoose = require("mongoose");

//DB event listner

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
