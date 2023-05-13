import Api from "../../apis";

const baseURL =
  "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/TaskDetails";
//pass the taskID and projectId from the my tasks

export const getDefineCD = (taskID, projectId) => {
  return async (dispatch) => {
    dispatch({ type: "GET_DEFINE_CD_REQUEST" });
    try {
      const api = new Api();
      const axiosInstance = await api.init({
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
      });
      let apiURL = `${baseURL}/${taskID}/${projectId}`;
      const defineCD = await axiosInstance({
        url: apiURL,
        method: "GET",
      });
      dispatch({
        type: "GET_DEFINE_CD_SUCCESS",
        payload: defineCD?.data?.ArtworkAgilityTasks,
      });
    } catch (error) {
      dispatch({ type: "GET_DEFINE_CD_FAILURE", payload: error });
    }
  };
};
export const getConfirmCD = (taskID, projectId, headers) => {
  return async (dispatch) => {
    dispatch({ type: "GET_CONFIRM_CD_REQUEST" });
    try {
      const api = new Api();
      const axiosInstance = await api.init({ headers });
      let apiURL = `${baseURL}/${taskID}/${projectId}`;
      const defineCD = await axiosInstance({
        url: apiURL,
        method: "GET",
      });
      dispatch({
        type: "GET_CONFIRM_CD_SUCCESS",
        payload: defineCD?.data?.ArtworkAgilityTasks,
      });
    } catch (error) {
      dispatch({ type: "GET_CONFIRM_CD_FAILURE", payload: error });
    }
  };
};
export const saveDesignIntent = async (formData, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/UpdateDesignIntentJob`;
  const designIntent = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  console.log("response", designIntent, formData);

  return true;
};
