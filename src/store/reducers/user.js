const initialState = {
  userInformation: {},
  userProfile: {},
  userRole: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        userInformation: action.payload,
      };

    // User Profile Data
    case "USER_PROFILE_DATA":
      return {
        ...state,
        userProfile: action.payload.user_profile || {},
        userRole: action.payload.user_role,
      };

    default:
      return state;
  }
};

export default user;