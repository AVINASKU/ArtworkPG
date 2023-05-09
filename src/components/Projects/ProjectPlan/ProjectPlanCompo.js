import Accordion from "react-bootstrap/Accordion";
import ProjectPlan from "./ProjectPlanList";
import "primeicons/primeicons.css";
import "./index.scss";
import { useSelector } from "react-redux";
import { activateProjectPlan } from "../../../apis/projectPlanApi";
import { useNavigate } from "react-router-dom";

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
  };

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
      <div className="row">
        <div className="col btn-group btn-group-toggle d-flex justify-content-end">
          <div>
            <button
              type="button"
              onClick={() => {}}
              className="btn btn-outline-secondary projectPlanCompoButtons"
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {}}
              className="btn btn-primary projectPlanCompoButtons projectPlanCompoButtonsColor"
            >
              Save
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={activate}
              className="btn btn-success projectPlanCompoButtons projectPlanCompoButtonsColor1"
            >
              Activate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectPlanCompo;
