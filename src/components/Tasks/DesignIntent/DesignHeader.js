import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";

import filter from "../../../assets/images/filter.svg";

const DesignHeader = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="actions">
      <div className="project-title">Define Design Intent</div>
      <div className="action-buttons">
        <Checkbox
          onChange={(e) => setChecked(e.checked)}
          checked={checked}
          className="margin-right"
        ></Checkbox>
        <img src={filter} alt="filter logo" className="header-icons margin-right" />
        <img src={plusCollapseImg} className="collapse-img margin-right" alt="" />
      </div>
    </div>
  );
};

export default DesignHeader;
