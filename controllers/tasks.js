const mongoose = require("mongoose");

const Task = require("../model/Task");
const Project = require("../model/Project");
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
    const { projectId, title, priority, completed } = req.body;

    // Verifica se o ID do projeto foi fornecido
    if (!projectId) {
      return res
        .status(400)
        .json({ error: "Project ID is required to create a task." });
    }

    // Verifica se o projeto existe
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Cria a tarefa no banco de dados
    const task = await Task.create({
      title,
      priority,
      completed,
      projectId,
    });

    // Adiciona o ID da tarefa ao array de tasks do projeto
    project.tasks.push(task._id);
    await project.save();

    res
      .status(201)
      .json({ message: "Task created and added to project.", task });
  } catch (err) {
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
