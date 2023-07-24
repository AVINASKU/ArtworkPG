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
  const [CDPTPageData, setCDPTPageData] = useState([]);
  const [IQData, setIQData] = useState([]);
  const [RDTData, setRDTData] = useState([]);
  const [GABriefData, setGABriefData] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
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
    // let dependencyFilterData = dependencyMappingData.filter((item)=>{
    // })
    dependencyMappingData.map((data) => {
      if (data.DSBP_PMP_PIMaterialID === id) {
        if (!data[columnName] && columnName==="AWM_CIC_Needed") data["AWM_CIC_Needed"] = value;
        else data[columnName] = value;
      }
      return data;
    });
    console.log("dependencyMappingData", dependencyMappingData);
    setDependencyMappingData(dependencyMappingData);
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
    } = await getDependencyMappingDetails("A-2002");

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
          transformedItem.AWM_GA_Brief = item.Preselected_DSBP_GA_Brief || [];
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

      setCDPTPageData(isCDPTData);
      setIQData(isIQData);
      setRDTData(isRDTData);
      setGABriefData(isGABrifData);
      setDependencyColumnNames(groupedColumnNames);
      setDependencyMappingData(transformedData);
    }
  }

  const onSubmit = async () => {
    let formData = {
      DSBPValues: [
        {
          DSBP_InitiativeID: "100299",
          DSBP_PMP_PIMaterialID: "388975467",
          DSBP_PMP_PIMaterialNumber: "90492437",
          AWM_CICNeeded: "No",
        },
      ],
    };
    //add your logic here
    let resp = await onSubmitDependencyMappingAction();
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
          updateDropDownData={updateDropDownData}
          userHasAccess={userHasAccess}
        />
        <FooterButtons
          handleCancel={handleCancel}
          hideSaveButton={true}
          onSubmit={onSubmit}
          formValid={!true}
          checkReadWriteAccess={!false}
        />
      </>
    </div>
  );
};

export default DependencyMapping;
