import React from "react";
import { itemsData } from "./TabNames";

const TabCompo = () => {
  return (
    <div>
      <div className="projectSetupParent project-setup-wrapper">
        <div className="actions">
          {itemsData.map((breadcrumb, index) => (
            <div className="breadCrumbParent" key={index}>
              {breadcrumb.tabNameForDisplay}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabCompo;
