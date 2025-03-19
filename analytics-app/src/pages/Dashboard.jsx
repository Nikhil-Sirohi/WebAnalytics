import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import LiveUpdates from "../components/LiveUpdates";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import BugReportForm from "../components/BugReportForm";
import axios from "../utils/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, []);

  const fetchProjects = async () => {
    const response = await axios.get("/projects");
    setProjects(response.data);
  };

  const fetchStats = async () => {
    const response = await axios.get("/stats");
    setStats(response.data);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard projects={projects} onUpdate={fetchProjects} />
          {stats && stats.length > 0 ? (
            stats.map((stat, index) => <StatsCard key={index} stats={stat} />)
          ) : (
            <div className="text-center mt-10 text-gray-400">
              No Analytics Data
              <p className="mt-2">
                Add this script to your website to start tracking:
              </p>
              <pre className="bg-gray-700 p-4 rounded mt-2">
                {`<script defer data-domain="your-domain.com" src="http://localhost:5000/tracking-script.js"></script>`}
              </pre>
            </div>
          )}
          <LiveUpdates />
        </div>
        <ProjectForm onCreate={fetchProjects} />
        <BugReportForm />
      </div>
    </div>
  );
}

export default Dashboard;
