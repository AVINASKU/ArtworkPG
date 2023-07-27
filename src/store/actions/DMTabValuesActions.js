import * as types from "../types/types";

export const DMTabValuesAction = (data) => ({
  payload: data,
  type: types.UPDATE_DM_TAB_VALUES,
});
export const DMTabAttributesAction = (data) => ({
  payload: data,
  type: types.UPDATE_DM_TAB_ATTRIBUTES,
});
