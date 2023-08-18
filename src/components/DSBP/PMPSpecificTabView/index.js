import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Carousel, Form } from "react-bootstrap";
import "./index.scss";
import { Accordion } from "react-bootstrap";
import { Loading } from "../../../utils";
import { ArtWorkTabValuesAction } from "../../../store/actions/ArtWorkTabValuesActions";
import { onSubmitDsbpAction, getDsbpPMPDetails } from "../../../apis/dsbpApi";
import DsbpCommonPopup from "../DsbpCommonPopup";
import DsbpRejectDialog from "../RejectDialog";
import DsbpActionDialog from "../DsbpActionDialog";
import FooterButtons from "../../AWMJobs/DesignJobs/FooterButtons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomHeaderComponent from "./CustomHeaderComponent";

const PMPSpecificTabView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { artWorkTabValuesData } = useSelector(
    (state) => state.ArtWorkTabValuesReducer
  );
  const { selectedProject } = useSelector((state) => state.ProjectSetupReducer);
  const { DropDownValuesData } = useSelector(
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
  const [formData, setFormData] = useState({});
  const [selectedTab, setSelectedTabData] = useState({});
  const [loader, setLoader] = useState(false);

  const navigateToDSBP = () => {
    navigate(`/myProjects/artworkAlignment/${selectedProject?.Project_ID}`);
  };

  const BU = selectedProject?.BU;

  // check whether project is from home care or baby care
  let isBUHomeCare = false;
  if (BU === "Home Care") {
    isBUHomeCare = true;
  }

  const optionsList = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" }
  ];

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
    storesTabList !== undefined &&
      dispatch(ArtWorkTabValuesAction(storesTabList));
    setSelectedTabData(artWorkTabValuesData[tabPanelList]);
    if (artWorkTabValuesData[tabPanelList]) {
      const selectedTabData = artWorkTabValuesData[tabPanelList];
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
    setSelectedTabData(artWorkTabValuesData[tabPanelList]);
    setAddToProjectValue("");
    if (artWorkTabValuesData[tabPanelList]) {
      const selectedTabData = artWorkTabValuesData[tabPanelList];
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
  }, [artWorkTabValuesData]);

  useEffect(() => {
    if (artWorkTabValuesData) {
      setStoresTabDataList(artWorkTabValuesData || []);
    }
  }, [artWorkTabValuesData]);

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
    const indexToUpdate = artWorkTabValuesData.findIndex(
      (tab) => tab.tabHeader === submittionData.tabHeader
    );
    console.log("updatedArtWorkTabValuesData indexToUpdate", indexToUpdate);
    if (indexToUpdate !== -1) {
      // Create a copy of the artWorkTabValuesData array
      const updatedArtWorkTabValuesData = [...artWorkTabValuesData];

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
    if (rejectFormData) {
      updatedData.AWM_AddedToProject = "Reject";
    }
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

    if (resp && resp?.length) {
      const updatedNewData = resp?.flatMap((item) =>
        item.DSBP_PMP_PIMaterialIDPage?.map((person) => ({
          DSBP_InitiativeID: item.DSBP_InitiativeID,
          ...person,
        }))
      );

      const filteredIds = Array.from(
        new Set(
          updatedNewData
            .filter((item) => item.DSBP_PMP_PIMaterialNumber === selectedTab.description.DSBP_PMP_PIMaterialNumber)
            .map((item) => item)
        )
      );

      console.log("updatedNewData filteredIds", filteredIds)
      updateArtWorkTabValuesData(filteredIds);
    }
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
        // const filteredItems = convertedInObject?.filter(
        //   (item) => item && item[value] !== undefined
        // );
        return convertedInObject.map((item) => {
          const fieldEditable = item && item["AWM_AddedToProject"] === "Yes";
          console.log("tab fieldEditable", fieldEditable);
          return (
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
                      disabled={!fieldEditable}
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
                        disabled={!fieldEditable}
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
                        <div>
                          <Form.Select
                            value={bioside}
                            placeholder="Select Bioside"
                            onChange={handleBiosideChange}
                              disabled={!fieldEditable}
                        >
                          <option value="">Select Bioside</option>
                          {optionsList.map((data) => (
                            <option key={data.code} value={data.name}>
                            {data.name}
                          </option>
                          ))}
                        </Form.Select>
                        </div>
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
                      disabled={!fieldEditable}
                    />
                  </Form.Group>
                )}
                {field.Field_Name === "AWM_Sellable" && (
                  <Form.Group
                    className={`mb-2`}
                    controlId="groupName.ControlInput1"
                  >
                    <div>
                      <Form.Select
                        value={sellable}
                        placeholder="Select Sellable"
                        onChange={handleSellableChange}
                          disabled={!fieldEditable}
                    >
                      <option value="">Select Sellable</option>
                      {optionsList.map((data) => (
                        <option key={data.code} value={data.name}>
                        {data.name}
                      </option>
                      ))}
                    </Form.Select>
                    </div>
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
          )

        });
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
      setTabPanelList(storesTabList.length - 1); 
    }
  };

  
  const onTabChange = (index) => {
    setTabPanelList(index);
    if (index === 0) {
      return navigateToDSBP();
    }
  };
  
  const renderTabs = () => {
    return (
      filteredDataList.map((obj, index) => (
        <TabPanel
          key={index}
          header={
              <CustomHeaderComponent
                tabHeaderDetails={obj}
                index={index}
                handleDelete={handleDelete}
              />
          }
          scrollable
        >
          <>{loader ? <Loading /> : index !== 0 && tabsCompo(obj)}</>
        </TabPanel>
      )))
  };


  return (
    (
      <>
        {artWorkTabValuesData?.length > 1 && tabPanelList !== 0 ? (
          <TabView
            activeIndex={tabPanelList}
            scrollable = {artWorkTabValuesData.length > 3 ? true : false}
            onTabChange={(e) => onTabChange(e.index)}
          >
            {renderTabs()} tabHeader
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

export default PMPSpecificTabView;
