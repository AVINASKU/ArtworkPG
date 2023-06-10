// userReducer.js

const initialState = {
  loading: false,
  ssoUser: null,
  error: "",
};

const ssoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_DETAILS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_USER_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        ssoUser: action.payload,
      };
    case "FETCH_USER_DETAILS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ssoReducer;
