const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Project", projectSchema);
