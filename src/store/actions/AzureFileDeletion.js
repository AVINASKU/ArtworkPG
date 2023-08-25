import axios from "axios";

// Define your Azure Blob Storage configuration variables here
const containerName = "pgsource/ArtworkFolder";
const sasToken =
  "sp=racwdlmeop&st=2023-07-12T07:02:49Z&se=2027-12-31T15:02:49Z&spr=https&sv=2022-11-02&sr=c&sig=aXX8yIkC7CdAuw65IeG8IcT7wb37BDtXu5CkcZyYc10%3D";
const storageAccountName = "artworkagilityadlsdev";
const baseUrl = `https://${storageAccountName}.blob.core.windows.net`;

// Define your Redux action types
export const DELETE_FILE_REQUEST = "DELETE_FILE_REQUEST";
export const DELETE_FILE_SUCCESS = "DELETE_FILE_SUCCESS";
export const DELETE_FILE_FAILURE = "DELETE_FILE_FAILURE";

// Define your Redux action creators
export const deleteFileRequest = () => ({
  type: DELETE_FILE_REQUEST,
});

export const deleteFileSuccess = () => ({
  type: DELETE_FILE_SUCCESS,
});

export const deleteFileFailure = (error) => ({
  type: DELETE_FILE_FAILURE,
  payload: error,
});

// Define your Redux async action creator
export const deleteAzureFile = (filePath, ProjectID, BU, subFolder) => {
  return async (dispatch) => {
    try {
      const url = window.location.href;
      const domainRegex = /https?:\/\/([^/]+)\//; // Regular expression to match the domain part of the URL

      const match = url.match(domainRegex);
      let domain = "";

      if (match && match.length > 1) {
        domain = match[1]; // Extract the matched part
      }

      let env;

      switch (domain) {
        case "awflowdev.pg.com":
          env = "DEV";
          break;
        case "awflowqa.pg.com":
          env = "QA";
          break;
        case "awflowsit.pg.com":
          env = "SIT";
          break;
        case "awflow.pg.com":
          env = "";
          break;
        default:
          env = "localEnv";
      }
      dispatch(deleteFileRequest());

      const deleteUrl = `${baseUrl}/${containerName}/${domain}/${ProjectID}/${BU}/${subFolder}/${filePath}?${sasToken}`;

      const response = await axios.delete(deleteUrl);

      if (response.status === 202) {
        dispatch(deleteFileSuccess());
      } else {
        throw new Error("Failed to delete the file.");
      }
    } catch (error) {
      dispatch(deleteFileFailure(error.message));
      return error.message;
    }
  };
};
