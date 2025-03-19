const mongoose = require("mongoose");

const routeAnalyticsSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  visitors: {
    type: Number,
    default: 0,
  },
  pageVisits: {
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

routeAnalyticsSchema.index({ project: 1, route: 1 }, { unique: true });

module.exports = mongoose.model("RouteAnalytics", routeAnalyticsSchema);
