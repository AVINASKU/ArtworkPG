// import React from "react";
// import ReactDOM from "react-dom/client";
// import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
// import "primereact/resources/primereact.css"; // core css
// import "primeicons/primeicons.css";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { CookiesProvider } from "react-cookie";
// import { Provider } from "react-redux";
// import { store } from "./store/store";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <CookiesProvider>
//     <React.StrictMode>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </React.StrictMode>
//   </CookiesProvider>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(//console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom/client";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppWithRedux from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AppWithRedux />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
