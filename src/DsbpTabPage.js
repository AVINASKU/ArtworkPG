import React from "react";
import PageLayout from "./components/PageLayout";
import DsbpTab from "./components/DSBP/PMPSpecificTabView/index";

const DsbpTabPage = (props) => {
  return (
  
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
          <DsbpTab />
        </div>
      </div>
   
  );
};
export default DsbpTabPage;
