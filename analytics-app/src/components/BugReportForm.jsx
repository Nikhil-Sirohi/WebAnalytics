import React, { useState } from "react";
import axios from "../utils/api";

function BugReportForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/bug-reports", { title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Report a Bug</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 bg-gray-700 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 bg-gray-700 rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 rounded-lg hover:bg-teal-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BugReportForm;
