import * as types from "../types/types";

const initialState = {
  projectPlan: [],
  loading: true,
  error: null,
  projectPlanDesign: [],
};

const projectPlanReducer = (state = initialState, action) => {
  // //console.log("projectPlanReducer.action.payload: ", action);
  switch (action.type) {
    case types.UPDATE_PROJECT_PLAN:
      return {
        ...state,
        projectPlan: action.payload,
        loading: false,
        error: null,
      };
    case types.UPDATE_PROJECT_PLAN_DESIGN:
      return {
        ...state,
        projectPlanDesign: action.payload,
      };
    default:
      return state;
  }
};
export default projectPlanReducer;
