import Api from ".";
import { DEVURL, SITURL, PRODURL } from "./envUrl";

export const submitUploadApproveDesignIntent = async (formData, id, headers = {}) => {
    const api = new Api();
    const axiosInstance = await api.init({ headers });
    let apiURL;
    //https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v2/assignments/ASSIGN-WORKLIST PG-AAS-WORK U-5708!UPLOADAPPROVEDESIGNINTENT_FLOW/actions/UploadApproveDesignIntent
    
    apiURL = `${DEVURL}/uploadApproveDesignIntent/${id}`;
  
    const submitUploadApproveDesignIntentData = await axiosInstance({
      url: apiURL,
      method: "PATCH",
      data: formData,
    });
    // if (submitUploadApproveDesignIntentData?.data?.ID) {
    //   App.dispatchToStore(editProjectAction(formData));
    // }
    return submitUploadApproveDesignIntentData;
  };

  export const submitUploadRegionalDesignIntent = async (formData, id, headers = {}) => {
    const api = new Api();
    const axiosInstance = await api.init({ headers });
    let apiURL;
    //https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v2/assignments/ASSIGN-WORKLIST PG-AAS-WORK U-5708!UPLOADAPPROVEDESIGNINTENT_FLOW/actions/UploadApproveDesignIntent
    
    apiURL = `${DEVURL}/v2/assignments/ASSIGN-WORKLIST ${id}!UPLOADREGIONALDESIGNTEMPLATE_FLOW/actions/UploadRegionalDesignTemplate`;
  
    const submitUploadRegionalDesignIntentData = await axiosInstance({
      url: apiURL,
      method: "PATCH",
      data: formData,
    });
    // if (submitUploadApproveDesignIntentData?.data?.ID) {
    //   App.dispatchToStore(editProjectAction(formData));
    // }
    return submitUploadRegionalDesignIntentData;
  };

  export const submitUploadProductionReadyArt = async (formData, id, headers = {}) => {
    const api = new Api();
    const axiosInstance = await api.init({ headers });
    let apiURL;
    
    apiURL = `${DEVURL}/uploadPRA/${id}`;
  
    const submitUploadProductionReadyArtData = await axiosInstance({
      url: apiURL,
      method: "PATCH",
      data: formData,
    });
    // if (submitUploadApproveDesignIntentData?.data?.ID) {
    //   App.dispatchToStore(editProjectAction(formData));
    // }
    return submitUploadProductionReadyArtData;
  };