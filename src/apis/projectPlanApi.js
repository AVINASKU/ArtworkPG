import Api from ".";
import { updateProjectPlanAction } from "../store/actions/ProjectPlanActions";
import { store } from "../store/store";
import { DEVURL, SITURL, PRODURL } from "./envUrl";

export const getProjectPlan = async (
  projectId,
  headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  }
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  // let apiURL = `${baseURL}/V1/ProjectPlan/PG-AAS-WORK A-544`;
  let apiURL = `${DEVURL}/projectplan/${projectId}`;
  const { data: projectPlanData } = await axiosInstance({
    url: apiURL,
    method: "GET",
  });

  return projectPlanData?.ArtworkAgilityProjects;
};

export const activateProjectPlan = async (projectId, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/activateProject/${projectId}`;
  const activateResponse = await axiosInstance({
    url: apiURL,
    method: "POST"
  });
  return activateResponse;
};

export const saveProjectPlanAction = async (formData, id, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init(headers);
  let apiURL;
  apiURL = `${DEVURL}/saveproject/${id}`;

  const saveProjectPlanActionData = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });
  return saveProjectPlanActionData;
};
