import React from "react";
import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, MemoryRouter } from "react-router-dom";
import Home from "./home";
import { getSSOUser } from "./store/actions/SSOUserAction";
import { Provider } from "react-redux";
import { accessMatrix } from "./accessMatrix"
import { updateUser } from "./apis/userApi";
import { roles } from "./utils";
import { store } from "./store/store";
import { userUpdateAction } from "../src/store/actions/userActions"
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  }),
  useNavigate: () => jest.fn(),
}));

// Mock localStorage.getItem
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.localStorage = localStorageMock;
describe("Home Component", () => {

  it("updates user data and navigates to 'myProjects' for ProjectManager role", async () => {
    const mockUserDetails = { AccessGroup: [{ AccessGroupNames: "AAS:ProjectManager" }], UserGroup: [{ GroupName: "BC default Iza", UserRegion: [{ Region_Name: "Europe" }], UserRole: [{ Name: "Project Manager,Design Delivery,Print Production Manager,Capacity Manager,Brand Visual Executor,User Agent" }], UserBU: [{ BU_Name: "Baby Care" }] }, { GroupName: "BCHC default Iza", UserRegion: [{ Region_Name: "Europe" }], UserRole: [{ Name: "Design Manager,Design Agency" }], UserBU: [{ BU_Name: "Baby Care" }, { BU_Name: "Home Care" }] }, { GroupName: "HC default Iza", UserRegion: [{ Region_Name: "Europe" }], UserRole: [{ Name: "Artwork Copy Expert,Global Product Stewardship,Brand,Initiative Leader,Print Quality Manager" }], UserBU: [{ BU_Name: "Baby Care" }] }] }
    const mockUsername = "urban.ik@pg.com";
    const mockFirstName = "Izabela";
    const operatorId = mockUsername.split("@")[0];
    localStorageMock.getItem.mockReturnValue(JSON.stringify({
      roles: [
        {
          name: "ProjectManager",
          access: ["Read", "Write", "Edit", "Delete"],
        },
        {
          name: "CapacityManager",
          access: [],
        }]
    }));

    const mockRoles = ["ProjectManager"];
    jest.mock("./utils", () => ({
      roles: mockRoles,
    }));

    await store.dispatch(getSSOUser(operatorId));
    const userInformation = {
      username: operatorId,
      userid: "iza123",
      loginTime: new Date().toUTCString()
    }
     await store.dispatch(userUpdateAction(userInformation));

    // Wait for the action to complete and update the store
    await waitFor(() => {
      // const store_State = store.getState();
      // console.log("store_State" + JSON.stringify(store_State.ssoReducer.ssoUser));
      expect(store.getState().ssoReducer.ssoUser).toEqual({
        userDetails: mockUserDetails
      });

      //expect(store.getState().UserReducer.userInformation).toEqual(userInformation)
    });

    // Since we are simulating asynchronous updates, we need to use `act` to wait for updates to complete
    await act(async () => {
      await Promise.resolve();

      render(<MemoryRouter><Provider store={store}><Home username={mockUsername} firstName={mockFirstName} /></Provider></MemoryRouter>);
    });


    screen.debug();
    // expect(mockUpdateUser).toHaveBeenCalledWith(mockFirstName, ["Role", "MockBU", "MockRegion", mockFirstName]);
    // expect(mockUseNavigate).toHaveBeenCalledWith("/myProjects");
  });

  it("updates user data and navigates to 'allProjects' for non-ProjectManager role", async () => {
    // Mock a role that is not in the 'roles' array
    const mockRoles = ["User"];
    jest.mock("./utils", () => ({
      roles: mockRoles,
    }));

    const mockUsername = "urban.ik@pg.com";
    const mockFirstName = "Izabela";

    // Since we are simulating asynchronous updates, we need to use `act` to wait for updates to complete
    await act(async () => {
      await Promise.resolve();
      render(<MemoryRouter><Provider store={store}><Home username={mockUsername} firstName={mockFirstName} /></Provider></MemoryRouter>);
    });
    screen.debug();
    //expect(mockUpdateUser).toHaveBeenCalledWith(mockFirstName, ["Role", "MockBU", "MockRegion", mockFirstName]);
    // expect(mockUseNavigate).toHaveBeenCalledWith("/allProjects");
  });
});