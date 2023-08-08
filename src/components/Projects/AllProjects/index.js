import React from "react";

import PageLayout from "../../PageLayout";
import AllProjectList from "./AllProjectList";
import GojsComponent from "../../../gojs";

function AllProjects() {
  return (
    <PageLayout>
      <GojsComponent />
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
          <AllProjectList header="All Projects" /> 
        </div>
      </div>
    </PageLayout>
  );
}

export default AllProjects;
