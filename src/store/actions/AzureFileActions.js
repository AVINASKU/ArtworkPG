import axios from "axios";
import { BlobServiceClient } from "@azure/storage-blob";

// Define your Azure Blob Storage configuration variables here
const containerName = "ArtworkFolder";
const sasToken =
  "sp=racwlmeop&st=2023-08-04T06:26:26Z&se=2031-01-31T14:26:26Z&spr=https&sv=2022-11-02&sr=d&sig=wjVbdxf2iif8%2BKrX81RUgWHIRgy2pYjaRmEb4OTKB%2F0%3D&sdd=1";
const storageAccountName = "artworkagilityadlsdev";

// Create a BlobServiceClient instance using the configuration variables
const uploadUrl = `https://artworkagilityadlsdev.blob.core.windows.net/pgsource?${sasToken}`;
const blobService = new BlobServiceClient(uploadUrl);
const containerClient = blobService.getContainerClient(containerName);
//"https://artworkagilityadlsdev.blob.core.windows.net/pgsource/ArtworkFolder/Artwork876.pdf?sp=racwdeop&st=2023-03-02T04:30:10Z&se=2023-03-03T12:30:10Z&spr=https&sv=2021-06-08&sr=d&sig=DwwtNfpHYrfBTK4UshoeaMaJHaS9HW1efob2ZfvufDQ%3D&sdd=1"
// Define your Redux action types
export const UPLOAD_FILE_REQUEST = "UPLOAD_FILE_REQUEST";
export const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
export const UPLOAD_FILE_FAILURE = "UPLOAD_FILE_FAILURE";

// Define your Redux action creators
export const uploadFileRequest = () => ({
  type: UPLOAD_FILE_REQUEST,
});

export const uploadFileSuccess = (url) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: url,
});

export const uploadFileFailure = (error) => ({
  type: UPLOAD_FILE_FAILURE,
  payload: error,
});

// Define your Redux async action creator
export const uploadFileAzure = (
  file,
  ProjectIdAndName,
  BU,
  subFolder,
  groupName,
  sequence
) => {
  console.log(file.type, "test");
  return async (dispatch) => {
    try {
      dispatch(uploadFileRequest());
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
      // Create a BlobClient for the file and set the content type
      let blobClient = containerClient.getBlockBlobClient(
        `${env}/${BU}/${ProjectIdAndName}/${subFolder}/${file.name}`
      );
      if (subFolder === "GA Briefs") {
        blobClient = containerClient.getBlockBlobClient(
          `${env}/${BU}/${ProjectIdAndName}/${subFolder}/${groupName}/${sequence}/${file.name}`
        );
      }

      const options = {
        blobHTTPHeaders: { blobContentType: file.type },
      };
      const uploadUrl = blobClient.url;
      const formattedDate = new Date().toUTCString();
      const contentLength = file.size.toString();
      const response = await axios.put(
        uploadUrl,
        file,
        {
          headers: {
            "x-ms-blob-type": "BlockBlob",
            // "x-ms-date": formattedDate,
            // "x-ms-version": "2021-06-08",
            // "Content-Type": "x-ms-blob-content-type",
            "Content-Length": contentLength,
          },
        },
        options
      );

      // Construct the public URL for the uploaded file
      let publicUrl = `https://${storageAccountName}.blob.core.windows.net/pgsource/${containerName}/${env}/${BU}/${ProjectIdAndName}/${subFolder}/${file.name}`;
      if (subFolder === "GA Briefs") {
        publicUrl = `https://${storageAccountName}.blob.core.windows.net/pgsource/${containerName}/${env}/${BU}/${ProjectIdAndName}/${subFolder}/${groupName}/${sequence}/${file.name}`;
      }

      // Dispatch the success action with the public URL.
      dispatch(uploadFileSuccess(publicUrl));
    } catch (error) {
      // Dispatch the failure action with the error message
      dispatch(uploadFileFailure(error.message));
    }
  };
};
