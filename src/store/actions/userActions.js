import * as types from "../types/types";

export const userUpdateAction = (data) => ({
  payload: data,
  type: types.UPDATE_USER,
});

export const userProfileAction = (data) => {
  return {
    payload: data,
    type: types.USER_PROFILE_DATA,
  };
};
