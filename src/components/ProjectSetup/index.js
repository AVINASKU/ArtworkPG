import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AddProject from "../Projects/CreateProject";
import { Button } from "react-bootstrap";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { SelectButton } from "primereact/selectbutton";
import "./index.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectPlanCompo from "../Projects/ProjectPlan/ProjectPlanCompo";

function ProjectSetup(props) {
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  console.log("projectSetup:", projectSetup);
  const selectedProjectDetails = projectSetup.selectedProject;
  const { mode, rootBreadCrumb } = projectSetup;
  const [activeKey, setActiveKey] = useState("0");
  const items = [
    { label: rootBreadCrumb },
    { label: activeKey === "0" ? "Project Setup" : "Design" },
  ];

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

  return (
    <div className="content-layout">
      <div className="actions">
        <div>
          <BreadCrumb model={items} />

          {/* {`--------${mode}`} */}
          {mode !== "create" && (
            <div className="project-name">
              {selectedProjectDetails.Project_Name}
            </div>
          )}
        </div>
      </div>
      <div className="tabular-view">
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
