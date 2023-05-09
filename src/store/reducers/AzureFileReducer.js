const initialState = {
  uploading: false,
  uploadedUrl: null,
  error: null,
};

// Define your Redux reducer to handle the file upload process
const azureFileUpload = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_FILE_REQUEST":
      return { ...state, uploading: true, error: null };
    case "UPLOAD_FILE_SUCCESS":
      return { ...state, uploading: false, uploadedUrl: action.payload };
    case "UPLOAD_FILE_FAILURE":
      return { ...state, uploading: false, error: action.payload };
    default:
      return state;
  }
};
export default azureFileUpload;
