const initialState = {
  myProject: [],
  allProjects: [],
  loading: true,
  error: null,
};

const ProjectReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_PROJECT_DETAILS_SUCCESS":
      return {
        ...state,
        myProject: payload,
        loading: false,
        error: null,
      };

    case "GET_PROJECT_DETAILS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "GET_ALL_PROJECT_DETAILS_SUCCESS":
      return {
        ...state,
        allProjects: payload,
        loading: false,
        error: null,
      };

    case "GET_ALL_PROJECT_DETAILS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_PROJECT":
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default ProjectReducer;
