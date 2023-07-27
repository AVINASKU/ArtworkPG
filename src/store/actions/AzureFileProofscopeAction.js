import axios from "axios";
import { BlobServiceClient } from "@azure/storage-blob";

// Define your Azure Blob Storage configuration variables here
const containerName = "awm";
const sasToken =
  "sp=racwdli&st=2023-07-19T12:51:53Z&se=2030-02-28T20:51:53Z&spr=https&sv=2022-11-02&sr=c&sig=HWEkjoX4LLNWJy1YDtVdXT2brVZarQiAeu41v77E6yw%3D";
const storageAccountName = "aacstrdev";

// Create a BlobServiceClient instance using the configuration variables
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net?${sasToken}`;
const blobService = new BlobServiceClient(uploadUrl);
const containerClient = blobService.getContainerClient(containerName);

// Define your Redux action types
export const UPLOAD_FILE_PROOFSCOPE_REQUEST = "UPLOAD_FILE_PROOFSCOPE_REQUEST";
export const UPLOAD_FILE_PROOFSCOPE_SUCCESS = "UPLOAD_FILE_PROOFSCOPE_SUCCESS";
export const UPLOAD_FILE_PROOFSCOPE_FAILURE = "UPLOAD_FILE_PROOFSCOPE_FAILURE";

// Define your Redux action creators
export const uploadFileRequest = () => ({
  type: UPLOAD_FILE_PROOFSCOPE_REQUEST,
});

export const uploadFileSuccess = (urls) => ({
  type: UPLOAD_FILE_PROOFSCOPE_SUCCESS,
  payload: urls,
});

export const uploadFileFailure = (error) => ({
  type: UPLOAD_FILE_PROOFSCOPE_FAILURE,
  payload: error,
});

// Define your Redux async action creator
export const uploadProofscopeFileAzure = (folder, file, jobName) => {
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
          env = "DEV/";
          break;
        case "awflowqa.pg.com":
          env = "QA/";
          break;
        case "awflowsit.pg.com":
          env = "SIT/";
          break;
        default:
          env = "";
      }

      // Create a BlobClient for the file and set the content type
      const blobClient = containerClient.getBlockBlobClient(
        `${env}${folder}/${jobName}/${file.name}`
      );
      const options = {
        blobHTTPHeaders: { blobContentType: file.type },
      };
      const uploadUrl = blobClient.url;
      const contentLength = file.size.toString();

      await axios.put(
        uploadUrl,
        file,
        {
          headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Length": contentLength,
          },
        },
        options
      );
      // Construct the public URL for the uploaded file
      const publicUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${env}/${folder}/${jobName}/${file.name}`;
      // Dispatch the success action with the public URL
      dispatch(uploadFileSuccess([publicUrl]));
    } catch (error) {
      // Dispatch the failure action with the error message
      dispatch(uploadFileFailure(error.message));
    }
  };
};
