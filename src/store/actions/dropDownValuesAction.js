import Api from "../../apis";
import { DEVURL, SITURL, PRODURL } from "../../apis/envUrl";
//pass the taskID and projectId from the my tasks

export const getDropDownValues = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_DROPDOWN_VALUES_REQUEST" });
    try {
      const api = new Api();
      const axiosInstance = await api.init({
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
      });
      let apiURL = `${DEVURL}/fetchdropdownvalues`;
      const DropDownValuesData = await axiosInstance({
        url: apiURL,
        method: "GET",
      });

      // Sort the data in alphabetical order
      const sortedData = DropDownValuesData?.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      dispatch({
        type: "GET_DROPDOWN_VALUES_SUCCESS",
        payload: sortedData,
      });
    } catch (error) {
      dispatch({ type: "GET_DROPDOWN_VALUES_FAILURE", payload: error });
    }
  };
};
