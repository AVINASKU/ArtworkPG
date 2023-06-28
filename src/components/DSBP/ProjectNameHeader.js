import React from "react";

const ProjectNameHeader = ({ selectedProjectDetails }) => {
  return (
    <div className=" margin-left" style={{ textAlign: "initial" }}>
      <span style={{ color: "#003DA5", fontWeight: 600, fontSize: 16 }}>
        {selectedProjectDetails?.Project_Name}
      </span>
    </div>
  );
};
export default ProjectNameHeader;
