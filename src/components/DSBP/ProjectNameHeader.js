import React from "react";

const ProjectNameHeader = ({selectedProjectDetails}) => {
  return (
    <div className="multiselect-padding margin-left" style={{textAlign:"initial"}}>
      <div>Project Name</div>
      <div className="multiselect-padding">
        {selectedProjectDetails?.Project_Name}
      </div>
    </div>
  );
};
export default ProjectNameHeader;
