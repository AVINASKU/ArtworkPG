import Api from "../../apis";
const baseURL = "http://localhost:3001/data";

//pass the taskID and projectId from the my tasks

export const getDefineCD = (taskID, projectId, headers) => {
  return async (dispatch) => {
    dispatch({ type: "GET_DEFINE_CD_REQUEST" });
    try {
      const api = new Api();
      const axiosInstance = await api.init({ headers });
      let apiURL = `${baseURL}`;
      const defineCD = await axiosInstance({
        url: apiURL,
        method: "GET",
      });
      dispatch({
        type: "GET_DEFINE_CD_SUCCESS",
        payload: defineCD?.data[0],
      });
    } catch (error) {
      dispatch({ type: "GET_DEFINE_CD_FAILURE", payload: error });
    }
  };
};

export const saveDesignIntent = async (formData, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/UpdateDesignIntentJob`;
  console.log("api url", apiURL);
  const designIntent = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  console.log("response", designIntent, formData);

  return true;
};
