import React from "react";
import { render, waitFor,screen,act } from "@testing-library/react";
import { useSelector } from "react-redux";
import AllProjects from "../../components/Projects/AllProjects/index";
import {Provider} from "react-redux"
import { store } from "../../store/store";
import {MemoryRouter} from "react-router-dom"
import {MyProjectListMockData,AllProjectsListMockData, userInformationMockData,userProfileMockData} from "../../mocks/mockData"
import { userUpdateAction ,userProfileAction} from "../../store/actions/userActions";
import {getAllProject} from "../../store/actions/ProjectActions";

// Mock the ChildComponent and GrandchildComponent
jest.mock("../../components/Projects/AllProjects/AllProjectList");

// Mock localStorage.getItem
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe("AllProject Component", () => {
  it("renders project list for users with all access", async () => {

    const userInformation = userInformationMockData;
    await store.dispatch(userUpdateAction(userInformation));
    const userProfile = userProfileMockData;
     await store.dispatch(userProfileAction(userProfile));
    const allprojectdata = await store.dispatch(getAllProject(userProfile));
    
    await act(()=>{
      const { getByText } = render(<MemoryRouter><Provider store={store}><AllProjects header="All Projects" /></Provider></MemoryRouter>);
    })
    

    await waitFor(() => {
      expect(screen.getByText(/Artwork Agility Suite/i)).toBeInTheDocument();

    const link = screen.getAllByRole('link');
    expect(link[0].href).toContain('/myProjects');

    expect(link[1].href).toContain('/allProjects');

    expect(link[2].href).toContain('/AllTasks');

    expect(link[3].href).toContain('/projectSetup');

      expect(store.getState().myProject.allProjects).toEqual(AllProjectsListMockData.ArtworkAgilityProjects);
      
    });
 screen.debug();
    // Find all elements that match the text
    // const myProjectAndAllProjectList =  screen.getByTestId("tableDiv");

    // // Use .toHaveLength to check the number of matched elements
    // expect(myProjectAndAllProjectList).toHaveLength(1);

    // // Log the content of the matched elements
    // myProjectAndAllProjectList.forEach(element => {
    //   console.log(element.textContent);
    // });

    // You can continue with other assertions or actions as needed

    
  });
});
