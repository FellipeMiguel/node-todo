/**
 * Express router for task-related routes.
 *
 * Routes:
 * - GET /       : Fetch all tasks.
 * - POST /      : Create a new task.
 * - PUT /:id    : Update an existing task by ID.
 * - DELETE /:id : Remove a task by ID.
 *
 * Controller Methods:
 * - getAllTasks : Handles fetching all tasks.
 * - createTask  : Handles creating a new task.
 * - updateTask  : Handles updating an existing task.
 * - removeTask  : Handles deleting a task.
 *
 * @module routes/tasks
 * @requires express.Router
 * @requires ../controllers/tasks
 */

const router = require("express").Router();

const {
  getAllTasks,
  createTask,
  updateTask,
  removeTask,
} = require("../controllers/tasks");

router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", removeTask);

module.exports = router;
