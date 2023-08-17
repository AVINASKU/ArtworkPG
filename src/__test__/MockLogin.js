import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSSOUser } from "../store/actions/SSOUserAction";

//mocking react-redux useDispatch hook
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

//mocking react-router useNavigate hook
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: jest.fn(),
}))

//mocking store actions and selectors
jest.mock("../store/actions/SSOUserAction", () => ({
    getSSOUser: jest.fn(),
}))

// Mock useNavigate
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
  }));
  
  // Mock the necessary actions and functions
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  
  const mockSelector = jest.fn();
  useSelector.mockImplementation((selectorFn) => selectorFn({
    ssoReducer: {
      ssoUser: {
        userDetails: {
          AccessGroup: [{ AccessGroupNames: "Role:AccessGroup" }],
          UserGroup: [{ UserBU: [{ BU_Name: "MockBU" }], UserRegion: [{ Region_Name: "MockRegion" }] }],
        },
      },
    },
  }));
  
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);
  
  const mockUpdateUser = jest.mock("../apis/userApi", () => ({
    updateUser: jest.fn(),
  }));


  const mockRoles = jest.mock("../utils", () => ({
    roles: ["ProjectManager"],
  }));