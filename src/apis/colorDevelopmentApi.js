import { useSelector } from "react-redux";
import Api from ".";
import { DEVURL, SITURL, PRODURL } from "./envUrl";

const baseURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile";

export const saveColorDevelopment = async (formData) => {
  let headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/updateNewPrintFeasibilityJob`;
  //console.log("api url", apiURL);
  const colorDevelopment = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  //console.log("CDSaveAsDraftresponse", colorDevelopment, formData);

  return true;
};

export const submitColorDevelopment = async (formData, id, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/defineNewPrintFeasibility/${id}`;
  //console.log("api url", apiURL);
  const colorDevelopment = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });

  //console.log("CDSubmitresponse", colorDevelopment, formData);

  return true;
};

export const submitConfirmColorDevelopment = async (
  formData,
  id,
  headers = {}
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/confirmColorDevelopment/${id}`;
  //console.log("api url", apiURL);
  const colorDevelopment = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });

  //console.log("CDConfirmSubmitresponse", colorDevelopment, formData);

  return true;
};

export const submitConfirmPrintTrial = async (formData, id, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/confirmPrintTrialDone/${id}`;
  //console.log("api url", apiURL);
  const colorDevelopment = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });

  //console.log("CPTConfirmSubmitresponse", colorDevelopment, formData);

  return true;
};
