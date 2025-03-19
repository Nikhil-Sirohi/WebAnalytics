const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  totalPageVisits: {
    type: Number,
    default: 0,
  },

  totalVisitors: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Analytics", analyticsSchema);
