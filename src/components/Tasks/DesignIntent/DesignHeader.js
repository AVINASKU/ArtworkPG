import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";
import { BreadCrumb } from "primereact/breadcrumb";
import filter from "../../../assets/images/filter.svg";

const items = [
  { label: "My Tasks", url: "/tasks" },
  { label: "Define Design Intent" },
];

const DesignHeader = ({setAddNewDesign }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="content-layout">
      <div className="actions">
        <div>
          <BreadCrumb model={items} />

          <div
            style={{ marginLeft: 7, marginRight: 7 }}
            className="project-title"
          >
            Define Design Intent
          </div>
        </div>

        <div className="action-buttons">
          <div className="icon-items">
            <Checkbox
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
              className="margin-right"
            ></Checkbox>
            <div className="icon-label">
              <label>Select All </label>
            </div>
          </div>
          <div className="icon-items">
            <img
              src={filter}
              alt="filter logo"
              className="filter-icon filter-color-change"
            />
            <div>
              <label className="icon-label">filter</label>
            </div>
          </div>
          <div className="icon-items">
            <img
              src={plusCollapseImg}
              onClick={() => setAddNewDesign()}
              className="add-new-design-intent-icon"
              alt=""
            />
            <div className="icon-label">
              <label>Add Design Intent</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignHeader;
