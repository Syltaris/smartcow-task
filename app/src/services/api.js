import { getImageDimensions } from "../utils/image";
import axios from "axios";

const projects = [];
const BASE_URL = process.env.REACT_APP_API_URL;

const getProject = async (projectId) => {
  const resp = await axios.get(`${BASE_URL}/projects/${projectId}/`);
  return resp.data;
};

const getProjects = async () => {
  const resp = await axios.get(`${BASE_URL}/projects/`);
  return resp.data;
};

const createProject = async (project) => {
  const resp = await axios.post(`${BASE_URL}/projects/`, project);
  return resp.data;
};

const addImageToProject = async (projectId, image) => {
  const [width, height] = await getImageDimensions(image);

  const formData = new FormData();
  formData.append("image", image);
  formData.append("project_id", projectId);
  formData.append("name", image.name);
  formData.append("width", width);
  formData.append("height", height);

  await axios.post(`${BASE_URL}/images/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return await getProject(projectId);
};

const getImage = async (imageId) => {
  const resp = await axios.get(`${BASE_URL}/images/${imageId}`);
  return resp.data;
};

const getImages = async (projectId) => {
  const resp = await axios.get(`${BASE_URL}/images/`);
  return resp.data;
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
