import React, { useState } from "react";
import "./RolesHeader.scss";
import plusCollapseImg from "../../assets/images/plusCollapse.svg";
import toggleOff from "../../assets/images/toggleOff.svg";
import toggleOn from "../../assets/images/toggleOn.svg";

// import toggleoff from "./../src/assets/images/toggleoff.svg";

const RolesHeader = ({ header, addRole }) => {
  const [displayUserRole, setdisplayUserRole] = useState(false);
  const [imageOn, setImageOn] = useState(true);

  const toggleImage = () => {
    setImageOn(!imageOn);
    setdisplayUserRole(!displayUserRole);
  };
  const addRoles = () => {
    addRole();
  };
  return (
    <div className="roles-header">
      <h3 className="project-title">{header}</h3>
      <div className="icon-items">
        <span>
          Training mode
          <img
            src={!imageOn ? toggleOn : toggleOff}
            className="add-new-design-intent-icon"
            alt="Add role button"
            onClick={toggleImage}
          />
        </span>
        <button
          className={`addRule ${displayUserRole ? "enabled" : "disabled"}`}
          // disabled={displayUserRole}
          onClick={addRole}
        >
          <img
            src={plusCollapseImg}
            className="add-new-design-intent-icon"
            alt="Add role button"
            onClick={addRoles}
          />
          Add Rule
        </button>
      </div>
    </div>
  );
};

export default RolesHeader;
