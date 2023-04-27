import * as types from "../types/types";

export const userUpdateAction = (data) => ({
  payload: data,
  type: types.UPDATE_USER,
});

// For User Profile
export const userProfileAction = (data) => ({
  payload: data,
  type: types.USER_PROFILE_DATA,
});
