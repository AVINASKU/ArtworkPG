import React from "react";
import { changeDateFormat } from "../../../utils";
import { useNavigate, useLocation } from "react-router-dom";

function TaskHeader({
  Project_Name,
  Start_Date,
  End_Date,
  Duration,
  Consumed_Buffer,
  TaskDetailsData,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const intentName = () => {
    const locationPath = location?.pathname;
    const url = locationPath?.split("/");
    const pathName = url[2];
    return (
      <div className="actions">
        <div className="project-content">
          <label className="project-header-spacing">Project Name</label>
          <div
            className="font-color"
            onClick={() => {
              if (
                pathName === "DNIQ" ||
                pathName === "CNIQ" ||
                pathName === "DNPF" ||
                pathName === "CCD" ||
                pathName === "CPT"
              ) {
                navigate(
                  `/myProjects/projectPlan/${TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID}`
                );
              }
            }}
          >
            {Project_Name}
          </div>
        </div>

        <div className="action-buttons">
          <div className="project-content">
            <label className="project-header-spacing">Duration</label>
            <div>{Duration}</div>
          </div>
          <div className="project-content">
            <label className="project-header-spacing">Start Date</label>
            {Start_Date && <div>{changeDateFormat(Start_Date)}</div>}
          </div>
          <div className="project-content">
            <label className="project-header-spacing">End Date</label>
            {End_Date && <div>{changeDateFormat(End_Date)}</div>}
          </div>
          <div className="project-content">
            <label className="project-header-spacing">Consumed Buffer</label>
            {Consumed_Buffer && (
              <div style={{ textAlign: "center", color: "red" }}>
                {" "}
                + {Consumed_Buffer}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return <div className="content-layout task-layout">{intentName()}</div>;
}

export default TaskHeader;
