import { getImageDimensions } from "../utils/image";
import axios from "axios";

const projects = [];
const BASE_URL = process.env.REACT_APP_API_URL;

const getProjects = async () => {
  // should return projects belonging to user: after auth'ed
  const resp = await axios.get(`${BASE_URL}/projects/`);
  return resp.data;
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

  const [width, height] = await getImageDimensions(image);
  project.images.push({
    id: project.images.length + 1,
    projectId: projectId,
    name: image.name,
    url: window.URL.createObjectURL(image),
    width,
    height,
    annotations: [],
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

const addAnnotationToImage = async (imageId, annotation) => {
  // replace with api call
  const allImages = projects.flatMap((p) => p.images);
  const image = allImages.find((image) => image.id === imageId);
  image.annotations.push(annotation);
};

export {
  getProjects,
  createProject,
  addImageToProject,
  getImage,
  getImages,
  addAnnotationToImage,
};
