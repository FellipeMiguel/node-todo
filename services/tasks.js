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
