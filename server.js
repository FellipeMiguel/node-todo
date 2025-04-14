/**
 * @fileoverview Main server file for the Node.js Todo API application.
 * Configures and starts the Express server, connects to MongoDB, and sets up routes.
 *
 * @requires dotenv - Loads environment variables from a .env file into process.env.
 * @requires express - Web framework for Node.js.
 * @requires mongoose - MongoDB object modeling tool.
 * @requires ./routes/tasks - Router module for handling task-related routes.
 *
 * @constant {number|string} PORT - The port number on which the server will listen. Defaults to 3000 if not specified in environment variables.
 * @constant {string} MONGODB_URI - The MongoDB connection URI, retrieved from environment variables.
 */

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const tasksRouter = require("./routes/tasks");

const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error("Error to connect to MongoDB", err));
