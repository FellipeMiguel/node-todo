/**
 * Retrieves all tasks.
 *
 * @async
 * @function getAllTasks
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with all tasks.
 */

/**
 * Creates a new task.
 *
 * @async
 * @function createTask
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing task details.
 * @param {string} req.body.title - Title of the task.
 * @param {string} req.body.description - Description of the task.
 * @param {string} req.body.priority - Priority of the task.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the created task or an error message.
 */

/**
 * Updates an existing task.
 *
 * @async
 * @function updateTask
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the task to update.
 * @param {Object} req.body - Request body containing updated task details.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the updated task or an error message.
 */

/**
 * Removes a task.
 *
 * @async
 * @function removeTask
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the task to remove.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends a 204 status code on success or an error message.
 */

const moongose = require("mongoose");

const { getAll, create, update, remove } = require("../services/tasks");

async function getAllTasks(req, res, next) {
  try {
    const tasks = await getAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const task = await create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
    });
    res.status(201).json(task);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    if (!moongose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const task = await update(id, req.body);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function removeTask(req, res, next) {
  try {
    const { id } = req.params;
    if (!moongose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const task = await remove(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllTasks, createTask, updateTask, removeTask };
