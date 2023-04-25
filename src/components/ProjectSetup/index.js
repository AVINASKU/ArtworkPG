import Accordion from "react-bootstrap/Accordion";
import AddProject from "../Projects/CreateProject";
import ProjectPlan from "../Projects/ProjectPlan";
import { Button } from "react-bootstrap";
import { BreadCrumb } from "primereact/breadcrumb";
import "primeicons/primeicons.css";
import "./index.scss";

function ProjectSetup(props) {
  const items = [{ label: "My Projects" }, { label: "Project Setup" }];

  return (
    <div className="content-layout">
      <div className="actions">
        <div>
          {/* <BreadCrumb model={items} />
          <div className="project-name">DC HDW SAR Fairy Fame Pink LBB</div> */}
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
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Project Setup</Accordion.Header>
            <Accordion.Body>
              <AddProject {...props} />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Project Plan</Accordion.Header>
            <Accordion.Body>
              <Accordion
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
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>

          {/* <Accordion.Item eventKey="1">
            <Accordion.Header>Project Plan</Accordion.Header>
            <Accordion.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Design</Accordion.Header>
                  <Accordion.Body>
                    <ProjectPlan {...props} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Input</Accordion.Header>
                  <Accordion.Body>
                    Input
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item> */}

          <Accordion.Item eventKey="3">
            <Accordion.Header>Input</Accordion.Header>
            <Accordion.Body>Input</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default ProjectSetup;
