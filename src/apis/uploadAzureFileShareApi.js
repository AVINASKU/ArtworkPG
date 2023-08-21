import Api from ".";
import { AZUREURL } from "./envUrl";

export const uploadtoAzurefileShare = async (file, subfolder, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL;

  apiURL = `${DEVURL}/create-or-update-folder?folderName=${subfolder}`;

  const formData = new FormData();
  formData.append("file", file, file.name); // Assuming 'file' is the key for the file in your API

  const uploadFiles = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData, // Use the FormData object as the request body
  });

  return uploadFiles;
};
