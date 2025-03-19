const express = require("express");
const Project = require("../models/Project");
const Analytics = require("../models/Analytics");
const VisitData = require("../models/VisitData");
const RouteAnalytics = require("../models/RouteAnalytics");
const CountryAnalytics = require("../models/CountryAnalytics");
const OSAnalytics = require("../models/OSAnalytics");
const SourceAnalytics = require("../models/SourceAnalytics");
const { emitPageView } = require("../utils/socket");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    siteId,
    path,
    countryCode,
    countryName,
    deviceType,
    osName,
    sourceName,
  } = req.body;
  const project = Project.findOne({ domain: siteId });
  if (!project) {
    res.status(404).send({ message: "Project not found" });
  }

  let analytics = await Analytics.findOne({ project: project._id });
  if (!analytics) {
    analytics = new Analytics({ project: project._id });
  }
  analytics.totalPageVisits += 1;
  analytics.totalVisitors += 1;
  await analytics.save();

  const today = new Date().toISOString().split("T")[0];
  let visitData = await VisitData.findOne({
    project: project._id,
    date: today,
  });
  if (!visitData) {
    visitData = new VisitData({ project: project._id, date: today });
  }
  visitData.pageVisits += 1;
  visitData.visitors += 1;
  await visitData.save();

  let routeAnalytics = await RouteAnalytics.findOne({
    project: project._id,
    route: path,
  });
  if (!routeAnalytics) {
    routeAnalytics = new RouteAnalytics({ project: project._id, route: path });
  }
  routeAnalytics.pageVisits += 1;
  routeAnalytics.visitors += 1;
  await routeAnalytics.save();

  let countryAnalytics = await CountryAnalytics.findOne({
    project: project._id,
    countryCode,
  });
  if (!countryAnalytics) {
    countryAnalytics = new CountryAnalytics({
      project: project._id,
      countryCode,
      countryName,
    });
  }
  countryAnalytics.visitors += 1;
  await countryAnalytics.save();

  let deviceAnalytics = await DeviceAnalytics.findOne({
    project: project._id,
    deviceType,
  });
  if (!deviceAnalytics) {
    deviceAnalytics = new DeviceAnalytics({ project: project._id, deviceType });
  }
  deviceAnalytics.visitors += 1;
  await deviceAnalytics.save();

  let osAnalytics = await OSAnalytics.findOne({ project: project._id, osName });
  if (!osAnalytics) {
    osAnalytics = new OSAnalytics({ project: project._id, osName });
  }
  osAnalytics.visitors += 1;
  await osAnalytics.save();

  let sourceAnalytics = await SourceAnalytics.findOne({
    project: project._id,
    sourceName,
  });
  if (!sourceAnalytics) {
    sourceAnalytics = new SourceAnalytics({ project: project._id, sourceName });
  }
  sourceAnalytics.visitors += 1;
  await sourceAnalytics.save();

  emitPageView({ siteId, path, timestamp: new Date() });
  res.status(201).send({ message: "Page view tracked" });
});

module.exports = router;
