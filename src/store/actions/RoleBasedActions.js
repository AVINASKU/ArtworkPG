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

export const fetchAccessRoles = () => async (dispatch) => {
  dispatch({ type: "FETCH_ACCESS_ROLES_REQUEST" });

  try {
    const roles = JSON.parse(localStorage.getItem("roles")); // Fetch roles from local storage
    const response = roles; // Use the fetched roles as the response

    dispatch({
      type: "FETCH_ACCESS_ROLES_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({ type: "FETCH_ACCESS_ROLES_FAILURE", payload: error.message });
  }
};
