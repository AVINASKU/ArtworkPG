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
  let apiURL = `${DEVURL}/projectplan/${projectId}`;
  try {
    const response = await axiosInstance({
      url: apiURL,
      method: "GET",
    });
    // Check for successful response status, e.g., 200 OK
    if (response?.status === 200) {
      const projectPlanData = response?.data?.ArtworkAgilityProjects;
      return projectPlanData;
    }
  } catch (error) {
    if (error.message.includes('net::ERR_CONNECTION_TIMED_OUT')) {
      // Handle the server being down
      return { error: 'The server is currently unavailable. Please try again later.' };
    } else {
      console.error("Error fetching project plan:", error);
      throw error; // Rethrow the error for other types of errors
    }
  }
  
};

export const activateProjectPlan = async (formData, projectId, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/activateProject/${projectId}`;
  const activateResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
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
