import axios from "axios";

export const getMyProject = (PM) => async (dispatch) => {
  try {
    //here need to add url and pass PM name
    const res = await axios.get(
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/MyProjects/Hemant`
    );
    
    console.log("response", res.data.ArtworkAgilityProjects.length);

    if (res?.data === null) {
      dispatch({
        type: "GET_PROJECT_DETAILS_ERROR",
        payload: "No records found",
      });
    } else {
    console.log("goes here anly", res.data.ArtworkAgilityProjects);
      if (res.status === 200) {
        dispatch({
          type: "GET_PROJECT_DETAILS_SUCCESS",
          payload: res.data.ArtworkAgilityProjects,
        });
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
