import React from "react";

function AddNewDesign({ projectName, start_date, end_date, duration, consumed_buffer }) {
  const intentName = () => {
    return (
      <div className="actions">
          <div className="project-content">
          <label className="project-header-spacing">Project Name</label>
          <div className="font-color">{projectName}</div>
        </div>

        <div className="action-buttons">
          <div className="project-content">
            <label className="project-header-spacing">Duration</label>
            <div>{duration}</div>
          </div>
          <div className="project-content">
            <label className="project-header-spacing">Start Date</label>
            <div>{start_date}</div>
          </div>
          <div className="project-content">
            <label className="project-header-spacing">End Date</label>
            <div>{end_date}</div>
          </div>
           <div className="project-content">
            <label className="project-header-spacing">Consumed Buffer</label>
            <div style={{textAlign:'center', color:'red'}}> + {consumed_buffer}</div>
          </div>
        </div>
      </div>
    );
  };
  return <div className="content-layout">{intentName()}</div>;
}

export default AddNewDesign;
