import React from 'react';
import { render, fireEvent,act,screen, waitFor } from '@testing-library/react';
import CustomisedView from '../../components/Projects/MyProjects/CustomisedView';
import {Provider} from "react-redux"
import { store } from "../../store/store";
import { MemoryRouter } from 'react-router-dom';
import {MyProjectListMockData,AllProjectsListMockData, userInformationMockData,userProfileMockData} from "../../mocks/mockData"
import { userUpdateAction ,userProfileAction} from "../../store/actions/userActions";
import {getMyProject} from "../../store/actions/ProjectActions";
describe('CustomisedView', () => {
  // Define necessary mock functions and props

  const defaultProps = {
    visible: true,
    setVisible: jest.fn(),
    allColumnNames: ["Project_ID","Project_Name","Initiative_Group_Name","Project_Description","BU","Artwork_Category","Artwork_Brand","Project_region","Artwork_SMO","Cluster","Project_Scale","Project_State","Buffer_To_Work",
        "Estimated_No_Of_DI","Estimated_No_Of_DT","Estimated_No_Of_NPF","Estimated_No_Of_IQ","Estimated_No_Of_PRA","Estimated_No_Of_CICs","Estimated_No_Of_POAs","Estimated_SOS",
        "Estimated_SOP","Estimated_AW_Printer","Estimated_AW_Readiness","IL","Comments","Project_Type","Production_Strategy","Tier","Full Kit Readiness Tracking",],
    projectColumnName: ["Project_ID","Project_Name","Initiative_Group_Name","Project_Description","BU","Artwork_Category","Artwork_Brand","Project_region","Artwork_SMO","Cluster","Project_Scale","Project_State","Buffer_To_Work",
    "Estimated_No_Of_DI","Estimated_No_Of_DT","Estimated_No_Of_NPF","Estimated_No_Of_IQ","Estimated_No_Of_PRA","Estimated_No_Of_CICs","Estimated_No_Of_POAs","Estimated_SOS",
    "Estimated_SOP","Estimated_AW_Printer","Estimated_AW_Readiness","IL","Comments","Project_Type","Production_Strategy","Tier","Full Kit Readiness Tracking",],
    setProjectColumnNames: jest.fn(),
    saveAsPersonaliDefault: jest.fn(),
    resetToPgDefault: jest.fn(),
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

  it('renders without crashing', async() => {

    const userInformation = userInformationMockData;
    await store.dispatch(userUpdateAction(userInformation));
    const userProfile = userProfileMockData;

     await store.dispatch(userProfileAction(userProfile));
    const myprojectdata = await store.dispatch(getMyProject(userInformation));


    await act(async()=>{
        const { container } = render(<MemoryRouter><Provider store={store}><CustomisedView {...defaultProps}/></Provider></MemoryRouter>);
        expect(container).toBeInTheDocument();
      });
    
  });

  it('displays the header', async() => {
    const selectedCategories = ["Project_ID","Project_Name","Initiative_Group_Name","Project_Description","BU","Artwork_Category","Artwork_Brand","Project_region","Artwork_SMO","Cluster","Project_Scale","Project_State","Buffer_To_Work",
    "Estimated_No_Of_DI","Estimated_No_Of_DT","Estimated_No_Of_NPF","Estimated_No_Of_IQ","Estimated_No_Of_PRA","Estimated_No_Of_CICs","Estimated_No_Of_POAs","Estimated_SOS",
    "Estimated_SOP","Estimated_AW_Printer","Estimated_AW_Readiness","IL","Comments","Project_Type","Production_Strategy","Tier","Full Kit Readiness Tracking"];
  const setSelectedCategories = jest.fn();
  const setChecked = jest.fn();
  const category = 'Project_ID';

  const e = {
    checked: true,
    value: category,
  };

    await act(async()=>{
    const { getByText } = render(<MemoryRouter><Provider store={store}><CustomisedView {...defaultProps}/></Provider></MemoryRouter>);
    
    })
    await waitFor(()=>{
        //screen.debug(undefined, Infinity);
        // const inputElement = screen.queryByTestId("Project_ID");
        // expect(inputElement).toHaveAttribute("name", "category");

        const checkbox = screen.getAllByRole('checkbox', { id: "Project_ID" });
        expect(checkbox[0]).toBeChecked()
    fireEvent.click(checkbox[0]);
    //onCategoryChange(e, selectedCategories, setSelectedCategories, setChecked);

//     expect(selectedCategories).not.toContain(category);
//   expect(setSelectedCategories).toHaveBeenCalledWith([]);
//   expect(setChecked).toHaveBeenCalledWith(false);

    })
    
    expect(screen.getByText('Customise View')).toBeInTheDocument();
  });

  it('calls resetToPgDefault and setVisible when Reset to Default button is clicked', async() => {
    await act(async()=>{
    const { getByText } = render(<MemoryRouter><Provider store={store}><CustomisedView {...defaultProps}/></Provider></MemoryRouter>);
    
    });

    fireEvent.click(screen.getByText('Reset to Default View'));
    expect(defaultProps.resetToPgDefault).toHaveBeenCalledWith(defaultProps.projectColumnName);
    expect(defaultProps.setVisible).toHaveBeenCalledWith(false);
  });

  it('calls saveAsPersonaliDefault when Save as Personal View button is clicked', async() => {
    await act(async()=>{
    const { getByText } = render(<MemoryRouter><Provider store={store}><CustomisedView {...defaultProps}/></Provider></MemoryRouter>);
    
    });
    fireEvent.click(screen.getByText('Save as Personal View'));
    expect(defaultProps.saveAsPersonaliDefault).toHaveBeenCalledWith(defaultProps.projectColumnName);
  });

  // You can add more test cases to cover other functionalities
});
