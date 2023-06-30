import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import ArtworkAlignment from "../ArtworkAlignmentPage";
import "./index.scss";
import { Accordion } from "react-bootstrap";
import { Button } from "primereact/button";
import {
  ArtWorkTabValuesAction
} from "../../../store/actions/ArtWorkTabValuesActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PMPSpecificTabView = ({ tabsList, setTabsList, tabPanel, handleTabPanel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { artWorkTabValuesData } = useSelector((state) => state.ArtWorkTabValuesReducer);
  const { selectedProject } = useSelector((state) => state.ProjectSetupReducer);
  const [storesTabList, setStoresTabDataList] = useState(artWorkTabValuesData);
  const [filteredDataList, setFilteredDataList] = useState(tabsList === undefined ? artWorkTabValuesData : tabsList);
  const [tabPanelList, setTabPanelList] = useState(1);
  const navigateToDSBP = () => {
    navigate(`../DSBP/${selectedProject?.Project_ID}`);
  };

  useEffect(() => {
    if(tabsList === undefined)
      setFilteredDataList(artWorkTabValuesData);
    else
    setFilteredDataList(tabsList);
  }, [artWorkTabValuesData]);

  useEffect(() => {
    if(tabsList === undefined){
      setTabPanelList(artWorkTabValuesData?.length - 1);
    } else {
      setTabPanelList(tabsList.length - 1);
    }    
    dispatch(ArtWorkTabValuesAction(artWorkTabValuesData));
  }, []);

  useEffect(() => {   
    if (tabPanelList >= storesTabList?.length) {
      setTabPanelList(storesTabList.length - 1);
    }
    storesTabList !== undefined && dispatch(ArtWorkTabValuesAction(storesTabList));   
  }, [storesTabList, tabPanelList]);

  useEffect(() => {
    if (artWorkTabValuesData) {
      setStoresTabDataList(
        artWorkTabValuesData || []
      );
    }
  }, [artWorkTabValuesData]);

  const renderData = (tabData) => {
    let jsonColumnWidth = localStorage.getItem("columnWidthDSBPArtwork");
    let allColumns = JSON.parse(jsonColumnWidth);
    const convertedInObject = [tabData];
    if (allColumns && allColumns.length) {
      return allColumns.map((field, index) => {
        const value = field?.Field_Name;
        const filteredItems = convertedInObject?.filter(item => item && item[value] !== undefined);
        return filteredItems.map(item => (
          <tr key={item[value]}>
            <td className="columnWidth">{field.Field_Name}</td>
            <td>{item[value]}</td>
          </tr>
        ));
      });
    }
    return null; // return null if there are no columns or tabData is empty
  };
  
  const tabsCompo = (obj) => (
    <div className="tabsCompo">
      <div className="tabsCompoMain">
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Material Details</Accordion.Header>
            <Accordion.Body>
              <table className="table table-sm table-hover">
                <tbody>
                  {renderData(obj?.description)}
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );

  const handleDelete = (index) => {
    const updatedDataList = [...storesTabList];
    updatedDataList.splice(index, 1);
    setStoresTabDataList(updatedDataList);
    if (tabPanelList >= storesTabList.length) {
      setTabPanelList(storesTabList.length - 1); // Select the last tab if the active tab is deleted
    }
  };

  const CustomTabHeader = ({ tabHeader, index }) => {
    return (
      <div className="custom-tab-header">
        <span className="p-tabview-title">{tabHeader}</span>
        {index !== 0 &&
          <button className="close-button" onClick={() => handleDelete(index)}>
          &#x2715;
        </button>
        }
      </div>
    );
  };
  const onTabChange = (index) =>{
    tabsList !== undefined ? handleTabPanel(index) : setTabPanelList(index);
    if(index === 0){
      return navigateToDSBP();
    }
  }
  const renderTabs = () => {
    return filteredDataList.map((obj, index) => (
      <TabPanel
        key={index}
        header={<CustomTabHeader tabHeader={index === 0 ? "Art Work Alignment" : obj.tabHeader} index={index} />}
        scrollable
      >
        {index !== 0 && (
          tabsCompo(obj)
        )}
      </TabPanel>
    ));
  };

  return (
    <>
      {(artWorkTabValuesData?.length > 1 ||  tabsList?.length > 1) && (tabPanelList !== 0 || tabPanel !== 0) ? (
          <TabView
            activeIndex={tabPanel || tabPanelList}
            onTabChange={(e) => onTabChange(e.index)}
          >
            {renderTabs()}
          </TabView>
        ) : (
          navigateToDSBP()
      )}
    </>
  );
};

export default PMPSpecificTabView;
