import axios from "axios";

// Define your Azure Blob Storage configuration variables here
const containerName = "awm";
const sasToken =
  "sp=racwdl&st=2023-07-25T13:01:05Z&se=2030-05-10T21:01:05Z&spr=https&sv=2022-11-02&sr=c&sig=%2BwjkJ%2Blc5a5xof7yezFyBnd6SPiB%2Bw9aXwhHl7Qwi18%3D";
const storageAccountName = "aacstrdev";
const baseUrl = `https://${storageAccountName}.blob.core.windows.net`;

// Define your Redux action types
export const DOWNLOAD_FILE_REQUEST = "DOWNLOAD_FILE_REQUEST";
export const DOWNLOAD_FILE_SUCCESS = "DOWNLOAD_FILE_SUCCESS";
export const DOWNLOAD_FILE_FAILURE = "DOWNLOAD_FILE_FAILURE";

// Define your Redux action creators
export const downloadFileRequest = () => ({
  type: DOWNLOAD_FILE_REQUEST,
});

export const downloadFileSuccess = () => ({
  type: DOWNLOAD_FILE_SUCCESS,
});

export const downloadFileFailure = (error) => ({
  type: DOWNLOAD_FILE_FAILURE,
  payload: error,
});

// Define your Redux async action creator
export const downloadFileAzure = (filePath) => {
  return async (dispatch) => {
    try {
      dispatch(downloadFileRequest());

      const downloadUrl = `${baseUrl}/${containerName}/${filePath}?${sasToken}`;

      const response = await axios.get(downloadUrl, {
        responseType: "blob",
      });

      const dispositionHeader = response.headers["content-disposition"];
      const filename = dispositionHeader
        ? dispositionHeader
            .split(";")
            .find((part) => part.trim().startsWith("filename="))
            .split("=")[1]
            .trim()
        : filePath.split("/").pop();

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      dispatch(downloadFileSuccess());
    } catch (error) {
      dispatch(downloadFileFailure(error.message));
    }
  };
};
