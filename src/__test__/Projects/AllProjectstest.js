import React from "react";
import { render, waitFor,screen } from "@testing-library/react";
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

    expect(getByText("You are not authorized to access this page.")).toBeInTheDocument();
  });

  it("renders project list for users with all access", async () => {

    const userInformation = userInformationMockData;
    await store.dispatch(userUpdateAction(userInformation));
    const userProfile = userProfileMockData;
     console.log("userProfile:" + JSON.stringify(userProfile))
     await store.dispatch(userProfileAction(userProfile));
    const myprojectdata = await store.dispatch(getMyProject(userInformation));
    
    const { getByText } = render(<MemoryRouter><Provider store={store}><AllProjects /></Provider></MemoryRouter>);
    screen.debug();

    await waitFor(() => {
      // expect(store.getState().myProject).toEqual({
      //   myProject: myprojectdata
      // });
    });
  });
});
