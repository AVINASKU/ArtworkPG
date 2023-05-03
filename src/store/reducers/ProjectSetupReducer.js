import * as types from "../types/types";

const initialState = {
  projects: [],
  selectedProject: {},
  mode: "",
  rootBreadCrumb: "MyProjects",
};

const projectSetup = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_NEW_PROJECT:
      // return {
      //   ...state,
      //   projects: state.projects.push(action.payload),
      // };
      return state;
    case types.EDIT_PROJECT:
      //write logic to update projects based on id
      // return {
      // ...state,
      // projects: state.projects.push(action.payload),
      // };
      return state;
    case types.SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: action.payload,
        mode: getProjectMode(action.payload),
        rootBreadCrumb: action.rootBreadCrumb,
      };
    case types.UPDATE_MODE:
      return {
        ...state,
        mode: action.payload,
        rootBreadCrumb: "MyProjects",
      };
    default:
      return state;
  }
};
export default projectSetup;

const getProjectMode = (payload) => {
  if (
    payload["Project_Name"] &&
    payload["BU"] &&
    payload["Artwork_Brand"]?.length &&
    payload["Project_region"] &&
    payload["Artwork_SMO"]?.length &&
    payload["Estimated_AW_Printer"] &&
    payload["Estimated_AW_Readiness"]
  ) {
    return "design";
  } else {
    return "edit";
  }
};
