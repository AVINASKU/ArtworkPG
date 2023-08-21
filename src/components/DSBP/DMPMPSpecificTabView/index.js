import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Form } from "react-bootstrap";
import "./index.scss";
import { Accordion } from "react-bootstrap";
import { Loading } from "../../../utils";
import { DMTabValuesAction } from "../../../store/actions/DMTabValuesActions";
import {
  onSubmitDependencyMappingAction,
  getDependencyMappingDetails,
  createNewGaBriefTask,
} from "../../../apis/dsbpApi";
import FooterButtons from "../../AWMJobs/DesignJobs/FooterButtons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import CustomHeader from "./CustomHeader";

const DMPMPSpecificTabView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dmTabValuesData } = useSelector((state) => state.DMTabValuesReducer);
  const { selectedProject } = useSelector((state) => state.ProjectSetupReducer);
  const [storesTabList, setStoresTabDataList] = useState(dmTabValuesData);
  const [filteredDataList, setFilteredDataList] = useState(dmTabValuesData);
  const [tabPanelList, setTabPanelList] = useState(1);
  const [cdpt, setCDPT] = useState("");
  const [rdt, setRDT] = useState("");
  const [iq, setIQ] = useState("");
  const [cicNeeded, setCICNeeded] = useState("");
  const [pmpDesign, setPMPDesign] = useState("");
  const [pmpLayout, setPMPLayout] = useState("");
  const [otherRef, setOtherRef] = useState("");
  const [gaBrief, setGaBrief] = useState("");
  const [formData, setFormData] = useState({});
  const [selectedTab, setSelectedTabData] = useState({});
  const [loader, setLoader] = useState(false);
  const { dmTabAttributesData } = useSelector(
    (state) => state.DMTabValuesReducer
  );

  const [dmTabData, setDmTabData] = useState(dmTabAttributesData);
  console.log("dmTabData", dmTabData);

  const navigateToDSBP = () => {
    navigate(`/myProjects/dependencyMapping/${selectedProject?.Project_ID}`);
  };

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
        console.log("selected tab data", selectedTabData?.description);
        setCDPT(selectedTabData?.description?.AWM_CDPT_Page);
        setRDT(selectedTabData?.description?.AWM_RDT_Page);
        setIQ(selectedTabData?.description?.AWM_IQ_Page);
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
          AWM_GABrief: selectedTabData?.description?.AWM_GA_Brief || " ",
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
      if (selectedTabData?.description !== undefined) {
        setCDPT(selectedTabData?.description?.AWM_CDPT_Page);
        setRDT(selectedTabData?.description?.AWM_RDT_Page);
        setIQ(selectedTabData?.description?.AWM_IQ_Page);
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
          AWM_GABrief: selectedTabData?.description?.AWM_GA_Brief || " ",
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

    const handleNewGaBrief = async () => {
    let formData = {
      NewGABTask: "Yes",
      AWM_Project_ID: selectedProject?.Project_ID,
      AWM_Task_ID: "",
      Project_Name: selectedProject?.Project_Name,
      BU: selectedProject?.BU,
      Region: selectedProject?.Project_region,
    };
    let res = await createNewGaBriefTask(formData);
    console.log("res", res);
  };

  const handleCDPTChange = (e) => {
    console.log("e.target.value", e.target.value);
    setCDPT(e.target.value);

    setFormData({
      ...formData,
      DSBP_CDPT_Page: e.target.value,
    });
  };
  const handleRDTchange = (e) => {
    setRDT(e.target.value);

    setFormData({
      ...formData,
      rdt,
    });
  };

  const handleIQChange = (e) => {
    setIQ(e.target.value);

    setFormData({
      ...formData,
      DSBP_IQ_Page: e.target.value,
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
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    // Limit the input to 8 characters
    if (inputValue.length <= 8) {
      setOtherRef(inputValue);
      setFormData({
        ...formData,
        AWM_OtherReference: inputValue,
      });
    }
  };

  const handleGABriefChange = async (e) => {
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
    let submittionData = {};
    submittionData = {
      tabHeader: selectedTab.tabHeader,
      description: updatedNewData && updatedNewData[0],
    };
    const indexToUpdate = dmTabValuesData.findIndex(
      (tab) => tab.tabHeader === submittionData.tabHeader
    );
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
    formData.AWM_GABrief = formData?.AWM_GABrief?.length
      ? formData?.AWM_GABrief
      : "";
    setFormData(formData);

    const DSBP_RDT_Page = [];
    dmTabData.RDTData.forEach((data) => {
      rdt?.forEach((val) => {
        if (data.AWM_Design_Job_ID === val) {
          DSBP_RDT_Page.push({
            Design_Job_Name: data.AWM_Design_Job_Name,
            Design_Job_ID: data.AWM_Design_Job_ID,
          });
        }
      });
    });
    formData["DSBP_RDT_Page"] = DSBP_RDT_Page;

    const DSBP_CDPT_Page = [];
    dmTabData.CDPTPageData.find((data) => {
      cdpt.forEach((val) => {
        if (data.AWM_Design_Job_ID === val) {
          DSBP_CDPT_Page.push({
            Design_Job_Name: data.AWM_Design_Job_Name,
            Design_Job_ID: data.AWM_Design_Job_ID,
          });
        }
      });
    });
    formData["DSBP_CDPT_Page"] = DSBP_CDPT_Page;

    const DSBP_IQ_Page = [];
    dmTabData.IQData.forEach((data) => {
      iq.forEach((val) => {
        if (data.AWM_Design_Job_ID === val) {
          DSBP_IQ_Page.push({
            Design_Job_Name: data.AWM_Design_Job_Name,
            Design_Job_ID: data.AWM_Design_Job_ID,
          });
        }
      });
    });

    formData["DSBP_IQ_Page"] = DSBP_IQ_Page;
    const updatedPmpDetails = { DSBPValues: [formData] };
    console.log("updatedPmpDetails", formData);

    // Call POST API of create new GA Brief
    if(formData?.AWM_GABrief === "New"){
     handleNewGaBrief();
    }

    // Call POST API to save tab data
    await onSubmitDependencyMappingAction(
      updatedPmpDetails,
      selectedProject?.Project_ID
    );

    // Call GET API of dependency mapping
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

    let updatedNewTabData = tableData?.filter(
      (data) =>
        data.DSBP_PMP_PIMaterialID ===
        selectedTab.description.DSBP_PMP_PIMaterialID
    );
        
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

        transformedItem.AWM_RDT_Page =
          item?.Preselected_AWM_RDT_Page?.map(
            (item) => item.AWM_Design_Job_ID
          ) || [];

        transformedItem.AWM_CDPT_Page =
          item?.Preselected_AWM_CDPT_Page?.map(
            (item) => item.AWM_Design_Job_ID
          ) || [];

        transformedItem.AWM_IQ_Page =
          item?.Preselected_AWM_IQ_Page?.map(
            (item) => item.AWM_Design_Job_ID
          ) || [];

        transformedItem = {
          ...transformedItem,
          AWM_CIC_Needed: item?.AWM_CIC_Page?.[0]?.AWM_CIC_Needed || "",
          AWM_Supporting_PMP_Layout:
            item?.AWM_CIC_Page?.[0]?.AWM_Supporting_PMP_Layout || "",
          AWM_Supporting_PMP_Design:
            item?.AWM_CIC_Page?.[0]?.AWM_Supporting_PMP_Design || "",
          AWM_Other_Reference:
            item?.AWM_CIC_Page?.[0]?.AWM_Other_Reference || "",
          AWM_CIC_Matrix: item?.AWM_CIC_Page?.[0]?.AWM_CIC_Matrix || "",
          AWM_GA_Brief: item?.Preselected_DSBP_GA_Brief || [],
          AWM_CIC_Matrix_Requested:
            item?.AWM_CIC_Page?.[0]?.AWM_CIC_Matrix_Requested || "",
        };

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
      let columnNames = Object.keys(transformedData[0]);

      console.log("transformedData:", transformedData);
      return transformedData;
    }
  };

  const renderData = (tabData, group) => {
    let dependencyColumnNames1 = dmTabData.DMColumnNames;

    const dependencyColumnNames2 =
      dmTabData?.CDPTPageData?.length === 1
        ? dependencyColumnNames1.filter(
            (item) => item.field !== "AWM_CDPT_Page"
          )
        : dependencyColumnNames1;
    const dependencyColumnNames3 =
      dmTabData?.RDTData?.length === 1
        ? dependencyColumnNames2.filter((item) => item.field !== "AWM_RDT_Page")
        : dependencyColumnNames2;
    const allColumns =
      dmTabData?.IQData?.length === 1
        ? dependencyColumnNames3.filter((item) => item.field !== "AWM_IQ_Page")
        : dependencyColumnNames3;

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
        let field1 = field?.field;

        if (
          value === "AWM_Supporting_PMP_Design" ||
          value === "AWM_Other_Reference"
        ) {
          field1 = value + "_" + "(optional)";
        }

        let splittedCol = field1.split("_").join(" ");

        return convertedInObject.map((item) => (
          <tr key={item[value]}>
            <td className="columnWidth">{splittedCol}</td>
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
                            disabled:
                              (cdpt?.length &&
                                cdpt?.includes("NPF_DJobN/A") &&
                                obj.AWM_Design_Job_ID !== "NPF_DJobN/A") ||
                              (cdpt?.length &&
                                !cdpt?.includes("NPF_DJobN/A") &&
                                obj.AWM_Design_Job_ID === "NPF_DJobN/A"),
                          })).filter((option) => option.label !== "")
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
                            disabled:
                              (rdt.length &&
                                rdt.includes("DT_DJobN/A") &&
                                obj.AWM_Design_Job_ID !== "DT_DJobN/A") ||
                              (rdt.length &&
                                !rdt.includes("DT_DJobN/A") &&
                                obj.AWM_Design_Job_ID === "DT_DJobN/A"),
                          })).filter((option) => option.label !== "")
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
                            disabled:
                              (iq?.length &&
                                iq?.includes("IQ_DJobN/A") &&
                                obj.AWM_Design_Job_ID !== "IQ_DJobN/A") ||
                              (iq?.length &&
                                !iq?.includes("IQ_DJobN/A") &&
                                obj.AWM_Design_Job_ID === "IQ_DJobN/A"),
                          })).filter((option) => option.label !== "")
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
                          {data}
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
                          {data}
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
                      type="text"
                      maxLength={8}
                      value={otherRef}
                      onChange={handleOtherRefChange}
                      style={{ width: "80%", fontSize: 12, height: "50%" }}
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
    return (
      filteredDataList.map((obj, index) => (
        <TabPanel
          key={index}
          header={
              <CustomHeader
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

  let isSubmitEnabled =
    formData?.AWM_CICNeeded === "No" &&
    formData?.AWM_SupportingPMPLayout === "";

  return (
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
        formValid={isSubmitEnabled}
        checkReadWriteAccess={!false}
        submitAndSave="Save"
      />
    </>
  );
};

export default DMPMPSpecificTabView;
