const initialState = {
  accessMatrix: [],
  isLoading: false,
  error: null,
};

const accessMatrixReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ACCESS_MATRIX_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_ACCESS_MATRIX_SUCCESS":
      return {
        ...state,
        accessMatrix: action?.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_ACCESS_MATRIX_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default accessMatrixReducer;
