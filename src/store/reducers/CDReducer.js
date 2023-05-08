const initialState = {
  defineCD: null,
  confirmCD: null,
  loading: false,
  error: null,
};

const CDReducer = (state = initialState, action) => {
  console.log("tstssss.........", action.payload);
  switch (action.type) {
    case "GET_DEFINE_CD_REQUEST":
      return { ...state, loading: true };
    case "GET_DEFINE_CD_SUCCESS":
      return {
        ...state,
        defineCD: action.payload,
        loading: false,
        error: null,
      };
    case "GET_DEFINE_CD_FAILURE":
      return { ...state, error: action.payload, loading: false };
    case "GET_CONFIRM_CD_REQUEST":
      return { ...state, loading: true };
    case "GET_CONFIRM_CD_SUCCESS":
      return {
        ...state,
        confirmCD: action.payload,
        loading: false,
        error: null,
      };
    case "GET_CONFIRM_CD_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default CDReducer;
