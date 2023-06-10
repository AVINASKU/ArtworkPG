import Api from "../../apis";
import { DEVURL, SITURL, PRODURL } from "../../apis/envUrl";

export const HelpNeededAction = (formData) => {
  return async (dispatch) => {
    dispatch({ type: "POST_HELP_REQUEST" });
    try {
      const api = new Api();
      const axiosInstance = await api.init({
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
      });
      let apiURL = `${DEVURL}/helpneeded`;

      const response = await axiosInstance.post(apiURL, formData);
      dispatch({
        type: "POST_HELP_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: "POST_HELP_FAILURE", payload: error });
    }
  };
};
