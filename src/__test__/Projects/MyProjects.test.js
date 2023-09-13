import React from "react";
import { render, waitFor,screen, act } from "@testing-library/react";
import { useSelector } from "react-redux";
import MyProjects from "../../components/Projects/MyProjects/index";
import {Provider} from "react-redux"
import { store } from "../../store/store";
import {MemoryRouter} from "react-router-dom"
import {MyProjectListMockData,AllProjectsListMockData, userInformationMockData,userProfileMockData} from "../../mocks/mockData"
import { userUpdateAction ,userProfileAction} from "../../store/actions/userActions";
import {getMyProject} from "../../store/actions/ProjectActions";
import { hasAllAccess,getAccessDetails,optionList } from "../../utils";
import pegaJsonData from "../../pega.json";
import ProjectService from "../../service/PegaService";

// Mock the hasAllAccess function
jest.mock("../../utils", () => ({
  hasAllAccess: jest.fn(),
  getAccessDetails: jest.fn(),
  optionList:jest.fn(),
}));

jest.mock("../../service/PegaService", ()=> ({
  getProjectData: jest.fn(),
}))

// Mock the ChildComponent and GrandchildComponent
jest.mock("../../components/Projects/MyProjects/ProjectList");


// Mock localStorage.getItem
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe("MyProjects Component", () => {
  // Mock the useSelector and hasAllAccess behavior
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  it("renders project list for users with all access", async () => {

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

    const mockGetProjectData = jest.fn().mockResolvedValue(pegaJsonData.ArtworkAgilityProjects);
    // Replace the real implementation with the mock function
    //ProjectService.getProjectData().mockResolvedValue(mockGetProjectData);
    
    await waitFor(() => {
     
    });
    

    await act(async()=>{
      const { getByText } = render(<MemoryRouter><Provider store={store}><MyProjects></MyProjects></Provider></MemoryRouter>);

    });
    screen.debug();

    expect(screen.getByText(/Artwork Agility Suite/i)).toBeInTheDocument();

    const link = screen.getAllByRole('link');
    expect(link[0].href).toContain('/myProjects');

    expect(link[1].href).toContain('/allProjects');

    expect(link[2].href).toContain('/AllTasks');

    expect(link[3].href).toContain('/projectSetup');

    expect(screen.getByTestId("project-list-mock")).toBeInTheDocument();

    expect(store.getState().myProject.myProject).toEqual(myprojectdata)

  });
});
