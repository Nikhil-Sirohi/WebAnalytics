import React, { useState } from "react";
import axios from "../utils/api";

function ProjectForm({ onCreate }) {
  const [domain, setDomain] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/projects", { domain, name, description });
    setDomain("");
    setName("");
    setDescription("");
    onCreate();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Create Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
          className="w-full p-2 bg-gray-700 rounded"
          required
        />
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Domain (e.g., example.com)"
          className="w-full p-2 bg-gray-700 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 bg-gray-700 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 rounded-lg hover:bg-teal-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
