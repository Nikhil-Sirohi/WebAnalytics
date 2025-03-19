const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.send({ message: "please enter valid credentails" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, name });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).send({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.send({ message: "User has not registered" });
  }
  if (!bcrypt.compare(password, user.password)) {
    return res.status(401).send({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user).populate("projects");
  res.send(user);
});

module.exports = router;
