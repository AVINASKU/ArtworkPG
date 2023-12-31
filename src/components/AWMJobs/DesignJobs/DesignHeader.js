import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";
import filter from "../../../assets/images/filter.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import _ from "lodash";

const DesignHeader = ({
  setAddNewDesign,
  onSelectAll,
  label,
  headerName,
  disabled,
  checkReadWriteAccess,
  taskName,
  checkTaskISComplete,
  closeFlag,
  actionButtonsFlag,
  checked, 
  setChecked, 
  enableCheckBox
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location?.pathname;

  const url = locationPath?.split("/");
  const mytasks = url[1];
  return (
    <div className="content-layout task-layout">
      <i
        hidden={closeFlag}
        className="pi pi-times"
        onClick={() => {
          navigate(`/${locationPath?.split("/")[1]}`);
        }}
      ></i>
      <div className={`actions ${actionButtonsFlag ? "actionsPaddingForUBD": ""}`}>
        <div>
          {/* <BreadCrumb model={breadcrumb} /> */}
          <nav className="p-breadcrumb p-component" aria-label="Breadcrumb">
            <ul>
              <li className="p-breadcrumb-chevron pi pi-chevron-right"></li>

              {url[2] === "projectPlan" ? (
                <>
                  {" "}
                  <li className="">
                    <NavLink to={`/${mytasks}`} className="p-menuitem-link">
                      <span className="p-menuitem-text">{_.startCase(mytasks)}</span>
                    </NavLink>{" "}
                  </li>{" "}
                  <li className="p-breadcrumb-chevron pi pi-chevron-right"></li>
                  <li className="">
                    <NavLink
                      to={`/${mytasks}/${url[2]}/${url[5]}`}
                      className="p-menuitem-link"
                    >
                      <span className="p-menuitem-text">{_.startCase(url[2])}</span>
                    </NavLink>{" "}
                  </li>
                </>
              ) : (
                <li className="">
                  <NavLink to={`/${mytasks}`} className="p-menuitem-link">
                    <span className="p-menuitem-text">{_.startCase(mytasks)}</span>
                  </NavLink>{" "}
                </li>
              )}

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

        <div className="action-buttons" hidden={actionButtonsFlag}>
          <div className="icon-items">
            <Checkbox
              onChange={(e) => {
                setChecked(e.checked);
                onSelectAll(e.checked);
              }}
              checked={checked}
              className="margin-right"
              disabled={((!onSelectAll && true) || !checkReadWriteAccess) || checkTaskISComplete || !enableCheckBox }
            ></Checkbox>
            <div className="icon-label">
              <label
                className={disabled && "disable-buttons"}
                disabled={!checkReadWriteAccess}
              >
                {" "}
                Select All
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
          <div
            className={
              checkTaskISComplete ? "icon-items disabled" : "icon-items"
            }
          >
            <img
              src={plusCollapseImg}
              onClick={() =>
                checkReadWriteAccess && setAddNewDesign && setAddNewDesign()
              }
              className="add-new-design-intent-icon"
              alt=""
              disabled={(!setAddNewDesign && true) || !checkReadWriteAccess}
            />
            <div className="icon-label">
              <label className={disabled && "disable-buttons"}>
                Add {taskName}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignHeader;
