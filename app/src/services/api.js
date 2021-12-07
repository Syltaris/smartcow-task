const projects = [];

const getProjects = async () => {
  // should return projects belonging to user: after auth'ed
  return [...projects]; // trick to rerender
};

const createProject = async () => {
  // replace with api call
  const pk = projects.length + 1;
  const project = {
    id: pk,
    name: "New Project",
    images: [],
  };
  projects.push(project);

  // should return with data object
  return project;
};

const addImageToProject = async (projectId, image) => {
  // replace with api call
  const project = projects.find((p) => p.id === projectId);

  project.images.push({
    id: project.images.length + 1,
    name: image.name,
    url: window.URL.createObjectURL(image),
  });

  // should return with data object
  return project;
};

const getImage = async (imageId) => {
  // replace with api call
  const allImages = projects.flatMap((p) => p.images);
  return allImages.find((image) => image.id === imageId);
};

const getImages = async (projectId) => {
  // replace with api call
  return projects.flatMap((p) => p.images);
};

export { getProjects, createProject, addImageToProject, getImage, getImages };
