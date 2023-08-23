import axios from "axios";
import * as types from "./../types/types";
import { DEVURL } from "../../apis/envUrl";

export const getDSBPDropdownData = (BU, Region, ProjectID) => async (dispatch) => {
  try {
    const res = await axios.get(`${DEVURL}/fetchDSBPID/${BU}/${Region}/${ProjectID}`);

    if (res?.data === null) {
      dispatch({
        type: types.GET_ALL_DSBP_DATA,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        //console.log("res.data", res.data.ArtworkAgilityTasks);
        dispatch({
          type: types.GET_ALL_DSBP_DATA,
          payload: res.data.ArtworkAgilityTasks,
        });
      } else {
        dispatch({
          type: types.GET_ALL_DSBP_DATA_ERROR,
          payload: "Data not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: types.GET_ALL_DSBP_DATA_ERROR, payload: err });
  }
};
