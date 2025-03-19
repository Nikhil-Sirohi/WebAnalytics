import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-2 w-full text-left p-2 bg-red-600 rounded hover:bg-red-700 text-sm"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
