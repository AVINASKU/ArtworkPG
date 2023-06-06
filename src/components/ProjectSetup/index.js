import React, { useEffect, useState } from "react";
import AddProject from "../Projects/CreateProject";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { BreadCrumb } from "primereact/breadcrumb";
import "primeicons/primeicons.css";
import "./index.scss";
import { useSelector } from "react-redux";
import ProjectPlanCompo from "../Projects/ProjectPlan/ProjectPlanCompo";
import ConfirmationDialog from "./confirmationDialog";
import TabsComponent from "./tabsComponent";
import { getUnAuthoirzedAccess, CheckReadOnlyAccess } from "../../utils";

import { useNavigate } from "react-router-dom";

function ProjectSetup(props) {
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const { mode, rootBreadCrumb } = projectSetup;
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const { accessMatrix } = useSelector((state) => state?.accessMatrixReducer);
  let path = "";
  if (window?.location?.pathname.includes("projectPlan")) {
    path = "/projectPlan";
  }

  const accessDetails = getUnAuthoirzedAccess(
    userInformation.role,
    accessMatrix,
    path
  );

  // Check if access is empty for the user's role and page
  const isAccessEmpty = accessDetails === null || accessDetails.length === 0;
  const isReadOnly = CheckReadOnlyAccess();
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
    }else if (currentUrl) {
      setTabName(currentUrl);
    }
  }, [tabName, currentUrl]);

  const items = [{ label: rootBreadCrumb }];
  tabName === "ProjectPlan" && items.push({ label: "Project Plan" });
  tabName === "ProjectSetup" && items.push({ label: "Project Setup" });
  tabName === "ArtworkAlignment" && items.push({ label: "Art work Alignment" });
  tabName === "Mapping" && items.push({ label: "Mapping" });
  tabName === "ReadinessPerPMP" && items.push({ label: "ReadinessPerPMP" });

  const itemsData = [
    {
      name: "ProjectSetup",
      tabNameForDisplay: "Project Setup",
      component: !isReadOnly ? (
        <div className="unauthorized-user">
          You are not authorized to access this page.
        </div>
      ) : (
        <div style={{ background: "#ffffff", borderRadius: "24px" }}>
          <div className="actions">
            <div className="breadCrumbParent">
              <BreadCrumb model={items} />

              {/* {`--------${mode}`} */}
              {mode !== "create" && (
                <div className="row">
                  <div className="col">
                    <div className="project-name projectNameForProjectSetup">
                      {selectedProjectDetails.Project_Name}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <AddProject {...props} />
        </div>
      ),
    },
    {
      name: "ProjectPlan",
      tabNameForDisplay: "Project Plan",
      component: (
        <div style={{ background: "#ffffff", borderRadius: "24px" }}>
          <div className="actions">
            <div className="breadCrumbParent">
              <div className="displayFlex">
                <div className="width50">
                  <BreadCrumb model={items} />
                </div>
                <div className="width50">
                  <div
                    className="btn-group btn-group-toggle d-flex justify-content-end"
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
                    {/* {shouldShowResetButton && ( */}
                    {
                      <DropdownButton
                        id="projectActions"
                        title="Actions"
                        // disabled={false}
                        disabled={!isReadOnly}
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
                    }
                  </div>
                </div>
              </div>

              {/* {`--------${mode}`} */}
              {mode !== "create" && (
                <div className="row">
                  <div className="col">
                    <div className="project-name">
                      {selectedProjectDetails.Project_Name}
                    </div>
                  </div>
                </div>
              )}
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
              <ProjectPlanCompo />
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
        />
      </div>
    </div>
  );
}

export default ProjectSetup;
