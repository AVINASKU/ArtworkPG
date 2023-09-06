import Api from ".";
import { AZUREURL, DEVURL } from "./envUrl";
import { getEnvironmentFromURL } from "../utils";

export const uploadtoAzurefileShare = async (
  file,
  Project,
  BU,
  subfolder,
  taskName,
  headers = {}
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL;
  const env = getEnvironmentFromURL();
  const folderStructer = `${env}/${Project}/${BU}/${subfolder}`;
  apiURL = `${AZUREURL}/create-or-update?name=${folderStructer}`;

  const formData = new FormData();
  formData.append("file", file, file.name); // Assuming 'file' is the key for the file in your API

  const uploadFiles = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData, // Use the FormData object as the request body
  });

  return uploadFiles;
};
