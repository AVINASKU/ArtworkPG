import Api from ".";
import App from "../App";
import { userUpdateAction } from "../store/actions/userActions.js";
import { store } from "../store/store";
import { RoleUser } from "../userRole";

export const updateUser = async (username, password) => {
  const userInformation = getUserInformation(username, password);
  if (userInformation) {
    store.dispatch(userUpdateAction(userInformation));
  }
  return true;
};

const getUserInformation = (username, password) => {
  const user = RoleUser.users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );

  if (user && user.password === password) {
    return {
      username: user.username,
      role: user.role,
      permissions: user.permissions,
      bu: user.bu,
      region: user.region,
      userid: user.userid,
      loginTime: new Date().toUTCString(),
    };
  } else {
    return {};
  }
};
