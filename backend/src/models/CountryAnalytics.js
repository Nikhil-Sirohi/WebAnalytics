const mongoose = require("mongoose");

const countryAnalyticsSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
    maxlength: 2,
  },
  countryName: {
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

countryAnalyticsSchema.index({ project: 1, countryCode: 1 }, { unique: true });

module.exports = mongoose.model("CountryAnalytics", countryAnalyticsSchema);
