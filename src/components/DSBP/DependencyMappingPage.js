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
  const [dependencyColumnNames , setDependencyColumnNames] = useState([]);
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
  },[ProjectID]);

  async function fetchData() {
    const { dependencyTableData, isRDTData, isIQData, isCDPTData } =
      await getDependencyMappingDetails(ProjectID);

    const transformedData = dependencyTableData.map((item) => ({
      ...item,
      ...item?.FPCStagingPage?.[0],
    }));

  

    let columnNames = Object.keys(transformedData[0]);

    const filteredColumnNames = columnNames.filter(property => property !== "FPCStagingPage");
    filteredColumnNames.unshift("CIC_Needed");
      if(isRDTData && isRDTData.length){
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
          isDependencyMapping = {true}
        />
        <DependencyMappingList dependencyMappingData={dependencyMappingData} dependencyColumnNames={dependencyColumnNames} />
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
