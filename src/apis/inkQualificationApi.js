import { useSelector } from "react-redux";
import Api from ".";
import { DEVURL, SITURL, PRODURL } from "./envUrl";

const baseURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile";

export const saveInkQualification = async (formData) => {
  let headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/V1/UpdateIQJob`;
  console.log("api url", apiURL);
  const inkQualification = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  console.log("IQSaveAsDraftresponse", inkQualification, formData);

  return true;
};

export const submitInkQualification = async (formData, id, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/v2/assignments/ASSIGN-WORKLIST ${id}!DEFINEINKQUALIFICATION_FLOW/actions/DefineInkQualification`;
  console.log("api url", apiURL);
  const inkQualification = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });

  console.log("IQSubmitresponse", inkQualification, formData);

  return true;
};

export const submitConfirmInkQualification = async (
  formData,
  id,
  headers = {}
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/v2/assignments/ASSIGN-WORKLIST ${id}!CONFIRMINKQUALIFICATION_FLOW/actions/ConfirmInkQualification`;
  console.log("api url", apiURL);
  const inkQualification = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });

  console.log("IQSubmitresponse", inkQualification, formData);

  return true;
};
