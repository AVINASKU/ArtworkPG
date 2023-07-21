import * as types from "../types/types";

const initialState = {
  dmTabValuesData: null,
  loading: false,
  error: null,
};

const DMTabValuesReducer = (state = initialState, action) => {
  // console.log("projectPlanReducer.action.payload: ", action);
  switch (action.type) {
    case types.UPDATE_DM_TAB_VALUES:
      return {
        ...state,
        dmTabValuesData: action.payload,
      };
    default:
      return state;
  }
};

export default DMTabValuesReducer;
