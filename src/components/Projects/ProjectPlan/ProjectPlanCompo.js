import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import ProjectPlan from "./ProjectPlanList";
import "primeicons/primeicons.css";
import "./index.scss";
import { useSelector } from "react-redux";
import {
  Loading
} from "../../../utils";

function ProjectPlanCompo(props) {
  const { view, setTabName, setUpdatedProjectPlanDesignData,setActiveFlag, setActiveSave, getProjectPlanApi, loader, tabNameForPP, pegadata, setPegaData, activeFlag, isAccessEmpty } = props;
  const toast = useRef(null);
  // Check if access is empty for the user's role and page
  
  const { myProject, ...myProjectData } = useSelector(
    (state) => state.myProject
  );
  const { projectPlanDesign, projectPlan, loading } = useSelector(
    (state) => state.ProjectPlanReducer
  );
  const { selectedProject, mode } = useSelector(
    (state) => state.ProjectSetupReducer
  );
  return (
    console.log("projectPlan", projectPlan),
    (
      <>
        <Toast ref={toast} />
        {loading || loader || myProjectData.loading || projectPlan === null ? (
          <Loading />
        ) : (
          <>
            <ProjectPlan
              {...props}
              projectPlan={projectPlan}
              selectedProject={selectedProject}
              projectPlanDesign={projectPlanDesign}
              setPegaData={setPegaData}
              pegadata={pegadata}
              setUpdatedProjectPlanDesignData={setUpdatedProjectPlanDesignData}
              setActiveSave={setActiveSave}
              setActiveFlag={setActiveFlag}
              getProjectPlanApi={getProjectPlanApi}
              isAccessEmpty={isAccessEmpty}
              view={view}
              setTabName={setTabName}
              tabNameForPP={tabNameForPP}
              activeFlag={activeFlag}
            />
          </>
        )}
      </>
    )
  );
}

export default ProjectPlanCompo;
