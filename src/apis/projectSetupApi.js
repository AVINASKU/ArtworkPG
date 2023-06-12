import Api from ".";
import App from "../App";
import {
  createNewProjectAction,
  editProjectAction,
} from "../store/actions/ProjectSetupActions";
import { store } from "../store/store";
import { DEVURL, SITURL, PRODURL } from "./envUrl";

const baseURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile";

export const createNewProject = async (
  formData,
  headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  }
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/createproject`;
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
    apiURL = `${DEVURL}/createprojectasdraft/${id}`;
  } else if (method === "PATCH") {
    apiURL = `${DEVURL}/createProjectManually/${id}`;
  } else if (method === "POST") {
    // https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/UpdateDetailsIntoProjectSetUp/{AWMProjectID}
    apiURL = `${DEVURL}/updateDetailsIntoProjectSetUp/${id}`;
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
