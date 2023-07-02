import React, { useState, useEffect } from "react";
import ArtworkAlignment from "./ArtworkAlignmentPage";
import { Button } from "primereact/button";
import PMPSpecificTabView from "./PMPSpecificTabView";

const DSBP = () => {
  const [tabsList, setTabsList] = useState([
    { tabHeader: "Header 1", decription: "Header 1 data" },
  ]);

  const [tabPanel, handleTabPanel] = useState(1);

  return (
    (
      <>
        {tabsList.length > 1 && tabPanel !== 0 ? (
          <PMPSpecificTabView
            tabsList={tabsList}
            tabPanel={tabPanel}
            handleTabPanel={handleTabPanel}
            setTabsList={setTabsList}
          />
        ) : (
          <ArtworkAlignment
            setTabsList={setTabsList}
            tabsList={tabsList}
            handleTabPanel={handleTabPanel}
            tabPanel={tabPanel}
          />
        )}
      </>
    )
  );
};

export default DSBP;
