import Api from ".";
import App from "../App";
import {
  createNewProjectAction,
  editProjectAction,
} from "../store/actions/projectSetup";

const baseURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile";

export const createNewProject = async (formData, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/v1/cases`;
  const { data: newProjectData } = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });
  if (newProjectData.ID) {
    App.dispatchToStore(createNewProjectAction(formData));
  }
  return newProjectData;
};

export const editProject = async (formData, id, method, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL;
  if (method === "PUT") {
    apiURL = `${baseURL}/v1/cases/${id}`;
  } else if (method === "PATCH") {
    apiURL = `${baseURL}/v2/assignments/ASSIGN-WORKLIST ${id}!CREATE_FLOW_3/actions/CreateProjectManually`;
  }

  const { data: editProjectData } = await axiosInstance({
    url: apiURL,
    method: method,
    data: formData,
  });
  if (editProjectData.ID) {
    App.dispatchToStore(editProjectAction(formData));
  }
  return editProjectData;
};
