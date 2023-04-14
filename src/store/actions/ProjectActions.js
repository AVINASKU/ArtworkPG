import axios from "axios";

export const getMyProject = (PM) => async (dispatch) => {
  try {
    //here need to add url and pass PM name
    const res = await axios.get(
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/MyProjects/Hemant`
    );

    if (res?.data === null) {
      dispatch({
        type: "GET_PROJECT_DETAILS_ERROR",
        payload: "No records found",
      });
    } else {
      if (res.length > 0) {
        console.log("res data", res);
        // dispatch({
        //   type: "GET_PROJECT_DETAILS_SUCCESS",
        //   payload: res,
        // });
      } else {
        dispatch({
          type: "GET_PROJECT_DETAILS_ERROR",
          payload: "Project not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: "GET_PROJECT_DETAILS_ERROR", payload: err });
  }
};
