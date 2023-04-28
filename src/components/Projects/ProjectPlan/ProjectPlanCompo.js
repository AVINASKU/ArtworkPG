import Accordion from "react-bootstrap/Accordion";
import ProjectPlan from "./ProjectPlanList";
import "primeicons/primeicons.css";
import "./index.scss";

function ProjectPlanCompo(props) {
  return (
    <Accordion className="projectPlanAccordian" defaultActiveKey="2">
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
