import Api from ".";
import { DEVURL, SITURL, PRODURL } from "./envUrl";

export const postSaveDesignIntent = async (
  formData,
  headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  }
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/v1/SaveUploadTask`;
  console.log("api url", apiURL);
  const designIntent = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  console.log("response", designIntent, formData);

  return true;
};
