import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import ArtworkAlignment from "../ArtworkAlignmentPage";
import "./index.scss";
import { Accordion } from "react-bootstrap";
import { Button } from "primereact/button";

const PMPSpecificTabView = ({ tabsList, setTabsList, tabPanel, handleTabPanel }) => {
  const [filteredDataList, setFilteredDataList] = useState(tabsList);

  useEffect(() => {
    setFilteredDataList(tabsList);
  }, [tabsList]);

  useEffect(() => {
    handleTabPanel(tabsList.length - 1);
  }, []);

  useEffect(() => {
    if (tabPanel >= tabsList.length) {
      handleTabPanel(tabsList.length - 1);
    }
  }, [tabsList, tabPanel]);
  
  const tabsCompo = (obj) => (
    <div className="tabsCompo">
      <div className="tabsCompoMain">
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Material Details</Accordion.Header>
            <Accordion.Body>
              <table class="table table-sm table-hover">
                <tbody>
                  <tr>
                    <td className="columnWidth">DSBP_InitiativeID</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">DSBP_PMP_PIMaterialNumber</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">
                      DSBP_PMP_PIMaterialDescription
                    </td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">AWReadinessGateStatus</td>
                    <td>{obj.decription}</td>
                  </tr>
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
          {/* <Accordion.Item eventKey="1">
            <Accordion.Header>AWM</Accordion.Header>
            <Accordion.Body>
              <table class="table table-sm table-hover">
                <tbody>
                  <tr>
                    <td className="columnWidth">AWM_AddedToProject</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">AWM_AWJStatus</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">AWM_POARequested</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">AWM_AssemblyMechanism</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">AWM_GroupPMP</td>
                    <td>{obj.decription}</td>
                  </tr>
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>RTA Data</Accordion.Header>
            <Accordion.Body>
              <table class="table table-sm table-hover">
                <tbody>
                  <tr>
                    <td className="columnWidth">RTA_POANumber</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">RTA_RTAPOAStatus</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">RTA_RTARejectionReason</td>
                    <td>{obj.decription}</td>
                  </tr>
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>DSBP Data</Accordion.Header>
            <Accordion.Body>
              <table class="table table-sm table-hover">
                <tbody>
                  <tr>
                    <td className="columnWidth">PICountry_Countries</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">PILanguage_Languages</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">
                      DSBP_PO_PMP_poPoaApprovedCountries
                    </td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">DSBP_PO_PMP_poLanguages</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">
                      DSBP_PMP_PIPackagingComponentType
                    </td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">DSM_PMP_PrintingProcess</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">POA_POANumber</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">DSBP_PMP_artworkComment</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">DSBP_PMP_promo</td>
                    <td>{obj.decription}</td>
                  </tr>
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>DSBP PO Data</Accordion.Header>
            <Accordion.Body>
              <table class="table table-sm table-hover">
                <tbody>
                  <tr>
                    <td className="columnWidth">
                      DSBP_PO_PMP_poMaterialNumber
                    </td>
                    <td>{obj.decription}</td>
                  </tr>
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>FPC Data</Accordion.Header>
            <Accordion.Body>
              <table class="table table-sm table-hover">
                <tbody>
                  <tr>
                    <td className="columnWidth">DSBP_FPC_FPCCode</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">DSBP_FPC_FPCDescription</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">DSBP_FPC_Brand</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">DSBP_FPC_Category</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">DSBP_FPC_ProductForm</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">POFPC_poFPCCode</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">POFPC_poBrandName</td>
                    <td>{obj.decription}</td>
                  </tr>
                  <tr>
                    <td className="columnWidth">POFPC_poFPCDescription</td>
                    <td>{obj.decription}</td>
                  </tr>
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item> */}
        </Accordion>
      </div>
      <div className="form-buttons" style={{ background: "#FAFAFA" }}>
        <Button className="button-layout" variant="secondary">
          Cancel
        </Button>

        <Button className="button-layout DSBPsubmit" variant="primary">
          Submit
        </Button>
      </div>
    </div>
  );

  const handleDelete = (index) => {
    
    const updatedDataList = [...tabsList];
    updatedDataList.splice(index, 1);
    setTabsList(updatedDataList);
    console.log("updatedDataList handleDelete", updatedDataList);
    if (tabPanel >= tabsList.length) {
      handleTabPanel(tabsList.length - 1); // Select the last tab if the active tab is deleted
    }
  };

  const CustomTabHeader = ({ tabHeader, index }) => {
    return (
      <div className="custom-tab-header">
        <span className="p-tabview-title">{tabHeader}</span>
        {index !== 0 &&
          <button className="close-button" onClick={() => handleDelete(index)}>
          &#x2715;
        </button>
        }
      </div>
    );
  };
  const renderTabs = () => {
    return filteredDataList.map((obj, index) => (
      <TabPanel
        key={index}
        header={<CustomTabHeader tabHeader={index === 0 ? "Artwork Alignment" : obj.tabHeader} index={index} />}
        scrollable
      >
        {index === 0 ? (
          <ArtworkAlignment />
        ) : (
          tabsCompo(obj)                
        )}
      </TabPanel>
    ));
  };

  return (
    console.log("updatedDataList handleDelete 11", tabsList.length, tabPanel >= tabsList.length),
    <div>
      {tabsList.length > 1 && tabPanel !== 0 ? (
        <TabView
          activeIndex={tabPanel}
          onTabChange={(e) => handleTabPanel(e.index)}
        >
          {renderTabs()}
        </TabView>
      ) : (
        <ArtworkAlignment />
      )}
    </div>
  );
};

export default PMPSpecificTabView;
