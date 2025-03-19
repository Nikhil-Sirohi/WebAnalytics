const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const authRoutes = require("./routes/auth");
const trackRoutes = require("./routes/track");
const statsRoutes = require("./routes/stats");
const projectRoutes = require("./routes/project");
const bugReportRoutes = require("./routes/bugReport");
const connectDB = require("./config/db");
const { initSocket } = require("./utils/socket");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

connectDB();

app.use(cors());

app.use(express.json());

initSocket(server);

app.use("/api/auth", authRoutes);
app.use("/api/track", trackRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bug-reports", bugReportRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`App is listening on Port: ${PORT}`);
});
