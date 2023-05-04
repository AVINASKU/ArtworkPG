import { combineReducers } from "redux";
import ProjectReducer from "./ProjectReducer";
import ProjectSetupReducer from "./ProjectSetupReducer";
import TaskReducer from "./TaskReducer";
import UserReducer from "./UserReducer";
import CDReducer from "./CDReducer";

export default combineReducers({
  myProject: ProjectReducer,
  ProjectSetupReducer,
  TaskReducer,
  UserReducer,
  CDReducer,
});
