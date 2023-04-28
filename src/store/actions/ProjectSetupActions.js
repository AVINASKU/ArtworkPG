import * as types from "../types/types";

export const createNewProjectAction = (data) => ({
  payload: data,
  type: types.CREATE_NEW_PROJECT,
});
export const editProjectAction = (data) => ({
  payload: data,
  type: types.EDIT_PROJECT,
});

export const selectedProject = (data, rootBreadCrumb) => ({
  payload: data,
  type: types.SELECTED_PROJECT,
  rootBreadCrumb: rootBreadCrumb,
});
export const updateMode = (data) => ({
  payload: data,
  type: types.UPDATE_MODE,
});
