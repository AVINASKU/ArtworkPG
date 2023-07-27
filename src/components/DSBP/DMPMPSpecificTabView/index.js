import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Form } from "react-bootstrap";
import "./index.scss";
import { Accordion } from "react-bootstrap";
import { Loading } from "../../../utils";
import { DMTabValuesAction } from "../../../store/actions/DMTabValuesActions";
import { onSubmitDsbpAction, getDsbpPMPDetails } from "../../../apis/dsbpApi";
import DsbpCommonPopup from "../DsbpCommonPopup";
import DsbpRejectDialog from "../RejectDialog";
import DsbpActionDialog from "../DsbpActionDialog";
import FooterButtons from "../../AWMJobs/DesignJobs/FooterButtons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DMPMPSpecificTabView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dmTabValuesData } = useSelector((state) => state.DMTabValuesReducer);
  const { selectedProject } = useSelector((state) => state.ProjectSetupReducer);
  const { DropDownValuesData } = useSelector(
    (state) => state.DropDownValuesReducer
  );
  const [storesTabList, setStoresTabDataList] = useState(dmTabValuesData);
  const [filteredDataList, setFilteredDataList] = useState(dmTabValuesData);
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
  const [formData, setFormData] = useState({});
  const [selectedTab, setSelectedTabData] = useState({});
  const [loader, setLoader] = useState(false);

  const navigateToDSBP = () => {
    navigate(`/myProjects/mapping/${selectedProject?.Project_ID}`);
  };

  const BU = selectedProject?.BU;
  // check whether project is from home care or baby care
  let isBUHomeCare = false;
  if (BU === "Home Care") {
    isBUHomeCare = true;
  }

  const addToProjectList = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
    { name: "Reject", code: "Reject" },
  ];

  const addToProjectListYes = [{ name: "Yes", code: "Yes" }];

  const addToProjectListNo = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
  ];

  const addToProjectListReject = [
    { name: "Yes", code: "Yes" },
    { name: "Reject", code: "Reject" },
  ];

  //   useEffect(() => {
  //     if (DropDownValuesData) {
  //       setActionDropDownValues(
  //         DropDownValuesData?.ArtworkAgilityTasksPage.Artwork_Alignment || []
  //       );
  //     }
  //   }, [DropDownValuesData]);

  //   useEffect(() => {
  //     if (
  //       actionDropDownValues !== undefined &&
  //       actionDropDownValues.length !== 0
  //     ) {
  //       setAISEList(actionDropDownValues.AISE);
  //       setAssemblyMechanismList(actionDropDownValues.Assembly_Mechanism);
  //     }
  //   }, [actionDropDownValues]);

  useEffect(() => {
    setFilteredDataList(dmTabValuesData);
  }, [dmTabValuesData]);

  useEffect(() => {
    setTabPanelList(dmTabValuesData?.length - 1);
    dispatch(DMTabValuesAction(dmTabValuesData));
  }, []);

  useEffect(() => {
    if (tabPanelList >= storesTabList?.length) {
      setTabPanelList(storesTabList.length - 1);
    }
    storesTabList !== undefined && dispatch(DMTabValuesAction(storesTabList));
    setSelectedTabData(dmTabValuesData[tabPanelList]);
    if (dmTabValuesData[tabPanelList]) {
      const selectedTabData = dmTabValuesData[tabPanelList];
      if (selectedTabData?.description !== undefined) {
        setAddToProjectValue(selectedTabData?.description?.AWM_AddedToProject);
        setAssemblyMechanismChange(
          selectedTabData?.description?.AWM_AssemblyMechanism
        );
        setAISEName(selectedTabData?.description?.AWM_AISE);
        setBioside(selectedTabData?.description?.AWM_Biocide);
        setSellable(selectedTabData?.description?.AWM_Sellable);
        setGroupName(selectedTabData?.description?.AWM_GroupPMP);
      }
    }
    setFormData({});
  }, [storesTabList, tabPanelList]);

  useEffect(() => {
    setSelectedTabData(dmTabValuesData[tabPanelList]);
    setAddToProjectValue("");
    if (dmTabValuesData[tabPanelList]) {
      const selectedTabData = dmTabValuesData[tabPanelList];
      if (selectedTabData?.description !== undefined) {
        setAddToProjectValue(selectedTabData?.description?.AWM_AddedToProject);
        setAssemblyMechanismChange(
          selectedTabData?.description?.AWM_AssemblyMechanism
        );
        setAISEName(selectedTabData?.description?.AWM_AISE);
        setBioside(selectedTabData?.description?.AWM_Biocide);
        setSellable(selectedTabData?.description?.AWM_Sellable);
        setGroupName(selectedTabData?.description?.AWM_GroupPMP);
      }
    }
    setFormData({});
  }, [dmTabValuesData]);

  useEffect(() => {
    if (dmTabValuesData) {
      setStoresTabDataList(dmTabValuesData || []);
    }
  }, [dmTabValuesData]);

  const onchangeAddToProject = (rowData, e, ele) => {
    rowData[ele] = e.target.value;
    setOnChangeData(rowData);
    if (e.target.value === "Reject") setRejectDialog(true);
    setRejectFormData({});
    if (e.target.value === "Yes") setHandleYesAddToPRoject(true);
    if (e.target.value === "No") {
      setAddToProjectValue(e.target.value);
      setFormData({
        ...formData,
        AWM_AddedToProject: e.target.value,
      });
    }
  };

  const handleAiseChange = (e) => {
    setAISEName(e.target.value);
    setFormData({
      ...formData,
      AWM_AISE: e.target.value,
    });
  };
  const handleAssemblyMechanismChange = (e) => {
    setAssemblyMechanismChange(e.target.value);
    setFormData({
      ...formData,
      AWM_AssemblyMechanism: e.target.value,
    });
  };

  const handleBiosideChange = (e) => {
    setBioside(e.target.value);
    setFormData({ ...formData, AWM_Biocide: e.target.value });
  };

  const handleSellableChange = (e) => {
    setSellable(e.target.value);
    setFormData({ ...formData, AWM_Sellable: e.target.value });
  };

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
    setFormData({
      ...formData,
      AWM_GroupPMP: e.target.value,
    });
  };

  const handleCancel = () => {
    return navigateToDSBP();
  };

  const updateArtWorkTabValuesData = (updatedNewData) => {
    console.log("updatedArtWorkTabValuesData updatedNewData", updatedNewData);
    console.log("updatedArtWorkTabValuesData selectedTab", selectedTab);
    let submittionData = {};
    submittionData = {
      tabHeader: selectedTab.tabHeader,
      description: updatedNewData && updatedNewData[0],
    };
    console.log("updatedArtWorkTabValuesData submittionData", submittionData);
    const indexToUpdate = dmTabValuesData.findIndex(
      (tab) => tab.tabHeader === submittionData.tabHeader
    );
    console.log("updatedArtWorkTabValuesData indexToUpdate", indexToUpdate);
    if (indexToUpdate !== -1) {
      // Create a copy of the dmTabValuesData array
      const updatedArtWorkTabValuesData = [...dmTabValuesData];

      // Replace the element at the index with the selectedTab object
      updatedArtWorkTabValuesData[indexToUpdate] = submittionData;

      // Update the state with the updated array
      setStoresTabDataList(updatedArtWorkTabValuesData);
      console.log(
        "updatedArtWorkTabValuesData updatedArtWorkTabValuesData",
        updatedArtWorkTabValuesData
      );
    }
  };

  const onSubmit = async (rejectFormData) => {
    setLoader(true);
    let updatedData = {};
    const selectionFormData = rejectFormData ? rejectFormData : formData;
    updatedData = {
      DSBP_InitiativeID: selectedTab?.description.DSBP_InitiativeID,
      DSBP_PMP_PIMaterialID: selectedTab?.description.DSBP_PMP_PIMaterialID,
      DSBP_PMP_PIMaterialNumber:
        selectedTab?.description.DSBP_PMP_PIMaterialNumber,
      FK_AWMProjectID: selectedProject?.Project_ID,
    };
    if (selectionFormData === "AddToProject") {
      updatedData.AWM_AddedToProject = "Yes";
      setHandleYesAddToPRoject(false);
    } else {
      updatedData = { ...updatedData, ...selectionFormData };
    }
    setRejectDialog(false);

    const updatedPmpDetails = { ArtworkAgilityPMPs: [updatedData] };

    await onSubmitDsbpAction(updatedPmpDetails);
    const resp = await getDsbpPMPDetails(selectedProject.Project_ID);

    let updatedNewData =
      resp &&
      resp[0].DSBP_PMP_PIMaterialIDPage?.filter(
        (data) =>
          data.DSBP_PMP_PIMaterialID ===
          selectedTab.description.DSBP_PMP_PIMaterialID
      );
    updatedNewData = updatedNewData.map((data) => ({
      DSBP_InitiativeID: resp && resp[0].DSBP_InitiativeID,
      ...data,
    }));
    updateArtWorkTabValuesData(updatedNewData);
    setFormData({});
    setLoader(false);
  };

  const renderData = (tabData) => {
    // let jsonColumnWidth = localStorage.getItem("columnWidthDSBPArtwork");
    let jsonColumnWidth = isBUHomeCare
      ? localStorage.getItem("columnWidthDSBPArtworkHomeCare")
      : localStorage.getItem("columnWidthDSBPArtworkBabyCare");

    let allColumns = JSON.parse(jsonColumnWidth);

    const convertedInObject = [tabData];
    if (allColumns && allColumns.length) {
      return allColumns.map((field, index) => {
        const value = field?.Field_Name;
        const filteredItems = convertedInObject?.filter(
          (item) => item && item[value] !== undefined
        );
          console.log("filteredItems", filteredItems);
        return filteredItems.map((item) => (
          <tr key={item[value]}>
            <td className="columnWidth">{field.Field_Name}</td>
            <td>
              {field.Field_Name === "AWM_AddedToProject" && (
                <Form.Group controlId="groupName.ControlInput1">
                  <Form.Select
                    value={addToProjectValue}
                    placeholder="Select"
                    onChange={(e) => onchangeAddToProject(tabData, e, field)}
                    style={{ fontSize: 12 }}
                  >
                    <option value="">Select</option>
                    {addToProjectValue === "" &&
                      addToProjectList.map((data) => (
                        <option key={data.code} value={data.name}>
                          {data.name}
                        </option>
                      ))}
                    {addToProjectValue === "Yes" &&
                      addToProjectListYes.map((data) => (
                        <option key={data.code} value={data.name}>
                          {data.name}
                        </option>
                      ))}
                    {addToProjectValue === "No" &&
                      addToProjectListNo.map((data) => (
                        <option key={data.code} value={data.name}>
                          {data.name}
                        </option>
                      ))}
                    {addToProjectValue === "Reject" &&
                      addToProjectListReject.map((data) => (
                        <option key={data.code} value={data.name}>
                          {data.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              )}
              {field.Field_Name === "AWM_AISE" && (
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
              )}
              {field.Field_Name === "AWM_AssemblyMechanism" && (
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
              )}
              {field.Field_Name === "AWM_Biocide" && (
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
              )}
              {field.Field_Name === "AWM_GroupPMP" && (
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
              )}
              {field.Field_Name === "AWM_Sellable" && (
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
              )}
              {field.Field_Name !== "AWM_AddedToProject" &&
                field.Field_Name !== "AWM_AISE" &&
                field.Field_Name !== "AWM_AssemblyMechanism" &&
                field.Field_Name !== "AWM_Biocide" &&
                field.Field_Name !== "AWM_Sellable" &&
                field.Field_Name !== "AWM_GroupPMP" &&
                item[value]}
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
                <tbody>{renderData(obj?.description)}</tbody>
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
        {index !== 0 && (
          <button className="close-button" onClick={() => handleDelete(index)}>
            &#x2715;
          </button>
        )}
      </div>
    );
  };
  const onTabChange = (index) => {
    setTabPanelList(index);
    if (index === 0) {
      return navigateToDSBP();
    }
  };
  const renderTabs = () => {
    return filteredDataList.map((obj, index) => (
      <TabPanel
        key={index}
        header={
          <CustomTabHeader
            tabHeader={index === 0 ? "Mapping" : obj.tabHeader}
            index={index}
          />
        }
        scrollable
      >
        <>{loader ? <Loading /> : index !== 0 && tabsCompo(obj)}</>
      </TabPanel>
    ));
  };

  return (
    console.log("dmTabValuesData filteredDataList", filteredDataList),
    (
      <>
        {dmTabValuesData?.length > 1 && tabPanelList !== 0 ? (
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
            onSubmit={() => onSubmit(rejectFormData)}
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
            onActionSubmit={onSubmit}
          />
        )}
        <FooterButtons
          handleCancel={handleCancel}
          hideSaveButton={true}
          onSubmit={onSubmit}
          formValid={Object.keys(formData).length === 0}
          checkReadWriteAccess={!false}
        />
      </>
    )
  );
};

export default DMPMPSpecificTabView;
