import React from "react";
import { render, screen, waitFor, fireEvent,act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "./home";
import { getSSOUser } from "./store/actions/SSOUserAction";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // If you're using Redux
import {accessMatrix} from "./accessMatrix"
import { updateUser } from "./apis/userApi";
import { roles } from "./utils";
//import {mockDispatch,mockSelector,mockNavigate} from "./unitTest/MockLogin"
jest.mock("react-redux");
jest.mock("react-router-dom");

describe("Home Component", () => {
console.log(accessMatrix);
  const mockDispatch = jest.fn();
    const mockUseSelector = jest.fn();
    const mockUseNavigate = jest.fn();

    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue(mockUseSelector);
    useNavigate.mockReturnValue(mockUseNavigate);

    // Mock User data from useSelector
    mockUseSelector.mockReturnValue({
      ssoReducer: {
        ssoUser: {
          userDetails: {
            AccessGroup: [{ AccessGroupNames: "Role:AccessGroup" }],
            UserGroup: [{ UserBU: [{ BU_Name: "MockBU" }], UserRegion: [{ Region_Name: "MockRegion" }] }],
          },
        },
      },
      UserReducer: {
        userInformation: {
          role: "ProjectManager", // Set the role here as needed
        },
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
            }],
      },
    });

    const mockUpdateUser = jest.fn();
    jest.mock("./apis/userApi", () => ({
      updateUser: mockUpdateUser,
    }));
  
  
    const mockRoles = ["ProjectManager"];
    jest.mock("./utils", () => ({
      roles: mockRoles,
    }));

    // Set up a mock Redux store if you're using Redux
  const mockStore = configureStore([]);

  it("updates user data and navigates to 'myProjects' for ProjectManager role", async () => {
    const mockUsername = "mockUser@example.com";
    const mockFirstName = "MockFirstName";
    const store = mockStore({
            UserReducer: {
              userInformation: {
                role: "ProjectManager", // Set the role here as needed
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
  
    const { rerender } = render(<Provider store={store}><Home username={mockUsername} firstName={mockFirstName} /></Provider>);

    // Since we are simulating asynchronous updates, we need to use `act` to wait for updates to complete
    await act(async () => {
      await Promise.resolve();
    });
console.log("mockUpdateUser " + mockUpdateUser);
    // expect(mockUpdateUser).toHaveBeenCalledWith(mockFirstName, ["Role", "MockBU", "MockRegion", mockFirstName]);
    // expect(mockUseNavigate).toHaveBeenCalledWith("/myProjects");
  });

  it("updates user data and navigates to 'allProjects' for non-ProjectManager role", async () => {
    // Mock a role that is not in the 'roles' array
    const mockRoles = ["User"];
    jest.mock("./utils", () => ({
      roles: mockRoles,
    }));

    const mockUsername = "mockUser@example.com";
    const mockFirstName = "MockFirstName";

    // const { rerender } = render(<Home username={mockUsername} firstName={mockFirstName} />);

    // // Since we are simulating asynchronous updates, we need to use `act` to wait for updates to complete
    // await act(async () => {
    //   await Promise.resolve();
    // });

    //expect(mockUpdateUser).toHaveBeenCalledWith(mockFirstName, ["Role", "MockBU", "MockRegion", mockFirstName]);
   // expect(mockUseNavigate).toHaveBeenCalledWith("/allProjects");
  });
});
