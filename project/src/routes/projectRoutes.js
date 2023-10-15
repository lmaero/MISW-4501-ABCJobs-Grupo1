const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/:id", projectController.getProject);
router.put("/:id", projectController.updateProject);
router.post("/", projectController.addProject);

module.exports = router;
