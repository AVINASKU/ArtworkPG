import React from "react";
import { NavLink } from "react-router-dom";

const ProjectNameHeader = ({ selectedProjectDetails }) => {
  return (
    <div>
    
      <NavLink to={`/myProjects`} className="p-menuitem-link">
        <span
          className="p-menuitem-text"
          style={{ color: "#003DA5", fontWeight: 600, fontSize: 16 }}
        >
          {selectedProjectDetails?.Project_Name}
        </span>
      </NavLink>

      {/* <NavLink to={`/myProjects`} className="p-menuitem-link">
      <span style={{ color: "#003DA5", fontWeight: 600, fontSize: 16 }}>
        {selectedProjectDetails?.Project_Name}
      </span>
      </NavLink> */}
    </div>
  );
};
export default ProjectNameHeader;
