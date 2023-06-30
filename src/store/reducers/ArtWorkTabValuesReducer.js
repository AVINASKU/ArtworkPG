import * as types from "../types/types";

const initialState = {
  artWorkTabValuesData: null,
  loading: false,
  error: null,
};

const ArtWorkTabValuesReducer = (state = initialState, action) => {
  // console.log("projectPlanReducer.action.payload: ", action);
  switch (action.type) {
    case types.UPDATE_ARTWORK_TAB_VALUES:
      return {
        ...state,
        artWorkTabValuesData: action.payload,
      };
    default:
      return state;
  }
};

export default ArtWorkTabValuesReducer;
