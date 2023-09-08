import React from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../PageLayout";
import CapacityManagement from "./CapacityManagement";

const ACP = () => {
  let location = useLocation();
  return (
    <div className="projectPlanActionsStyle">
      <PageLayout>
        <CapacityManagement mode={location.state} />
      </PageLayout>
    </div>
  );
};
export default ACP;
