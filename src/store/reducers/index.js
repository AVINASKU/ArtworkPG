import { combineReducers } from "redux";
import ProjectReducer from "./ProjectReducer";
import ProjectSetupReducer from "./ProjectSetupReducer";
import user from "./user";

export default combineReducers({
  myProject: ProjectReducer,
  ProjectSetupReducer,
  user,
});
