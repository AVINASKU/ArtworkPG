import Api from "../../apis";
import { DEVURL, SITURL, PRODURL } from "../../apis/envUrl";
//pass the taskID and projectId from the my tasks

// export const submitUploadApproveDesignIntent = async (
//   formData,
//   id,
//   headers = {}
// ) => {
//   const api = new Api();
//   const axiosInstance = await api.init({ headers });
//   let apiURL;
//   //https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v2/assignments/ASSIGN-WORKLIST PG-AAS-WORK U-5708!UPLOADAPPROVEDESIGNINTENT_FLOW/actions/UploadApproveDesignIntent

//   apiURL = `${DEVURL}/v2/assignments/ASSIGN-WORKLIST ${id}!UPLOADAPPROVEDESIGNINTENT_FLOW/actions/UploadApproveDesignIntent`;

//   const submitUploadApproveDesignIntentData = await axiosInstance({
//     url: apiURL,
//     method: "PATCH",
//     data: formData,
//   });
//   // if (submitUploadApproveDesignIntentData?.data?.ID) {
//   //   App.dispatchToStore(editProjectAction(formData));
//   // }
//   return submitUploadApproveDesignIntentData;
// };

// export const submitCPPFA = async (formData, id, headers = {}) => {
//   const api = new Api();
//   const axiosInstance = await api.init({ headers });
//   // let apiURL = `${DEVURL}/preliminaryPrintFeasibilityAssessment/${id}`;
//   let apiURL = `${DEVURL}/preliminaryPrintFeasibilityAssessment/${id}`;

//   const submitCPPFAData = await axiosInstance({
//     url: apiURL,
//     method: "PATCH",
//     data: formData,
//   });
//   return submitCPPFAData;
// };

// export const saveDesignIntent = async (formData, headers = {}) => {
//   const api = new Api();
//   const axiosInstance = await api.init({ headers });
//   let apiURL = `${DEVURL}/v1/TaskDetails/UpdateDesignIntentJob`;
//   const designIntent = await axiosInstance({
//     url: apiURL,
//     method: "POST",
//     data: formData,
//   });

//   console.log("response", designIntent, formData);

//   return true;
// };
