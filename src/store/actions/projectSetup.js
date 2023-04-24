export const createNewProjectAction = (data) => ({
  payload: data,
  type: "CREATE_NEW_PROJECT",
});
export const editProjectAction = (data) => ({
  payload: data,
  type: "EDIT_PROJECT",
});

export const selectedProject = (data, rootBreadCrumb) => ({
  payload: data,
  type: "SELECTED_PROJECT",
  rootBreadCrumb: rootBreadCrumb
});
export const updateMode = (data) => ({
  payload: data,
  type: "UPDATE_MODE",
});
