const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
dotenv.config();
const errorHandler = require("./middlewares/errorHandler");
const noteRoutes = require("./routers/noteRoutes");
const userRoutes = require("./routers/userRutes");


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// test route
app.use("/api/note", noteRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// connect to DB and server if DB connection success
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
//error handler
app.use(errorHandler);

//start the server
startServer();
