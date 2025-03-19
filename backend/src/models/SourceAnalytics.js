const mongoose = require("mongoose");

const sourceAnalyticsSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  sourceName: {
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

sourceAnalyticsSchema.index({ project: 1, sourceName: 1 }, { unique: true });

module.exports = mongoose.model("SourceAnalytics", sourceAnalyticsSchema);
