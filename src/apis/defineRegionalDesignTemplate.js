import Api from ".";
import { DEVURL, SITURL, PRODURL } from "./envUrl";

export const saveDefineRegionalDesignTemplate = async (
  formData,
  headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  }
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/v1/UpdateDesignTemplateJob`;
  const defineRegionalDesignTemplate = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  console.log("response", defineRegionalDesignTemplate);

  return true;
};

export const submitDefineRegionalDesignTemplate = async (formData, id, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL;
  //https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v2/assignments/ASSIGN-WORKLIST PG-AAS-WORK D-852!DEFINEREGIONALDESIGNTEMPLATE_FLOW/actions/DesignTemplate
  
  apiURL = `${DEVURL}/v2/assignments/ASSIGN-WORKLIST ${id}!DEFINEREGIONALDESIGNTEMPLATE_FLOW/actions/DesignTemplate`;

  const submitDefineRegionalDesignTemplateData = await axiosInstance({
    url: apiURL,
    method: "PATCH",
    data: formData,
  });
  
  return submitDefineRegionalDesignTemplateData;
};
