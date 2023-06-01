import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";

const ArtworkHeader = ({ label, headerName }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  const locationPath = location?.pathname;

  const url = locationPath?.split("/");
  const mytasks = url[1];
  return (
    <div className="actions multiselect-padding">
      <div className="actions multiselect-padding">
        <div>
          {/* <BreadCrumb model={breadcrumb} /> */}
          <nav
            className="p-breadcrumb p-component multiselect-padding"
            aria-label="Breadcrumb"
          >
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
          <div className="project-title margin-left">{headerName}</div>
        </div>
        <div className="action-buttons">
          <button type="button" className="btn btn-secondary">
            Confirm Full Scope in
          </button>
          <button type="button" className="btn btn-secondary">
            Customize View
          </button>
          <button type="button" className="btn btn-secondary">
            Actions
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkHeader;
