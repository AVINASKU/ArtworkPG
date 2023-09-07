import React from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.scss";
import RoutesNav from "./routesNav";
import { AuthProvider } from "./Context/AuthProvider";
import PageLayout from "./components/PageLayout";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Login from "./login";

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
          <AuthProvider userRole={false}>
            <ThemeProvider
              breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
              minBreakpoint="xxs">
              {/* <Login /> */}
              {/* <RoutesNav /> */}
              <PageLayout />
             
              {/* <Outlet /> */}
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>
        {/* </React.StrictMode> */}
      </Provider>
    </div>
  );
}

export default App;
