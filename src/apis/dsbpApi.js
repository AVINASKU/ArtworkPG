import Api from ".";
import { DEVURL } from "./envUrl";

export const addDsbpToProject = async (
  projectId,
  InitiativeID,
  headers = {}
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/addDsbptoproject/${projectId}/${InitiativeID}`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
  });
  console.log("Hello hello ----->", addResponse);
  return addResponse;
};

//Here is code repetation but lets seperate this two API's

export const deleteDsbpFromProject = async (
  projectId,
  InitiativeID,
  headers = {}
) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/deleteDsbp/${projectId}/${InitiativeID}`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
  });
  console.log("Hello hello ----->", addResponse);
  return addResponse;
};

export const getDsbpPMPDetails = async (projectId, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/getDSBPPMPDetails/${projectId}`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "GET",
  });
  let response = addResponse?.data?.DSBPDetails?.DSBP_InitiativeIDPage;
  let filteredResp = [];
  // If initiative id is mapped to project but don't have an data against with initiative
  //id in brain then pega team is sending only initiative id
  // Below code we need to remove once pega team fix this issue
  if (response) {
    filteredResp = response.filter(
      (ele) => ele.DSBP_InitiativeID && ele.DSBP_PMP_PIMaterialIDPage
    );
  }

  return filteredResp;
};

export const onSubmitDsbpAction = async (formData, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/updatePMP`;
  // let apiURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/V1/UpdatePMP";
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });
  return addResponse;
};

export const onSubmitCreatePOAA = async (formData, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/createPOA`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });
  console.log("Hello hello ----->", addResponse);
  return addResponse?.data?.PMPList;
};

export const getDependencyMappingDetails = async (projectId, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/getDependencyMappingDetails/${projectId}`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "GET",
  });
  let response = addResponse?.data?.DSBPDetails;
  console.log("response dependency mapping ----->", response, addResponse);
  const dependencyTableData =
    response?.DSBP_InitiativeIDPage?.[0]?.DSBP_PMP_PIMaterialIDPage;

  // const isRDTData = response?.AWM_RDT_Page;
  const isRDTData = response?.AWM_RDT_Page;
  const isIQData = response?.AWM_IQ_Page;
  const isCDPTData = response?.AWM_CDPT_Page;
  const isGABrifData = response?.DSBP_GABrief_Page;
  return { dependencyTableData, isRDTData, isIQData, isCDPTData, isGABrifData };
};

export const onSubmitDependencyMappingAction = async (
  formData,
  projectId,
  headers = {}
) => {
  const api = new Api();
  // let projectId = "A-2002";
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/storeDependencyMappingDetails/${projectId}`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });
  console.log("Add response ----->", addResponse);
  return addResponse;
};

export const handleConfirmFullScopeIn = async (projectId, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/confirmFullScopeIn/${projectId}`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
  });
  console.log("Hello hello ----->", addResponse);
  return addResponse;
};

export const createNewGaBriefTask = async (formData, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/createGABriefTask`;
  const addResponse = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });
  console.log("Add response ----->", addResponse);
  return addResponse;
};
