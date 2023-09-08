import React from "react";

import PageLayout from "../../PageLayout";
import AllProjectList from "./AllProjectList";

function AllProjects() {
  return (
    
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
          <AllProjectList header="All Projects" /> 
        </div>
      </div>
    
  );
}

export default AllProjects;
