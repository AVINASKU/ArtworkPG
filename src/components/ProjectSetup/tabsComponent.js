import React from "react";
import { useLocation } from "react-router-dom";
import "./index.scss";

const TabsComponent = ({ items, tabName, actionButton }) => {
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <>
    <div className="displayFlex">
      <div className="tabs-wrapper">
        <ul id="scroller" className="nav nav-tabs">
          {items.map((obj, index) => (
            <li
              key={index + 1}
              className={`${obj.name === tabName ? "active" : ""}`}
            >
              <a data-toggle="tab" href={`${currentUrl}#${obj.name}`}>
                {obj.tabNameForDisplay}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="actionButtonsForTabComponent">{actionButton}</div>
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
