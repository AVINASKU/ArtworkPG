import React from "react";

import PageLayout from "../../PageLayout";
import AllProjectList from "./AllProjectList";


function AllProjects() {
  return (
    <PageLayout>
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
          <AllProjectList header="All Projects" /> 
        </div>
      </div>
    </PageLayout>
  );
}

export default AllProjects;
