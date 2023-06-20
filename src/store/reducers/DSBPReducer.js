import * as types from "./../types/types";

const initialState = {
  DSBPDropdownData: [],
  loading: true,
  error: null,
};

const DSBPDropdownReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // case types.GET_DSBP_DETAILS_REQUEST:
    //   return { ...state, loading: true };
    case types.GET_ALL_DSBP_DATA:
      return {
        ...state,
        DSBPDropdownData: payload,
        loading: false,
        error: null,
      };

    case types.GET_ALL_DSBP_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default DSBPDropdownReducer;
