import React, { useEffect, useState } from "react";
import { onSortData, Loading, hasAllAccess } from "../../utils";
import { useNavigate } from "react-router-dom";
import ArtworkHeader from "./ArtworkHeader";
import FooterButtons from "../AWMJobs/DesignJobs/FooterButtons";
import { useSelector } from "react-redux";
import {
  getDependencyMappingDetails,
  onSubmitDependencyMappingAction,
} from "../../apis/dsbpApi";
import DependencyMappingList from "./DependencyMappingList";
import "./index.scss";

const headerName = "Dependency Mapping";
const DependencyMapping = () => {
  const [dependencyMappingData, setDependencyMappingData] = useState([]);
  const [dependencyColumnNames, setDependencyColumnNames] = useState([]);
  const [updatedDataToSubmit, setUpdatedDataToSubmit] = useState([]);
  const [CDPTPageData, setCDPTPageData] = useState([]);
  const [IQData, setIQData] = useState([]);
  const [RDTData, setRDTData] = useState([]);
  const [GABriefData, setGABriefData] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [dropdownDataForLayoutAndDesign, setDropdownDataForLayoutAndDesign] =
    useState([]);
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const ProjectID = selectedProjectDetails?.Project_ID;
  const navigate = useNavigate();
  const userHasAccess = !hasAllAccess();

  //  setCDPTPageData, setIQData, setRDTData

  const handleCancel = () => {
    return navigate(`/myProjects`);
  };

  const updateDropDownData = (value, columnName, id) => {
    console.log("value", value, columnName);

    dependencyMappingData.map((data) => {
      if (data.DSBP_PMP_PIMaterialID === id) {
        if (!data[columnName] && columnName === "AWM_CIC_Needed")
          data["AWM_CIC_Needed"] = value;
        if (!data[columnName] && columnName === "AWM_Supporting_PMP_Design")
          data["AWM_Supporting_PMP_Design"] = value;
        if (!data[columnName] && columnName === "AWM_Supporting_PMP_Layout")
          data["AWM_Supporting_PMP_Layout"] = value;
        if (!data[columnName] && columnName === "AWM_Other_Reference")
          data["AWM_Other_Reference"] = value;
        if (!data[columnName] && columnName === "AWM_RDT_Page")
          data["AWM_RDT_Page"] = value;
        if (!data[columnName] && columnName === "AWM_GA_Brief")
          data["AWM_GA_Brief"] = value;
        if (!data[columnName] && columnName === "AWM_CIC_Matrix")
          data["AWM_CIC_Matrix"] = value;
        else data[columnName] = value;
        data["updated"] = true;
      }

      return data;
    });
    let filteredDataToSubmit = dependencyMappingData.filter(
      (item) => item.updated === true
    );
    let data = dependencyMappingData.filter(
      (data) => data?.AWM_CIC_Needed === "Yes" && data
    );
    let dropdownDataForLayoutAndDesign1 = data.map(
      (item) => item.DSBP_PMP_PIMaterialID
    );
    // console.log(
    //   "filteredDataToSubmit",
    //   filteredDataToSubmit,
    //   dependencyMappingData
    // );
    setDropdownDataForLayoutAndDesign(dropdownDataForLayoutAndDesign1);
    setDependencyMappingData(dependencyMappingData);
    setSubmittedData(filteredDataToSubmit);
    setDataUpdated(!dataUpdated);
  };

  useEffect(() => {
    fetchData();
  }, [ProjectID]);

  async function fetchData() {
    const {
      dependencyTableData,
      isRDTData,
      isIQData,
      isCDPTData,
      isGABrifData,
    } = await getDependencyMappingDetails(ProjectID);

    if (dependencyTableData && dependencyTableData.length) {
      let data = dependencyTableData.filter(
        (data) =>
          data?.AWM_CIC_Page?.[0]?.AWM_CIC_Needed === "Yes" &&
          data.DSBP_PMP_PIMaterialID
      );
      let dropdownDataForLayoutAndDesign1 = data.map(
        (item) => item.DSBP_PMP_PIMaterialID
      );
      setDropdownDataForLayoutAndDesign(dropdownDataForLayoutAndDesign1);
    }

    if (dependencyTableData && dependencyTableData.length) {
      const transformedData = dependencyTableData.map((item) => {
        let transformedItem = {
          DSBP_InitiativeID: item.DSBP_InitiativeID,
          DSBP_PMP_PIMaterialDescription: item.DSBP_PMP_PIMaterialDescription,
          DSBP_PMP_PIMaterialID: item.DSBP_PMP_PIMaterialID,
          DSBP_PMP_PIMaterialNumber: item.DSBP_PMP_PIMaterialNumber,
        };

        if (isRDTData && isRDTData.length > 1) {
          transformedItem.AWM_RDT_Page =
            item?.Preselected_AWM_RDT_Page?.map(
              (item) => item.AWM_Design_Job_ID
            ) || [];
        }

        if (isCDPTData && isCDPTData.length > 1) {
          transformedItem.AWM_CDPT_Page =
            item?.Preselected_AWM_CDPT_Page?.map(
              (item) => item.AWM_Design_Job_ID
            ) || [];
        }
        if (isIQData && isIQData.length > 1) {
          transformedItem.AWM_IQ_Page =
            item?.Preselected_AWM_IQ_Page?.map(
              (item) => item.AWM_Design_Job_ID
            ) || [];
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
      let columnNames = Object.keys(transformedData[0]);
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

      setCDPTPageData(isCDPTData);
      setIQData(isIQData);
      setRDTData(isRDTData);
      setGABriefData(isGABrifData);
      setDependencyColumnNames(groupedColumnNames);
      setDependencyMappingData(transformedData);
    }
  }
  const isSubmitEnable = submittedData.length ? true : false;

  const onSubmit = async () => {
    //add your logic here
    let submittedJson = [];
    if (isSubmitEnable) {
      submittedData.map((ele) => {
        let submittedObject = {};

        // cdpt
        let DSBP_CDPT_Page = [];
        let DSBP_CDPT_Page_data = [];
        if (ele.AWM_CDPT_Page) {
          DSBP_CDPT_Page = CDPTPageData.filter(
            (cdptData) =>
              ele.AWM_CDPT_Page.includes(cdptData.AWM_Design_Job_ID) && cdptData
          );
          DSBP_CDPT_Page_data = DSBP_CDPT_Page.map((item) => ({
            Design_Job_Name: item.AWM_Design_Job_Name,
            Design_Job_ID: item.AWM_Design_Job_ID,
          }));
        }
        submittedObject.DSBP_CDPT_Page = DSBP_CDPT_Page_data;
        //rdt
        let DSBP_RDT_Page = [];
        let DSBP_RDT_Page_data = [];
        if (ele.AWM_RDT_Page) {
          DSBP_RDT_Page = RDTData.filter((rdtData) => {
            if (ele.AWM_RDT_Page.includes(rdtData.AWM_Design_Job_ID))
              return rdtData;
          });
          DSBP_RDT_Page_data = DSBP_RDT_Page.map((item) => ({
            Design_Job_Name: item.AWM_Design_Job_Name,
            Design_Job_ID: item.AWM_Design_Job_ID,
          }));
        }
        console.log("pranali on submit", DSBP_RDT_Page, DSBP_RDT_Page_data);
        submittedObject.DSBP_RDT_Page = DSBP_RDT_Page_data;

        //IQ
        let DSBP_IQ_Page = [];
        let DSBP_IQ_Page_data = [];
        if (ele.AWM_IQ_Page) {
          DSBP_IQ_Page = IQData.filter((iqData) => {
            if (ele.AWM_IQ_Page.includes(iqData.AWM_Design_Job_ID))
            return iqData;
          });
          DSBP_IQ_Page_data = DSBP_IQ_Page.map((item) => ({
            Design_Job_Name: item.AWM_Design_Job_Name,
            Design_Job_ID: item.AWM_Design_Job_ID,
          }));
        }
        submittedObject.DSBP_IQ_Page = DSBP_IQ_Page_data;

        submittedObject.DSBP_InitiativeID = ele.DSBP_InitiativeID;
        submittedObject.DSBP_PMP_PIMaterialID = ele.DSBP_PMP_PIMaterialID;
        submittedObject.DSBP_PMP_PIMaterialNumber =
          ele.DSBP_PMP_PIMaterialNumber;
        submittedObject["AWM_CICNeeded"] = ele.AWM_CIC_Needed;
        submittedObject["AWM_SupportingPMPLayout"] =
          ele.AWM_Supporting_PMP_Layout ? ele.AWM_Supporting_PMP_Layout : "";
        submittedObject["AWM_SupportingPMPDesign"] =
          ele.AWM_Supporting_PMP_Design ? ele.AWM_Supporting_PMP_Design : "";
        submittedObject["AWM_OtherReference"] = ele.AWM_Other_Reference
          ? ele.AWM_Other_Reference
          : "";
        submittedObject["AWM_GABrief"] = ele?.AWM_GA_Brief?.length
          ? ele.AWM_GA_Brief
          : "";

        submittedJson.push(submittedObject);
      });
    }
    console.log("submitted json", submittedJson);
    let formData = {
      DSBPValues: submittedJson,
    };
    let resp = await onSubmitDependencyMappingAction(formData, ProjectID);
  };

  return (
    <div className="artwork-dsbp dependency-mapping">
      <>
        <ArtworkHeader
          // breadcrumb={breadcrumb}
          headerName={headerName}
          selected={[]}
          // onActionSubmit={onActionSubmit}
          label="Dependency Mapping"
          // actionDialog={actionDialog}
          // setActionDialog={setActionDialog}
          // setFieldUpdated={setFieldUpdated}
          // fieldUpdated={fieldUpdated}
          // buWiseSortedColumnNames={buWiseSortedColumnNames}
          // setBuWiseSortedColumnNames={setBuWiseSortedColumnNames}
          // setDsbpPmpData={setDsbpPmpData}
          // dsbpPmpData={dsbpPmpData}
          // setTableRender={setTableRender}
          // tableRender={tableRender}
          selectedProjectDetails={selectedProjectDetails}
          userHasAccess={userHasAccess}
          isDependencyMapping={true}
        />
        <DependencyMappingList
          dependencyMappingData={dependencyMappingData}
          dependencyColumnNames={dependencyColumnNames}
          CDPTPageData={CDPTPageData}
          IQData={IQData}
          RDTData={RDTData}
          GABriefData={GABriefData}
          dropdownDataForLayoutAndDesign={dropdownDataForLayoutAndDesign}
          updateDropDownData={updateDropDownData}
          userHasAccess={userHasAccess}
        />
        <FooterButtons
          handleCancel={handleCancel}
          hideSaveButton={true}
          onSubmit={onSubmit}
          formValid={!isSubmitEnable}
          checkReadWriteAccess={!false}
        />
      </>
    </div>
  );
};

export default DependencyMapping;
