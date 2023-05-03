import { combineReducers } from "redux";
import ProjectReducer from "./ProjectReducer";
import ProjectPlanReducer from "./ProjectPlanReducer";
import ProjectSetupReducer from "./ProjectSetupReducer";
import TaskReducer from "./TaskReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  myProject: ProjectReducer,
  ProjectPlanReducer,
  ProjectSetupReducer,
  TaskReducer,
  UserReducer,
});
