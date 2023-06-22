/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import AddProject from "../Projects/CreateProject";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "primeicons/primeicons.css";
import "./index.scss";
import { useSelector } from "react-redux";
import ProjectPlanCompo from "../Projects/ProjectPlan/ProjectPlanCompo";
import ConfirmationDialog from "./confirmationDialog";
import TabsComponent from "./tabsComponent";
import { hasEmptyAccessForProjectSetup } from "../../utils";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ProjectListHeader from "../Projects/MyProjects/ProjectListHeader";
import { ProjectService } from "../../service/PegaService";
function ProjectSetup(props) {
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const { mode } = projectSetup;
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const { accessMatrix } = useSelector((state) => state?.accessMatrixReducer);

  let path = "";
  if (window?.location?.pathname.includes("projectPlan")) {
    path = "/projectPlan";
  }
  const navigate = useNavigate();
  const [toggleButtons, setToggleButtons] = useState("Tabular");
  const [option, setOption] = useState("");
  const [visible, setVisible] = useState(false);

  const getData = (option) => {
    setVisible(true);
    setOption(option);
  };
  const accept = () => {
    return navigate("/myProjects");
  };

  const reject = () => {
    console.log("reject");
  };
  const [tabName, setTabName] = useState("ProjectPlan");
  const [tabNameForPP, setTabNameForPP] = useState("Design");

  const pathname = window.location.href;

  let currentUrl = pathname.split("#");
  currentUrl = currentUrl[currentUrl.length - 1];

  useEffect(() => {
    if (!pathname.includes("#")) {
      setTabName("ProjectPlan");
    } else if (currentUrl) {
      setTabName(currentUrl);
    }
  }, [tabName, currentUrl]);

  let items = "";
  if (tabName === "ProjectSetup") {
    items = "Project Setup";
  } else if (tabName === "ProjectPlan") {
    items = "Project Plan";
  } else if (tabName === "ArtworkAlignment") {
    items = "Art work Alignment";
  } else if (tabName === "Mapping") {
    items = "Mapping";
  } else if (tabName === "ReadinessPerPMP") {
    items = "ReadinessPerPMP";
  }

  const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");

  const [isSearch, isSearchSet] = useState(false);
  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };
  const isNoAccess = hasEmptyAccessForProjectSetup();

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
              <span className="p-menuitem-text">{items}</span>
            </a>
          </li>
          <li>
            {mode !== "create" && (
              <div className="project-name">
                {selectedProjectDetails.Project_Name}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );

  const [isColWidthSet, setColWidth] = useState(null);

  const [isFilterEnabled, setIsFilterEnabled] = useState(true);
  // frozenCoulmns?.length || filters?.length || sortData?.length;

  const isResetEnabled =
    // isReorderedColumn || isFilterEnabled ||
    isColWidthSet;

  const { projectPlan } = useSelector((state) => state.ProjectPlanReducer);
  const columnNames = ProjectService.getProjectPlanAllColumnNames();

  const childFunc = useRef(null);

  const test = (e) => {
    setIsFilterEnabled(e);
  };

  const itemsData = [
    {
      name: "ProjectSetup",
      tabNameForDisplay: "Project Setup",
      component: isNoAccess ? (
        <div className="unauthorized-user">
          You are not authorized to access this page.
        </div>
      ) : (
        <div className="projectSetupParent project-setup-wrapper">
          <div className="actions">
            <div className="breadCrumbParent">{breadcrumb}</div>
          </div>
          <AddProject {...props} />
        </div>
      ),
    },
    {
      name: "ProjectPlan",
      tabNameForDisplay: "Project Plan",
      component: (
        <div className="projectSetupParent project-plan-wrapper">
          <div className="breadCrumbParent">
            <div className="row">
              <div className="col">{breadcrumb}</div>
              <div className="col" style={{ display: "flex" }}>
                {selectedProjectDetails !== undefined && (
                  <ProjectListHeader
                    header=""
                    clearFilters={() => {}}
                    clearFilter={childFunc.current}
                    setVisible={() => {}}
                    saveSettings={() => {}}
                    onSearchClick={onSearchClick}
                    // exportCSV={exportCSV}
                    isFilterEnabled={isFilterEnabled}
                    isResetEnabled={isResetEnabled}
                    allData={projectPlan}
                    headers={columnNames}
                    filterFLag={true}
                    CustomizeViewFlag={true}
                    ResetToDefaultFlag={true}
                    isTreeTableFlag={true}
                  />
                )}
                <div
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons"
                >
                  <div className="col projectPlanButtons">
                    <label
                      className={` btn border border-secondary ${
                        toggleButtons === "GanttChart"
                          ? "ganttChartTabular active"
                          : ""
                      }`}
                      onClick={() => setToggleButtons("GanttChart")}
                    >
                      Gantt Chart
                    </label>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <nav className="subNav">
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className={`nav-link ${
                    tabNameForPP === "Design" ? "active" : ""
                  }`}
                  onClick={() => setTabNameForPP("Design")}
                  id="nav-design-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-design"
                  type="button"
                  role="tab"
                  aria-controls="nav-design"
                  aria-selected="true"
                >
                  Design
                </button>
                <button
                  className={`nav-link ${
                    tabNameForPP === "Input" ? "active" : ""
                  }`}
                  onClick={() => setTabNameForPP("Input")}
                  id="nav-input-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-input"
                  type="button"
                  role="tab"
                  aria-controls="nav-input"
                  aria-selected="true"
                >
                  Input
                </button>
                <button
                  className={`nav-link ${
                    tabNameForPP === "FAAssembly" ? "active" : ""
                  }`}
                  onClick={() => setTabNameForPP("FAAssembly")}
                  id="nav-fAAssembly-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-fAAssembly"
                  type="button"
                  role="tab"
                  aria-controls="nav-fAAssembly"
                  aria-selected="false"
                >
                  FA Assembly
                </button>
              </div>
            </nav>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div
              className={`tab-pane fade ${
                tabNameForPP === "Design" ? "show active" : ""
              }`}
              id="nav-design"
              role="tabpanel"
              aria-labelledby="nav-design-tab"
            >
              <ProjectPlanCompo
                isSearch={isSearch}
                setColWidth={setColWidth}
                childFunc={childFunc}
                test={test}
              />
            </div>
            <div
              className={`tab-pane fade ${
                tabNameForPP === "Input" ? "show active" : ""
              }`}
              id="nav-input"
              role="tabpanel"
              aria-labelledby="nav-input-tab"
            >
              Input Data
            </div>
            <div
              className={`tab-pane fade ${
                tabNameForPP === "FAAssembly" ? "show active" : ""
              }`}
              id="nav-fAAssembly"
              role="tabpanel"
              aria-labelledby="nav-fAAssembly-tab"
            >
              FA Assembly Data
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "ArtworkAlignment",
      tabNameForDisplay: "Artwork Alignment",
      component: <>Artwork Alignment Data</>,
    },
    {
      name: "Mapping",
      tabNameForDisplay: "Mapping",
      component: <>Mapping Data</>,
    },
    {
      name: "ReadinessPerPMP",
      tabNameForDisplay: "Readiness Per PMP",
      component: <>Readiness Per PMP Data</>,
    },
  ];
  const actionButton = (
    <DropdownButton
      id="projectActions"
      title="Actions"
      // disabled={false}
      disabled={isNoAccess}
      // data-popper-placement="bottom-end"
      // drop="down-end"
      align="end"
    >
      <Dropdown.Item
        onClick={() => getData("On Hold")}
        className="dropdownItemPaddingLeft dropdownItemColor"
      >
        On Hold
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => getData("Cancel")}
        className="dropdownItemPaddingLeft dropdownItemColor1"
      >
        Cancel
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => getData("Previous State")}
        className="dropdownItemPaddingLeft dropdownItemColor2"
      >
        Previous State
      </Dropdown.Item>
    </DropdownButton>
  );

  return (
    <div className="content-layout">
      {visible && (
        <ConfirmationDialog
          visible={visible}
          onHide={setVisible}
          message={
            <>
              Are you sure to <span style={{ color: "red" }}>{option}</span> the
              project?
            </>
          }
          header="Confirmation"
          icon="pi"
          accept={accept}
          reject={reject}
        />
      )}

      <div className="tabular-view">
        <TabsComponent
          tabName={tabName}
          items={itemsData}
          actionButton={actionButton}
        />
      </div>
    </div>
  );
}

export default ProjectSetup;
