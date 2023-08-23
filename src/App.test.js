import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App"; // Import the App component
import { store } from "./store/store";
import { fetchAccessMatrix } from "./store/actions/RoleBasedActions";
describe("App Component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
          <App />
      </Provider>
    );
    //screen.debug();

    expect(screen.getByRole('heading')).toHaveTextContent('Welcome!');
    expect(document.getElementById('formUsername')).toBeInTheDocument();
    expect(document.getElementById('formPassword')).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();

  });

  it("provides access to store state and dispatchToStore", () => {
    // Access store state and dispatchToStore methods from the App component
    const appInstance = render(
      <Provider store={store}>
          <App />
      </Provider>
    );
    

    // Dispatch action to the store
    const mockAction = { type: "FETCH_ACCESS_MATRIX_REQUEST" };
    store.dispatch(fetchAccessMatrix(mockAction));

    // Access store state
    const store_State = store.getState();
    console.log("store_State" + JSON.stringify(store_State));

    // You can add more assertions related to store actions if needed
  });

});
