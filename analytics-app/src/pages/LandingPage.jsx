import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-4">Weblytics</h1>
      <p className="text-xl mb-6">
        Unlock powerful insights with ease. Track visitor behavior and optimize
        performance.
      </p>
      <div className="space-x-4">
        <Link to="/auth?mode=login">
          <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            Login
          </button>
        </Link>
        <Link to="/auth?mode=signup">
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
