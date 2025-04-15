const mongoose = require("mongoose");

const Project = require("../model/Project");
const { getAll, create, remove, update } = require("../services/projects");

async function getAllProjects(req, res, next) {
  try {
    const project = await getAll();
    res.json(project);
  } catch (err) {
    next(err);
  }
}

async function createProject(req, res, next) {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        error: "All fields (title, description, dueDate) are required.",
      });
    }

    const project = await Project.create({ title, description, dueDate });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const project = await update(id, req.body);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
}

async function removeProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const project = await remove(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  removeProject,
};
