import { accessMatrix } from "../../accessMatrix";

export const fetchAccessMatrix = () => async (dispatch) => {
  dispatch({ type: "FETCH_ACCESS_MATRIX_REQUEST" });

  try {
    const response = accessMatrix;
    dispatch({
      type: "FETCH_ACCESS_MATRIX_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "FETCH_ACCESS_MATRIX_FAILURE", payload: error.message });
  }
};
