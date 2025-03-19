import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/api";
import LogoutButton from "./LogoutButton";

function Sidebar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className="w-64 bg-gray-800 h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-6">Weblytics</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="block p-2 bg-orange-600 rounded hover:bg-orange-700"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link to="#" className="block p-2 rounded hover:bg-gray-700">
              Settings
            </Link>
          </li>
        </ul>
      </div>
      {user && (
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name ? user.name[0] : "U"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{user.name || "User"}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
