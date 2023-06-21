import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DsbpActionDialog from "./DsbpActionDialog";
import CustomizeView from "./CustomizeView";
import "primeicons/primeicons.css";

const ArtworkHeader = ({ label, headerName, selected }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionHeader, setActionHeader] = useState("");
  const location = useLocation();
  const locationPath = location?.pathname;
  const actionNameObject = [
    {
      value: "Mass Update",
      key:"option-1",
      header:"Mass Update"
    },
    {
      value: "Create POAA",
      key:"option-2",
      header:"Are you sure you want to create POAs for below PMPs in RTA ?"
    },
    {
      value: "Group PMPs",
      key:"option-3",
      header:"Are you sure you want to group these PMPs ?"
    },
    {
      value: "Add to Project",
      key:"option-4",
      header:"Add to Project"
    }
  ];

  const handleAction=(e)=>{
    setActionHeader(e);
    if(e !== "Add to Project")
      setActionDialog(true)
  }
  
  const url = locationPath?.split("/");
  const mytasks = url[1];
  const [showApproveDialogCPPFA, setShowApproveDialogCPPFA] = useState(false);
  return (
    <div className="actions multiselect-padding">
      {showApproveDialogCPPFA && (
        <CustomizeView
          onClose={() => setShowApproveDialogCPPFA(!showApproveDialogCPPFA)}
          showTaskDialog={showApproveDialogCPPFA}
        />
      )}
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
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowApproveDialogCPPFA(true)}
          >
            Customize View
          </button>
          <DropdownButton
            title="Actions"
            align="end"
            variant="secondary"
            onSelect={handleAction}
          >
            {actionNameObject?.map((item) => {
              return (
                <Dropdown.Item value={item.value} eventKey={item.header}>
                  {item.value}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      </div>
      {actionDialog && (
        <DsbpActionDialog
          actionHeader={actionHeader}
          actionDialog={actionDialog}
          setActionDialog={setActionDialog}
          selected={selected}
          actionNameObject={actionNameObject}
        />
      )}
    </div>
  );
};

export default ArtworkHeader;
