import Accordion from "react-bootstrap/Accordion";
import ProjectPlan from "./ProjectPlanList";
import "primeicons/primeicons.css";
import "./index.scss";

function ProjectPlanCompo(props) {
  return (
    <Accordion
      defaultActiveKey="2"
      style={{
        // paddingLeft: "43px",
        background: "#edf4fa",
        width: "100%",
        marginLeft: "0px",
      }}
    >
      <Accordion.Item eventKey="2">
        <Accordion.Header>Design</Accordion.Header>
        <Accordion.Body>
          <ProjectPlan {...props} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Input</Accordion.Header>
        <Accordion.Body>Input</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>FA Assembly</Accordion.Header>
        <Accordion.Body>FA Assembly</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ProjectPlanCompo;
