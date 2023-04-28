import axios from "axios";
import * as types from "./../types/types";

export const getTasks = (PM) => async (dispatch) => {
  // let userName = sessionStorage.getItem("username");
  try {
    //here need to add url and pass PM name
    const res = await axios.get(
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/V1/MyTasks/Luca`
    );

    if (res?.data === null) {
      dispatch({
        type: types.GET_MY_TASKS_ERROR,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        dispatch({
          type: types.GET_MY_TASKS_SUCCESS,
          payload: res.data.ArtworkAgilityProjects,
        });
      } else {
        dispatch({
          type: types.GET_MY_TASKS_ERROR,
          payload: "Project not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: types.GET_MY_TASKS_ERROR, payload: err });
  }
};

export const getAllTasks = (userInformation) => async (dispatch) => {
  let region = userInformation?.region;
  let bu = userInformation?.bu;
  try {
    //here need to add url and pass PM name
    const res = await axios.get(
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/V1/AllTasks/${bu}/${region}`
    );

    if (res?.data === null) {
      dispatch({
        type: types.GET_ALL_TASKS_ERROR,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        dispatch({
          type: "GET_ALL_TASKS_SUCCESS",
          payload: res?.data?.ArtworkAgilityProjects,
        });
      } else {
        dispatch({
          type: "GET_ALL_TASKS_ERROR",
          payload: "Project not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: "GET_ALL_TASKS_ERROR", payload: err });
  }
};
