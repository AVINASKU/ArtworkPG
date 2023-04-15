import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.scss";
import Home from "./home";
import RoutesNav from "./routesNav";

function App() {
  return (
    <div>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <RoutesNav />
          {/* <Home /> */}
        </BrowserRouter>
      </React.StrictMode>
      </Provider>
    </div>
  );
}

export default App;
