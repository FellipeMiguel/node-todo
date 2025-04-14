/**
 * Imports the `Schema` and `model` functions from the Mongoose library.
 *
 * - `Schema`: Used to define the structure of documents within a MongoDB collection.
 * - `model`: Used to create a model based on a schema, which provides an interface to interact with the database.
 */

const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Task", taskSchema);
