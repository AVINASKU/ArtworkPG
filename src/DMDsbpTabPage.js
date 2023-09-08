import React from "react";
import PageLayout from "./components/PageLayout";
import DMDsbpTab from "./components/DSBP/DMPMPSpecificTabView/index";

const DMDsbpTabPage = (props) => {
  return (
    <div className="content-layout" id="tableDiv">
      <div className="tabular-view">
        <DMDsbpTab />
      </div>
    </div>
  );
};
export default DMDsbpTabPage;
