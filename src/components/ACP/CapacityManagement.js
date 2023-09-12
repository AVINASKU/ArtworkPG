/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "primeicons/primeicons.css";
import "./index.scss";
import { useSelector } from "react-redux";
import ConfirmationDialog from "./confirmationDialog";
import TabsComponent from "./tabsComponent";
import { Loading, hasAllAccess } from "../../utils";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ProjectService } from "../../service/PegaService";
import CapacityManagementHeader from "./CapacityManagementHeader";
import { getAcpBookingData } from "../../apis/acpApi";
import AcpBookingDatatable from "./AcpBookingDatatable";

function CapacityManagement(props) {
  const toast = useRef(null);

  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const { mode } = projectSetup;
  const { projectPlan } = useSelector((state) => state.ProjectPlanReducer);

  const columnNames = ProjectService.getProjectPlanAllColumnNames();

  const navigate = useNavigate();
  const location = useLocation();
  console.log("location:", location);
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");
  // const [toggleButtons, setToggleButtons] = useState("Tabular");
  const [loader, setLoader] = useState(false);
  const [option, setOption] = useState("");
  const [visible, setVisible] = useState(false);
  const [tabName, setTabName] = useState(
    url[2] !== undefined ? url[2] : url[1]
  );
  const [bookingTableData, setBookingTableData] = useState([]);

  async function fetchData() {
    // setTableLoader(true);
    let AcpBookingData;
    if (tabName === "booking") {
      AcpBookingData = await getAcpBookingData();
    }
    // console.log("AcpBookingData:", AcpBookingData);
    setBookingTableData(AcpBookingData);

    setLoader(false);
  }

  const getData = (option) => {
    setVisible(true);
    setOption(option);
  };

  const accept = () => {
    return navigate("/myProjects");
  };

  const reject = () => {
    console.log("reject");
  };

  let items = "";
  if (tabName === "dashboard") {
    items = "Dashboard";
  } else if (tabName === "planning") {
    items = "Planning";
  } else if (tabName === "booking") {
    items = "Booking";
  } else if (tabName === "bveLoop") {
    items = "BVE Loop";
  } else if (tabName === "reports") {
    items = "Reports";
  }

  useEffect(() => {
    setLoader(true);
    fetchData();
  }, [tabName]);

  const [isSearch, isSearchSet] = useState(false);
  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };
  const isNoAccess = hasAllAccess();

  const breadcrumb = (
    <div>
      <nav
        className="p-breadcrumb p-component ProjectPlanBreadCrum"
        aria-label="Breadcrumb"
      >
        <ul>
          <li className="">
            <NavLink to={`/${url[1]}`} className="p-menuitem-link">
              <span className="p-menuitem-text">
                {url[1] === "capacityManagement"
                  ? "Capacity Management"
                  : "Capacity Management"}
              </span>
            </NavLink>
          </li>
          <li className="p-breadcrumb-chevron pi pi-chevron-right piChevronRightMargin"></li>
          <li className="">
            <a href="#" className="p-menuitem-link">
              <span className="p-menuitem-text">{items}</span>
            </a>
          </li>
          <li>
            {mode !== "create" && (
              <div className="project-name">
                {selectedProjectDetails.Project_Name}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );

  const [isColWidthSet, setColWidth] = useState(null);

  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  // frozenCoulmns?.length || filters?.length || sortData?.length;

  const isResetEnabled =
    // isReorderedColumn || isFilterEnabled ||
    isColWidthSet;

  const childFunc = useRef(null);

  const itemsData = [
    {
      name: "dashboard",
      tabNameForDisplay: "Dashboard",
      component:
        //   isNoAccess ? (
        //   <div className="unauthorized-user">
        //     You are not authorized to access this page.
        //   </div>
        // ) :
        tabName === "dashboard" && (
          <div className="projectSetupParent project-setup-wrapper">
            <div className="actions">
              <div className="breadCrumbParent">{breadcrumb}</div>
            </div>
            Dashboard
          </div>
        ),
    },
    {
      name: "planning",
      tabNameForDisplay: "Planning",
      component: tabName === "planning" && (
        <div className="projectSetupParent project-plan-wrapper">
          <div className="breadCrumbParent">
            <div className="row">
              <div className="col">{breadcrumb}</div>
              <div className="col" style={{ display: "flex" }}>
                {selectedProjectDetails !== undefined && (
                  <CapacityManagementHeader
                    header=""
                    clearFilters={() => {}}
                    clearFilter={childFunc.current}
                    setVisible={() => {}}
                    saveSettings={() => {}}
                    onSearchClick={onSearchClick}
                    // exportCSV={exportCSV}
                    isFilterEnabled={isFilterEnabled}
                    isResetEnabled={isResetEnabled}
                    allData={projectPlan}
                    headers={columnNames}
                    filterFLag={true}
                    CustomizeViewFlag={true}
                    ResetToDefaultFlag={true}
                    isTreeTableFlag={true}
                  />
                )}
              </div>
            </div>
          </div>

          <div>Planning</div>
        </div>
      ),
    },
    {
      name: "booking",
      tabNameForDisplay: "Booking",
      component: tabName === "booking" && (
        <div className="projectSetupParent project-plan-wrapper">
          <div className="breadCrumbParent">
            <div className="row">
              <div className="col">{breadcrumb}</div>
            </div>
          </div>

          <div className="col" style={{ display: "flex" }}>
            {selectedProjectDetails !== undefined && (
              <CapacityManagementHeader
                header=""
                clearFilters={() => {}}
                clearFilter={childFunc.current}
                setVisible={() => {}}
                saveSettings={() => {}}
                onSearchClick={onSearchClick}
                // exportCSV={exportCSV}
                isFilterEnabled={isFilterEnabled}
                isResetEnabled={isResetEnabled}
                allData={projectPlan}
                headers={columnNames}
                filterFLag={true}
                CustomizeViewFlag={true}
                ResetToDefaultFlag={false}
                isTreeTableFlag={true}
                actionFlag={false}
              />
            )}
          </div>
          {loader ? <Loading /> : <AcpBookingDatatable />}
        </div>
      ),
    },
    {
      name: "bveLoop",
      tabNameForDisplay: "BVE Loop",
      component: tabName === "bveLoop" && (
        <div className="projectSetupParent project-plan-wrapper">
          <div className="breadCrumbParent">
            <div className="row">
              <div className="col">{breadcrumb}</div>
              <div className="col" style={{ display: "flex" }}>
                {selectedProjectDetails !== undefined && (
                  <CapacityManagementHeader
                    header=""
                    clearFilters={() => {}}
                    clearFilter={childFunc.current}
                    setVisible={() => {}}
                    saveSettings={() => {}}
                    onSearchClick={onSearchClick}
                    // exportCSV={exportCSV}
                    isFilterEnabled={isFilterEnabled}
                    isResetEnabled={isResetEnabled}
                    allData={projectPlan}
                    headers={columnNames}
                    filterFLag={true}
                    CustomizeViewFlag={true}
                    ResetToDefaultFlag={true}
                    isTreeTableFlag={true}
                  />
                )}
              </div>
            </div>
          </div>

          <div>BVE Loop</div>
        </div>
      ),
    },
    {
      name: "reports",
      tabNameForDisplay: "Reports",
      component: tabName === "reports" && (
        <div className="projectSetupParent project-plan-wrapper">
          <div className="breadCrumbParent">
            <div className="row">
              <div className="col">{breadcrumb}</div>
              <div className="col" style={{ display: "flex" }}>
                {selectedProjectDetails !== undefined && (
                  <CapacityManagementHeader
                    header=""
                    clearFilters={() => {}}
                    clearFilter={childFunc.current}
                    setVisible={() => {}}
                    saveSettings={() => {}}
                    onSearchClick={onSearchClick}
                    // exportCSV={exportCSV}
                    isFilterEnabled={isFilterEnabled}
                    isResetEnabled={isResetEnabled}
                    allData={projectPlan}
                    headers={columnNames}
                    filterFLag={true}
                    CustomizeViewFlag={true}
                    ResetToDefaultFlag={true}
                    isTreeTableFlag={true}
                  />
                )}
              </div>
            </div>
          </div>

          <div>Reports</div>
        </div>
      ),
    },
  ];
  const actionButton = (
    <DropdownButton
      id={!isNoAccess && "projectActions"}
      title="Actions"
      disabled={isNoAccess}
      // data-popper-placement="bottom-end"
      // drop="down-end"
      align="end"
    >
      <Dropdown.Item
        onClick={() => getData("On Hold")}
        className="dropdownItemPaddingLeft dropdownItemColor"
      >
        On Hold
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => getData("Cancel")}
        className="dropdownItemPaddingLeft dropdownItemColor1"
      >
        Cancel
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => getData("Previous State")}
        className="dropdownItemPaddingLeft dropdownItemColor2"
      >
        Previous State
      </Dropdown.Item>
    </DropdownButton>
  );

  return (
    <div className="content-layout">
      <Toast ref={toast} />

      {visible && (
        <ConfirmationDialog
          visible={visible}
          onHide={setVisible}
          message={
            <>
              Are you sure to <span style={{ color: "red" }}>{option}</span> the
              project?
            </>
          }
          header="Confirmation"
          icon="pi"
          accept={accept}
          reject={reject}
        />
      )}

      <div className="tabular-view">
        <TabsComponent
          tabName={tabName}
          items={itemsData}
          // actionButton={actionButton}
          // ViewToggleButton={ViewToggleButton}
          setTabName={setTabName}
          basePage={url[1]}
        />
      </div>
    </div>
  );
}

export default CapacityManagement;
