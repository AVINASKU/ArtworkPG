import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.scss";
import Home from "./home";
import RoutesNav from "./routesNav";
import { AuthProvider } from "./Context/AuthProvider";

function App() {
  App.getStoreState = () => {
    return store.getState();
  };

  App.dispatchToStore = (params) => {
    store.dispatch(params);
  };
  // console.log("AuthContext", AuthProvider)
  return (
    <div>
      <Provider store={store}>
        {/* <React.StrictMode> */}
        <BrowserRouter>
          <AuthProvider>
            <RoutesNav />
            {/* <Home /> */}
          </AuthProvider>
        </BrowserRouter>
        {/* </React.StrictMode> */}
      </Provider>
    </div>
  );
}

export default App;

