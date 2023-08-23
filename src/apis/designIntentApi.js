import Api from ".";
import { DEVURL, SITURL, PRODURL } from "./envUrl";
const baseURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1";

//pass the taskID and projectId from the my tasks
export const getDesignIntent = async (
  taskID,
  projectId,
  headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  }
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/TaskDetails/${taskID}/${projectId}`;
  const designIntent = await axiosInstance({
    url: apiURL,
    method: "GET",
  });

  return designIntent?.data;
};

export const saveDesignIntent = async (
  formData,
  headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  }
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/updatedesignintent`;
  //console.log("api url", apiURL);
  const designIntent = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  //console.log("response", designIntent, formData);

  return true;
};

export const submitDesignIntent = async (formData, id, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL;
  //https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v2/assignments/ASSIGN-WORKLIST PG-AAS-WORK D-111!DESIGNINTENT_FLOW/actions/DefineDesignIntent
  
  apiURL = `${DEVURL}/defineDesignIntent/${id}`;

  const submitDesignIntentData = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });
  // if (submitDesignIntentData?.data?.ID) {
  //   App.dispatchToStore(editProjectAction(formData));
  // }
  return submitDesignIntentData;
};
