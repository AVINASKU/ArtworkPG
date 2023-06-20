import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DsbpActionDialog from "./DsbpActionDialog";
import "primeicons/primeicons.css";

const ArtworkHeader = ({ label, headerName, selected }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const location = useLocation();
  const locationPath = location?.pathname;
  const actionValue = [
    {
      value: "Mass Update",
      key:"option-1"
    },
    {
      value: "Create POAA",
      key:"option-2"
    },
    {
      value: "Group PMPs",
      key:"option-3"
    },
    {
      value: "Add to Project",
      key:"option-4"
    }
  ];

  const handleAction=(e)=>{
    console.log("datawwwwwwwwww",e);
    if(e !== "Add to Project")
      setActionDialog(true)
  }
  
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
          <DropdownButton
            title="Actions"
            align="end"
            variant="secondary"
            onSelect={handleAction}
          >
            {actionValue?.map((item) => {
              return <Dropdown.Item
                value={item.value} eventKey={item.value}
              >
              {item.value}
            </Dropdown.Item>
            })}
          </DropdownButton>
        </div>
      </div>
      { actionDialog &&
        <DsbpActionDialog actionDialog={actionDialog} setActionDialog={setActionDialog} selected={selected} />
      }
    </div>
  );
};

export default ArtworkHeader;
