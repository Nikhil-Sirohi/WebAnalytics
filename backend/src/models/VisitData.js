const mongoose = require("mongoose");

const visitDataSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  pageVisits: {
    type: Number,
    default: 0,
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

visitDataSchema.index(
  {
    project: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("VisitData", visitDataSchema);
