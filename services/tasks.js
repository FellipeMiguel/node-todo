/**
 * Retrieves all tasks from the database, sorted by creation date in ascending order.
 *
 * @async
 * @function getAll
 * @returns {Promise<Array>} A promise that resolves to an array of task objects.
 */

/**
 * Creates a new task in the database.
 *
 * @async
 * @function create
 * @param {Object} taskData - The data for the new task.
 * @param {string} taskData.title - The title of the task.
 * @param {string} taskData.description - The description of the task.
 * @param {string} taskData.priority - The priority level of the task.
 * @returns {Promise<Object>} A promise that resolves to the created task object.
 */

/**
 * Updates an existing task in the database.
 *
 * @async
 * @function update
 * @param {string} id - The ID of the task to update.
 * @param {Object} updates - The updates to apply to the task.
 * @returns {Promise<Object|null>} A promise that resolves to the updated task object, or null if no task was found.
 */

/**
 * Deletes a task from the database.
 *
 * @async
 * @function remove
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<Object|null>} A promise that resolves to the deleted task object, or null if no task was found.
 */

const Task = require("../model/Task");

async function getAll() {
  return await Task.find().sort({ createdAt: 1 });
}

async function create({ title, description, priority }) {
  return await Task.create({ title, description, priority });
}

async function update(id, updates) {
  return await Task.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
}

async function remove(id) {
  return await Task.findByIdAndDelete(id);
}

module.exports = { getAll, create, update, remove };
