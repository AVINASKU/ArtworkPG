import * as types from "./../types/types";

const initialState = {
  myProject: [],
  allProjects: [],
  loading: true,
  error: null,
};

const ProjectReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PROJECT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case types.GET_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        myProject: payload,
        loading: false,
        error: null,
      };

    case types.GET_PROJECT_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.GET_ALL_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        allProjects: payload,
        loading: false,
        error: null,
      };

    case types.GET_ALL_PROJECT_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.UPDATE_PROJECT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default ProjectReducer;
