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

describe("AllProject Component", () => {
  it("renders unauthorized message for users without all access", () => {

    const { getByText } = render(<MemoryRouter><Provider store={store}><AllProjects /></Provider></MemoryRouter>);

    //expect(getByText("You are not authorized to access this page.")).not.toBeInTheDocument();
  });

  it("renders project list for users with all access", async () => {

    const userInformation = userInformationMockData;
    await store.dispatch(userUpdateAction(userInformation));
    const userProfile = userProfileMockData;
     //console.log("userProfile:" + JSON.stringify(userProfile))
     await store.dispatch(userProfileAction(userProfile));
    const allprojectdata = await store.dispatch(getAllProject(userProfile));
    
    
    const { getByText } = render(<MemoryRouter><Provider store={store}><AllProjects /></Provider></MemoryRouter>);

    await waitFor(() => {
      //console.log("allprojectdata" + allprojectdata)
      expect(store.getState().myProject.allProjects).toEqual(AllProjectsListMockData.ArtworkAgilityProjects);
      
      // const myProjectAnddAllProjectList = screen.findAllByText(/myProjectAnddAllProjectList/i)
      // console.log(myProjectAnddAllProjectList)
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

    await act(()=>{

    })
  });
});
