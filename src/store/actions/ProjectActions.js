import axios from "axios";

export const getMyProject = (PM) => async (dispatch) => {
  try {
    //here need to add url and pass PM name
    const res = await axios.get(
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/MyProjects/Luca`
    );

    if (res?.data === null) {
      dispatch({
        type: "GET_PROJECT_DETAILS_ERROR",
        payload: "No records found",
      });
    } else {
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

export const getAllProject = (PM) => async (dispatch) => {
  try {
    //here need to add url and pass PM name
    const res = await axios.get(
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/AllProjects/BABY/EUROPE ENTERPRISE`
    );

    if (res?.data === null) {
      dispatch({
        type: "GET_ALL_PROJECT_DETAILS_ERROR",
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        dispatch({
          type: "GET_ALL_PROJECT_DETAILS_SUCCESS",
          payload: res.data.ArtworkAgilityProjects,
        });
      } else {
        dispatch({
          type: "GET_ALL_PROJECT_DETAILS_ERROR",
          payload: "Project not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: "GET_ALL_PROJECT_DETAILS_ERROR", payload: err });
  }
};

// export const updateProject = (data) => async (dispatch) => {
//   try {
//     if (data) {
//       dispatch({
//         type: "UPDATE_PROJECT",
//         payload: data,
//       });
//     }
//   } catch (err) {
//     dispatch({ type: "UPDATE_PROJECT_ERROR", payload: err });
//   }
// };
