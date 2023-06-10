// import React, {
//   useEffect,
//   useCallback,
//   useState,
//   useRef,
//   intervalRef,
// } from "react";
// import { Provider } from "react-redux";
// //import store from "./store/store";
// import { BrowserRouter } from "react-router-dom";
// import RoutesNav from "./routesNav";
// import "./App.scss";
// // import RoutesNav from "./routesNav";
// import axios from "axios";
// //react-cookies
// import { withCookies } from "react-cookie/cjs";
// import { connect } from "react-redux";
// // import ErrorPage from "./Error";
// import NotAuthorizedPage from "./NotAuthorizedPage";
// import jwt_decode from "jwt-decode";

// const OAUTH_STATE_KEY = "react-use-oauth2-state-key";
// const OAUTH_RESPONSE = "react-use-oauth2-response";

// function App(props) {
//   const { cookies } = props;
//   const {
//     authorizeUrl = "https://fedauthtst.pg.com/as/authorization.oauth2",
//     clientId = "9163df31-95ba-488c-ad09-d989c8d1e8ea",
//     redirectUri = "https://awflowdev.pg.com",
//     scope = "",
//     grant_type = "authorization_code",
//   } = props;

//   const popupRef = useRef();
//   const [{ loading, error }, setUI] = useState({ loading: false, error: null });

//   useEffect(() => {
//     // debugger;
//     getUserInfo();

//     // if (process.env.NODE_ENV === "production") {
//     //   getUserInfo();
//     // } else {
//     //   setDevCookies();
//     //   devSetUser();
//     // }

//     // }, [getAuth]);
//   }, []);

//   // function setDevCookies() {
//   //   cookies.set("user", "58");
//   //   cookies.set("initials", "?");
//   //   cookies.set("userName", "yadav.r.14");
//   // }

//   // function devSetUser() {
//   //   setUser({ user: "58", userName: "yadav.r.14" }); // icuser2
//   // }

//   const clearCookie = () => {
//     cookies.remove("tokenNumber");
//     cookies.remove("initials");
//     cookies.remove("userName");
//     cookies.remove("userInfo");

//     console.log("Token number cookie cleared.");
//   };

//   const queryToObject = (query) => {
//     const parameters = new URLSearchParams(query);
//     return Object.fromEntries(parameters.entries());
//   };

//   function JWTDecoder({ token }) {
//     // Decode the JWT token
//     const decodedToken = jwt_decode(token);
//     return decodedToken;
//   }
//   const redirectURL = (url) => {
//     //return window.location.href = url;
//     return window.open(url, "_self");
//   };

//   const enhanceAuthorizeUrl = (
//     authorizeUrl,
//     clientId,
//     redirectUri,
//     grant_type
//   ) => {
//     return `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_url=${redirectUri}&grant_type=${grant_type}`;
//   };

//   const objectToQuery = (object) => {
//     return new URLSearchParams(object).toString();
//   };

//   const generateState = () => {
//     const validChars =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let array = new Uint8Array(40);
//     window.crypto.getRandomValues(array);
//     array = array.map((x) => validChars.codePointAt(x % validChars.length));
//     const randomState = String.fromCharCode.apply(null, array);
//     return randomState;
//   };

//   const saveState = (state) => {
//     sessionStorage.setItem(OAUTH_STATE_KEY, state);
//   };

//   const removeState = () => {
//     sessionStorage.removeItem(OAUTH_STATE_KEY);
//   };

//   function getAuthenticationUrl() {
//     redirectURL(
//       enhanceAuthorizeUrl(authorizeUrl, clientId, redirectUri, grant_type)
//     );
//   }

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
//     // else
//     // {clearCookie();}
//   }

//   function getCookieCount() {
//     return Object.keys(cookies.getAll()).length;
//   }

//   function setUserInitialsAndName(
//     firstname,
//     lastname,
//     intranetid,
//     region,
//     userId
//   ) {
//     //Intially set it to '?' in case there are any issues
//     cookies.set("initials", "?");
//     cookies.set("userName", null);
//     cookies.set("userId", null);
//     cookies.set("region", null);
//     //Set user initials
//     let firstInitial = firstname.charAt();
//     let lastInitial = lastname.charAt();

//     if (firstInitial !== "" && lastInitial !== "") {
//       cookies.set("initials", firstInitial + lastInitial);
//     }

//     //Set user name
//     cookies.set("userName", `${intranetid}`);
//     cookies.set("FirstName", `${firstname}`);
//     cookies.set("LastName", `${lastname}`);
//     cookies.set("userId", `${userId}`);
//     cookies.set("region", `${region}`);
//   }

//   function cookiesAreSet() {
//     const initials = cookies.get("initials");
//     const userName = cookies.get("userName");
//     const region = cookies.get("region");
//     const userId = cookies.get("userId");
//     if (
//       !initials ||
//       initials === "undefined" ||
//       !userName ||
//       userName === "undefined" ||
//       !region ||
//       region === "undefined" ||
//       !userId ||
//       userId === "undefined"
//     ) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   async function getAccessToken(code) {
//     // debugger;
//     const data = new URLSearchParams();
//     data.append("client_id", clientId);
//     data.append("code", code);
//     data.append("redirect_uri", redirectUri);
//     data.append("grant_type", "authorization_code");
//     data.append(
//       "client_secret",
//       "xkN4xZgWQeJFoNYs4d5L0pHUOCBXcW65VkN09MkSkDUDTd16Cz4KfU5DWf0upMLT"
//     );

//     const response = await fetch("https://fedauthtst.pg.com/as/token.oauth2", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: data.toString(),
//     });
//     if (!response.ok) {
//       console.log("Failed to exchange code for token");
//     } else {
//       const payload = await response.json();
//       console.log("payload : " + payload);
//       cookies.set("tokenNumber", payload.access_token);
//       const token = payload.access_token;
//       const decodedToken = JWTDecoder({ token });
//       console.log("decodedToken : " + decodedToken);
//       cookies.set("userInfo", decodedToken);
//       setUserInitialsAndName(
//         decodedToken.FirstName,
//         decodedToken.LastName,
//         decodedToken.Username,
//         decodedToken.Region,
//         decodedToken["User id"]
//       );
//       clearCodeQueryParam();
//     }
//   }
//   function clearCodeQueryParam() {
//     const { location } = history;
//     if (location) {
//       const searchParams = new URLSearchParams(location.search);
//       if (searchParams) {
//         searchParams.delete("code");
//         history.replace({ search: searchParams.toString() });
//         const newUrl =
//           window.location.pathname +
//           searchParams.toString() +
//           window.location.hash;
//         window.history.replaceState({}, "", newUrl);
//       }
//     }
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
//     const username = cookies.get("userName");
//     return (
//       <React.StrictMode>
//         <BrowserRouter>
//           <RoutesNav username="chatterjee.pc.2@pg.com" firstName="pusan" />
//         </BrowserRouter>
//       </React.StrictMode>
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
// }

// export default withCookies(App);

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
          <RoutesNav />
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
