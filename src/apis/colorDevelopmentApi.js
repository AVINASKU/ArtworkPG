import { useSelector } from "react-redux";
import Api from ".";

const baseURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile";

export const saveColorDevelopment = async (formData) => {
  let headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/v1/UpdateNewPrintFeasibilityJob`;
  console.log("api url", apiURL);
  const colorDevelopment = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  console.log("CDSaveAsDraftresponse", colorDevelopment, formData);

  return true;
};

export const submitColorDevelopment = async (formData, id, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/v2/assignments/ASSIGN-WORKLIST ${id}!DefineNewPrintFeasibility_Flow/actions/DefineNewPrintFeasibility`;
  console.log("api url", apiURL);
  const colorDevelopment = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });

  console.log("CDSubmitresponse", colorDevelopment, formData);

  return true;
};

export const submitConfirmColorDevelopment = async (
  formData,
  id,
  headers = {}
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/v2/assignments/ASSIGN-WORKLIST ${id}!CONFIRMCOLORDEVELOPMENTDONE_FLOW/actions/ConfirmColorDevelopmentDone`;
  console.log("api url", apiURL);
  const colorDevelopment = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });

  console.log("CDConfirmSubmitresponse", colorDevelopment, formData);

  return true;
};
