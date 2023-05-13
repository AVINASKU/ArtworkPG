import React from "react";
import { changeDateFormat } from "../../../utils";

function TaskHeader({
  Project_Name,
  Start_Date,
  End_Date,
  Duration,
  Consumed_Buffer,
}) {
  const intentName = () => {
    return (
      <div className="actions">
        <div className="project-content">
          <label className="project-header-spacing">Project Name</label>
          <div className="font-color">{Project_Name}</div>
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
            <div style={{ textAlign: "center", color: "red" }}>
              {" "}
              + {Consumed_Buffer}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return <div className="content-layout task-layout">{intentName()}</div>;
}

export default TaskHeader;
