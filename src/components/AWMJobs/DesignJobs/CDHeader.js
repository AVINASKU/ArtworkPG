import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";
import filter from "../../../assets/images/filter.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";

const CDHeader = ({
  setAddNewDesign,
  onSelectAll,
  label,
  headerName,
  disabled,
  checkReadWriteAccess
}) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");
  const mytasks = url[1];
  return (
    <div className="content-layout task-layout">
      <i
        className="pi pi-times"
        onClick={() => {
          navigate("/myTasks");
        }}
      ></i>
      <div className="actions">
        <div>
          {/* <BreadCrumb model={breadcrumb} /> */}
          <nav className="p-breadcrumb p-component" aria-label="Breadcrumb">
            <ul>
              <li className="p-breadcrumb-chevron pi pi-chevron-right"></li>
              <li className="">
                <NavLink to={`/${mytasks}`} className="p-menuitem-link">
                  <span className="p-menuitem-text">
                    {url[1] === "MyTasks" ? "My Tasks" : "All Tasks"}
                  </span>
                </NavLink>
              </li>
              <li className="p-breadcrumb-chevron pi pi-chevron-right"></li>
              <li className="">
                <a href="#" className="p-menuitem-link">
                  <span className="p-menuitem-text">{label}</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="project-title">{headerName}</div>
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
              disabled={!checkReadWriteAccess || disabled}
            ></Checkbox>
            <div className="icon-label">
              <label className={(!checkReadWriteAccess || disabled) && "disable-buttons"}>
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
              disabled={!checkReadWriteAccess || disabled}
            />
            <div>
              <label className="icon-label" disabled={(!checkReadWriteAccess || disabled) && true}>filter</label>
            </div>
          </div>
          <div className="icon-items">
            <img
              src={plusCollapseImg}
              onClick={() => setAddNewDesign && setAddNewDesign()}
              className={`add-new-design-intent-icon ${
                (!checkReadWriteAccess || disabled )&& "disabled-add"
              }`}
              alt=""
              disabled={!setAddNewDesign && true}
            />
            <div className="icon-label">
              <label className={(!checkReadWriteAccess || disabled) && "disable-buttons"}>
                Add Color Development
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CDHeader;
