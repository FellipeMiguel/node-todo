const mongoose = require("mongoose");

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
      priority: req.body.priority,
      completed: req.body.completed,
      projectId: req.body.projectId,
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
    if (!mongoose.isValidObjectId(id)) {
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
    if (!mongoose.isValidObjectId(id)) {
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
