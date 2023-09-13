import React from "react";
import { render, waitFor,screen, act } from "@testing-library/react";
import { useSelector } from "react-redux";
import MyProjects from "../../components/Projects/ProjectPlan/index";
//import MyProjects from "../../components/Projects/MyProjects/index";
import {Provider} from "react-redux"
import { store } from "../../store/store";
import {MemoryRouter} from "react-router-dom"
import {MyProjectListMockData,AllProjectsListMockData, userInformationMockData,userProfileMockData} from "../../mocks/mockData"
import { userUpdateAction ,userProfileAction} from "../../store/actions/userActions";
import { getDropDownValues } from "../../store/actions/dropDownValuesAction";
import pegaJsonData from "../../pega.json";
import {getMyProject} from "../../store/actions/ProjectActions";


jest.mock("../../service/PegaService", ()=> ({

  getProjectData: jest.fn(),

}))


describe("ProjectPlan Component", () => {
  //it("renders unauthorized message for users without all access", () => {

     // const { getByText } = render(<MemoryRouter><Provider store={store}><MyProjects /></Provider></MemoryRouter>);

     // expect(getByText("You are not authorized to access this page.")).toBeInTheDocument();
    //});

  it("renders project list for users with all access", async () => {

       const userInformation = userInformationMockData;
       await store.dispatch(userUpdateAction(userInformation));
       const userProfile = userProfileMockData;
         console.log("userProfile:" + JSON.stringify(userProfile))
         await store.dispatch(userProfileAction(userProfile));
         await store.dispatch(getDropDownValues());
         const myprojectdata = await store.dispatch(getMyProject(userInformation));
         

        const pegadata = require("../../service/PegaService").getProjectData;
         
             pegadata.mockReturnValue(pegaJsonData.ArtworkAgilityProjects)
       const { getByText } = render(<MemoryRouter><Provider store={store}><MyProjects /></Provider></MemoryRouter>);
       screen.debug();

        await waitFor(() => {
            it('selecting a project navigates to Project Plan screen', async () => {
                const projects = [
                  { id: 1, name: 'MyProjects' },
                  { id: 2, name: 'ProjectPlan' },
                ];
                
                const onSelectProjectMock = jest.fn();
              
                const { getByText } = render(<MemoryRouter><Provider store={store}><MyProjects /></Provider></MemoryRouter>);
              
                // Click on a project
                fireEvent.click(getByText('MyProjects'));
              
                
                expect(onSelectProjectPlan).toHaveBeenCalledWith(1);// Verify that the onSelectProject function was called with the correct project ID
            });

            it('renders "GanttChart" and "tabular" toggle buttons', async () => {
        
                const { getByText } = render(<MemoryRouter><Provider store={store}><MyProjects /></Provider></MemoryRouter>);
                const ganttButton = getByText('GanttChart');
                const tabularButton = getByText('tabular');
                expect(ganttButton).toBeInTheDocument();
                expect(tabularButton).toBeInTheDocument();
            });

            it('should display the GanttChart screen when the tab is clicked',async () => {
         
                const { getByText, getByTestId } = render(< MemoryRouter><Provider store={store}><MyProjects /></Provider></MemoryRouter>);
                const ganttTab = getByText('GanttChart');// Find and click the "Gantt chart" button
                fireEvent.click(ganttTab);
                const ganttScreen = getByTestId('gantt-screen'); // Check if the Gantt chart screen is displayed
                expect(ganttScreen).toBeInTheDocument();
            });

            it('Clicking on the "Tabular" tab displays the "Tabular" view', async () => {
       
                // Arrange
                const { getByText, getByTestId } = render(< MemoryRouter><Provider store={store}><MyProjects /></Provider></MemoryRouter>);
             
                // Act
                const tabularTab = getByText('Tabular');
                fireEvent.click(tabularTab); 
             
                // Assert
                const tabularScreen = getByTestId('tabular-view'); 
                expect(tabularScreen).toBeInTheDocument();
                 
            });
           

         
            // expect(store.getState().myProject).toEqual({
            //   myProject: myprojectdata
            // });
        });

        await act(()=>{

        })
    });
});