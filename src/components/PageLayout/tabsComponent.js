import React from "react";
import "./index.scss";

const TabsComponent = ({ items, tabName, setTabName }) => {
  return (
    <>
      <div className="tabs-wrapper">
        <ul id="scroller" className="nav nav-tabs">
          {items.map((obj, index) => (
            <li
              key={index + 1}
              className={`${obj.name === tabName ? "active" : ""}`}
              onClick={() => setTabName(obj.name)}
            >
              <a data-toggle="tab" href={`#${obj.name}`}>
                {obj.tabNameForDisplay}
              </a>
            </li>
          ))}
        </ul>
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
