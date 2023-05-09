import React from "react";
import PageLayout from "./components/PageLayout";
import ProjectSetup from "./components/ProjectSetup";
import { useLocation } from "react-router-dom";

const ProjectCreation = () => {
  let location = useLocation();
  return (
    <div className="projectPlanActionsStyle">
      <PageLayout>
        <ProjectSetup mode={location.state} />
      </PageLayout>
    </div>
  );
};
export default ProjectCreation;
