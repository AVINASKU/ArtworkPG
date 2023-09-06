import React from "react";
import { render, waitFor, screen, act } from "@testing-library/react";
import { useSelector } from "react-redux";
import AddProject from "../../components/Projects/CreateProject/index";
import { Provider } from "react-redux"
import { store } from "../../store/store";
import { MemoryRouter } from "react-router-dom"
import { MyProjectListMockData, AllProjectsListMockData, userInformationMockData, userProfileMockData } from "../../mocks/mockData"
import { userUpdateAction, userProfileAction } from "../../store/actions/userActions";
import { getDropDownValues } from "../../store/actions/dropDownValuesAction";

describe("Createproject Component", () => {
    it("renders Createprojects after user login", async () => {
        const userInformation = userInformationMockData;
        await store.dispatch(userUpdateAction(userInformation));
        const userProfile = userProfileMockData;
        console.log("userProfile:" + JSON.stringify(userProfile))
        await store.dispatch(userProfileAction(userProfile));
        await store.dispatch(getDropDownValues());
        
        
        await waitFor(() => {
            
            // expect(store.getState().myProject).toEqual({

            //   myProject: myprojectdata

            // });

        });
        const { getByText } = render(<MemoryRouter><Provider store={store}><AddProject /></Provider></MemoryRouter>);
            screen.debug();
        await act(() => {



        })
    });

});

