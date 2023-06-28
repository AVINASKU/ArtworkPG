import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import ArtworkHeader from "../ArtworkHeader";
import ProjectNameHeader from "../ProjectNameHeader";
import SelectDsbpId from "../SelectDsbpId";
import AgilityList from "../AgilityList";
import FooterButtons from "../../AWMJobs/DesignJobs/FooterButtons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDsbpToProject,
  deleteDsbpFromProject,
  getDsbpPMPDetails,
} from "../../../apis/dsbpApi";
import { getDSBPDropdownData } from "../../../store/actions/DSBPActions";
import { onSortData } from "../../../utils";
import "./index.scss";
import { Accordion } from "react-bootstrap";
import { Button } from "primereact/button";

const projectId = "A-2316";
const PMPSpecificTabView = ({ tabsList, tabPanel, handleTabPanel }) => {
  const navigate = useNavigate();
  const [dropdownlist, setDropdownList] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const DropDownData = useSelector((state) => state.DSBPDropdownReducer);
  const [dsbpPmpData, setDsbpPmpData] = useState(null);
  const [selectedFields, setSelectedFields] = useState(null);

  const breadcrumb = [
    { label: "My Tasks", url: "/myTasks" },
    { label: "Approve Regional Design Template" },
  ];

  const dispatch = useDispatch();
  const headerName = "Artwork Alignment";
  const BU = "BABY CARE";
  const Region = "EUROPE";
  console.log("dropdown data", DropDownData);

  useEffect(() => {
    async function fetchData() {
      const resp = await getDsbpPMPDetails("A-2474");
      console.log("resp", resp);
      const transformedArray = resp.flatMap((item) =>
        item.DSBP_PMP_PIMaterialIDPage.map((person) => ({
          DSBP_InitiativeID: item.DSBP_InitiativeID,
          ...person,
        }))
      );
      setDsbpPmpData(transformedArray);
    }
    fetchData();
  }, [projectId]);

  useEffect(() => {
    dispatch(getDSBPDropdownData(BU, Region));
  }, [dispatch]);

  useEffect(() => {
    setDropdownList(DropDownData.DSBPDropdownData);
  }, [DropDownData]);

  const addDSBPIntoProject = async (InitiativeID, operation) => {
    console.log("dsbp id", InitiativeID, operation);
    const projectId = "A-2316";
    if (operation === "add") {
      console.log("add operation");
      let checkRes = await addDsbpToProject(projectId, InitiativeID);
      console.log("checkRes", checkRes);
    }
    if (operation === "delete") {
      console.log("delete operation");
      let checkRes = await deleteDsbpFromProject(projectId, InitiativeID);
      console.log("check delete Res", checkRes);
    }
    // fetch dsbp project data after delete / add
  };

  const onSort = (column, direction) => (event) => {
    const sortedData = onSortData(column, direction, dsbpPmpData);
    setDsbpPmpData(sortedData);
    console.log("sorted data", sortedData);
  };

  const handleSelect = (item) => {
    console.log("item", item);
    if (selected?.some((d) => d.InitiativeID === item.InitiativeID)) {
      setSelected(selected.filter((i) => i.InitiativeID !== item.InitiativeID));
    } else {
      if (selected.length === 0) {
        const selectedList = [];
        selectedList.push(item);
        setSelected(selectedList);
      } else {
        setSelected([...selected, item]);
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectAllChecked(true);
      // setSelected(products);
    } else {
      setSelectAllChecked(false);
      setSelected([]);
    }
  };

  const handleCancel = () => {
    return navigate(`/myProjects`);
  };

  const onSubmit = () => {
    return navigate(`/myProjects`);
  };
  console.log("dropdownlist", dropdownlist);

  const onGlobalFilterChange = (e, colName) => {
    const value = e.value;
    console.log("value and e.value", value, e.value);
    setSelectedFields(value);
  };

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
        <Accordion.Item eventKey="1">
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
                  <td className="columnWidth">DSBP_PO_PMP_poMaterialNumber</td>
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
        </Accordion.Item>
      </Accordion>
      </div>
      <div className="form-buttons" style={{ background: "#FAFAFA" }}>
        <Button
          className="button-layout"
          variant="secondary"
          // onClick={() => navigate("/myProjects")}
          // disabled={!isAccessEmpty}
        >
          Cancel
        </Button>

        <Button
          className="button-layout DSBPsubmit"
          variant="primary"
          // onClick={onSave}
          // disabled={activeSave}
        >
          Submit
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      {tabsList.length > 1 && tabPanel !== 0 ? (
        <TabView
          activeIndex={tabPanel}
          onTabChange={(e) => handleTabPanel(e.index)}
        >
          {tabsList.map((obj, index) => (
            <TabPanel
              header={index === 0 ? "Artwork Alignment" : obj.tabHeader}
              closable={index !== 0}
            >
              {index === 0 ? (
                <p>
                  <AgilityList
                    selected={selected}
                    setSelected={setSelected}
                    selectAllChecked={selectAllChecked}
                    handleSelect={handleSelect}
                    handleSelectAll={handleSelectAll}
                    dsbpPmpData={dsbpPmpData}
                    onSort={onSort}
                    onGlobalFilterChange={onGlobalFilterChange}
                    selectedFields={selectedFields}
                  />
                </p>
              ) : (
                tabsCompo(obj)
              )}
            </TabPanel>
          ))}
        </TabView>
      ) : (
        <>
          <ArtworkHeader
            breadcrumb={breadcrumb}
            headerName={headerName}
            selected={selected}
            label="Artwork Alignment"
          />
          <ProjectNameHeader />
          <SelectDsbpId
            dropdownlist={dropdownlist}
            addDSBPIntoProject={addDSBPIntoProject}
          />
          <AgilityList
            selected={selected}
            setSelected={setSelected}
            selectAllChecked={selectAllChecked}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
            dsbpPmpData={dsbpPmpData}
            onSort={onSort}
            onGlobalFilterChange={onGlobalFilterChange}
            selectedFields={selectedFields}
          />
          <FooterButtons
            handleCancel={handleCancel}
            hideSaveButton={true}
            onSubmit={onSubmit}
          />
        </>
      )}
    </div>
  );
};

export default PMPSpecificTabView;
