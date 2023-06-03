import axios from "axios";
import * as types from "./../types/types";
import { GETURL, DEVURL } from "../../apis/envUrl";
import _ from "lodash";

export const getMyProject = (userInformation) => async (dispatch) => {
  let PM = userInformation?.username;

  try {
    //here need to add url and pass PM name
    const res = await axios.get(`${GETURL}/myprojects/${PM}`);

    if (res?.data === null) {
      dispatch({
        type: types.GET_PROJECT_DETAILS_ERROR,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        const orderByData = _.orderBy(res.data.ArtworkAgilityProjects, ['Timestamp'], ['desc'])
        dispatch({
          type: types.GET_PROJECT_DETAILS_SUCCESS,
          payload: orderByData,
        });
      } else {
        dispatch({
          type: types.GET_PROJECT_DETAILS_ERROR,
          payload: "Project not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: types.GET_PROJECT_DETAILS_ERROR, payload: err });
  }
};

export const getAllProject = (userInformation) => async (dispatch) => {
  let region = userInformation?.region;
  let bu = userInformation?.bu;
  try {
    //here need to add url and pass PM name
    const res = await axios.get(`${GETURL}/allprojects/${bu}/${region}`);

    if (res?.data === null) {
      dispatch({
        type: types.GET_ALL_PROJECT_DETAILS_ERROR,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        const orderByData = _.orderBy(res.data.ArtworkAgilityProjects, ['Timestamp'], ['desc'])
        dispatch({
          type: types.GET_ALL_PROJECT_DETAILS_SUCCESS,
          payload: orderByData,
        });
      } else {
        dispatch({
          type: types.GET_ALL_PROJECT_DETAILS_ERROR,
          payload: "Project not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: types.GET_ALL_PROJECT_DETAILS_ERROR, payload: err });
  }
};

// export const updateProject = (data) => async (dispatch) => {
//   try {
//     if (data) {
//       dispatch({
//         type: types.UPDATE_PROJECT,
//         payload: data,
//       });
//     }
//   } catch (err) {
//     dispatch({ type: types.UPDATE_PROJECT_ERROR, payload: err });
//   }
// };
