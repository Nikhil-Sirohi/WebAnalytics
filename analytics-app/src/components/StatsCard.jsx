import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function StatsCard({ stats }) {
  const chartData = {
    labels: stats.routeAnalytics.map((r) => r.route),
    datasets: [
      {
        label: "Page Views",
        data: stats.routeAnalytics.map((r) => r.pageVisits),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Stats for {stats.domain}</h2>
      <p className="text-gray-400">Total Views: {stats.totalPageVisits}</p>
      <p className="text-gray-400">Total Visitors: {stats.totalVisitors}</p>
      <Bar data={chartData} />
    </div>
  );
}

export default StatsCard;
