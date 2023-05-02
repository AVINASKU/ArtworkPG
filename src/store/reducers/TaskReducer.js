const initialState = {
  myTasks: [],
  allTasks: [],
  loading: true,
  error: null,
};

const TaskReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_MY_TASKS_SUCCESS":
      return {
        ...state,
        myTasks: payload,
        loading: false,
        error: null,
      };

    case "GET_MY_TASKS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "GET_ALL_TASKS_SUCCESS":
      console.log(payload);
      return {
        ...state,
        allTasks: payload,
        loading: false,
        error: null,
      };

    case "GET_ALL_TASKS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default TaskReducer;
