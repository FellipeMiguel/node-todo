const Project = require("../model/Project");

async function getAll() {
  return await Project.find().populate("tasks");
}

async function create({ name, description, duaDate }) {
  return await Project.create({ name, description, duaDate });
}

async function update(id, updates) {
  return await Project.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
}

async function remove(id) {
  return await Project.findByIdAndDelete(id);
}

module.exports = { getAll, create, update, remove };
