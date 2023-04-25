import * as types from "./../types/types";

export const createNewProjectAction = (data) => ({
  payload: data,
  type: types.CREATE_NEW_PROJECT,
});
export const editProjectAction = (data) => ({
  payload: data,
  type: types.EDIT_PROJECT,
});
