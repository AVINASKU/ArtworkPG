import Accordion from "react-bootstrap/Accordion";
import AddProject from "../Projects/CreateProject";
import { Button } from "react-bootstrap";
import { BreadCrumb } from "primereact/breadcrumb";
import "primeicons/primeicons.css";
import "./index.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProjectSetup(props) {
  const projectSetup = useSelector((state) => state.projectSetup);
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

        {/* <div className="action-buttons">
          <i
            style={{
              cursor: "pointer",
              padding: 10,
              fontSize: "2rem",
              color: "#003DA5",
            }}
            className="pi pi-filter-slash"
          ></i>
          <i
            style={{
              cursor: "pointer",
              padding: 10,
              fontSize: "2rem",
              color: "#003DA5",
            }}
            className="pi pi-save"
          ></i>
          <i
            style={{
              cursor: "pointer",
              padding: 10,
              fontSize: "2rem",
              color: "#003DA5",
            }}
            className="pi pi-search"
          ></i>
          <i
            style={{
              cursor: "pointer",
              padding: 10,
              fontSize: "2rem",
              color: "#003DA5",
            }}
            className="pi pi-pencil"
          ></i>
          <i
            style={{
              cursor: "pointer",
              padding: 10,
              fontSize: "2rem",
              color: "#003DA5",
            }}
            className="pi pi-file-excel"
          ></i>

          <Button className="button-layout" style={{ fontSize: 14 }}>
            Reset to default
          </Button>
        </div> */}
      </div>
      <div className="tabular-view">
        <Accordion defaultActiveKey="0" activeKey={activeKey}>
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={() => setActiveKey("0")}>
              Project Setup
            </Accordion.Header>
            <Accordion.Body>
              <AddProject {...props} projectMode={mode} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header onClick={() => setActiveKey("1")}>
              Design
            </Accordion.Header>
            <Accordion.Body>Monitor Project</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default ProjectSetup;
