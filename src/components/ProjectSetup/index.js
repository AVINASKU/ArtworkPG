import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import AddProject from "../Projects/CreateProject";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { BreadCrumb } from "primereact/breadcrumb";
import "primeicons/primeicons.css";
import "./index.scss";
import { useSelector } from "react-redux";
import ProjectPlanCompo from "../Projects/ProjectPlan/ProjectPlanCompo";
import ConfirmationDialog from "./confirmationDialog";
import TabsComponent from "./tabsComponent";

function ProjectSetup(props) {
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const { mode, rootBreadCrumb } = projectSetup;
  const [activeKey, setActiveKey] = useState("0");
  const items = [{ label: rootBreadCrumb }];
  activeKey === "0" && items.push({ label: "Project Setup" });
  activeKey === "1" && items.push({ label: "Project Plan" });

  useEffect(() => {
    if (mode === "create") {
      setActiveKey("0");
    } else {
      if (mode === "edit") {
        setActiveKey("0");
      } else if (mode === "design") {
        setActiveKey("1");
      }
    }
  }, [mode]);

  const handleActiveKeyChange = (key) => {
    if (activeKey === key) {
      key = -1;
    }
    setActiveKey(key);
  };

  const [toggleButtons, setToggleButtons] = useState("Tabular");
  const [option, setOption] = useState("");
  const [visible, setVisible] = useState(false);

  const getData = (option) => {
    setVisible(true);
    setOption(option);
  };
  const accept = () => {
    console.log("accept");
  };
  const reject = () => {
    console.log("reject");
  };
  const [tabName, setTabName] = useState("ProjectPlan");
  const [tabNameForPP, setTabNameForPP] = useState("Design");
  const itemsData = [
    {
      name: "ProjectSetup",
      tabNameForDisplay: "Project Setup",
      component: (
        <div style={{ background: "#ffffff", borderRadius: "24px" }}>
          <div className="actions">
            <div className="breadCrumbParent">
              <BreadCrumb model={items} />

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
          <AddProject {...props} setTabName={setTabName} />
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
                        // disabled={actionFlag}
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
            <nav>
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
              Are you sure <span style={{ color: "red" }}>{option}</span> the
              project?
            </>
          }
          header="Confirmation"
          icon="pi"
          accept={accept}
          reject={reject}
        />
      )}

      <div className="tabular-view AccordionIndent">
        <TabsComponent
          tabName={tabName}
          setTabName={setTabName}
          items={itemsData}
        />
        {/* <Accordion defaultActiveKey="0" activeKey={activeKey}>
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={() => handleActiveKeyChange("0")}>
              Project Setup
            </Accordion.Header>
            <Accordion.Body>
              <AddProject {...props} projectMode={mode} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header onClick={() => handleActiveKeyChange("1")}>
              Project Plan
            </Accordion.Header>
            <Accordion.Body>
              <ProjectPlanCompo />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}
      </div>
    </div>
  );
}

export default ProjectSetup;
