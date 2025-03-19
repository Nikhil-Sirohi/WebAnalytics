const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Project = require("../models/Project");
const Analytics = require("../models/Analytics");
const VisitData = require("../models/VisitData");
const RouteAnalytics = require("../models/RouteAnalytics");
const CountryAnalytics = require("../models/CountryAnalytics");
const DeviceAnalytics = require("../models/DeviceAnalytics");
const OSAnalytics = require("../models/OSAnalytics");
const SourceAnalytics = require("../models/SourceAnalytics");

router.get("/", authMiddleware, async (req, res) => {
  const projects = await Project.find({ owner: req.user });
  const stats = [];

  for (const project of projects) {
    const analytics = await Analytics.findOne({ project: project._id });
    const visitHistory = await VisitData.findOne({ project: project._id });
    const routeAnalytics = await RouteAnalytics.findOne({
      project: project._id,
    });
    const countryAnalytics = await CountryAnalytics.findOne({
      project: project._id,
    });
    const deviceAnalytics = await DeviceAnalytics.find({
      project: project._id,
    });
    const osAnalytics = await OSAnalytics.find({ project: project._id });
    const sourceAnalytics = await SourceAnalytics.find({
      project: project._id,
    });

    stats.push({
      projectId: project._id,
      domain: project.domain,
      totalPageVisits: analytics ? analytics.totalPageVisits : 0,
      totalVisitors: analytics ? analytics.totalVisitors : 0,
      visitHistory,
      routeAnalytics,
      countryAnalytics,
      deviceAnalytics,
      osAnalytics,
      sourceAnalytics,
    });
  }
  res.send(stats);
});

module.exports = router;
