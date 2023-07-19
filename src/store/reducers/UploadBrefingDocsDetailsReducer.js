const initialState = {
  UploadBrefingDocsDetailsData: null,
  loading: false,
  error: null,
};

const UploadBrefingDocsDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_UPLOAD_BREFING_DOCS_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "GET_UPLOAD_BREFING_DOCS_DETAILS_SUCCESS":
      return {
        ...state,
        UploadBrefingDocsDetailsData: action.payload,
        loading: false,
        error: null,
      };
    case "GET_UPLOAD_BREFING_DOCS_DETAILS_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default UploadBrefingDocsDetailsReducer;
