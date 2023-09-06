import React from 'react';
import {render,fireEvent,act,screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'
import { store } from '../../store/store';
import {MyProjectListMockData,AllProjectsListMockData, userInformationMockData,userProfileMockData} from "../../mocks/mockData"
import { userUpdateAction ,userProfileAction} from "../../store/actions/userActions";
import {getMyProject} from "../../store/actions/ProjectActions";
import ProjectList from "../../components/Projects/MyProjects/ProjectList"

jest.mock("../../components/Projects/MyProjects/CustomisedView");

// Mock localStorage.getItem
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  global.localStorage = localStorageMock;

describe("ProjectList Component",()=>{

    // Mock the useSelector and hasAllAccess behavior
  beforeEach(() => {
    jest.resetAllMocks();
  });

    it("renders without crashing",async()=>{
        const userInformation = userInformationMockData;
        await store.dispatch(userUpdateAction(userInformation));
        const userProfile = userProfileMockData;
    
         await store.dispatch(userProfileAction(userProfile));
        const myprojectdata = await store.dispatch(getMyProject(userInformation));
    
        await act(async()=>{
            const { container } = render(<MemoryRouter><Provider store={store}><ProjectList pegadata={myprojectdata} header="My Projects"/></Provider></MemoryRouter>);
            expect(container).toBeInTheDocument();
          });
          screen.debug(undefined,Infinity);
    })

    it("renders with all the access data",async()=>{

    })
})