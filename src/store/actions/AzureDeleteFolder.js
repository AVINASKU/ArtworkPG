// import axios from "axios";
// import {
//   BlobServiceClient,
//     StorageSharedKeyCredential,
// } from "@azure/storage-blob";

// // Define your Azure Blob Storage configuration variables here
// const containerName = "pgsource/ArtworkFolder";
// const storageAccountName = "artworkagilityadlsdev";
// const accountKey =
//   "7tkNRuehy0HLQ+Xi3UObCCsBYgw8tXuIQCC1KZhYiilMKRYi2IK8boZ6tc0C2wE4CaVgAAzehNXY+ASt6u+0rQ=="; // Replace with your actual storage account key

// // Create a StorageSharedKeyCredential with your account name and account key
// const sharedKeyCredential = new StorageSharedKeyCredential(
//   storageAccountName,
//   accountKey
// );

// // Create a BlobServiceClient instance using the shared key credential
// const blobServiceClient = new BlobServiceClient(
//   `https://${storageAccountName}.blob.core.windows.net`,
//   sharedKeyCredential
// );

// // Define your Redux action types
// export const DELETE_FOLDER_REQUEST = "DELETE_FOLDER_REQUEST";
// export const DELETE_FOLDER_SUCCESS = "DELETE_FOLDER_SUCCESS";
// export const DELETE_FOLDER_FAILURE = "DELETE_FOLDER_FAILURE";

// // Define your Redux action creators
// export const deleteFolderRequest = () => ({
//   type: DELETE_FOLDER_REQUEST,
// });

// export const deleteFolderSuccess = () => ({
//   type: DELETE_FOLDER_SUCCESS,
// });

// export const deleteFolderFailure = (error) => ({
//   type: DELETE_FOLDER_FAILURE,
//   payload: error,
// });

// // Define your Redux async action creator
// export const deleteAzureFolder = (
//   filePath,
//   ProjectID,
//   BU,
//   subFolder,
//   sequence
// ) => {
//   return async (dispatch) => {
//     try {
//       const url = window.location.href;
//       const domainRegex = /https?:\/\/([^/]+)\//; // Regular expression to match the domain part of the URL

//       const match = url.match(domainRegex);
//       let domain = "";

//       if (match && match.length > 1) {
//         domain = match[1]; // Extract the matched part
//       }

//       let env;

//       switch (domain) {
//         case "awflowdev.pg.com":
//           env = "DEV";
//           break;
//         case "awflowqa.pg.com":
//           env = "QA";
//           break;
//         case "awflowsit.pg.com":
//           env = "SIT";
//           break;
//         case "awflow.pg.com":
//           env = "";
//           break;
//         default:
//           env = "localEnv";
//       }
//       dispatch(deleteFolderRequest());

//       // Specify the path of the folder to delete, including container name and any subfolders
//       //   if (subFolder === "GA Briefs") {
//       const folderPath = `${domain}/${ProjectID}/${BU}/${subFolder}/${sequence}`;
//       // }
//       // Get a reference to the container
//       const containerClient =
//         blobServiceClient.getContainerClient(containerName);

//       // List all the blobs (files and subfolders) in the folder
//       for await (const blob of containerClient.listBlobsByHierarchy(
//         folderPath
//       )) {
//         // Delete each blob (file or subfolder) in the folder
//         await containerClient.getBlockBlobClient(blob.name).delete();
//       }

//       dispatch(deleteFolderSuccess());
//     } catch (error) {
//       dispatch(deleteFolderFailure(error.message));
//       return error.message;
//     }
//   };
// };
