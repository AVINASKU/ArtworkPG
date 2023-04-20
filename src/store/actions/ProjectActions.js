import axios from "axios";
const sessionData = sessionStorage.getItem("session");

const sessionObj = JSON.parse(sessionData);

let PM = sessionObj?.username;
let region = sessionObj?.region;
let bu = sessionObj?.bu;

export const getMyProject = () => async (dispatch) => {
  try {
    //here need to add url and pass PM name
    const res = await axios.get(
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/MyProjects/${PM}`
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
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/AllProjects/${bu}/${region}`
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

export const updateProject = (data) => async (dispatch) => {
  try {
    if (data) {
      dispatch({
        type: "UPDATE_PROJECT",
        payload: data,
      });
    }
  } catch (err) {
    dispatch({ type: "UPDATE_PROJECT_ERROR", payload: err });
  }
};
