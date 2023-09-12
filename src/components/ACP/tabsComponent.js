import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";

const TabsComponent = ({
  items,
  tabName,
  actionButton,
  setTabName,
  basePage,
}) => {
  const navigate = useNavigate();
  let { ProjectID } = useParams();
  const [toggleButtons, setToggleButtons] = useState("Tabular");

  const handleClick = (item) => {
    if (ProjectID !== undefined) {
      navigate(`/${basePage}/${item}/${ProjectID}`);
    } else {
      navigate(`/capacityManagement/${item}`);
    }
    setTabName(item);
  };
  return (
    <>
      <div className="tabComponent">
        <div className="tabs-wrapper">
          <ul id="scroller" className="nav nav-tabs">
            {items.map((obj, index) => (
              <li
                key={index + 1}
                className={`${obj.name === tabName ? "active" : ""}`}
              >
                <a data-toggle="tab" onClick={() => handleClick(obj.name)}>
                  {obj.tabNameForDisplay}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* {
          // tabName === "projectPlan" &&
          <div className="actionButtonsForTabComponent">{actionButton}</div>
        } */}
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <div className="col projectPlanButtons">
            <label
              className={` btn border border-secondary ${
                toggleButtons === "GanttChart" ? "ganttChartTabular active" : ""
              }`}
              onClick={() => setToggleButtons("GanttChart")}
            >
              Chart View
            </label>
            <label
              className={` btn border border-secondary ${
                toggleButtons === "Tabular" ? "ganttChartTabular active" : ""
              }`}
              onClick={() => setToggleButtons("Tabular")}
            >
              Tabular View
            </label>
          </div>
        </div>
      </div>
      <div className="tab-content">
        {items.map((obj, index) => (
          <div
            key={index + 1}
            id={`${obj.name}`}
            className={`tab-pane fade ${
              obj.name === tabName ? "in active" : ""
            }`}
          >
            {obj.component}
          </div>
        ))}
      </div>
    </>
  );
};

export default TabsComponent;
