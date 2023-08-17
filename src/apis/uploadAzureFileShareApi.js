import Api from ".";
import { DEVURL } from "./envUrl";

export const uploadtoAzurefileShare = async (fileName, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL;

  apiURL = `${DEVURL}`;

  const uploadFiles = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: fileName,
  });

  return uploadFiles;
};
