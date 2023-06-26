import React, { useState } from "react";
import { Button } from "primereact/button";
import PMPSpecificTabView from "./PMPSpecificTabView";
import "./index.scss";

const DSBP = () => {
  const [tabsList, setTabsList] = useState([
    { tabHeader: "Header 1", decription: "Header 1 data" },
  ]);
  const [num, setNum] = useState(2);

  return (
    <div className="artwork-dsbp myProjectAnddAllProjectList">
      <Button
        className="btn button-layout"
        variant="primary"
        onClick={() => {
          setTabsList([
            ...tabsList,
            { tabHeader: `Header ${num}`, decription: `Header ${num} data` },
          ]);
          setNum(num + 1);
        }}
      >
        Add Tab
      </Button>
      <PMPSpecificTabView tabsList={tabsList} />
    </div>
  );
};

export default DSBP;
