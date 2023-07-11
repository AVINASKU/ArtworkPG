import * as types from "../types/types";

const initialState = {
  userInformation: {},
  userProfile: {},
  userRole: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER:
      return {
        ...state,
        userInformation: action.payload,
      };

    // User Profile Data
    case types.USER_PROFILE_DATA:
      return {
        ...state,
        userProfile: action.payload || {},
        userRole: action.payload.user_role,
      };

    default:
      return state;
  }
};

export default UserReducer;
