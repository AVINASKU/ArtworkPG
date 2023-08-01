const initialState = {
  uploading: false,
  error: null,
  proofscope: false,
};

// Define your Redux reducer to handle the file upload process
const azureProofscopeFileUpload = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_FILE_PROOFSCOPE_REQUEST":
      return { ...state, uploading: true, error: null };
    case "UPLOAD_FILE_PROOFSCOPE_SUCCESS":
      return { ...state, uploading: false, proofscope: action.payload };
    case "UPLOAD_FILE_PROOFSCOPE_FAILURE":
      return { ...state, uploading: false, error: action.payload };
    default:
      return state;
  }
};
export default azureProofscopeFileUpload;
