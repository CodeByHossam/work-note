const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();
//middlewares imports
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const path = require("path");
//routes
const userRoutes = require("./routers/userRoutes");
const noteRoutes = require("./routers/noteRoutes");
const authRoutes = require("./routers/authRoutes");

//middlewares use

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// route use
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/auth", authRoutes);
// test route
app.get("/api/test", (req, res) => {
  const error = new Error("This is a test error");
  error.statusCode = 400;
  throw error;
});

// Error handling
// 1- not found handler after all routes (must be after all routes but before error handler)
app.use(notFoundHandler);

//2- error handler (must be last)
app.use(errorHandler);

// connect to DB and server if DB connection success
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

//start the server
startServer();
