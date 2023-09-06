import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProjectListHeader from '../../components/Projects/MyProjects/ProjectListHeader';
import {Provider} from "react-redux"
import { store } from "../../store/store";
import { MemoryRouter } from 'react-router-dom';
describe('ProjectListHeader', () => {
  // Define necessary mock functions and props

  const defaultProps = {
    header: 'Header Title',
    clearFilter: jest.fn(),
    clearFilters: jest.fn(),
    setVisible: jest.fn(),
    onSearchClick: jest.fn(),
    isFilterEnabled: true,
    isResetEnabled: true,
    handleDelegateClick: jest.fn(),
    handleHelpNeededClick: jest.fn(),
    handleHelpProvidedClick: jest.fn(),
    actionFlag: false,
    selected: [],
    allData: [],
    headers: [],
    filterFLag: false,
    CustomizeViewFlag: false,
    ResetToDefaultFlag: false,
    isTreeTableFlag: false,
  };

  it('renders without crashing', () => {
    const { container } = render(<MemoryRouter><Provider store={store}><ProjectListHeader {...defaultProps} /></Provider></MemoryRouter>);
    expect(container).toBeInTheDocument();
  });

  it('displays the header title', () => {
    const { getByText } = render(<MemoryRouter><Provider store={store}><ProjectListHeader {...defaultProps} /></Provider></MemoryRouter>);
    expect(getByText('Header Title')).toBeInTheDocument();
  });

  it('calls clearFilter when filter icon is clicked', () => {
    const { getByAltText } = render(<MemoryRouter><Provider store={store}><ProjectListHeader {...defaultProps} /></Provider></MemoryRouter>);
    fireEvent.click(getByAltText('filter logo'));
    expect(defaultProps.clearFilter).toHaveBeenCalled();
  });

  it('calls onSearchClick when search icon is clicked', () => {
    const { getByAltText } = render(<MemoryRouter><Provider store={store}><ProjectListHeader {...defaultProps} /></Provider></MemoryRouter>);
    fireEvent.click(getByAltText('search field'));
    expect(defaultProps.onSearchClick).toHaveBeenCalled();
  });

  it('calls clearFilters when Reset to Default button is clicked', () => {
    const { getByText } = render(<MemoryRouter><Provider store={store}><ProjectListHeader {...defaultProps} /></Provider></MemoryRouter>);
    fireEvent.click(getByText('Reset to Default'));
    expect(defaultProps.clearFilters).toHaveBeenCalled();
  });

  // Add more test cases as needed to cover other functionalities
});
