import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjects, createProject } from "../../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  async function fetchProjects() {
    const response = await getProjects();
    setProjects(response);
  }
  useEffect(() => fetchProjects(), []); // TODO: should depend on auth token, or user identifier

  const { id } = useParams();
  // TODO: should just fetch directly, but good enough for now
  const selectedProject = projects.find((project) => {
    return project.id === Number(id);
  });

  return (
    <>
      <div class="relative bg-white dark:bg-gray-800">
        <div class="flex flex-col sm:flex-row ">
          <div class="w-72 h-screen">
            <nav class="mt-10 px-6 ">
              <h1 class="py-4 ml-3 text-xl">Projects</h1>

              <button
                type="button"
                class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                onClick={() => {
                  createProject();
                  fetchProjects();
                }}
              >
                Create Project
              </button>
              {projects.map((project) => (
                <Link
                  class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                  href="#"
                  to={`/projects/${project.id}`}
                >
                  <span class="mx-4 text-lg font-normal">{project.name}</span>
                  <span class="flex-grow text-right"></span>
                </Link>
              ))}
            </nav>
          </div>
          {selectedProject && (
            <div>
              {selectedProject.name} +{selectedProject.id}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
