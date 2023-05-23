import Api from "../../apis";
import { DEVURL, SITURL, PRODURL } from "../../apis/envUrl";

export const DelegateAction = (formData) => {
  return async (dispatch) => {
    dispatch({ type: "POST_DELEGATE_REQUEST" });
    try {
      const api = new Api();
      const axiosInstance = await api.init({
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
      });
      let apiURL = `${DEVURL}/v1/DelegateTask`;

      const response = await axiosInstance.post(apiURL, formData);
      dispatch({
        type: "POST_DELEGATE_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: "POST_DELEGATE_FAILURE", payload: error });
    }
  };
};
