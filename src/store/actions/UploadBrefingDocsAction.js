import Api from "../../apis";
import { DEVURL, SITURL, PRODURL } from "../../apis/envUrl";
//pass the taskID and projectId from the my tasks

export const saveAsDraftUploadBrefingDocs = async (
  formData,
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  }
) => {
  console.log("formData SaveAsDraft:", formData);
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL;
  apiURL = `${DEVURL}/updateGABriefDocument`;
  // apiURL = `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/V1/UpdateGABreifdocument`;

  const saveAsDraftUploadBrefingDocsData = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });
  return saveAsDraftUploadBrefingDocsData;
};

export const deleteUploadBrefingDocs = async (
  formData,
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  }
) => {
  console.log("formData Delete:", formData);
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL;
  apiURL = `${DEVURL}/deleteGABriefdocument`;
  // apiURL = `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/V1/DeleteGABriefdocument`;

  const deleteUploadBrefingDocsData = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });
  return deleteUploadBrefingDocsData;
};

export const submitUploadBrefingDocs = async (
  formData,
  id,
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  }
) => {
  console.log("formData Submit:", formData);
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  // let apiURL = `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v2/assignments/ASSIGN-WORKLIST ${id}!UPLOADBRIEFINGDOCUMENTS_FLOW/actions/UploadBriefingDocuments`;

  let apiURL = `${DEVURL}/uploadBriefingDocuments/${id}`;

  const submitUploadBrefingDocsData = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });
  return submitUploadBrefingDocsData;
};
