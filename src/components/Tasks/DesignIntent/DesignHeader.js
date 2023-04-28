import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";
import { BreadCrumb } from "primereact/breadcrumb";
import filter from "../../../assets/images/filter.svg";


const DesignHeader = ({setAddNewDesign,onSelectAll, breadcrumb, headerName,disabled }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="content-layout">
      <div className="actions">
        <div>
          <BreadCrumb model={breadcrumb} />

          <div
            style={{ marginLeft: 7, marginRight: 7 }}
            className="project-title"
          >
             {headerName}
          </div>
        </div>

        <div className="action-buttons">
          <div className="icon-items">
            <Checkbox
              onChange={(e) => 
              {
              setChecked(e.checked);
              onSelectAll(e.checked);}
              }
              checked={checked}
              className="margin-right"
              disabled={!onSelectAll && true}
            ></Checkbox>
            <div className="icon-label">
              <label className={disabled && "disable-buttons"}> Select All </label>
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
              onClick={() => setAddNewDesign && setAddNewDesign()}
              className="add-new-design-intent-icon"
              alt=""
              disabled={!setAddNewDesign && true}
            />
            <div className="icon-label">
              <label className={disabled && "disable-buttons"}>Add Design Intent</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignHeader;
