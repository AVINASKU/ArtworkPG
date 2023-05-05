import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";
import filter from "../../../assets/images/filter.svg";
import { NavLink, useLocation } from "react-router-dom";

const DesignHeader = ({
  setAddNewDesign,
  onSelectAll,
  label,
  headerName,
  disabled,
}) => {
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");
  const mytasks = url[1];
  return (
    <div className="content-layout">
      <div className="actions">
        <div>
          {/* <BreadCrumb model={breadcrumb} /> */}
          <nav class="p-breadcrumb p-component" aria-label="Breadcrumb">
            <ul>
              <li class="p-breadcrumb-chevron pi pi-chevron-right"></li>
              <li class="">
                <NavLink exact to={`/${mytasks}`} class="p-menuitem-link">
                  <span class="p-menuitem-text">
                    {url[1] === "MyTasks" ? "My Tasks" : "All Tasks"}
                  </span>
                </NavLink>
              </li>
              <li class="p-breadcrumb-chevron pi pi-chevron-right"></li>
              <li class="">
                <a href="#" class="p-menuitem-link">
                  <span class="p-menuitem-text">{label}</span>
                </a>
              </li>
            </ul>
          </nav>
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
              onChange={(e) => {
                setChecked(e.checked);
                onSelectAll(e.checked);
              }}
              checked={checked}
              className="margin-right"
              disabled={!onSelectAll && true}
            ></Checkbox>
            <div className="icon-label">
              <label className={disabled && "disable-buttons"}>
                {" "}
                Select All{" "}
              </label>
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
              <label className={disabled && "disable-buttons"}>
                Add Design Intent
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignHeader;
