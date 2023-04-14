const initialState = {
  myProject: [],
  loading: true,
  error: null,
  modalOpen: false,
};

const ProjectReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case "GET_MY_PROJECT_SUCCESS":
      return {
        ...state,
        myProject: action.myProject,
        loading: false,
        error: null,
      };

    case "GET_MY_PROJECT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      return { ...state, modalOpen: false };
    default:
      return state;
  }
};
export default ProjectReducer;
