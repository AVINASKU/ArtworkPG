import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DsbpActionDialog from "./DsbpActionDialog";
import CustomizeView from "./CustomizeView";
import filter from "../../assets/images/filter.svg";
import BlueFilterIcon from "../../assets/images/BlueFilterIcon.svg";
import searchMyProjects from "../../assets/images/searchMyProjects.svg";
import { handleConfirmFullScopeIn } from "../../apis/dsbpApi";
import { getMyProject } from "../../store/actions/ProjectActions";
import "primeicons/primeicons.css";
import { isArray } from "lodash";
import { ExportSelectedRows } from "../ExportCSV";

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
  isDependencyMapping,
  setLoader,
  dependencyMappingData,
  CDPTPageData,
  IQData,
  RDTData,
  GABriefData,
  columnNames,
  filteredDependencyMappingData,
  onSearchClick,
  onClickClearFilter,
  isFilterActivatedInDependencyMapping,
  updateDropDownData,
  onSubmit,
  handleNewGaBrief,
  isSubmitEnable,
  submittedData,
  setSubmittedData
}) => {
  const navigate = useNavigate();
  let { ProjectID } = useParams();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [toggleButtons, setToggleButtons] = useState("Tabular");
  const [actionHeader, setActionHeader] = useState("");
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const location = useLocation();
  const locationPath = location?.pathname;
  const { DropDownValuesData, loading } = useSelector(
    (state) => state.DropDownValuesReducer
  );
  const { userInformation } = useSelector((state) => state.UserReducer);
  const { myProject } = useSelector((state) => state.myProject);
  const BU = selectedProjectDetails?.BU;
  // check whether project is from home care or baby care
  let isBUHomeCare = false;
  if (BU === "Home Care") {
    isBUHomeCare = true;
  }
  let actionNameObject = []


  headerName !== "Dependency Mapping" ?
    actionNameObject = [
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
  ] : 
  actionNameObject = [
    {
      value: "Mass Update",
      key: "option-1",
      header: "Mass Update",
    },
    {
      value: "CIC Matrix",
      key: "option-2",
      header: "Request CIC/CIC Matrix",
    },
    {
      value: "Request CIC/CIC Matrix",
      key: "option-3",
      header: "Request CIC/CIC Matrix",
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
  const [confirmFullScopeEnable, setConfirmFullScopeEnable] = useState(false);
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
    <div style={{ marginLeft: 25 }}>
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
    if (myProject) {
      let projectData =
        isArray(myProject) &&
        myProject.find((project) => project.Project_ID === ProjectID);
      setConfirmFullScopeEnable(projectData?.Estimated_No_Of_POAs > 1);
    }
  }, [myProject]);

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

  const onConfirmFullScopeIn = async () => {
    setLoader(true);
    await handleConfirmFullScopeIn(ProjectID);
    await dispatch(getMyProject(userInformation));
    setLoader(false);
  };

  return (
    <div>
      
      {showApproveDialogCPPFA && (
        <CustomizeView
          onClose={() => setShowApproveDialogCPPFA(!showApproveDialogCPPFA)}
          showTaskDialog={showApproveDialogCPPFA}
          setCustomizeViewFields={setCustomizeViewFields}
          customizeViewFields={customizeViewFields}
          dependencyMappingData={dependencyMappingData}
          headerName={headerName}
        />
      )}
      <div className="actions">
        <div>{breadcrumb}</div>
        <div className="header-buttons">
          {!isDependencyMapping && (
            <div style={{ top: 30 }}>
              {isFilterActivated.length ? (
                <img
                  src={BlueFilterIcon}
                  alt="filter logo"
                  onClick={() => onClickClearFilter()}
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
          )}
          {isDependencyMapping ? (
            <>
              {isFilterActivatedInDependencyMapping?.length ? (
                <img
                  src={BlueFilterIcon}
                  alt="filter logo"
                  onClick={() => onClickClearFilter()}
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
              <div style={{marginLeft:10}}>
              <img
                src={searchMyProjects}
                alt="search field"
                onClick={onSearchClick}
                className="header-icons"
              />
              </div>
              <div style={{marginLeft:10}}>
                <ExportSelectedRows
                  allData={dsbpPmpData}
                  selectedRows={filteredDependencyMappingData}
                  headers={columnNames}
                />
              </div>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <div className="col projectPlanButtons">
                  <label
                    className={` btn border border-secondary ${
                      toggleButtons === "Tabular"
                        ? "ganttChartTabular active"
                        : ""
                    }`}
                    onClick={() => setToggleButtons("Tabular")}
                  >
                    Tabular
                  </label>
                  <label
                    className={` btn border border-secondary ${
                      toggleButtons === "Visual"
                        ? "ganttChartTabular active"
                        : ""
                    }`}
                    onClick={() => setToggleButtons("Visual")}
                  >
                    Visual
                  </label>
                </div>
              </div>
            </>
          ) : (
            <button
              type="button"
              disabled={confirmFullScopeEnable || userHasAccess}
              className="btn btn-secondary"
              onClick={onConfirmFullScopeIn}
            >
              Confirm Full Scope in
            </button>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            disabled={!userHasAccess}
            onClick={() => setShowApproveDialogCPPFA(true)}
          >
            Customize View
          </button>
          <DropdownButton
            title="Actions"
            align="end"
            variant="secondary"
            onSelect={handleAction}
            disabled={selected?.length === 0 || userHasAccess}
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
          onActionSubmit={headerName !== "Dependency Mapping" ? onActionSubmit : onSubmit}
          aiseList={aiseList}
          assemblyMechanismList={assemblyMechanismList}
          headerName={headerName}
          CDPTPageData={CDPTPageData}
          IQData={IQData}
          RDTData={RDTData}
          GABriefData={GABriefData}
          updateDropDownData={updateDropDownData}
          handleNewGaBrief={handleNewGaBrief}
          isSubmitEnable={isSubmitEnable}
          setSubmittedData={setSubmittedData}
          submittedData={submittedData}
        />
      )}
    </div>
  );
};

export default ArtworkHeader;
