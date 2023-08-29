// import axios from "axios";
// import {
//   BlobServiceClient,
//     // StorageSharedKeyCredential,
//     Credential
// } from "@azure/storage-blob";

// // Define your Azure Blob Storage configuration variables here
// const containerName = "pgsource/ArtworkFolder";
// const sasToken =
//   "sp=racwdlmeop&st=2023-07-12T07:02:49Z&se=2027-12-31T15:02:49Z&spr=https&sv=2022-11-02&sr=c&sig=aXX8yIkC7CdAuw65IeG8IcT7wb37BDtXu5CkcZyYc10%3D";
// const storageAccountName = "artworkagilityadlsdev";
// const baseUrl = `https://${storageAccountName}.blob.core.windows.net${sasToken}`;

// // Create a BlobServiceClient instance using the shared key credential
// const blobServiceClient = new BlobServiceClient(
//   `https://${storageAccountName}.blob.core.windows.net/pgsource`,
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
//   ProjectIdAndName,
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
//       const folderPath = `${domain}/${ProjectIdAndName}/${BU}/${subFolder}/${sequence}`;
//       // }
//       // Get a reference to the container
//       const containerClient =
//         blobServiceClient.getContainerClient(containerName);
//       console.log("containerClient:",blobServiceClient,containerClient);
//       // List all the blobs (files and subfolders) in the folder
//       for await (const blob of containerClient.listBlobsByHierarchy(
//         decodeURIComponent(folderPath)
//       )) {
//         console.log("blob:",blob);
//         // Delete each blob (file or subfolder) in the folder
//         // await containerClient.getBlockBlobClient(blob.name).delete();
//       }

//       dispatch(deleteFolderSuccess());
//     } catch (error) {
//       dispatch(deleteFolderFailure(error.message));
//       return error.message;
//     }
//   };
// };
