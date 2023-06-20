import Api from ".";
import { DEVURL } from "./envUrl";

export const addDsbpToProject = async (
  projectId,
  InitiativeID,
  headers = {}
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/addDsbptoproject/${projectId}/${InitiativeID}`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
  });
  console.log("Hello hello ----->", addResponse);
  return addResponse;
};

//Here is code repetation but lets seperate this two API's

export const deleteDsbpFromProject = async (
  projectId,
  InitiativeID,
  headers = {}
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/deleteDsbp/${projectId}/${InitiativeID}`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
  });
  console.log("Hello hello ----->", addResponse);
  return addResponse;
};

export const getDsbpPMPDetails = async (projectId, headers = {})=>{
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/getDSBPPMPDetails/${projectId}`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "GET",
  });
  console.log("response get dsbp pmp ----->", addResponse);
  return addResponse?.data?.DSBPDetails?.DSBP_InitiativeIDPage;
}