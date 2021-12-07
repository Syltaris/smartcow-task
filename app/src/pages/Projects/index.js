import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getProjects,
  createProject,
  addImageToProject,
} from "../../services/api";
import CsvDownloader from "react-csv-downloader";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

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
          {/* Sidebar */}
          <div class="w-72 h-screen">
            <nav class="mt-10 px-6 ">
              <h1 class="py-4 ml-3 text-xl">Projects</h1>

              <button
                type="button"
                class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                onClick={async () => {
                  await createProject({
                    name: "New Project",
                    images: [],
                  });
                  await fetchProjects();
                }}
              >
                Create Project
              </button>
              {projects.map((project) => (
                <Link
                  key={project.id}
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
          {/* Project Details */}
          {selectedProject && (
            <div class="flex flex-row">
              <div class="flex-col">
                <label
                  class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  for="user_avatar"
                >
                  Upload images
                </label>
                <input
                  class="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-400 focus:outline-none focus:border-transparent text-sm rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="user_avatar_help"
                  id="user_avatar"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    e.preventDefault();
                    if (e.target.files) {
                      setImageFiles(e.target.files);
                    }
                  }}
                />
                <button
                  type="button"
                  class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={async () => {
                    for (const file of imageFiles) {
                      await addImageToProject(selectedProject.id, file);
                    }
                    await fetchProjects();
                  }}
                >
                  Confirm and Add
                </button>
                <div>
                  <CsvDownloader
                    class="py-2 px-4 m-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    filename={`${selectedProject.name}-${selectedProject.id}`}
                    extension=".csv"
                    seperator=","
                    columns={[
                      "name",
                      "startX",
                      "startY",
                      "endX",
                      "endY",
                      "label",
                    ]}
                    datas={selectedProject.images.flatMap((image) =>
                      image.annotations.map((annotation) => {
                        return {
                          name: image.name,
                          startX: annotation.startX,
                          startY: annotation.startY,
                          endX: annotation.endX,
                          endY: annotation.endY,
                          label: annotation.type,
                        };
                      })
                    )}
                    text="Download CSV"
                  />
                </div>
              </div>
              <div class="grid grid-cols-3 gap-2">
                {selectedProject.images?.map((image) => {
                  return (
                    <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                      <Link to={`/images/${image.id}`}>
                        <img
                          class="rounded-t-lg min-h-450"
                          src={process.env.REACT_APP_API_URL + image.url}
                          alt={image.name}
                        />
                        <div class="p-5">
                          <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                            {image.name}
                          </h5>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
