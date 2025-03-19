import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-teal-600 rounded-lg hover:bg-teal-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
