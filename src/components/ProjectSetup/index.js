import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import AddProject from "../Projects/CreateProject";
import { Button, DropdownButton } from "react-bootstrap";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { SelectButton } from "primereact/selectbutton";
import "./index.scss";
import { useSelector } from "react-redux";
import ProjectPlanCompo from "../Projects/ProjectPlan/ProjectPlanCompo";
import { useLocation } from "react-router-dom";

function ProjectSetup(props) {
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  console.log("projectSetup:", projectSetup);
  const selectedProjectDetails = projectSetup.selectedProject;
  const { mode, rootBreadCrumb } = projectSetup;
  const [activeKey, setActiveKey] = useState("0");
  const items = [{ label: rootBreadCrumb }];
  activeKey === "0" && items.push({ label: "Project Setup" });
  activeKey === "1" && items.push({ label: "Project Plan" });

  const location = useLocation();
  const shouldShowResetButton = location.pathname.includes("/addProject/A-468");

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

  const [toggleButtons, setToggleButtons] = useState("GanttChart");

  const options = [
    { name: "Luca", code: "Luca" },
    { name: "Karol", code: "Karol" },
    { name: "Iza", code: "Iza" },
  ];

  const handleDelegate = () => {
    // handleDelegateClick();
  };
  const handleHelpNeeded = () => {
    // handleHelpNeededClick();
  };

  return (
    <div className="content-layout">
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
              <div className="col">
                <div className="row">
                  <div
                    className="col btn-group btn-group-toggle d-flex justify-content-end"
                    data-toggle="buttons"
                  >
                    <div className="col projectPlanButtons">
                      <label
                        className={` btn border border-secondary projectPlanButtonsRadius1 ${
                          toggleButtons === "GanttChart"
                            ? "btn-secondary active"
                            : ""
                        }`}
                        onClick={() => setToggleButtons("GanttChart")}
                      >
                        Gantt Chart
                      </label>
                      <label
                        className={` btn border border-secondary projectPlanButtonsRadius2 ${
                          toggleButtons === "Tabular"
                            ? "btn-secondary active"
                            : ""
                        }`}
                        onClick={() => setToggleButtons("Tabular")}
                      >
                        Tabular
                      </label>
                    </div>
                    {/* {shouldShowResetButton && (
                      <DropdownButton
                        id="tasksActions"
                        title="Actions"
                        disabled={false}
                        // disabled={actionFlag}
                      >
                        <Dropdown.Item onClick={handleHelpNeeded}>
                          Help Needed
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleDelegate}>
                          Delegate
                        </Dropdown.Item>
                      </DropdownButton>
                    )} */}
                    {/* <Dropdown
                        editable
                        // value={options}
                        // onChange={(e) => onDropdownChange(options, e, field)}
                        options={options}
                        optionLabel="name"
                        placeholder="Actions"
                        className="w-full md:w-14rem ActionsDropdown"
                      /> */}
                  </div>
                </div>
              </div>
            </div>
            //     <div style={{ display: "flex" }}>
            //       <div className="project-name">
            //         {selectedProjectDetails.Project_Name}
            //       </div>
            //       <div className="projectPlanButtons">
            //         <div>
            //         <div
            //           className="btn-group btn-group-toggle"
            //           data-toggle="buttons"
            //         >
            //           <label
            //             className={`btn border border-secondary projectPlanButtonsRadius1 ${
            //               toggleButtons === "GanttChart"
            //                 ? "btn-secondary active"
            //                 : ""
            //             }`}
            //             onClick={() => setToggleButtons("GanttChart")}
            //           >
            //             Gantt Chart
            //           </label>
            //           <label
            //             className={`btn border border-secondary projectPlanButtonsRadius2 ${
            //               toggleButtons === "Tabular" ? "btn-secondary active" : ""
            //             }`}
            //             onClick={() => setToggleButtons("Tabular")}
            //           >
            //             Tabular
            //           </label>
            //         </div>
            //         <div>
            //         {shouldShowResetButton && (
            //   <DropdownButton
            //     id="tasksActions"
            //     title="Action"
            //     disabled={false}
            //     // disabled={actionFlag}
            //   >
            //     <Dropdown.Item onClick={handleHelpNeeded}>
            //       Help Needed
            //     </Dropdown.Item>
            //     <Dropdown.Item onClick={handleDelegate}>Delegate</Dropdown.Item>
            //   </DropdownButton>
            // )}
            //           {/* <Dropdown
            //             editable
            //             // value={options}
            //             // onChange={(e) => onDropdownChange(options, e, field)}
            //             options={options}
            //             optionLabel="name"
            //             placeholder="Actions"
            //             className="w-full md:w-14rem ActionsDropdown"
            //           /> */}
            //         </div>
            //       </div>
            //       </div>
            //     </div>
          )}
        </div>
      </div>
      <div className="tabular-view AccordionIndent">
        <Accordion defaultActiveKey="0" activeKey={activeKey}>
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
              {/* <Accordion
                defaultActiveKey="2"
                style={{ paddingLeft: "43px", background: "#edf4fa", width: "100%",
                marginLeft: "0px" }}
              >
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Design</Accordion.Header>
                  <Accordion.Body>
                    <ProjectPlan {...props} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Input</Accordion.Header>
                  <Accordion.Body>
                    Input
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>FA Assembly</Accordion.Header>
                  <Accordion.Body>
                  FA Assembly
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default ProjectSetup;
