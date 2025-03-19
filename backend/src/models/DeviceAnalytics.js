const mongoose = require("mongoose");

const deviceAnalyticsSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  deviceType: {
    type: String,
    enum: ["DESKTOP", "MOBILE", "TABLET"],
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

deviceAnalyticsSchema.index({ project: 1, deviceType: 1 }, { unique: true });

module.exports = mongoose.model("DeviceAnalytics", deviceAnalyticsSchema);
