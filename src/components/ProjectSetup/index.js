import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AddProject from "../Projects/CreateProject";
import { Button } from "react-bootstrap";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { SelectButton } from "primereact/selectbutton";
import "./index.scss";


function ProjectSetup() {
  const items = [
    { label: "My Projects" },
    { label: "Project Setup/Project Plan" },
  ];
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const options = ["Gantt Chart", "Tabular"];
  const [value, setValue] = useState(options[0]);
  const ActionOptions = [
    { name: "On Hold", color: "orange" },
    { name: "Cancel", color: "red" },
    { name: "Previous State", color: "blue" },
  ];

  function handleClick() {
    setIsClicked(true);
    setSelectedColor("button-click");
  }
  return (
    <div className="content-layout">
      <div className="actions">
        <div className="actions-left">
          <BreadCrumb model={items} />
          <div className="project-name">DC HDW SAR Fairy Fame Pink LBB</div>
        </div>
        <div className="actions-right">
          <div className="card flex justify-content-center">
            <SelectButton
              value={value}
              onChange={(e) => setValue(e.value)}
              options={options}
            />
          </div>
          <div className="card flex justify-content-center1">
            <Dropdown
              value={selectedAction}
              onChange={(e) => {
                setSelectedAction(e.value);
                // setSelectedColor({ backgroundColor: "blue" });
              }}
              onClick={handleClick}
              options={ActionOptions}
              optionLabel="name"
              placeholder="Action"
              className="w-full action-button selectedColor md:w-14rem"
            />
          </div>
        </div>
      </div>
      <div className="tabular-view">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Project Setup</Accordion.Header>
            <Accordion.Body>
              <AddProject {...props} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Design</Accordion.Header>
            <Accordion.Body>Monitor Project</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default ProjectSetup;
