import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Form } from "react-bootstrap";
import "./index.scss";
import { Accordion } from "react-bootstrap";
import { Loading } from "../../../utils";
import { DMTabValuesAction } from "../../../store/actions/DMTabValuesActions";
import {
  onSubmitDsbpAction,
  getDsbpPMPDetails,
  onSubmitDependencyMappingAction,
  getDependencyMappingDetails,
} from "../../../apis/dsbpApi";
import DsbpCommonPopup from "../DsbpCommonPopup";
import DsbpRejectDialog from "../RejectDialog";
import DsbpActionDialog from "../DsbpActionDialog";
import FooterButtons from "../../AWMJobs/DesignJobs/FooterButtons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import { cloneDeep } from "lodash";

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
  const [cdpt, setCDPT] = useState("");
  const [rdt, setRDT] = useState("");
  const [iq, setIQ] = useState("");
  const [cicNeeded, setCICNeeded] = useState("");
  const [pmpDesign, setPMPDesign] = useState("");
  const [pmpLayout, setPMPLayout] = useState("");
  const [otherRef, setOtherRef] = useState("");
  const [gaBrief, setGaBrief] = useState("");

  const [sellable, setSellable] = useState("");
  const [formData, setFormData] = useState({});
  const [selectedTab, setSelectedTabData] = useState({});
  const [loader, setLoader] = useState(false);
  const [awmOtherReference, setAwmOtherReference] = useState("");
  const { dmTabAttributesData } = useSelector(
    (state) => state.DMTabValuesReducer
  );

  // const dmTabData = cloneDeep(dmTabAttributesData);
  const [dmTabData, setDmTabData] = useState(dmTabAttributesData);
  console.log("dmTabData", dmTabData);

  const navigateToDSBP = () => {
    navigate(`/myProjects/mapping/${selectedProject?.Project_ID}`);
  };

  const BU = selectedProject?.BU;
  // check whether project is from home care or baby care////
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

  const updateMappingData = (value, columnName, id) => {
    const tempData = cloneDeep(dmTabData);
    console.log("value", value, columnName);
    tempData.DMMappingData.forEach((data) => {
      if (data.DSBP_PMP_PIMaterialID === id) {
        data[columnName] = value;
        if (columnName === "AWM_CIC_Needed") {
          if (value !== "No") {
            data["AWM_Supporting_PMP_Design"] = "";
            data["AWM_Supporting_PMP_Layout"] = "";
          }
        }
      }
    });
    setDmTabData(tempData);
    console.log("dmTabData.DMMappingData", dmTabData.DMMappingData);
    console.log("tempData.DMMappingData", tempData.DMMappingData);
  };

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
    console.log("###insideDMPMPSpecificTabView: ", dmTabValuesData);
    dispatch(DMTabValuesAction(dmTabValuesData));
  }, []);

  useEffect(() => {
    if (tabPanelList >= storesTabList?.length) {
      setTabPanelList(storesTabList.length - 1);
    }
    console.log("###insideDMPMPSpecificTabView: ", storesTabList);
    storesTabList !== undefined && dispatch(DMTabValuesAction(storesTabList));
    setSelectedTabData(dmTabValuesData[tabPanelList]);
    if (dmTabValuesData[tabPanelList]) {
      const selectedTabData = dmTabValuesData[tabPanelList];
      console.log("selectedTabData1: ", selectedTabData);
      if (selectedTabData?.description !== undefined) {
        setCDPT(
          selectedTabData?.description?.AWM_CDPT_Page?.map(
            (obj) => obj.AWM_Design_Job_ID
          )
        );
        setRDT(
          selectedTabData?.description?.AWM_RDT_Page?.map(
            (obj) => obj.AWM_Design_Job_ID
          )
        );
        setIQ(
          selectedTabData?.description?.AWM_IQ_Page?.map(
            (obj) => obj.AWM_Design_Job_ID
          )
        );
        setCICNeeded(selectedTabData?.description?.AWM_CIC_Needed);
        setPMPDesign(selectedTabData?.description?.AWM_Supporting_PMP_Design);
        setPMPLayout(selectedTabData?.description?.AWM_Supporting_PMP_Layout);
        setOtherRef(selectedTabData?.description?.AWM_Other_Reference);
        setFormData({
          DSBP_InitiativeID: selectedTabData?.description?.DSBP_InitiativeID,
          DSBP_PMP_PIMaterialID:
            selectedTabData?.description?.DSBP_PMP_PIMaterialID,
          DSBP_PMP_PIMaterialNumber:
            selectedTabData?.description?.DSBP_PMP_PIMaterialNumber,
          AWM_CICNeeded: selectedTabData?.description?.AWM_CIC_Needed,
          AWM_SupportingPMPLayout:
            selectedTabData?.description?.AWM_Supporting_PMP_Layout,
          AWM_SupportingPMPDesign:
            selectedTabData?.description?.AWM_Supporting_PMP_Design,
          AWM_OtherReference: selectedTabData?.description?.AWM_Other_Reference,
          AWM_GABrief: selectedTabData?.description?.AWM_GA_Brief,
          DSBP_RDT_Page: selectedTabData?.description?.AWM_RDT_Page,
          DSBP_CDPT_Page: selectedTabData?.description?.AWM_CDPT_Page,
          DSBP_IQ_Page: selectedTabData?.description?.AWM_IQ_Page,
        });
      }
    }
    // setFormData({});
  }, [storesTabList, tabPanelList]);

  useEffect(() => {
    setSelectedTabData(dmTabValuesData[tabPanelList]);
    if (dmTabValuesData[tabPanelList]) {
      const selectedTabData = dmTabValuesData[tabPanelList];
      console.log("selectedTabData2: ", selectedTabData);
      if (selectedTabData?.description !== undefined) {
        setCDPT(
          selectedTabData?.description?.AWM_CDPT_Page?.map(
            (obj) => obj.AWM_Design_Job_ID
          )
        );
        setRDT(
          selectedTabData?.description?.AWM_RDT_Page?.map(
            (obj) => obj.AWM_Design_Job_ID
          )
        );
        setIQ(
          selectedTabData?.description?.AWM_IQ_Page?.map(
            (obj) => obj.AWM_Design_Job_ID
          )
        );
        setCICNeeded(selectedTabData?.description?.AWM_CIC_Needed);
        setPMPDesign(selectedTabData?.description?.AWM_Supporting_PMP_Design);
        setPMPLayout(selectedTabData?.description?.AWM_Supporting_PMP_Layout);
        setOtherRef(selectedTabData?.description?.AWM_Other_Reference);
        setFormData({
          DSBP_InitiativeID: selectedTabData?.description?.DSBP_InitiativeID,
          DSBP_PMP_PIMaterialID:
            selectedTabData?.description?.DSBP_PMP_PIMaterialID,
          DSBP_PMP_PIMaterialNumber:
            selectedTabData?.description?.DSBP_PMP_PIMaterialNumber,
          AWM_CICNeeded: selectedTabData?.description?.AWM_CIC_Needed,
          AWM_SupportingPMPLayout:
            selectedTabData?.description?.AWM_Supporting_PMP_Layout,
          AWM_SupportingPMPDesign:
            selectedTabData?.description?.AWM_Supporting_PMP_Design,
          AWM_OtherReference: selectedTabData?.description?.AWM_Other_Reference,
          AWM_GABrief: selectedTabData?.description?.AWM_GA_Brief,
          DSBP_RDT_Page: selectedTabData?.description?.AWM_RDT_Page,
          DSBP_CDPT_Page: selectedTabData?.description?.AWM_CDPT_Page,
          DSBP_IQ_Page: selectedTabData?.description?.AWM_IQ_Page,
        });
      }
    }
    // setFormData({});
  }, [dmTabValuesData]);

  useEffect(() => {
    if (dmTabValuesData) {
      setStoresTabDataList(dmTabValuesData || []);
    }
  }, [dmTabValuesData]);

  const handleCDPTChange = (e) => {
    console.log("e.target.value", e.target.value);
    setCDPT(e.target.value);

    const DSBP_CDPT_Page = [];
    dmTabData.CDPTPageData.find((data) => {
      e.target.value.forEach((val) => {
        if (data.AWM_Design_Job_ID === val) {
          DSBP_CDPT_Page.push({
            Design_Job_Name: data.AWM_Design_Job_Name,
            Design_Job_ID: data.AWM_Design_Job_ID,
          });
        }
      });
    });
    console.log("DSBP_CDPT_Page: ", DSBP_CDPT_Page);
    setFormData({
      ...formData,
      DSBP_CDPT_Page,
    });
  };
  const handleRDTchange = (e) => {
    setRDT(e.target.value);

    const DSBP_RDT_Page = [];
    dmTabData.RDTData.forEach((data) => {
      e.target.value.forEach((val) => {
        if (data.AWM_Design_Job_ID === val) {
          DSBP_RDT_Page.push({
            Design_Job_Name: data.AWM_Design_Job_Name,
            Design_Job_ID: data.AWM_Design_Job_ID,
          });
        }
      });
    });
    console.log("DSBP_RDT_Page: ", DSBP_RDT_Page);
    setFormData({
      ...formData,
      DSBP_RDT_Page,
    });
  };

  const handleIQChange = (e) => {
    setIQ(e.target.value);

    const DSBP_IQ_Page = [];
    dmTabData.IQData.forEach((data) => {
      e.target.value.forEach((val) => {
        if (data.AWM_Design_Job_ID === val) {
          DSBP_IQ_Page.push({
            Design_Job_Name: data.AWM_Design_Job_Name,
            Design_Job_ID: data.AWM_Design_Job_ID,
          });
        }
      });
    });
    console.log("DSBP_IQ_Page: ", DSBP_IQ_Page);
    setFormData({
      ...formData,
      DSBP_IQ_Page,
    });
  };

  const handleCICNeededChange = (e) => {
    setCICNeeded(e.target.value);
    if (e.target.value !== "No") {
      setPMPDesign("");
      setPMPLayout("");
    }
    setFormData({
      ...formData,
      AWM_CICNeeded: e.target.value,
      AWM_SupportingPMPDesign: "",
      AWM_SupportingPMPLayout: "",
    });
  };

  const handlePmpDesignChange = (e) => {
    setPMPDesign(e.target.value);
    setFormData({
      ...formData,
      AWM_SupportingPMPDesign: e.target.value,
    });
  };
  const handlePmpLayoutChange = (e) => {
    setPMPLayout(e.target.value);
    setFormData({
      ...formData,
      AWM_SupportingPMPLayout: e.target.value,
    });
  };
  const handleOtherRefChange = (e) => {
    setOtherRef(e.target.value);
    setFormData({
      ...formData,
      AWM_OtherReference: e.target.value,
    });
  };

  const handleGABriefChange = (e) => {
    setGaBrief(e.target.value);
    setFormData({
      ...formData,
      AWM_GABrief: e.target.value,
    });
  };

  const handleCancel = () => {
    return navigateToDSBP();
  };

  const updateMappingTabValuesData = (updatedNewData) => {
    console.log("updateMappingTabValuesData updatedNewData", updatedNewData);
    console.log("updateMappingTabValuesData selectedTab", selectedTab);
    let submittionData = {};
    submittionData = {
      tabHeader: selectedTab.tabHeader,
      description: updatedNewData && updatedNewData[0],
    };
    console.log("updateMappingTabValuesData submittionData", submittionData);
    const indexToUpdate = dmTabValuesData.findIndex(
      (tab) => tab.tabHeader === submittionData.tabHeader
    );
    console.log("updateMappingTabValuesData indexToUpdate", indexToUpdate);
    if (indexToUpdate !== -1) {
      // Create a copy of the dmTabValuesData array
      const updateMappingTabValuesData = [...dmTabValuesData];

      // Replace the element at the index with the selectedTab object
      updateMappingTabValuesData[indexToUpdate] = submittionData;

      // Update the state with the updated array
      setStoresTabDataList(updateMappingTabValuesData);
      console.log(
        "updateMappingTabValuesData updateMappingTabValuesData",
        updateMappingTabValuesData
      );
    }
  };

  const onSubmit = async () => {
    setLoader(true);
    const updatedPmpDetails = { DSBPValues: [formData] };
    console.log("updatedPmpDetails", updatedPmpDetails);

    await onSubmitDependencyMappingAction(
      updatedPmpDetails,
      selectedProject?.Project_ID
    );

    const {
      dependencyTableData,
      isRDTData,
      isIQData,
      isCDPTData,
      isGABrifData,
    } = await getDependencyMappingDetails(selectedProject?.Project_ID);
    const tableData = fetchData(
      dependencyTableData,
      isRDTData,
      isIQData,
      isCDPTData,
      isGABrifData
    );
    console.log("tableData: ", tableData);
    // const resp = await getDsbpPMPDetails(selectedProject.Project_ID);

    let updatedNewTabData = tableData?.filter(
      (data) =>
        data.DSBP_PMP_PIMaterialID ===
        selectedTab.description.DSBP_PMP_PIMaterialID
    );
    // updatedNewTabData = updatedNewTabData.map((data) => ({
    //   DSBP_InitiativeID: resp && resp[0].DSBP_InitiativeID,
    //   ...data,
    // }));
    console.log("updatedNewTabData: ", updatedNewTabData);
    updateMappingTabValuesData(updatedNewTabData);
    // setFormData({});
    setLoader(false);
  };
  const fetchData = (
    dependencyTableData,
    isRDTData,
    isIQData,
    isCDPTData,
    isGABrifData
  ) => {
    if (dependencyTableData && dependencyTableData.length) {
      const transformedData = dependencyTableData.map((item) => {
        let transformedItem = {
          DSBP_InitiativeID: item.DSBP_InitiativeID,
          DSBP_PMP_PIMaterialDescription: item.DSBP_PMP_PIMaterialDescription,
          DSBP_PMP_PIMaterialID: item.DSBP_PMP_PIMaterialID,
          DSBP_PMP_PIMaterialNumber: item.DSBP_PMP_PIMaterialNumber,
        };
        if (isRDTData && isRDTData.length) {
          transformedItem.AWM_RDT_Page = item.Preselected_AWM_RDT_Page || [];
        }

        if (isCDPTData && isCDPTData.length) {
          transformedItem.AWM_CDPT_Page = item.Preselected_AWM_CDPT_Page || [];
        }
        if (isIQData && isIQData.length) {
          transformedItem.AWM_IQ_Page = item.Preselected_AWM_IQ_Page || [];
        }

        transformedItem = {
          ...transformedItem,
          ...item?.AWM_CIC_Page?.[0],
        };

        if (isGABrifData && isGABrifData.length) {
          transformedItem.AWM_GA_Brief = item.Preselected_DSBP_GA_Brief || "";
        }

        transformedItem = {
          ...transformedItem,
          DSM_PICountry_Countries: item.DSM_PICountry_Countries,
          DSM_PILanguage_Languages: item.DSM_PILanguage_Languages,
          DSM_PMP_PMPPackagingComponentType:
            item.DSM_PMP_PMPPackagingComponentType,
          DSM_PMP_PackagingSize: item.DSM_PMP_PackagingSize,
          DSM_PMP_PrinterPrimary: item.DSM_PMP_PrinterPrimary,
          DSM_PMP_PrinterSecondary: item.DSM_PMP_PrinterSecondary,
          DSM_PMP_PrintingProcess: item.DSM_PMP_PrintingProcess,
          DSM_PMP_SubstrateColor: item.DSM_PMP_SubstrateColor,
          DSM_PMP_TD_TDStatus: item.DSM_PMP_TD_TDStatus,
          DSM_PMP_TD_TDValue: item.DSM_PMP_TD_TDValue,
          DSM_PO_PMP_poMaterialNumber: item.DSM_PO_PMP_poMaterialNumber,
          ...item?.FPCStagingPage?.[0],
        };
        return transformedItem;
      });
      // console.log("AWM_CIC_Page", isRDTData, isIQData, isCDPTData);
      let columnNames = Object.keys(transformedData[2]);
      const filteredColumnNames = columnNames.filter(
        (property) => property !== "FPCStagingPage"
      );

      let groupedColumnNames = [];

      filteredColumnNames.map((colName) => {
        let groupedObject = {};
        let splittedCol = colName.split("_");
        groupedObject["field"] = colName;
        groupedObject["width"] = 250;
        groupedObject["freeze"] = false;
        if (splittedCol[0] === "DSBP") {
          groupedObject["group"] = 1;
        }
        if (splittedCol[0] === "AWM") {
          groupedObject["group"] = 2;
        }
        if (splittedCol[0] === "DSM") {
          groupedObject["group"] = 3;
        }
        groupedColumnNames.push(groupedObject);
        return groupedColumnNames;
      });

      // setCDPTPageData(isCDPTData);
      // setIQData(isIQData);
      // setRDTData(isRDTData);
      // setGABriefData(isGABrifData);
      // setDependencyColumnNames(groupedColumnNames);
      // setDependencyMappingData(transformedData);
      console.log("transformedData:", transformedData);
      return transformedData;
    }
  };

  const renderData = (tabData, group) => {
    let allColumns = dmTabData.DMColumnNames;
    const groupOneCols = allColumns.filter((col) => col.group === 1);
    const groupTwoCols = allColumns.filter((col) => col.group === 2);
    const groupThreeCols = allColumns.filter((col) => col.group === 3);

    const convertedInObject = dmTabData.DMMappingData.filter((obj) => {
      return obj.DSBP_PMP_PIMaterialID === tabData?.DSBP_PMP_PIMaterialID;
    });
    console.log(
      "allColumns,convertedInObject DM",
      allColumns,
      groupOneCols,
      groupTwoCols,
      groupThreeCols,
      convertedInObject
    );

    const groupColumns =
      group === "groupOne"
        ? groupOneCols
        : group === "groupTwo"
        ? groupTwoCols
        : group === "groupThree"
        ? groupThreeCols
        : allColumns;
    if (groupColumns && groupColumns.length) {
      return groupColumns.map((field, index) => {
        const value = field?.field;
        // const filteredItems = convertedInObject?.filter(
        //   (item) => item && item[value] !== undefined
        // );

        return convertedInObject.map((item) => (
          <tr key={item[value]}>
            <td className="columnWidth">{field.field}</td>
            <td>
              {field.field === "AWM_CDPT_Page" && (
                <div>
                  <MultiSelect
                    value={cdpt}
                    onChange={handleCDPTChange}
                    options={
                      dmTabData.CDPTPageData
                        ? dmTabData.CDPTPageData.map((obj) => ({
                            label: obj.AWM_Design_Job_Name,
                            value: obj.AWM_Design_Job_ID,
                          }))
                        : []
                    }
                    filter
                    placeholder={`Select AWM CDPT Page`}
                    maxSelectedLabels={3}
                    className="p-column-filter"
                  />
                </div>
              )}
              {field.field === "AWM_RDT_Page" && (
                <div>
                  <MultiSelect
                    value={rdt}
                    onChange={handleRDTchange}
                    options={
                      dmTabData.RDTData
                        ? dmTabData.RDTData.map((obj) => ({
                            label: obj.AWM_Design_Job_Name,
                            value: obj.AWM_Design_Job_ID,
                          }))
                        : []
                    }
                    filter
                    placeholder={`Select AWM RDT Page`}
                    maxSelectedLabels={3}
                    className="p-column-filter"
                  />
                </div>
              )}
              {field.field === "AWM_IQ_Page" && (
                <div>
                  <MultiSelect
                    value={iq}
                    onChange={handleIQChange}
                    options={
                      dmTabData.IQData
                        ? dmTabData.IQData.map((obj) => ({
                            label: obj.AWM_Design_Job_Name,
                            value: obj.AWM_Design_Job_ID,
                          }))
                        : []
                    }
                    filter
                    placeholder={`Select AWM IQ Page`}
                    maxSelectedLabels={3}
                    className="p-column-filter"
                  />
                </div>
              )}
              {field.field === "AWM_CIC_Needed" && (
                <Form.Group controlId="groupName.ControlInput1">
                  <Form.Select
                    placeholder="Select"
                    value={cicNeeded}
                    onChange={handleCICNeededChange}
                    style={{ width: "80%", fontSize: 12 }}
                  >
                    <option value="">Select</option>
                    {dmTabData.cicNeededOptionList?.map((data) => (
                      <option key={data.code} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}
              {field.field === "AWM_Supporting_PMP_Design" &&
                (cicNeeded === "" ||
                !cicNeeded ||
                cicNeeded === "Yes" ||
                cicNeeded === "N/A" ? (
                  " "
                ) : (
                  <Form.Group
                    controlId="groupName.ControlInput1"
                    // style={{ textAlign: "-webkit-center" }}
                  >
                    <Form.Select
                      placeholder="Select"
                      value={pmpDesign}
                      onChange={handlePmpDesignChange}
                      style={{ width: "80%", fontSize: 12 }}
                    >
                      <option value="">Select</option>
                      {dmTabData.SPMPDesignData?.map((data) => (
                        <option key={data.code} value={data.name}>
                          {data.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                ))}
              {field.field === "AWM_Supporting_PMP_Layout" &&
                (cicNeeded === "" ||
                !cicNeeded ||
                cicNeeded === "Yes" ||
                cicNeeded === "N/A" ? (
                  " "
                ) : (
                  <Form.Group controlId="groupName.ControlInput1">
                    <Form.Select
                      placeholder="Select"
                      value={pmpLayout}
                      onChange={handlePmpLayoutChange}
                      style={{ width: "80%", fontSize: 12 }}
                    >
                      <option value="">Select</option>
                      {dmTabData.SPMPLayoutData?.map((data) => (
                        <option key={data.code} value={data.name}>
                          {data.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                ))}
              {field.field === "AWM_Other_Reference" &&
                (cicNeeded === "" ||
                !cicNeeded ||
                cicNeeded === "Yes" ||
                cicNeeded === "No" ? (
                  " "
                ) : (
                  <Form.Group controlId="groupName.ControlInput1">
                    <Form.Control
                      placeholder="Enter Reference No."
                      type="number"
                      maxLength={8}
                      value={otherRef}
                      onChange={handleOtherRefChange}
                      style={{ width: "80%", fontSize: 12 }}
                    ></Form.Control>
                  </Form.Group>
                ))}
              {field.field === "AWM_GA_Brief" && (
                <div>
                  <Form.Group
                    controlId="groupName.ControlInput1"
                    // style={{ textAlign: "-webkit-center" }}
                  >
                    <Form.Select
                      placeholder="Select"
                      value={gaBrief}
                      onChange={handleGABriefChange}
                      style={{ width: "80%", fontSize: 12 }}
                    >
                      <option value="">Select</option>

                      {dmTabData.GABriefData?.map((data) => (
                        <option key={data.File_Name} value={data.File_Name}>
                          {data.File_Name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {field.field !== "AWM_CDPT_Page" &&
                field.field !== "AWM_RDT_Page" &&
                field.field !== "AWM_IQ_Page" &&
                field.field !== "AWM_CIC_Needed" &&
                field.field !== "AWM_Supporting_PMP_Design" &&
                field.field !== "AWM_Supporting_PMP_Layout" &&
                field.field !== "AWM_Other_Reference" &&
                item[value]}
            </td>
          </tr>
        ));
      });
    }
    return null;
  };

  const tabsCompo = (obj) => (
    <div className="tabsCompo">
      <div className="tabsCompoMainDM">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="pmp-details">
              PMP Details
            </Accordion.Header>
            <Accordion.Body className="pmp-details">
              <table className="table table-sm table-hover">
                <tbody>{renderData(obj?.description, "groupOne")}</tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="mapping">Mapping</Accordion.Header>
            <Accordion.Body className="mapping">
              <table className="table table-sm table-hover">
                <tbody>{renderData(obj?.description, "groupTwo")}</tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header className="dsm-fields">
              DSM Fields
            </Accordion.Header>
            <Accordion.Body className="dsm-fields">
              <table className="table table-sm table-hover">
                <tbody>{renderData(obj?.description, "groupThree")}</tbody>
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
            tabHeader={index === 0 ? "Dependency Mapping" : obj.tabHeader}
            index={index}
          />
        }
        scrollable
      >
        {/* <>{loader ? <Loading /> : index !== 0 && alert(JSON.stringify(obj))}</> */}
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
