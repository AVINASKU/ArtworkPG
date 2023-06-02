const initialState = {
  DropDownValuesData: null,
  loading: false,
  error: null,
};

const DropDownValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DROPDOWN_VALUES_REQUEST":
      return { ...state, loading: true };
    case "GET_DROPDOWN_VALUES_SUCCESS":
      return {
        ...state,
        DropDownValuesData: action.payload,
        loading: false,
        error: null,
      };
    case "GET_DROPDOWN_VALUES_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default DropDownValuesReducer;
