/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import moment from "moment";
import { Toast } from "primereact/toast";
import { isArray } from "lodash";
import AddProject from "../Projects/CreateProject";
import { DropdownButton, Dropdown, Accordion } from "react-bootstrap";
import "primeicons/primeicons.css";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import ProjectPlanCompo from "../Projects/ProjectPlan/ProjectPlanCompo";
import ConfirmationDialog from "./confirmationDialog";
import TabsComponent from "./tabsComponent";
import { hasAllAccess } from "../../utils";
import { getProjectPlan } from "../../apis/projectPlanApi";
import {
  updateProjectPlanAction,
  updateProjectPlanDesignAction,
} from "../../store/actions/ProjectPlanActions";
import {
  activateProjectPlan,
  saveProjectPlanAction,
} from "../../apis/projectPlanApi";
import { getMyProject } from "../../store/actions/ProjectActions";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProjectListHeader from "../Projects/MyProjects/ProjectListHeader";
import ProjectService  from "../../service/PegaService";
import ArtworkAlignment from "../DSBP/ArtworkAlignmentPage";
// import DependencyMapping from "../DSBP/DependencyMappingPage";

const DependencyMapping = lazy(() => import("../DSBP/DependencyMappingPage"));

function ProjectSetup(props) {
  const toast = useRef(null);
  const isAccessEmpty = true;

  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const { mode } = projectSetup;
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const { accessMatrix } = useSelector((state) => state?.accessMatrixReducer);
  const { projectPlan, projectPlanDesign, loading } = useSelector(
    (state) => state.ProjectPlanReducer
  );
  const { myProject, ...myProjectData } = useSelector(
    (state) => state.myProject
  );

  const columnNames = ProjectService.getProjectPlanAllColumnNames();
  let { ProjectID } = useParams();
  let path = "";
  if (window?.location?.pathname.includes("projectPlan")) {
    path = "/projectPlan";
  }
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");
  const [toggleButtons, setToggleButtons] = useState("Tabular");
  const [option, setOption] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeSave, setActiveSave] = useState(true);
  const [tabName, setTabName] = useState(
    url[2] !== undefined && url[2] !== "" ? url[2] : url[1] !== undefined && url[1] !== "" ? url[1] : "projectSetup"
  );
  const [tabNameForPP, setTabNameForPP] = useState("Design");
  const [projectPlanDesignData, setProjectPlanDesignData] = useState([]);
  const [pegadata, setPegaData] = useState(null);
  const [updatedProjectPlanDesignData, setUpdatedProjectPlanDesignData] =
    useState([]);
    const [loader, setLoader] = useState(false);
    const [activeFlag, setActiveFlag] = useState(true);
  
  const firstTime = projectPlanDesign.some(
    (item) => item.Assignee !== "" || item.Role !== ""
  );
  const getData = (option) => {
    setVisible(true);
    setOption(option);
  };
  useEffect(() => {
    if (!isAccessEmpty) {
      setActiveSave(true);
    }
  }, [isAccessEmpty]);

  useEffect(() => {
    // setActiveFlag(false);
    let projectData = isArray(myProject) && myProject.find(
      (project) => project.Project_ID === ProjectID
    );
    
    if (
      (!firstTime && projectData?.Project_State === "Draft") ||
      projectData?.Project_State === "Active" ||
      !isAccessEmpty ||
      projectPlan.length === 0
    ) {
      setActiveFlag(true);
    }
  }, [myProject, projectPlan, isAccessEmpty, projectPlanDesign]);

  useEffect(() => {
    if (updatedProjectPlanDesignData) {
      setProjectPlanDesignData(updatedProjectPlanDesignData || []);
    }
  }, [updatedProjectPlanDesignData]);

  useEffect(() => {
    if (tabName === "projectPlan" || url[2] === "projectPlan") {
      getProjectPlanApi();
    }
  }, [mode]);

  const getProjectPlanApi = async () => {
    setLoader(true);
    let restructuredData = [];
    const apiData =
      (mode === "edit" || mode === "design") &&
      selectedProjectDetails?.Project_ID
        ? await getProjectPlan(selectedProjectDetails?.Project_ID)
        : [];
    apiData && dispatch(updateProjectPlanDesignAction(apiData));
    restructuredData = apiData?.length > 0 ? getRestructuredData(apiData) : [];
    dispatch(updateProjectPlanAction(restructuredData));
    setLoader(false);
  };

  const getRestructuredData = (apiData) => {
    let mainTempArr = [];
    let tasks = [];
    tasks = [
      {
        name: "Define Design Intent",
        code: "DDI",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("DDI_")),
      },
      {
        name: "Upload Approved Design Intent",
        code: "UADI",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("UADI_")),
      },
      {
        name: "Define Design Template",
        code: "DDT",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("DDT_")),
      },
      {
        name: "Upload Regional Design Template",
        code: "URDT",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("URDT_")),
      },
      {
        name: "Approve Regional Design Template",
        code: "ARDT",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("ARDT_")),
      },
      {
        name: "Define Production Ready Art",
        code: "DPRA",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("DPRA_")),
      },
      {
        name: "Upload Production Ready Art",
        code: "UPRA",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("UPRA_")),
      },
      {
        name: "Approve Production Ready Art",
        code: "APRA",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("APRA_")),
      },

      {
        name: "Confirm Preliminary print feasibility Assessment",
        code: "CPPFA",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CPPFA_")),
      },
      {
        name: "Define New Print Feasibility Scope",
        code: "DNPF",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("DNPF_")),
      },
      {
        name: "Confirm Color Development",
        code: "CCD",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CCD_")),
      },
      {
        name: "Confirm Print Trial",
        code: "CPT",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CPT_")),
      },
      {
        name: "Define New Ink Qualification scope",
        code: "DNIQ",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("DNIQ_")),
      },
      {
        name: "Confirm New Ink Qualification",
        code: "CNIQ",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CNIQ_")),
      },
      {
        name: "Start Artwork Alignment",
        code: "SAA",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("SAA_")),
      },
      {
        name: "Dependency Mapping",
        code: "DM",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("DM_")),
      },
      {
        name: "Upload Briefing documents",
        code: "UBD",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("UBD_")),
      },
      {
        name: "Approve CIC",
        code: "ACIC",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("ACIC_")),
      },
      {
        name: "Upload CIC",
        code: "UCIC",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("UCIC_")),
      },
    ];
    // }

    tasks.forEach((task) => {
      if (task.data?.length > 0) {
        if (
          task.data[0]?.AWM_Task_ID.includes("DDI_") ||
          task.data[0]?.AWM_Task_ID.includes("DDT_") ||
          task.data[0]?.AWM_Task_ID.includes("DPRA_") ||
          task.data[0]?.AWM_Task_ID.includes("CPPFA_") ||
          task.data[0]?.AWM_Task_ID.includes("DNPF_") ||
          task.data[0]?.AWM_Task_ID.includes("DNIQ_") ||
          task.data[0]?.AWM_Task_ID.includes("SAA_") ||
          task.data[0]?.AWM_Task_ID.includes("DM_") ||
          task.data[0]?.AWM_Task_ID.includes("ACIC_") ||
          task.data[0]?.AWM_Task_ID.includes("UCIC_")
        ) {
          let tempObj = {};
          tempObj["key"] = task.data[0]?.AWM_Task_ID;

          let dataObj = {};
          dataObj["Task"] = task.data[0]?.AWM_Task_ID.includes("DNPF_")
            ? "Define New Print Feasibility Scope"
            : task.data[0]?.Task_Name;
          dataObj["Dependency"] = task.data[0]?.Dependency;
          dataObj["Role"] = task.data[0]?.Role;
          dataObj["RoleOptions"] = task.data[0]?.RoleOptions;
          dataObj["Assignee"] = task.data[0]?.Assignee;
          dataObj["Owner"] = task.data[0]?.Owner;
          dataObj["State"] = task.data[0]?.State;
          dataObj["Duration"] = task.data[0]?.Duration;
          dataObj["StartDate"] = task.data[0]?.Start_Date;
          dataObj["EndDate"] = task.data[0]?.End_Date;
          dataObj["ConsumedBuffer"] = task.data[0]?.Consumed_Buffer;
          dataObj["HelpNeeded"] = task.data[0]?.Help_Needed;

          tempObj["data"] = dataObj;
          tempObj["children"] = [];
          tempObj["redirect"] = true;

          mainTempArr.push(tempObj);
        } else {
          let tempObj = {};
          let tempArr = [];
          let pStartDate = "";
          let pEndDate = "";
          let startDateArr = [];
          let endDateArr = [];

          tempObj["key"] = task.code;
          let dataObj = {};
          dataObj["Task"] = `${task.name} (X${task.data?.length})`;
          dataObj["Dependency"] = task.data[0]?.Dependency;
          dataObj["Role"] = "";
          dataObj["RoleOptions"] = "";
          dataObj["Assignee"] = "";
          dataObj["Owner"] = "";
          dataObj["State"] = "";
          dataObj["Duration"] = "";

          dataObj["ConsumedBuffer"] = "";
          dataObj["HelpNeeded"] = false;

          tempObj["data"] = dataObj;
          tempObj["redirect"] = true;

          //child array creation

          task.data.forEach((dt, index) => {
            dt.Start_Date && startDateArr?.push(dt.Start_Date);
            dt.End_Date && endDateArr?.push(dt.End_Date);
            pStartDate =
              startDateArr.length > 0 &&
              moment.min(
                startDateArr.map((date) =>
                  moment(date, "YYYYMMDDTHHmmss.SSS [GMT]")
                )
              );
            pEndDate =
              endDateArr.length > 0 &&
              moment.max(
                endDateArr.map((date) =>
                  moment(date, "YYYYMMDDTHHmmss.SSS [GMT]")
                )
              );
            let tempObj = {};
            tempObj["key"] = dt.AWM_Task_ID;

            let dataObj = {};
            dataObj["Task"] = `${index + 1}). ${dt.Task_Name}`;
            dataObj["Dependency"] = dt.Dependency;
            dataObj["Role"] = dt.Role;
            dataObj["RoleOptions"] = dt.RoleOptions;
            dataObj["Assignee"] = dt.Assignee;
            dataObj["Owner"] = dt.Owner;
            dataObj["State"] = dt.State;
            dataObj["Duration"] = dt.Duration;
            dataObj["StartDate"] = dt.Start_Date;
            dataObj["EndDate"] = dt.End_Date;
            dataObj["ConsumedBuffer"] = dt.Consumed_Buffer;
            dataObj["HelpNeeded"] = dt.Help_Needed;

            tempObj["data"] = dataObj;
            tempObj["children"] = [];

            tempArr.push(tempObj);
          });
          dataObj["StartDate"] = pStartDate;
          dataObj["EndDate"] = pEndDate;

          tempObj["children"] = tempArr;

          mainTempArr.push(tempObj);
        }
      }
    });

    return mainTempArr; //toBeReplacedWithapiData;
  };

  const accept = () => {
    return navigate("/myProjects");
  };

  const reject = () => {
    //console.log("reject");
  };

  let items = "";
  if (tabName === "projectSetup") {
    items = "Project Setup";
  } else if (tabName === "projectPlan") {
    items = "Project Plan";
  } else if (tabName === "artworkAlignment") {
    items = "Art work Alignment";
  } else if (tabName === "mapping") {
    items = "mapping";
  } else if (tabName === "readinessPerPMP") {
    items = "ReadinessPerPMP";
  }
  

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
                {url[1] === "allProjects" ? "All Projects" : "My Projects"}
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

  const [isFilterEnabled, setIsFilterEnabled] = useState(true);
  // frozenCoulmns?.length || filters?.length || sortData?.length;

  const isResetEnabled =
    // isReorderedColumn || isFilterEnabled ||
    isColWidthSet;

  const childFunc = useRef(null);

  const test = (e) => {
    setIsFilterEnabled(e);
  };

  const saveData = (updatedData, activate) => {
    projectPlanDesignData.filter(
      ({ AWM_Project_ID, AWM_Task_ID, Assignee, Role, Duration }) =>
        projectPlanDesign.some((object2) => {
          if (
            AWM_Task_ID === object2.AWM_Task_ID &&
            ((Role !== undefined && Role !== "" && Role !== object2.Role) ||
              (Assignee !== undefined &&
                Assignee !== "" &&
                Assignee !== object2.Assignee) ||
              (Duration !== undefined &&
                Duration !== "" &&
                Duration !== object2.Duration))
          ) {
            if (!activate) {
              updatedData.AWM_Project_ID = AWM_Project_ID;
            }
            updatedData.push({
              AWM_Task_ID: AWM_Task_ID,
              Assignee: Assignee,
              Role: Role,
              Duration: Duration,
            });
            return true;
          }
          return false;
        })
    );
    //console.log("updatedData function", updatedData);
    return updatedData;
  };

  const onSave = async () => {
    setLoader(true);
    let updatedData = [];
    const updatedSaveData = saveData(updatedData);
    if (updatedData.length !== 0) {
      const formData = {
        ArtworkAgilityProjects: updatedSaveData,
      };
      dispatch(updateProjectPlanDesignAction(updatedProjectPlanDesignData));
      await saveProjectPlanAction(formData, selectedProjectDetails.Project_ID);
      await dispatch(getMyProject(userInformation));
      getProjectPlanApi();
      setActiveSave(true);
      setActiveFlag(true);
    }
  };

  const activate = async () => {
    setLoader(true);
    let updatedData = [];
    const updatedSaveData = saveData(updatedData, true);

    if (updatedData.length !== 0) {
      const formData = {
        ArtworkAgilityProjects: updatedSaveData,
      };
      await activateProjectPlan(formData, selectedProjectDetails.Project_ID);
      await dispatch(getMyProject(userInformation));
      getProjectPlanApi();
      await toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Project activated successfully!",
        life: 5000,
      });
      // setLoader(false);
      setActiveSave(true);
      setActiveFlag(true)
    }
  };

  const itemsData = [
    {
      name: "projectSetup",
      tabNameForDisplay: "Project Setup",
      component:
        //   isNoAccess ? (
        //   <div className="unauthorized-user">
        //     You are not authorized to access this page.
        //   </div>
        // ) :
        tabName === "projectSetup" && (
          <div className="projectSetupParent project-setup-wrapper">
            <div className="actions">
              <div className="breadCrumbParent">{breadcrumb}</div>
            </div>
            <AddProject {...props} />
          </div>
        ),
    },
    {
      name: "projectPlan",
      tabNameForDisplay: "Project Plan",
      component: tabName === "projectPlan" && (
        <div className="projectSetupParent project-plan-wrapper">
          <div className="breadCrumbParent">
            <div className="row">
              <div className="col">{breadcrumb}</div>
              <div className="col" style={{ display: "flex" }}>
                {selectedProjectDetails !== undefined && (
                  <ProjectListHeader
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
                <div
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons"
                >
                  <div className="col projectPlanButtons">
                    <label
                      className={` btn border border-secondary ${
                        toggleButtons === "GanttChart"
                          ? "ganttChartTabular active"
                          : ""
                      }`}
                      onClick={() => setToggleButtons("GanttChart")}
                    >
                      Gantt Chart
                    </label>
                    <label
                      className={` btn border border-secondary ${
                        toggleButtons === "Tabular"
                          ? "ganttChartTabular active"
                          : ""
                      }`}
                      onClick={() => setToggleButtons("Tabular")}
                    >
                      Tabular
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {toggleButtons === "Tabular" && (
            <div>
              <Accordion className="projectPlanAccordian" defaultActiveKey="2">
                <Accordion.Item eventKey="2">
                  <Accordion.Header onClick={() => setTabNameForPP("Design")}>
                    Design
                  </Accordion.Header>
                  <Accordion.Body>
                    <ProjectPlanCompo
                      isSearch={isSearch}
                      setColWidth={setColWidth}
                      childFunc={childFunc}
                      test={test}
                      tabNameForPP={tabNameForPP}
                      view={toggleButtons}
                      setTabName={setTabName}
                      updatedProjectPlanDesignData={
                        updatedProjectPlanDesignData
                      }
                      setUpdatedProjectPlanDesignData={
                        setUpdatedProjectPlanDesignData
                      }
                      activeSave={activeSave}
                      setActiveFlag={setActiveFlag}
                      setActiveSave={setActiveSave}
                      getProjectPlanApi={getProjectPlanApi}
                      loader={loader}
                      pegadata={pegadata}
                      setPegaData={setPegaData}
                      activeFlag={activeFlag}
                      isAccessEmpty={isAccessEmpty}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header onClick={() => setTabNameForPP("Input")}>
                    Input
                  </Accordion.Header>
                  <Accordion.Body>
                    <ProjectPlanCompo
                    isSearch={isSearch}
                    setColWidth={setColWidth}
                    childFunc={childFunc}
                    test={test}
                    tabNameForPP={tabNameForPP}
                    view={toggleButtons}
                    setTabName={setTabName}
                    updatedProjectPlanDesignData={updatedProjectPlanDesignData}
                    setUpdatedProjectPlanDesignData={setUpdatedProjectPlanDesignData}
                    activeSave={activeSave}
                    setActiveFlag={setActiveFlag}
                    setActiveSave={setActiveSave}
                    getProjectPlanApi={getProjectPlanApi}
                    loader={loader}
                    pegadata={pegadata} 
                    setPegaData={setPegaData}
                    activeFlag={activeFlag}
                    isAccessEmpty={isAccessEmpty}
                  />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>FA Assembly</Accordion.Header>
                  <Accordion.Body>FA Assembly</Accordion.Body>
                </Accordion.Item>
              </Accordion>
              {
                <div className="form-buttons" style={{ background: "#FAFAFA" }}>
                  <Button
                    className={
                      !isAccessEmpty ? "btn btn-disabled" : "button-layout"
                    }
                    variant="secondary"
                    onClick={() => navigate("/myProjects")}
                    disabled={!isAccessEmpty}
                  >
                    Cancel
                  </Button>

                  <Button
                    className={
                      activeSave ? "btn btn-disabled" : "button-layout"
                    }
                    variant="secondary"
                    onClick={onSave}
                    disabled={activeSave}
                  >
                    Save
                  </Button>

                  <Button
                    className="button-layout"
                    variant="primary"
                    onClick={activate}
                    disabled={activeFlag}
                  >
                    Activate
                  </Button>
                </div>
              }
            </div>
          )}
        </div>
      ),
    },
    {
      name: "artworkAlignment",
      tabNameForDisplay: "Artwork Scope Alignment",
      component: tabName === "artworkAlignment" && <ArtworkAlignment />,
    },
    {
      name: "dependencyMapping",
      tabNameForDisplay: "Dependency Mapping",
      component: tabName === "dependencyMapping" && (
        <Suspense fallback={<div>Loading Component</div>}>
          <DependencyMapping />
        </Suspense>
      ),
    },
    {
      name: "readinessPerPMP",
      tabNameForDisplay: "Readiness Per PMP",
      component: <>Readiness Per PMP Data</>,
    },
  ];
  const actionButton = (
    <DropdownButton
      id={String(!isNoAccess) && "projectActions"}
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
          actionButton={actionButton}
          setTabName={setTabName}
          basePage={url[1]}
        />
      </div>
    </div>
  );
}

export default ProjectSetup;
