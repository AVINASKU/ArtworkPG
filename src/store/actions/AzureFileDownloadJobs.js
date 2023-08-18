import axios from "axios";

// Define your Azure Blob Storage configuration variables here
const containerName = "pgsource/ArtworkFolder";
const sasToken =
  "sp=racwdlmeop&st=2023-07-12T07:02:49Z&se=2027-12-31T15:02:49Z&spr=https&sv=2022-11-02&sr=c&sig=aXX8yIkC7CdAuw65IeG8IcT7wb37BDtXu5CkcZyYc10%3D";
const storageAccountName = "artworkagilityadlsdev";
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
// ... (import statements and variable definitions)

// ... (import statements and variable definitions)

// ... (import statements and variable definitions)

// ... (import statements and variable definitions)

export const AzureFileDownloadJobs = (filePath, ProjectIdAndName, BU, subFolder) => {
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
      const downloadUrl = `${baseUrl}/${containerName}/${domain}/${ProjectIdAndName}/${BU}/${subFolder}/${filePath}?${sasToken}`;

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

      // Create a Blob from the response data
      const blob = new Blob([response.data]);

      // Determine the file extension
      const fileExtension = filename.split(".").pop().toLowerCase();

      // Determine the MIME type based on the file extension
      let mimeType = "application/octet-stream"; // Default MIME type

      if (fileExtension === "pdf") {
        mimeType = "application/pdf";
      } else if (fileExtension === "jpg" || fileExtension === "jpeg") {
        mimeType = "image/jpeg";
      } else if (fileExtension === "svg") {
        mimeType = "image/svg+xml";
      } // Check if the file is a PNG image
      else if (fileExtension === "png") {
        mimeType = "image/png";
      } else if (fileExtension === "docx") {
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }
      // Check if the file is a DOC document
      else if (fileExtension === "doc") {
        mimeType = "application/msword";
      } // Add more cases for other supported file types

      // Create a Blob URL with the correct MIME type
      const blobUrl = URL.createObjectURL(new Blob([blob], { type: mimeType }));

      // Open the Blob URL in a new tab
      window.open(blobUrl, "_blank");

      // Revoke the Blob URL when done
      URL.revokeObjectURL(blobUrl);
      dispatch({ type: "SET_BLOB_URL", payload: blobUrl });
      dispatch(downloadFileSuccess());
    } catch (error) {
      dispatch(downloadFileFailure(error.message));
      return error.message;
    }
  };
};
