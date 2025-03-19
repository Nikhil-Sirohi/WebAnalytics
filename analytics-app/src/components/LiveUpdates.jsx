import React, { useState, useEffect } from "react";
import socket from "../utils/socket";

function LiveUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const handlePageView = (data) => {
      setUpdates((prev) => [data, ...prev].slice(0, 10));
    };

    socket.on("pageView", handlePageView);

    return () => {
      socket.off("pageView", handlePageView);
    };
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Live Updates</h2>
      <ul className="space-y-2">
        {updates.map((update, index) => (
          <li key={index} className="text-gray-400">
            {update.siteId} - {update.path} at{" "}
            {new Date(update.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LiveUpdates;
