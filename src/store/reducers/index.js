import { combineReducers } from "redux";
import ProjectReducer from "./ProjectReducer";
import ProjectSetupReducer from "./ProjectSetupReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  myProject: ProjectReducer,
  ProjectSetupReducer,
  UserReducer,
});
