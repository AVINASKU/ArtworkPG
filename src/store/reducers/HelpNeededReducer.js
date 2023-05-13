const initialState = {
  loading: false,
  error: null,
  success: false,
};

const helpNeededReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_HELP_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case "POST_HELP_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        data: action.payload,
      };
    case "POST_HELP_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default helpNeededReducer;
