const initialState = {
  projects: [],
};

const projectSetup = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_NEW_PROJECT":
      return {
        ...state,
        projects: state.projects.push(action.payload),
      };
    case "EDIT_PROJECT":
      //write logic to update projects based on id
      // return {
      // ...state,
      // projects: state.projects.push(action.payload),
      // };
      return state;
    default:
      return state;
  }
};
export default projectSetup;
