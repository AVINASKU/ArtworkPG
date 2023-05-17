import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import ProjectPlan from "./ProjectPlanList";
import "primeicons/primeicons.css";
import "./index.scss";
import { useSelector } from "react-redux";
import { activateProjectPlan } from "../../../apis/projectPlanApi";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function ProjectPlanCompo(props) {
  const navigate = useNavigate();
  const projectPlanReducer = useSelector((state) => state.ProjectPlanReducer);
  const ProjectPlanDesign = projectPlanReducer.projectPlanDesign;

  const activate = async () => {
    console.log("ProjectPlanDesign: ", ProjectPlanDesign);
    await activateProjectPlan(
      ProjectPlanDesign && ProjectPlanDesign[0].AWM_Project_ID,
      ProjectPlanDesign
    );
    navigate("/myProjects");
    setActiveFlag(!activeFlag);
  };

  const [activeFlag, setActiveFlag] = useState(true);

  return (
    <>
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
      <div className="form-buttons">
        <Button
          className="button-layout"
          variant="secondary"
          onClick={() => {}}
        >
          Cancel
        </Button>

        <Button
          className="button-layout"
          variant="secondary"
          onClick={() => {
            setActiveFlag(!activeFlag);
          }}
        >
          Save
        </Button>

        <Button
          className="button-layout"
          variant="primary"
          onClick={activate}
          disabled={activeFlag}
        >
          Activate
        </Button>
      </div>
    </>
  );
}

export default ProjectPlanCompo;
