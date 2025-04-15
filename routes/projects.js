const express = require("express");

const {
  getAllProjects,
  createProject,
  updateProject,
  removeProject,
} = require("../controllers/projects");

const router = express.Router();

router.get("/", getAllProjects);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", removeProject);

module.exports = router;
