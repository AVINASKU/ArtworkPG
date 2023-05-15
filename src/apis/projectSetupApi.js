import Api from ".";
import App from "../App";
import {
  createNewProjectAction,
  editProjectAction,
} from "../store/actions/ProjectSetupActions";
import { store } from "../store/store";

const baseURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile";

export const createNewProject = async (formData, headers = {
  "Access-Control-Allow-Headers" : "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/v1/cases`;
  const newProjectData = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });
  if (newProjectData?.data?.ID) {
    store.dispatch(createNewProjectAction(formData));
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

  const editProjectData = await axiosInstance({
    url: apiURL,
    method: method,
    data: formData,
  });
  if (editProjectData?.data?.ID) {
    App.dispatchToStore(editProjectAction(formData));
  }
  return editProjectData;
};
