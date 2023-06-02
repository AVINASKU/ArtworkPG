import axios from "axios";
import * as types from "./../types/types";
import { GETURL, DEVURL, SITURL, PRODURL } from "../../apis/envUrl";

export const getTasks = (userInformation) => async (dispatch) => {
  let userid = userInformation?.userid;
  // let userName = sessionStorage.getItem("username");
  try {
    //here need to add url and pass PM name
    const res = await axios.get(`${GETURL}/mytasks/${userid}`);

    if (res?.data === null) {
      dispatch({
        type: types.GET_MY_TASKS_ERROR,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        dispatch({
          type: types.GET_MY_TASKS_SUCCESS,
          payload: res?.data?.ArtworkAgilityTasks,
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
    const res = await axios.get(`${GETURL}/alltasks/${bu}/${region}`);

    if (res?.data === null) {
      dispatch({
        type: types.GET_ALL_TASKS_ERROR,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        dispatch({
          type: "GET_ALL_TASKS_SUCCESS",
          payload: res?.data?.ArtworkAgilityTasks,
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
