import React from "react";
import { render, waitFor,screen, act } from "@testing-library/react";
import { useSelector } from "react-redux";
import ProjectSetup from "../../components/ProjectSetup/index";
import {Provider} from "react-redux"
import { store } from "../../store/store";
import {MemoryRouter} from "react-router-dom"
import {MyProjectListMockData,AllProjectsListMockData, userInformationMockData,userProfileMockData} from "../../mocks/mockData"
import { userUpdateAction ,userProfileAction} from "../../store/actions/userActions";
import {getMyProject} from "../../store/actions/ProjectActions";
import { hasAllAccess,getAccessDetails,optionList } from "../../utils";
import {ProjectService} from "../../service/PegaService";
import pegaJsonData from "../../pega.json";

// Mock the hasAllAccess function
jest.mock("../../utils", () => ({
  hasAllAccess: jest.fn(),
  getAccessDetails: jest.fn(),
  optionList:jest.fn(),
}));

jest.mock("../../service/PegaService", () => ({
    getProjectData: jest.fn(),
    getProjectPlanAllColumnNames: jest.fn(() => ["Task", "Dependency", "Role", "Owner", "State", "Duration", "StartDate", "EndDate", "ConsumedBuffer", "HelpNeeded"]),
  }));
  
// Mock localStorage.getItem
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe("ProjectSetup Component", () => {
  // Mock the useSelector and hasAllAccess behavior
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  it("renders project setup for users with all access", async () => {

    const userInformation = userInformationMockData;
    await store.dispatch(userUpdateAction(userInformation));
    const userProfile = userProfileMockData;

     await store.dispatch(userProfileAction(userProfile));
    const myprojectdata = await store.dispatch(getMyProject(userInformation));
    
    const hasAllAccessMock = require("../../utils").hasAllAccess;
    hasAllAccessMock.mockReturnValue(true);

    const optionListMock = require("../../utils").optionList;
    optionListMock.mockReturnValue(["ProjectID"]);

    const getAccessDetailsMock = require("../../utils").getAccessDetails;
    const result = {
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
        },
        {
          name: "MyTasks",
          path: "/MyTasks",
          access: ["Read", "Write", "Edit", "Delete"],
        },
        {
          name: "AllTasks",
          path: "/AllTasks",
          access: ["Read", "Write", "Edit", "Delete"],
        },
        {
          name: "projectPlan",
          path: "/projectPlan",
          access: ["Read", "Write", "Edit", "Delete"],
        },
      ]
    };
    getAccessDetailsMock.mockReturnValue(result);
    
    const pegadata = require("../../service/PegaService").getProjectData;
    pegadata.mockReturnValue(pegaJsonData.ArtworkAgilityProjects);

    const getProjectPlanAllColumnNamesMock = require("../../service/PegaService").getProjectPlanAllColumnNames;
    getProjectPlanAllColumnNamesMock.mockReturnValue(["Task","Dependency","Role","Owner","State","Duration","StartDate","EndDate","ConsumedBuffer","HelpNeeded"]);

    
    await waitFor(() => {
     
    });
    

    await act(async()=>{
      const { getByText } = render(<MemoryRouter><Provider store={store}><ProjectSetup></ProjectSetup></Provider></MemoryRouter>);

    });
    screen.debug(undefined,Infinity);

    
  });
});
