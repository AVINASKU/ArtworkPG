import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Form } from "react-bootstrap";
import ArtworkAlignment from "../ArtworkAlignmentPage";
import "./index.scss";
import { Accordion } from "react-bootstrap";
import { Button } from "primereact/button";
import {
  ArtWorkTabValuesAction
} from "../../../store/actions/ArtWorkTabValuesActions";
import DsbpCommonPopup from "../DsbpCommonPopup";
import DsbpRejectDialog from "../RejectDialog";
import DsbpActionDialog from "../DsbpActionDialog";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PMPSpecificTabView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { artWorkTabValuesData } = useSelector((state) => state.ArtWorkTabValuesReducer);
  const { selectedProject } = useSelector((state) => state.ProjectSetupReducer);
  const { DropDownValuesData, loading } = useSelector(
    (state) => state.DropDownValuesReducer
  );
  const [storesTabList, setStoresTabDataList] = useState(artWorkTabValuesData);
  const [filteredDataList, setFilteredDataList] = useState(artWorkTabValuesData);
  const [actionDropDownValues, setActionDropDownValues] = useState([]);
  const [tabPanelList, setTabPanelList] = useState(1);
  const [onChangeData, setOnChangeData] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [rejectFormData, setRejectFormData] = useState({});
  const [handleYesAddToPRoject, setHandleYesAddToPRoject] = useState(false);
  const [aiseList, setAISEList] = useState([]);
  const [assemblyMechanismList, setAssemblyMechanismList] = useState([]);
  const [addToProjectValue, setAddToProjectValue] = useState("");
  const [aiseName, setAISEName] = useState("");
  const [assemblyMechanismChange, setAssemblyMechanismChange] = useState("");
  const [bioside, setBioside] = useState("");
  const [groupName, setGroupName] = useState("");
  const [sellable, setSellable] = useState("");

  const navigateToDSBP = () => {
    navigate(`../DSBP/${selectedProject?.Project_ID}`);
  };

  const addToProjectList = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
    { name: "Reject", code: "Reject" },
  ];

  useEffect(() => {
    if (DropDownValuesData) {
      setActionDropDownValues(
        DropDownValuesData?.ArtworkAgilityTasksPage.Artwork_Alignment || []
      );
    }
  }, [DropDownValuesData]);

  useEffect(() => {
    if (
      actionDropDownValues !== undefined &&
      actionDropDownValues.length !== 0
    ) {
      setAISEList(actionDropDownValues.AISE);
      setAssemblyMechanismList(actionDropDownValues.Assembly_Mechanism);
    }
  }, [actionDropDownValues]);

  useEffect(() => {
    setFilteredDataList(artWorkTabValuesData);
  }, [artWorkTabValuesData]);

  useEffect(() => {
    setTabPanelList(artWorkTabValuesData?.length - 1);
    dispatch(ArtWorkTabValuesAction(artWorkTabValuesData));
  }, []);

  useEffect(() => {   
    if (tabPanelList >= storesTabList?.length) {
      setTabPanelList(storesTabList.length - 1);
    }
    storesTabList !== undefined && dispatch(ArtWorkTabValuesAction(storesTabList));   
    if(artWorkTabValuesData[tabPanelList]){
      const selectedTabData = artWorkTabValuesData[tabPanelList];
      setAddToProjectValue(selectedTabData?.description.AWM_AddedToProject);
      setAssemblyMechanismChange(selectedTabData?.description.AWM_AssemblyMechanism);
      setAISEName(selectedTabData?.description.AWM_AISE);
      setBioside(selectedTabData?.description.AWM_Biocide);
      setSellable(selectedTabData?.description.AWM_Sellable);
      setGroupName(selectedTabData?.description.AWM_GroupPMP);
    }
  }, [storesTabList, tabPanelList]);

  useEffect(() => {
    if (artWorkTabValuesData) {
      setStoresTabDataList(
        artWorkTabValuesData || []
      );
    }
  }, [artWorkTabValuesData]);

  const onchangeAddToProject = (rowData, e, ele) => {
    rowData[ele] = e.target.value;
    setOnChangeData(rowData);
    console.log("rowData", rowData);
    if (e.target.value === "Reject") setRejectDialog(true);
    setRejectFormData({});
    if (e.target.value === "Yes") setHandleYesAddToPRoject(true);
  };

  const handleAiseChange = (e) => {
    setAISEName(e.target.value);
    
  };
  const handleAssemblyMechanismChange = (e) => {
    setAssemblyMechanismChange(e.target.value);
  };

  const handleBiosideChange = (e) => {
    setBioside(e.target.value);
  };

  const handleSellableChange = (e) => {
    setSellable(e.target.value);
  };

  const handleGroupName = (e) => {
    setGroupName(e.target.value)
  };

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
            <td>
                {field.Field_Name === "AWM_AddedToProject" &&
                  <Form.Group
                    controlId="groupName.ControlInput1"
                    style={{ textAlign: "-webkit-center" }}
                  >
                    <Form.Select
                      value={addToProjectValue}
                      placeholder="Select"
                      onChange={(e) => onchangeAddToProject(tabData, e, field)}
                      style={{ fontSize: 12 }}
                    >
                      <option value="">Select</option>
                      {addToProjectList.map((data) => (
                        <option key={data.code} value={data.name}>
                          {data.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                }
                {field.Field_Name === "AWM_AISE" &&
                  <Form.Group
                  className={`mb-2`}
                  controlId="groupName.ControlInput1"
                >
                  <Form.Select
                    value={aiseName}
                    placeholder="Select AISE"
                    onChange={handleAiseChange}
                  >
                    <option value="">Select AISE</option>
                    {aiseList.map((aise) => (
                      <option key={aise.code} value={aise.AWM_AISE}>
                        {aise.AWM_AISE}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                }
                {field.Field_Name === "AWM_AssemblyMechanism" &&
                  <Form.Group
                  className={`mb-2`}
                  controlId="groupName.ControlInput1"
                >
                  <div>
                    <Form.Select
                      value={assemblyMechanismChange}
                      placeholder="Select Assembly Mechanism"
                      onChange={handleAssemblyMechanismChange}
                    >
                      <option value="">Select Assembly Mechanism</option>
                      {assemblyMechanismList.map((aise) => (
                        <option
                          key={aise.code}
                          value={aise.AWM_AssemblyMechanism}
                        >
                          {aise.AWM_AssemblyMechanism}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>
                } 
                {field.Field_Name === "AWM_Biocide" &&
                  <Form.Group
                  className={`mb-2`}
                  controlId="groupName.ControlInput1"
                >
                  <div>
                  <Form.Group
                    className={`mb-2`}
                    controlId="groupName.ControlInput1"
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Bioside"
                      onChange={handleBiosideChange}
                      value={bioside}
                    />
                  </Form.Group>
                  </div>
                </Form.Group>
                } 
                {field.Field_Name === "AWM_GroupPMP" &&
                 <Form.Group
                 className={`mb-2`}
                 controlId="groupName.ControlInput1"
               >
                 <input
                   type="text"
                   className="form-control"
                   placeholder="Enter Group Name"
                   onChange={handleGroupName}
                   value={groupName}
                 />
               </Form.Group>
                } 
                {field.Field_Name === "AWM_Sellable" &&
                  <Form.Group
                    className={`mb-2`}
                    controlId="groupName.ControlInput1"
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Sellable"
                      onChange={handleSellableChange}
                      value={sellable}
                    />
                  </Form.Group>
                } 
                {field.Field_Name !== "AWM_AddedToProject" &&
                field.Field_Name !== "AWM_AISE" && 
                field.Field_Name !== "AWM_AssemblyMechanism" &&
                field.Field_Name !== "AWM_Biocide" &&
                field.Field_Name !== "AWM_Sellable" &&
                  item[value]
                }
              </td>
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
    setTabPanelList(index);
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
    console.log("tabPanelList", tabPanelList, filteredDataList),
    <>
      {(artWorkTabValuesData?.length > 1) && (tabPanelList !== 0) ? (
          <TabView
            activeIndex={tabPanelList}
            onTabChange={(e) => onTabChange(e.index)}
          >
            {renderTabs()}
          </TabView>
        ) : (
          navigateToDSBP()
      )}
      {rejectDialog && (
        <DsbpCommonPopup
          actionHeader="Are you sure you want to reject this PMP?"
          dasbpDialog={rejectDialog}
          setDasbpDialog={setRejectDialog}
          rejectFormData={rejectFormData}
        >
          <DsbpRejectDialog
            onChangeData={onChangeData}
            rejectFormData={rejectFormData}
            setRejectFormData={setRejectFormData}
          />
        </DsbpCommonPopup>
      )}
      {handleYesAddToPRoject && (
        <DsbpActionDialog
          actionHeader="Are you sure you want to add these PMP to Project ?"
          actionDialog={handleYesAddToPRoject}
          setActionDialog={setHandleYesAddToPRoject}
          onChangeData={onChangeData}
          rowData={onChangeData}
        />
      )}
    </>
  );
};

export default PMPSpecificTabView;
