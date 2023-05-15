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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default ProjectSetup;
