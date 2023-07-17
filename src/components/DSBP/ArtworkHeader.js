import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DsbpActionDialog from "./DsbpActionDialog";
import CustomizeView from "./CustomizeView";
import filter from "../../assets/images/filter.svg";
import BlueFilterIcon from "../../assets/images/BlueFilterIcon.svg";
import "primeicons/primeicons.css";

const ArtworkHeader = ({
  label,
  headerName,
  selected,
  onActionSubmit,
  actionDialog,
  setActionDialog,
  setFieldUpdated,
  fieldUpdated,
  buWiseSortedColumnNames,
  setBuWiseSortedColumnNames,
  setDsbpPmpData,
  dsbpPmpData,
  setTableRender,
  tableRender,
  customizeViewFields,
  setCustomizeViewFields,
  userHasAccess,
}) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [actionHeader, setActionHeader] = useState("");
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const location = useLocation();
  const locationPath = location?.pathname;
  const { DropDownValuesData, loading } = useSelector(
    (state) => state.DropDownValuesReducer
  );
  const BU = selectedProjectDetails?.BU;
  // check whether project is from home care or baby care
  let isBUHomeCare = false;
  if (BU === "Home Care") {
    isBUHomeCare = true;
  }

  const actionNameObject = [
    {
      value: "Mass Update",
      key: "option-1",
      header: "Mass Update",
    },
    {
      value: "Create POAA",
      key: "option-2",
      header: "Are you sure you want to create POAs for below PMPs in RTA ?",
    },
    {
      value: "Group PMPs",
      key: "option-3",
      header: "Are you sure you want to group these PMPs ?",
    },
    {
      value: "Add to Project",
      key: "option-4",
      header: "Are you sure you want to add these PMP to Project ?",
    },
  ];

  const handleAction = (e) => {
    setActionHeader(e);
    setActionDialog(true);
  };

  const url = locationPath?.split("/");
  const mytasks = url[1];
  const [showApproveDialogCPPFA, setShowApproveDialogCPPFA] = useState(false);
  const [actionDropDownValues, setActionDropDownValues] = useState([]);
  const [aiseList, setAISEList] = useState([]);
  const [assemblyMechanismList, setAssemblyMechanismList] = useState([]);
  // let jsonColumnWidth = localStorage.getItem("columnWidthDSBPArtwork");

  let jsonColumnWidth = isBUHomeCare
    ? localStorage.getItem("columnWidthDSBPArtworkHomeCare")
    : localStorage.getItem("columnWidthDSBPArtworkBabyCare");

  let allColumns = JSON.parse(jsonColumnWidth);
  let isFilterActivated = [];

  if (allColumns) {
    isFilterActivated = allColumns.filter((ele) => {
      if (
        ele.freeze === true ||
        ele.sortAtoZ === true ||
        ele.sortZtoA === true ||
        ele.width !== 250 ||
        ele?.reorder === true
      ) {
        return ele;
      }
    });
  }

    const breadcrumb = (
    <div>
      <nav
        className="p-breadcrumb p-component ProjectPlanBreadCrum"
        aria-label="Breadcrumb"
      >
        <ul>
          <li className="">
            <NavLink to={`/${url[1]}`} className="p-menuitem-link">
              <span className="p-menuitem-text">
                {url[1] === "allProjects" ? "All Projects" : "My Projects"}
              </span>
            </NavLink>
          </li>
          <li className="p-breadcrumb-chevron pi pi-chevron-right piChevronRightMargin"></li>
          <li className="">
            <a href="#" className="p-menuitem-link">
              <span className="p-menuitem-text">{headerName}</span>
            </a>
          </li>
          <li>
              <div className="project-name">
                {selectedProjectDetails.Project_Name}
              </div>
          </li>
        </ul>
      </nav>
    </div>
  );

  useEffect(() => {
    if (DropDownValuesData) {
      setActionDropDownValues(
        DropDownValuesData?.ArtworkAgilityTasksPage.Artwork_Alignment || []
      );
    }
  }, [DropDownValuesData]);

  useEffect(() => {
    if (
      actionDropDownValues !== undefined &&
      actionDropDownValues.length !== 0
    ) {
      setAISEList(actionDropDownValues.AISE);
      setAssemblyMechanismList(actionDropDownValues.Assembly_Mechanism);
    }
  }, [actionDropDownValues]);
  return (
    <div>
      {showApproveDialogCPPFA && (
        <CustomizeView
          onClose={() => setShowApproveDialogCPPFA(!showApproveDialogCPPFA)}
          showTaskDialog={showApproveDialogCPPFA}
          setCustomizeViewFields={setCustomizeViewFields}
          customizeViewFields={customizeViewFields}
        />
      )}
      <div className="actions">
        <div>
          {breadcrumb}
        </div>
        <div className="header-buttons">
          <div style={{ top: 30 }}>
            {isFilterActivated.length && !userHasAccess ? (
              <img
                src={BlueFilterIcon}
                alt="filter logo"
                onClick={() => {
                  buWiseSortedColumnNames.map((ele) => {
                    if (ele) {
                      ele["sortZtoA"] = false;
                      ele["sortAtoZ"] = false;
                      ele["freeze"] = false;
                      ele["width"] = 250;
                      ele["reorder"] = false;
                    }
                  });
                  isBUHomeCare ? 
                  localStorage.setItem(
                    "columnWidthDSBPArtworkHomeCare",
                    JSON.stringify(buWiseSortedColumnNames)
                  ) : localStorage.setItem(
                    "columnWidthDSBPArtworkBabyCare",
                    JSON.stringify(buWiseSortedColumnNames)
                  );
                  setFieldUpdated(!fieldUpdated);
                  setBuWiseSortedColumnNames(buWiseSortedColumnNames);
                  setDsbpPmpData(dsbpPmpData);
                  setTableRender(!tableRender);
                }}
                className="header-icons"
              />
            ) : (
              <img
                src={filter}
                alt="filter logo"
                disabled={userHasAccess}
                // onClick={() => clearColumnWiseFilter()}
                className="header-icons"
              />
            )}
          </div>

          <button type="button" disabled={userHasAccess} className="btn btn-secondary">
            Confirm Full Scope in
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            disabled = {userHasAccess}
            onClick={() => !userHasAccess && setShowApproveDialogCPPFA(true)}
          >
            Customize View
          </button>
          <DropdownButton
            title="Actions"
            align="end"
            variant="secondary"
            onSelect={handleAction}
            disabled={selected.length === 0 || userHasAccess}
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
          onActionSubmit={onActionSubmit}
          aiseList={aiseList}
          assemblyMechanismList={assemblyMechanismList}
        />
      )}
    </div>
  );
};

export default ArtworkHeader;
