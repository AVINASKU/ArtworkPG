// Define your Redux action types
export const DOWNLOAD_FILE_REQUEST = "DOWNLOAD_FILE_REQUEST";
export const DOWNLOAD_FILE_SUCCESS = "DOWNLOAD_FILE_SUCCESS";
export const DOWNLOAD_FILE_FAILURE = "DOWNLOAD_FILE_FAILURE";

// Define the initial state for the file download
const initialState = {
  loading: false,
  error: null,
};

// Define the reducer function for file download
const azureDownloadFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_FILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DOWNLOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default azureDownloadFileReducer;
