import React from "react";
import PageLayout from "./components/PageLayout";
import DSBP from "./components/DSBP/index";

const DsbpPage = (props) => {
  return (
    // // <PageLayout>
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
          <DSBP />
        </div>
      </div>
    // // <PageLayout>
  );
};
export default DsbpPage;
