import React from 'react';
import { render, fireEvent,act,screen, waitFor } from '@testing-library/react';
import ProjectListFilter from '../../components/Projects/ProjectListFilter';
import {Provider} from "react-redux"
import { store } from "../../store/store";
import { MemoryRouter } from 'react-router-dom';
import {getMyProject} from "../../store/actions/ProjectActions";
import {MyProjectListMockData,AllProjectsListMockData, userInformationMockData,userProfileMockData} from "../../mocks/mockData"
import { userUpdateAction ,userProfileAction} from "../../store/actions/userActions";
import { onSort } from "../../utils";
import pegaJsonData from "../../pega.json";



jest.mock("../../service/PegaService", ()=> ({
  getProjectData: jest.fn(),
}))

// jest.mock("../../utils", () => ({
//   onSort: jest.fn(),
// }));


// Mock localStorage.getItem
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe('ProjectListFilter', () => {
  // Define necessary mock functions and props
  const defaultProps = {
    onSort:  jest.fn(),
    setProjectFrozen: jest.fn(),
    saveSettings: jest.fn(),
    projectData: MyProjectListMockData.ArtworkAgilityProjects ,
    addFrozenColumns: jest.fn(),
    onGlobalFilterChange: jest.fn(),
    selectedColumnName: [],
    ProjectFrozen: jest.fn(),
    selectedFields: jest.fn(),
    setFrozenColumn: jest.fn(),
    frozenCoulmns: [],
    sortData: [],
    setSortData:[],
    setFilters: [],
    filters:[],
    op: false,
    clearColumnWiseFilter:jest.fn(),

  };
 

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    })
});

  it('render ProjectListFilter', async() => {
    const userInformation = userInformationMockData;
    await store.dispatch(userUpdateAction(userInformation));
    const userProfile = userProfileMockData;

     await store.dispatch(userProfileAction(userProfile));
    const myprojectdata = await store.dispatch(getMyProject(userInformation));
    defaultProps.projectData=myprojectdata;
    const pegadata = require("../../service/PegaService").getProjectData;
    pegadata.mockReturnValue(pegaJsonData.ArtworkAgilityProjects);
   
  //  expect(defaultProps.setProjectFrozen).toHaveBeenCalledWith(defaultProps.projectColumnName);
    // expect(defaultProps.saveSettings).toHaveBeenCalledWith(defaultProps.projectColumnName);
   //  expect(defaultProps.projectData).toHaveBeenCalledWith(defaultProps.projectColumnName);
    // expect(defaultProps.addFrozenColumns).toHaveBeenCalledWith(defaultProps.projectColumnName);
    // expect(defaultProps.onGlobalFilterChange).toHaveBeenCalledWith(defaultProps.projectColumnName);
    // expect(defaultProps.selectedColumnName).toHaveBeenCalledWith(defaultProps.projectColumnName);
    // expect(defaultProps.frozenCoulmns).toHaveBeenCalledWith(defaultProps.projectColumnName);
    // expect(defaultProps.sortData).toHaveBeenCalledWith(defaultProps.projectColumnName);
    // expect(defaultProps.setSortData).toHaveBeenCalledWith(defaultProps.projectColumnName);
    // expect(defaultProps.setFilters).toHaveBeenCalledWith(defaultProps.projectColumnName);
    //expect(defaultProps.op).toHaveBeenCalledWith(false);
   // expect(defaultProps.clearColumnWiseFilter).toHaveBeenCalledWith(defaultProps.projectColumnName);
    await act(async()=>{
      const { container } = render(<MemoryRouter><Provider store={store}><ProjectListFilter {...defaultProps}/></Provider></MemoryRouter>);
      screen.debug(undefined,Infinity);
      expect(container).toBeInTheDocument();
     // fireEvent.click(screen.getByText('Save as Personal View'));
      // expect(defaultProps.onSort).toHaveBeenCalledWith();


    })
  });

  
 

 

  // You can add more test cases to cover other functionalities
});
