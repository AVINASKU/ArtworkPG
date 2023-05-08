import * as types from "../types/types";

export const updateProjectPlanAction = (data) => ({
  payload: data,
  type: types.UPDATE_PROJECT_PLAN,
});

export const updateProjectPlanDesignAction = (data) => ({
  payload: data,
  type: types.UPDATE_PROJECT_PLAN_DESIGN,
});
