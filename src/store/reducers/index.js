import { combineReducers } from "redux";
import ProjectReducer from "./ProjectReducer";
import ProjectSetupReducer from "./ProjectSetupReducer";
import TaskReducer from "./TaskReducer";
import user from "./user";

export default combineReducers({
  myProject: ProjectReducer,
  ProjectSetupReducer,
  TaskReducer,
  user,
});
