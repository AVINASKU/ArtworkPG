import axios from "axios";

// Define your Azure Blob Storage configuration variables here
const containerName = "ArtworkFolder";
const sasToken =
  "sp=racwdlmeop&st=2023-07-12T07:02:49Z&se=2027-12-31T15:02:49Z&spr=https&sv=2022-11-02&sr=c&sig=aXX8yIkC7CdAuw65IeG8IcT7wb37BDtXu5CkcZyYc10%3D";
const storageAccountName = "artworkagilityadlsdev";
const baseUrl = `https://${storageAccountName}.blob.core.windows.net/pgsource`;

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
  alert(filePath);
  const filenew = "121.jpg";
  return async (dispatch) => {
    try {
      dispatch(downloadFileRequest());

      const downloadUrl = `${baseUrl}/${containerName}/${filenew}?${sasToken}`;

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
        : filenew.split("/").pop();

      // Create the object URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element to enable downloading
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);

      // Trigger the click event on the link to initiate the download
      link.click();

      // Remove the temporary link element
      link.remove();

      // Revoke the object URL after the download is completed
      window.URL.revokeObjectURL(url);

      dispatch(downloadFileSuccess());
    } catch (error) {
      dispatch(downloadFileFailure(error.message));
    }
  };
};
