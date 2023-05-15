const initialState = {
  TaskDetailsData: null,
  loading: false,
  error: null,
};

const TaskDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TASK_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "GET_TASK_DETAILS_SUCCESS":
      return {
        ...state,
        TaskDetailsData: action.payload,
        loading: false,
        error: null,
      };
    case "GET_TASK_DETAILS_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default TaskDetailsReducer;
