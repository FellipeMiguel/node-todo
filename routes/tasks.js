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
