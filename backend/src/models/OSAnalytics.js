const mongoose = require("mongoose");

const osAnalyticsSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  osName: {
    type: String,
    required: true,
  },
  visitors: {
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

osAnalyticsSchema.index({ project: 1, osName: 1 }, { unique: true });

module.exports = mongoose.model("OSAnalytics", osAnalyticsSchema);
