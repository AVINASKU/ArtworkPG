import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.scss";
import Home from "./home";
import RoutesNav from "./routesNav";

function App() {
  App.getStoreState = () => {
    return store.getState();
  };

  App.dispatchToStore = (params) => {
    store.dispatch(params);
  };
  return (
    <div>
      <Provider store={store}>
        {/* <React.StrictMode> */}
          <BrowserRouter>
            <RoutesNav/>
            {/* <Home /> */}
          </BrowserRouter>
        {/* </React.StrictMode> */}
      </Provider>
    </div>
  );
}

export default App;

// import React, { useEffect } from "react";
// import { Provider } from "react-redux";
// import { store } from "./store/store";
// import { BrowserRouter } from "react-router-dom";
// import "./App.scss";
// import RoutesNav from "./routesNav";
// import axios from "axios";
// import {
//   getConfig,
//   setConfig,
//   setPGGlobalGroups,
//   setUser,
//   setUserGroups,
// } from "./store/actions/HomeActions";
// //react-cookies
// import { withCookies, CookiesProvider } from "react-cookie/cjs";
// import { connect } from "react-redux";
// // import ErrorPage from "./Error";
// import NotAuthorizedPage from "./NotAuthorizedPage";

// // import { useAzureAD, usePingID, logout } from "./components/Authentication";

// function App(props) {
//   const { cookies } = props;
//   // const { userInfo: aadUserInfo, accessToken } = useAzureAD();
//   // const { userInfo: pingIdUserInfo } = usePingID;

//   // useEffect(() => {
//   //   if (aadUserInfo && pingIdUserInfo) {
//   //     console.log(
//   //       "Both AAD and PingID authentication were successful. Performing SSO logic..."
//   //     );
//   //     // Perform the SSO logic, for example by storing the user information in local storage or making an API call to your backend to exchange the user information between the two systems.
//   //     // console.log("Hello", aadUserInfo.displayName);
//   //     // console.log("Your access token is", accessToken);
//   //   }
//   // }, [aadUserInfo, pingIdUserInfo]);

//   useEffect(() => {
//     getConfig();
//     // if (process.env.NODE_ENV === "production") {

//     getUserInfo();
//     // } else {
//     // getGroups([], true);
//     // setDevCookies();
//     // devSetUser();
//     // }
//   }, [getConfig]);

//   function getUserInfo() {
//     let url = window.location.href;
//     if (url.indexOf("error=") !== -1) return;

//     if (url.indexOf("code=") === -1) {
//       getAuthenticationUrl();
//     }

//     if (getCookieCount() === 0 || !cookiesAreSet()) {
//       url = window.location.href;
//       let code = url.split("code=");
//       if (code.length < 2) return;

//       getAccessToken(code[1]);
//     }
//   }
//   function getGroups(groups, dev = false) {
//     // setUserGroups(groups, groups);
//   }
//   // function setDevCookies() {
//   //   cookies.set("user", "6");
//   //   cookies.set("initials", "?");
//   //   cookies.set("userName", "icuser2.im");
//   // }

//   function devSetUser() {
//     setUser({ user: "6", userName: "icuser2.im" }); // icuser2
//   }

//   function getAuthenticationUrl() {
//     axios
//       .post(process.env.REACT_APP_PINGURL + "getAuthorizationUrl", {
//         applicationName: "AWM",
//       })

//       .then((res) => {
//         window.location.href = res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   function getAccessToken(code) {
//     axios
//       .post(process.env.REACT_APP_PINGURL + "getaccesstoken", {
//         code: code,
//         applicationName: "AWM",
//       })

//       .then((res) => {
//         console.log(res);
//         cookies.set("tokenNumber", res.data);
//         setUserInitialsAndName(
//           res.data.FirstName,
//           res.data.LastName,
//           res.data.Username
//         );
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   function setUserInitialsAndName(firstname, lastname, intranetid) {
//     //Intially set it to '?' in case there are any issues
//     cookies.set("initials", "?");
//     cookies.set("userName", null);

//     //Set user initials
//     let firstInitial = firstname.charAt();
//     let lastInitial = lastname.charAt();
//     if (firstInitial !== "" && lastInitial !== "") {
//       cookies.set("initials", firstInitial + lastInitial);
//     }

//     //Set user name
//     cookies.set("userName", `${intranetid}`);
//   }

//   function cookiesAreSet() {
//     const initials = cookies.get("initials");
//     const userName = cookies.get("userName");
//     console.log("initials : " + initials);
//     console.log("userName : " + userName);
//     if (
//       !initials ||
//       initials === "undefined" ||
//       !userName ||
//       userName === "undefined"
//     ) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   function getCookieCount() {
//     return Object.keys(cookies.getAll()).length;
//   }

//   function setContentOfPage() {
//     let url = window.location.href;

//     if (
//       (url.indexOf("code=") === -1 && url.indexOf("error=") === -1) ||
//       !cookiesAreSet()
//     ) {
//       console.log("inside if");
//       return null;
//     } else if (
//       url.indexOf("code=") === -1 &&
//       url.indexOf("error=") === -1 &&
//       getCookieCount() === 0
//     ) {
//       console.log("inside else if 1");
//       return <NotAuthorizedPage />;
//     } else if (url.indexOf("error=") !== -1 && !cookiesAreSet()) {
//       console.log("inside else if 2");
//       // return <ErrorPage />;
//     } else {
//       console.log("inside else ");
//       return setHomepageContent();
//     }
//   }

//   function setHomepageContent() {
//     return (
//       <div>
//         home page
//         {/* <RoutesNav /> */}
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* {process.env.NODE_ENV === "production"
//         ? setContentOfPage()
//         : setHomepageContent()} */}
//       {setContentOfPage()}
//     </div>
//   );

//   //   return (
//   //     <>
//   //       <CookiesProvider>
//   //         <Provider store={store}>
//   //           <React.StrictMode>
//   //             <BrowserRouter>
//   //               <RoutesNav />
//   //             </BrowserRouter>
//   //           </React.StrictMode>
//   //         </Provider>
//   //       </CookiesProvider>
//   //     </>
//   //   );
// }

// // export default App;

// const mapStateToProps = () => ({});

// const mapDispatchToProps = {
//   setUserGroups,
//   setUser,
//   getConfig,
// };

// const ConnectedApp = withCookies(
//   connect(mapStateToProps, mapDispatchToProps)(App)
// );

// const AppWithRedux = () => (
//   <Provider store={store}>
//     <ConnectedApp />
//   </Provider>
// );

// export default AppWithRedux;
