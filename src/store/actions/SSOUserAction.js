// userActions.js
import axios from "axios";
export const getSSOUser = (operatorId) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_USER_DETAILS_REQUEST" });
    try {
      const response = await axios.get(
        //`https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/V1/GetUserDetails/chatterjee.pc.2`
        `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/V1/GetUserDetails/${operatorId}`
      );
      const userDetails = response.data?.ArtworkAgilityPage;

      dispatch({
        type: "FETCH_USER_DETAILS_SUCCESS",
        payload: { userDetails },
      });
    } catch (error) {
      dispatch({ type: "FETCH_USER_DETAILS_FAILURE", payload: error.message });
    }
  };
};
