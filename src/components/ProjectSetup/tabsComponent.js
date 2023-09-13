import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";


const TabsComponent = ({ items, tabName, actionButton, setTabName, basePage }) => {
  const navigate = useNavigate();
  let { ProjectID } = useParams();

  const handleClick = (item) => {
    if(ProjectID !== undefined){
      navigate(`/${basePage}/${item}/${ProjectID}`);
    } else {
      navigate(`/${item}`);
    }
    setTabName(item)   
  }
  return (
    <>
   
      <div className="tabComponent">
        <div className="tabs-wrapper">
          <ul id="scroller" data-testid="scroller" className="nav nav-tabs">
            {items.map((obj, index) => (
              <li
                key={index + 1}
                className={`${obj.name === tabName ? "active" : ""}`}
              >
                  <a data-toggle="tab" data-testid={"scrollTab-"+index} onClick={() => handleClick(obj.name)}>
                  {obj.tabNameForDisplay}
                </a>
              </li>
            ))}
          </ul>
        </div>       
      </div>
      <div className="tab-content">
        {items.map((obj, index) => (
          <div
            key={index + 1}
            id={`${obj.name}`}
            data-testid={`${obj.name}`}
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
