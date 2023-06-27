import React from "react";

const ProjectNameHeader = ({selectedProjectDetails}) => {
  return (
    <div className=" margin-left" style={{textAlign:"initial"}}>
    <div className="project-title">
     {selectedProjectDetails?.Project_Name}
    </div>
    </div>
  );
};
export default ProjectNameHeader;
