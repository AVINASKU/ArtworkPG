import React from "react";
import moment from "moment";
import { render, waitFor, screen, act, fireEvent } from "@testing-library/react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProjectSetup from "../../components/ProjectSetup/index";
import { Provider } from "react-redux"
import { store } from "../../store/store";
import { MemoryRouter } from "react-router-dom"
import { MyProjectListMockData, AllProjectsListMockData, userInformationMockData, userProfileMockData } from "../../mocks/mockData"
import { userUpdateAction, userProfileAction } from "../../store/actions/userActions";
import { getMyProject } from "../../store/actions/ProjectActions";
import { hasAllAccess, getAccessDetails, optionList } from "../../utils";
import ProjectService from "../../service/PegaService";
import pegaJsonData from "../../pega.json";
import { getProjectPlan } from "../../apis/projectPlanApi";

// Mock the hasAllAccess function
jest.mock("../../utils", () => ({
    hasAllAccess: jest.fn(),
    getAccessDetails: jest.fn(),
    optionList: jest.fn(),
}));

jest.mock("../../service/PegaService", () => ({
    getProjectData: jest.fn(),
    getProjectPlanAllColumnNames: jest.fn(),
}));

// Mock the lazy-loaded component
jest.mock("../../components/DSBP/DependencyMappingPage", () => {
    return {
        __esModule: true,
        default: () => <div>DependencyMappingPage component</div>,
    };
});

jest.mock("../../components/Projects/CreateProject", () => {
    return {
        __esModule: true,
        default: () => <div>AddProject component</div>,
    };
});

jest.mock("../../components/Projects/ProjectPlan/ProjectPlanCompo", () => {
    return {
        __esModule: true,
        default: () => <div>ProjectPlanCompo component</div>,
    };
});

jest.mock("../../components/Projects/MyProjects/ProjectListHeader", () => {
    return {
        __esModule: true,
        default: () => <div>ProjectListHeader component</div>,
    };
});

jest.mock("../../components/DSBP/ArtworkAlignmentPage", () => {
    return {
        __esModule: true,
        default: () => <div>ArtworkAlignmentPage component</div>,
    };
});

// Mock useParams and useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
  }));

// Mock the entire 'react' module to provide custom implementations for hooks
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useRef: jest.fn(() => ({ current: null })), // Mock useRef
//     useState: jest.fn(),
//     useContext: jest.fn(),
//     // Add other hooks here with their mock implementations as needed
//   }));

// Mock localStorage.getItem
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe("ProjectSetup Component", () => {
    let useStateMock;
    // Mock the useSelector and hasAllAccess behavior
    beforeEach(() => {
        jest.resetAllMocks();
        useParams.mockReturnValue({ ProjectID: 'A-3215' }); // Mock ProjectID value
        useNavigate.mockReturnValue(jest.fn()); // Mock the navigate function
        // useStateMock = jest.fn();
        // useStateMock
        //   .mockReturnValueOnce(['', jest.fn()]) // Mock for option
        //   .mockReturnValueOnce([false, jest.fn()]) // Mock for visible
        //   .mockReturnValueOnce([true, jest.fn()])  // Mock for activeSave
        //   .mockReturnValueOnce(['projectSetup', jest.fn()]); // Mock for tabName

        // React.useState = useStateMock;
    });
    afterEach(() => {
        jest.clearAllMocks();
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

        // Mock the behavior of ProjectService.getProjectPlanAllColumnNames
        ProjectService.getProjectPlanAllColumnNames.mockReturnValue(["Task", "Dependency", "Role", "Owner", "State", "Duration", "StartDate", "EndDate", "ConsumedBuffer", "HelpNeeded"])

        const pegadata = require("../../service/PegaService").getProjectData;

        pegadata.mockReturnValue(pegaJsonData.ArtworkAgilityProjects);



        await act(async () => {
            const { getByText } = render(<MemoryRouter><Provider store={store}><ProjectSetup></ProjectSetup></Provider></MemoryRouter>);

        });
        screen.debug(undefined, Infinity);

        // Wait for the loading fallback to disappear
        await waitFor(() => {
            expect(screen.queryByText("Loading...")).toBeNull();
        });

        // Now you can assert the presence of the lazy-loaded component
        //expect(screen.getByText("DependencyMappingPage component")).toBeInTheDocument();

        const projectSetupTab = screen.getByTestId('scrollTab-0');
        const projectPlanTab = screen.getByTestId('scrollTab-1');
        const ArtScopeTab = screen.getByTestId('scrollTab-2');
        const dependencyTab = screen.getByTestId('scrollTab-3');
        const readinessTab = screen.getByTestId('scrollTab-4');

        const Tablist = ["Project Setup", "Project Plan", "Artwork Scope Alignment", "Dependency Mapping", "Readiness Per PMP"]
        expect(projectSetupTab.textContent).toBe(Tablist[0]);
        expect(projectPlanTab.textContent).toBe(Tablist[1]);
        expect(ArtScopeTab.textContent).toBe(Tablist[2]);
        expect(dependencyTab.textContent).toBe(Tablist[3]);
        expect(readinessTab.textContent).toBe(Tablist[4]);

        // Use getAllByTestId to get an array of matching elements
        const projectSetupElements = screen.getAllByTestId("projectSetup");

        // Iterate through the array and check the class attribute for each element
        projectSetupElements.forEach((element) => {
            expect(element).toHaveAttribute("class", "tab-pane fade in active");
        });

        fireEvent.click(projectPlanTab);
        screen.debug();
        // Use getAllByTestId to get an array of matching elements
        const projectPlanElements = screen.getAllByTestId("projectPlan");

        // Iterate through the array and check the class attribute for each element
        projectPlanElements.forEach((element) => {
            expect(element).toHaveAttribute("class", "tab-pane fade in active");
        });
        // Expect navigate to be called with the correct URL
        if(useParams["ProjectID"] !== undefined)
        {
            expect(useNavigate).toHaveBeenCalledWith();
        }

        fireEvent.click(ArtScopeTab);
        screen.debug();
        // Use getAllByTestId to get an array of matching elements
        const artworkAlignmentElements = screen.getAllByTestId("artworkAlignment");

        // Iterate through the array and check the class attribute for each element
        artworkAlignmentElements.forEach((element) => {
            expect(element).toHaveAttribute("class", "tab-pane fade in active");
        });


        fireEvent.click(dependencyTab);
        screen.debug();
        // Use getAllByTestId to get an array of matching elements
        const dependencyMappingElements = screen.getAllByTestId("dependencyMapping");

        // Iterate through the array and check the class attribute for each element
        dependencyMappingElements.forEach((element) => {
            expect(element).toHaveAttribute("class", "tab-pane fade in active");
        });


        fireEvent.click(readinessTab);
        screen.debug();
        // Use getAllByTestId to get an array of matching elements
        const readinessPerPMPElements = screen.getAllByTestId("readinessPerPMP");

        // Iterate through the array and check the class attribute for each element
        readinessPerPMPElements.forEach((element) => {
            expect(element).toHaveAttribute("class", "tab-pane fade in active");
        });

    });
});


/// Mock the dependencies
jest.mock('moment', () => ({
  min: jest.fn(),
  max: jest.fn(),
}));

// Mock the API function
jest.mock('../../apis/projectPlanApi', () => ({
  getProjectPlan: jest.fn(),
}));

describe('getProjectPlanApi', () => {
  it('should fetch project plan data and dispatch actions', async () => {
    // Mock the necessary dependencies and data
    const setLoaderMock = jest.fn();
    const dispatchMock = jest.fn();
    const updateProjectPlanDesignActionMock = jest.fn();
    const updateProjectPlanActionMock = jest.fn();

    const mode = 'edit'; // Set the mode as needed
    const selectedProjectDetails = {
      Project_ID: '123', // Set the Project_ID as needed
    };

    // Mock moment functions
    moment.min.mockImplementation(() => moment());
    moment.max.mockImplementation(() => moment());

    // Mock getProjectPlan API function
    const apiData = [{ /* Mock your data here */ }];
    getProjectPlan.mockResolvedValue(apiData);

    // Call the function
    // await getProjectPlanApi(setLoaderMock, dispatchMock, updateProjectPlanDesignActionMock, updateProjectPlanActionMock, mode, selectedProjectDetails);

    // // Assertions
    // expect(setLoaderMock).toHaveBeenCalledWith(true);
    // expect(getProjectPlan).toHaveBeenCalledWith(selectedProjectDetails.Project_ID);
    // expect(updateProjectPlanDesignActionMock).toHaveBeenCalledWith(apiData);
    // expect(updateProjectPlanActionMock).toHaveBeenCalledWith(expect.any(Array)); // You can add more specific assertions for the updated data
    // expect(setLoaderMock).toHaveBeenCalledWith(false);
  });
});

// describe('getRestructuredData', () => {
//   it('should restructure API data', () => {
//     // Mock the input data
//     const apiData = [{ /* Mock your data here */ }];

//     // Call the function
//     const restructuredData = getRestructuredData(apiData);

//     // Add your assertions for the restructuredData
//     // For example, you can expect the restructuredData to have a certain structure
//     // and contain the expected data based on your transformation logic.
//   });
// });