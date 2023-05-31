import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";
import filter from "../../../assets/images/filter.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";

const IQHeader = ({
  setAddNewDesign,
  onSelectAll,
  label,
  headerName,
  disabled,
  showPage,
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
              disabled={showPage === "CNIQ" && true}
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
              disabled={showPage === "CNIQ" && true}
            />
            <div>
              <label
                className="icon-label"
                disabled={showPage === "CNIQ" && true}
              >
                filter
              </label>
            </div>
          </div>
          <div className="icon-items">
            <img
              src={plusCollapseImg}
              onClick={() => setAddNewDesign && setAddNewDesign()}
              className={`add-new-design-intent-icon ${
                showPage === "CNIQ" && "disabled-add"
              }`}
              alt=""
              disabled={showPage === "CNIQ" && true}
            />
            <div className="icon-label">
              <label
                className={showPage === "CNIQ" && "disable-buttons"}
                disabled={showPage === "CNIQ" && true}
              >
                Add Ink Qualification
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IQHeader;