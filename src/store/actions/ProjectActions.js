import axios from "axios";
import * as types from "./../types/types";
import { DEVURL } from "../../apis/envUrl";
import _ from "lodash";

export const getMyProject = (userInformation) => async (dispatch) => {
  let PM = userInformation?.username;
  dispatch({ type: "GET_PROJECT_DETAILS_REQUEST" });
  try {
    //here need to add url and pass PM name
    const res = await axios.get(`${DEVURL}/myprojects/${PM}`);

    if (res?.data === null) {
      dispatch({
        type: types.GET_PROJECT_DETAILS_ERROR,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        const orderByData = _.orderBy(
          res.data.ArtworkAgilityProjects,
          ["Timestamp"],
          ["desc"]
        );
        dispatch({
          type: types.GET_PROJECT_DETAILS_SUCCESS,
          payload: orderByData,
        });
        dispatch({
          type: types.GET_OWNER_DETAILS_SUCCESS,
          payload: res?.data,
        });
        return orderByData;
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
    const res = await axios.get(`${DEVURL}/allprojects/Baby Care/Europe`);

    if (res?.data === null) {
      dispatch({
        type: types.GET_ALL_PROJECT_DETAILS_ERROR,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        const orderByData = _.orderBy(
          res.data.ArtworkAgilityProjects,
          ["Timestamp"],
          ["desc"]
        );
        dispatch({
          type: types.GET_ALL_PROJECT_DETAILS_SUCCESS,
          payload: orderByData,
        });
        dispatch({
          type: types.GET_OWNER_DETAILS_SUCCESS,
          payload: res?.data,
        });
        return orderByData;
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
