// import Api from ".";
// import App from "../App";
// import { userUpdateAction } from "../store/actions/userActions.js";
// import { store } from "../store/store";
// import { RoleUser } from "../userRole";

// export const updateUser = async (username, user) => {
//   debugger
//   const userInformation = GetUserInformation(username, user);
//   if (userInformation) {
//     store.dispatch(userUpdateAction(userInformation));
//   }
//   return true;
// };

// const GetUserInformation = (username, user) => {
//   debugger
//    if (user) {
//     return {
//     username: user[3],
//       role: user[0],
//       bu: user[1],
//       region: user[2],
//       userid: username,
//       loginTime: new Date().toUTCString(),
//     };
//  } else {
//      return {};
//    }
// };

// // export const updateUser = async (username) => {
// //   const userInformation = GetUserInformation();
// //   console.log(userInformation,"asha")
// //   if (userInformation) {
// //     store.dispatch(userUpdateAction(userInformation));
// //   }
// //   return true;
// // };
// // const GetUserInformation = () => {
// //   return {
// //     username: "pusan",
// //     role: "ProjectManager",
// //     bu: "FAB",
// //     region: "EUROPE",
// //     userid: "chatterjee.pc.2",
// //     loginTime: new Date().toUTCString(),
// //   };
// // };

// export const GetUserInfo = (username) => {
//   const user = RoleUser.users.find(
//     (u) => u.userid.toLowerCase() === username.toLowerCase()
//   );

//   if (user) {
//     return {
//       // username: user.userid,
//       // role: user.role,
//       // permissions: user.permissions,
//       // bu: user.bu,
//       // region: user.region,
//        username:"pusan",
//       role: "ProjectManager",

//       bu:"FAB",
//       region:"EUROPE",
//       userid: "chatterjee.pc.2",
//       loginTime: new Date().toUTCString(),
//     };
//   } else {
//     return {};
//   }
// };
import Api from ".";
import App from "../App";
import { userUpdateAction } from "../store/actions/userActions.js";
import { store } from "../store/store";
import { RoleUser } from "../userRole";
import { roles } from "../utils";
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
      role: roles,
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
