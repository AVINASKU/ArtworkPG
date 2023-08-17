import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getMockStore, history } from './Mock';
import App from "./App"; // Import the App component
//import { store } from "./store/store";

const store = getMockStore({
  UserReducer: {
    userInformation: {
      role: "user", // Set the role here as needed
    },userProfile:{},userRole:[]
  },
  accessMatrixReducer: {
    accessMatrix: [
      {
        role: "ProjectManager",
        pages: [
          {
            name: "myProjects",
            path: "/myProjects",
            access: ["Read", "Write", "Edit", "Delete"],
          },
          {
            name: "allProjects",
            path: "/allProjects",
            access: ["Read", "Write", "Edit", "Delete"],
          },]
        }]
  }, accessRoles :[],isLoading : false
});

describe("App Component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
          <App />
      </Provider>
    );

    // Ensure that certain elements are rendered
    //expect(screen.getAllByRole("routes-nav")).toBeInTheDocument();
    // Add more assertions as needed
  });

  it("provides access to store state and dispatchToStore", () => {
    // Access store state and dispatchToStore methods from the App component
    const appInstance = render(
      <Provider store={store}>
          <App />
      </Provider>
    );

    if(appInstance.container.__reactContainer$ !== undefined)
    {
    // Access store state
    const storeState = appInstance.container.__reactContainer$.$app.getStoreState();
    // Test store state properties
    expect(storeState).toEqual(expect.objectContaining({
      // Add properties to match your store state structure
    }));

    // Dispatch action to the store
    const mockAction = { type: "MOCK_ACTION" };
    appInstance.container.__reactContainer$.$app.dispatchToStore(mockAction);
  }
    // You can add more assertions related to store actions if needed
  });

  // Add more test cases as needed
});
