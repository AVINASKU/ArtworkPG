import Api from "../../apis";
import { DEVURL, SITURL, PRODURL } from "../../apis/envUrl";
//pass the taskID and projectId from the my tasks

export const getTaskDetails = (taskID, projectId) => {
  return async (dispatch) => {
    dispatch({ type: "GET_TASK_DETAILS_REQUEST" });
    try {
      const api = new Api();
      const axiosInstance = await api.init({
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
      });
      let apiURL = `${DEVURL}/v1/TaskDetails/${taskID}/${projectId}`;
      const TaskDetailsData = await axiosInstance({
        url: apiURL,
        method: "GET",
      });
      dispatch({
        type: "GET_TASK_DETAILS_SUCCESS",
        payload: TaskDetailsData?.data,
      });
    } catch (error) {
      dispatch({ type: "GET_TASK_DETAILS_FAILURE", payload: error });
    }
  };
};

export const saveDesignIntent = async (formData, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${DEVURL}/v1/TaskDetails/UpdateDesignIntentJob`;
  const designIntent = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  console.log("response", designIntent, formData);

  return true;
};
