
import Api from ".";
import App from "../App";
import {
  userUpdateAction,
  userProfileAction,
} from "../store/actions/userActions.js";
import { store } from "../store/store";
import { RoleUser } from "../userRole";
export const updateUser = async (username, password) => {
  const userInformation = getUserInformation(username, password);
  if (userInformation && Object.keys(userInformation).length > 0) {
    store.dispatch(userUpdateAction(userInformation));
  }
  return true;
};
export const updateUserProfile = async (roles, BusinessUnit, Regions) => {
  const userInformation = getUserProfile(roles, BusinessUnit, Regions);
  if (userInformation && Object.keys(userInformation).length > 0) {
    console.log(userInformation, "user");
    store.dispatch(userProfileAction(userInformation));
  }
  return true;
};
//session storage user name.and user id

const getUserInformation = (username, password) => {
  const user = RoleUser?.users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );
  if (user && user.password === password) {
    return {
      username: user.username,
      userid: user.userid,
      loginTime: new Date().toUTCString(),
    };
  } else {
    return {};
  }
};

const getUserProfile = (roles, BusinessUnit, Regions) => {
  if (roles && BusinessUnit && Regions) {
    return {
      role: roles,
      bu: BusinessUnit,
      region: Regions,
    };
  } else {
    return {};
  }
};
