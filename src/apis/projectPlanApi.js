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
  let apiURL = `${DEVURL}/ProjectPlan/${projectId}`;
  const { data: projectPlanData } = await axiosInstance({
    url: apiURL,
    method: "GET",
  });

  return projectPlanData?.ArtworkAgilityProjects;
};

export const activateProjectPlan = async (projectId, data, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/V1/Activate/${projectId}`;
  const activateResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: data,
  });

  // console.log("activateResponse", activateResponse);
  return activateResponse;
};
