import { combineReducers } from "redux";
import ProjectReducer from "./ProjectReducer";
import ProjectPlanReducer from "./ProjectPlanReducer";
import ProjectSetupReducer from "./ProjectSetupReducer";
import TaskReducer from "./TaskReducer";
import UserReducer from "./UserReducer";
import TaskDetailsReducer from "./TaskDetailsReducer";
import azureFileUpload from "./AzureFileReducer";
import delegateReducer from "./DelegateReducer";
import helpNeededReducer from "./HelpNeededReducer";
import DropDownValuesReducer from "./DropDownValuesReducer";
import accessMatrixReducer from "./RoleBasedReducer";
import ssoReducer from "./SSOReducer";
import DSBPDropdownReducer from "./DSBPReducer";
import ArtWorkTabValuesReducer from "./ArtWorkTabValuesReducer";
import DMTabValuesReducer from "./DMTabValuesReducer";

export default combineReducers({
  myProject: ProjectReducer,
  ProjectPlanReducer,
  ProjectSetupReducer,
  TaskReducer,
  UserReducer,
  TaskDetailsReducer,
  uploadedUrl: azureFileUpload,
  delegateReducer,
  helpNeededReducer,
  DropDownValuesReducer,
  accessMatrixReducer,
   ssoReducer,
   DSBPDropdownReducer,
   ArtWorkTabValuesReducer,
   DMTabValuesReducer
});
