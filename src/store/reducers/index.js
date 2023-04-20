import { combineReducers } from "redux";
import ProjectReducer from "./ProjectReducer";
import projectSetup from "./projectSetup";
import user from "./user";

export default combineReducers({
  myProject: ProjectReducer,
  projectSetup,
  user,
});
