const express = require("express");
const router = express.Router();
const BugReport = require("../models/BugReport");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  const bugReport = new BugReport({ title, description, owner: req.user });
  await bugReport.save();
  const user = await User.findById(req.user);
  user.bugReports.push(bugReport._id);
  await user.save();
  res.status(201).json(bugReport);
});

router.get("/", authMiddleware, async (req, res) => {
  const bugReports = await BugReport.find({ owner: req.user });
  res.json(bugReports);
});

module.exports = router;
