import React, { useEffect, useState } from "react";
import { onSortData, Loading, hasAllAccess } from "../../utils";
import { useNavigate } from "react-router-dom";
import ArtworkHeader from "./ArtworkHeader";
import FooterButtons from "../AWMJobs/DesignJobs/FooterButtons";
import { useSelector } from "react-redux";
import { getDependencyMappingDetails } from "../../apis/dsbpApi";
import DependencyMappingList from "./DependencyMappingList";
import "./index.scss";

const headerName = "Dependency Mapping";
const DependencyMapping = () => {
  const [dependencyMappingData, setDependencyMappingData] = useState([]);
  const [dependencyColumnNames, setDependencyColumnNames] = useState([]);
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const ProjectID = selectedProjectDetails?.Project_ID;
  const navigate = useNavigate();
  const userHasAccess = !hasAllAccess();
  const handleCancel = () => {
    return navigate(`/myProjects`);
  };

  useEffect(() => {
    fetchData();
  }, [ProjectID]);

  async function fetchData() {
    const { dependencyTableData, isRDTData, isIQData, isCDPTData } =
      await getDependencyMappingDetails("A-2002");
      
    const transformedData = dependencyTableData.map((item) => ({
      DSBP_InitiativeID: item.DSBP_InitiativeID,
      DSBP_PMP_PIMaterialNumber: item.DSBP_PMP_PIMaterialNumber,
      DSBP_PMP_PIMaterialDescription: item.DSBP_PMP_PIMaterialDescription,
      DSBP_PMP_PIMaterialID: item.DSBP_PMP_PIMaterialID,
      DSM_PICountry_Countries: item.DSM_PICountry_Countries,
      DSM_PILanguage_Languages: item.DSM_PILanguage_Languages,
      DSM_PMP_PMPPackagingComponentType: item.DSM_PMP_PMPPackagingComponentType,
      DSM_PMP_PackagingSize: item.DSM_PMP_PackagingSize,
      DSM_PMP_PrinterPrimary: item.DSM_PMP_PrinterPrimary,
      DSM_PMP_PrinterSecondary: item.DSM_PMP_PrinterSecondary,
      DSM_PMP_PrintingProcess: item.DSM_PMP_PrintingProcess,
      DSM_PMP_SubstrateColor: item.DSM_PMP_SubstrateColor,
      DSM_PMP_TD_TDStatus: item.DSM_PMP_TD_TDStatus,
      DSM_PMP_TD_TDValue: item.DSM_PMP_TD_TDValue,
      DSM_PO_PMP_poMaterialNumber: item.DSM_PO_PMP_poMaterialNumber,
      ...item?.FPCStagingPage?.[0],
      ...item?.AWM_CIC_Page?.[0],
    }));

    console.log("AWM_CIC_Page", transformedData);


    let columnNames = Object.keys(transformedData[2]);
    const filteredColumnNames = columnNames.filter(
      (property) => property !== "FPCStagingPage"
    );
    filteredColumnNames.unshift("CIC_Needed");
    if (isRDTData && isRDTData.length) {
      filteredColumnNames.unshift("RDT");
    }
    setDependencyColumnNames(filteredColumnNames);
    setDependencyMappingData(transformedData);
    console.log("response in component", transformedData);
  }

  const onSubmit = async () => {
    //add your logic here
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
