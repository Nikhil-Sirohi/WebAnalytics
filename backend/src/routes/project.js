const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, async (req, res) => {
  const { domain, name, description } = req.body;
  const project = new Project({ domain, name, description, owner: req.user });
  await project.save();
  const user = await User.findById(req.user);
  user.projects.push(project._id);
  await user.save();
  res.status(201).send(project);
});

router.get("/", authMiddleware, async (req, res) => {
  const projects = await Project.find({ owner: req.user });
  res.send(projects);
});

module.exports = router;
