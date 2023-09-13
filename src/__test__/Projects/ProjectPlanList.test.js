import React from 'react';
import {render,fireEvent,act,screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'
import { store } from '../../store/store';
import {MyProjectListMockData,AllProjectsListMockData, userInformationMockData,userProfileMockData} from "../../mocks/mockData"
import { userUpdateAction ,userProfileAction} from "../../store/actions/userActions";
import {getMyProject} from "../../store/actions/ProjectActions";
import ProjectPlanList from "../../components/Projects/ProjectPlan/ProjectPlanList"



jest.mock("../../components/AWMJobs/CPPFA");

// Mock localStorage.getItem
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  global.localStorage = localStorageMock;

describe("ProjectPlanList Component",()=>{

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
            const { container } = render(<MemoryRouter><Provider store={store}><CPPFA onClose,
              showTaskDialog={false},
              selectedTaskData,
              pegadata,
              getProjectPlanApi,
              TaskDetailsData/></Provider></MemoryRouter>);
            expect(container).toBeInTheDocument();
          });
          screen.debug(undefined,Infinity);
    })

    it("renders with all the access data",async()=>{

    })
})