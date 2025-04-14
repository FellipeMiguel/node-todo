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
    const project = await create({
      name: req.body.name,
      description: req.body.description,
      duaDate: req.body.duaDate,
    });
    res.status(201).json(project);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!moongose.isValidObjectId(id)) {
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
    if (!moongose.isValidObjectId(id)) {
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
