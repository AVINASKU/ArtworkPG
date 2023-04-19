import React from "react";

import PageLayout from "../../PageLayout";
import AddNewDesign from "./AddNewDesign.js";
import DesignHeader from "./DesignHeader";
import "../../Projects/MyProjects/index.scss";
import "./index.scss";

function DefineDesignIntent() {
  return (
    <PageLayout>
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
        <DesignHeader />
          <AddNewDesign/>
        </div>
      </div>
    </PageLayout>
  );
}

export default DefineDesignIntent;
