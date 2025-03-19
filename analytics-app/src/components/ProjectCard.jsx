import React from "react";

function ProjectCard({ projects, onUpdate }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      {projects.length > 0 ? (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project._id} className="p-2 bg-gray-700 rounded">
              {project.name} ({project.domain})
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No projects yet. Create one below!</p>
      )}
    </div>
  );
}

export default ProjectCard;
