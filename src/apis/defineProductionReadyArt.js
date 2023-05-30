import Api from ".";
import { DEVURL, SITURL, PRODURL } from "./envUrl";

export const saveDefineProductionReadyArt = async (
  formData,
  headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  }
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/v1/UpdateProductionReadyArtJob`;
  console.log("api url", apiURL);
  const DefineProductionReadyArt = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  console.log("response", DefineProductionReadyArt, formData);

  return true;
};

export const submitDefineProductionReadyArt = async (formData, id, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL;
  //https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v2/assignments/ASSIGN-WORKLIST PG-AAS-WORK D-806!PRODUCTIONREADYART_FLOW/actions/DefineProductionReadyArt
  
  apiURL = `${DEVURL}/v2/assignments/ASSIGN-WORKLIST ${id}!PRODUCTIONREADYART_FLOW/actions/DefineProductionReadyArt`;

  const submitDefineProductionReadyArtData = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });
  // if (submitDesignIntentData?.data?.ID) {
  //   App.dispatchToStore(editProjectAction(formData));
  // }
  return submitDefineProductionReadyArtData;
};
