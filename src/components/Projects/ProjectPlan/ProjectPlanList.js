import React, { useState, useEffect, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { ProjectService } from "../../../service/PegaService";
import ConfirmationPopUp from "../ConfirmationPopUp";
import { Toast } from "primereact/toast";
import filter from "../../../assets/images/filter.svg";
import { changeDateFormat } from "../../../utils";
// import { projectPlan } from "../../../store/actions/ProjectActions";
import BlueFilter from "../../../assets/images/BlueFilterIcon.svg";
import complete from "../../../assets/images/complete.svg";
import hyphen from "../../../assets/images/hyphen.svg";
import inprogress from "../../../assets/images/inprogress.svg";
import available from "../../../assets/images/available.svg";
import Awaiting from "../../../assets/images/Awaiting.svg";
import override from "../../../assets/images/override.svg";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
// import { selectedProject } from "../../../store/actions/ProjectSetupActions";
import { InputNumber } from "primereact/inputnumber";
import { getProjectPlan } from "../../../apis/projectPlanApi";
import "./index.scss";
import TaskDialog from "../../TaskDialog";
import {
  updateProjectPlanAction,
  updateProjectPlanDesignAction,
} from "../../../store/actions/ProjectPlanActions";
import moment from "moment";
import ApproveDesignDialog from "./ApproveDesignDialog";
import { useLocation } from "react-router-dom";
import CPPFA from "./../../AWMJobs/CPPFA";

const ProjectPlanList = (props) => {
  const [pegadata, setPegaData] = useState(null);
  const [ProjectFrozen, setProjectFrozen] = useState(false);
  const [frozenCoulmns, setFrozenColumn] = useState([]);
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [projectColumnName, setProjectColumnNames] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [selectedTaskApproveDialog, setSelectedTaskApproveDialog] = useState(
    []
  );
  const [flag, setFlag] = useState("");
  const [loader, setLoader] = useState(false);
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const mode = projectSetup.mode;
  // console.log("selectedProjectDetails: ", selectedProjectDetails);
  const projectPlanReducer = useSelector((state) => state.ProjectPlanReducer);
  const ProjectPlanData = projectPlanReducer.projectPlan;
  const { loading } = projectPlanReducer;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const op = useRef(null);
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Saved Successfully",
      life: 3000,
    });
  };

  const handleHelpNeededClick = (options) => {
    console.log("handleHelpNeededClick rowData: ", options);
    setShowTaskDialog(true);
    setFlag("help");
    let task = [{ TaskID: options.key, TaskName: options.data.Task }];
    setSelectedTask(task);
  };

  const handleApproveDialog = (options) => {
    setShowApproveDialog(true);
    let task = [{ TaskID: options.key, TaskName: options.data.Task }];
    setSelectedTaskApproveDialog(task);
  };

  useEffect(() => {
    (async () => {
      let restructuredData = [];
      setLoader(true);
      const apiData =
        mode === "design" && selectedProjectDetails.Project_ID
          ? await getProjectPlan(selectedProjectDetails.Project_ID)
          : [];
      setLoader(false);
      console.log("projectPlanApiData::", apiData);
      apiData && dispatch(updateProjectPlanDesignAction(apiData));
      restructuredData =
        apiData?.length > 0 ? getRestructuredData(apiData) : [];
      dispatch(updateProjectPlanAction(restructuredData));
    })();
  }, [mode]);

  const getRestructuredData = (apiData) => {
    let mainTempArr = [];

    const tasks = [
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
        name: "Confirm Preliminary print feasibility Assessment done (& upload documents - optional)",
        code: "CPPFA",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CPPFA_")),
      },
      {
        name: "Define New Print Feasibility Scope",
        code: "DNPF",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("DNPF_")),
      },
      {
        name: "Color Confirm Development done (& upload documents - optional) (can be multiple)",
        code: "CCD",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CCD_")),
      },
      {
        name: "Confirm Print Trial (if applicable) done (& upload documents - optional) (can be multiple)",
        code: "CPT",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CPT_")),
      },
      {
        name: "Define New Link Ink Qualification scope",
        code: "DNIQ",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("DNIQ_")),
      },
      {
        name: "Confirm New Ink Qualification done (& upload documents - optional) (can be multiple)",
        code: "CNIQ",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CNIQ_")),
      },
    ];
    // console.log("tasks:", tasks);
    tasks.forEach((task) => {
      // console.log("taskLength", task.data?.length);
      if (task.data?.length === 1) {
        let tempObj = {};
        tempObj["key"] = task.data[0].AWM_Task_ID;

        let dataObj = {};
        dataObj["Task"] = task.data[0].Task_Name;
        dataObj["Dependency"] = task.data[0].Dependency;
        dataObj["Role"] = task.data[0].Role;
        dataObj["RoleOptions"] = task.data[0].RoleOptions;
        dataObj["Assignee"] = task.data[0].Assignee;
        dataObj["OwnerOptions"] = task.data[0].OwnerOptions;
        dataObj["State"] = task.data[0].State;
        dataObj["Duration"] = task.data[0].Duration;
        dataObj["StartDate"] = task.data[0].Start_Date;
        dataObj["EndDate"] = task.data[0].End_Date;
        dataObj["ConsumedBuffer"] = task.data[0].Consumed_Buffer;
        dataObj["HelpNeeded"] = task.data[0].Help_Needed;

        tempObj["data"] = dataObj;
        tempObj["children"] = [];
        tempObj["redirect"] = true;

        mainTempArr.push(tempObj);
      } else if (task.data?.length > 1) {
        let tempObj = {};
        let tempArr = [];
        let pStartDate = "";
        let pEndDate = "";
        let startDateArr = [];
        let endDateArr = [];
        // let startDateArr = [
        //   "20230411T000000.000 GMT",
        //   "20230410T000000.000 GMT",
        // ];
        // let endDateArr = ["20230412T000000.000 GMT", "20230411T000000.000 GMT"];

        tempObj["key"] = task.code;
        let dataObj = {};
        dataObj["Task"] = `${task.name} (X${task.data?.length})`;
        dataObj["Dependency"] = task.data[0].Dependency;
        dataObj["Role"] = "";
        dataObj["RoleOptions"] = "";
        dataObj["Assignee"] = "";
        dataObj["OwnerOptions"] = "";
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
          dataObj["OwnerOptions"] = dt.OwnerOptions;
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
    });
    return mainTempArr; //toBeReplacedWithapiData;
  };

  useEffect(() => {
    (async () => {
      try {
        const ProjectPlanData = projectPlanReducer.projectPlan;

        let filteredPegaDataJson = localStorage.getItem("columnWiseFilterData");
        const filteredPegaData = JSON.parse(filteredPegaDataJson);

        if (filteredPegaData && filteredPegaData.length) {
          setFilters(filteredPegaData);
          setSelectedCities(filteredPegaData);
          setPegaData(ProjectPlanData);
        } else setPegaData(ProjectPlanData);
        // according to pathname we need to call api and store column name in local storage
        let columnNamesJson = localStorage.getItem("projectPlanAllColumnNames");
        const columnNames = JSON.parse(columnNamesJson);
        if (columnNames != null && columnNames.length) {
          setProjectColumnNames(columnNames);
        } else {
          const columnNames = ProjectService.getProjectPlanAllColumnNames();
          localStorage.setItem(
            "projectPlanAllColumnNames",
            JSON.stringify(columnNames)
          );
          setProjectColumnNames(columnNames);
        }

        // get sort data from local storage and add in state
        let jsonSortingData1 = localStorage.getItem("sortingData");
        const sortingData = JSON.parse(jsonSortingData1);

        if (sortingData && sortingData.length) {
          const sortedData = [...ProjectPlanData].sort((a, b) => {
            return a[sortingData[0]] > b[sortingData[0]] ? 1 : -1;
          });

          if (sortingData[1] === "desc") {
            sortedData.reverse();
          }
          setPegaData(sortedData);
          setSortData([sortingData[0], sortingData[1]]);
        }

        //get frozen data from local storage and add in state
        let jsonFrozenrData1 = localStorage.getItem("frozenDataProjectPlan");
        const frozenDataProjectPlan = JSON.parse(jsonFrozenrData1);
        if (frozenDataProjectPlan && frozenDataProjectPlan.length) {
          setFrozenColumn(frozenDataProjectPlan);
        }
      } catch (err) {
        console.log("error", err);
      }
    })();
    // setLoading(false);
  }, [projectPlanReducer.projectPlan]);

  const addFrozenColumns = (name) => {
    if (!frozenCoulmns.includes(name)) {
      frozenCoulmns.push(name);
      setFrozenColumn(frozenCoulmns);
    } else {
      let columnIndex = frozenCoulmns.indexOf(name);
      frozenCoulmns.splice(columnIndex, 1);
      setFrozenColumn(frozenCoulmns);
    }
  };

  const projectNameHeader = (options) => {
    const isFilterActivated =
      (frozenCoulmns &&
        frozenCoulmns.length &&
        frozenCoulmns.includes(options)) ||
      (sortData && sortData.length && sortData[0] === options);

    const optionsCode = options?.split("_").join(" ");

    return (
      <div>
        {isFilterActivated ? (
          <>
            <img
              src={BlueFilter}
              alt="Column Filter"
              onClick={(e) => {
                op.current.toggle(e);
                setSelectedColumnName(options);
              }}
              className="columnFilterIcon"
            />
            <span className="columnHeader">{optionsCode}</span>
          </>
        ) : (
          <>
            <img
              src={filter}
              alt="Column Filter"
              onClick={(e) => {
                op.current.toggle(e);

                setSelectedColumnName(options);
              }}
              className="columnFilterIcon"
            />
            <span className="columnHeader">{optionsCode}</span>
          </>
        )}
      </div>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.value;
    setSelectedCities(value);
    setFilters(value);
  };

  const saveSettings = () => {
    localStorage.setItem("columnWiseFilterData", JSON.stringify(filters));
    localStorage.setItem(
      "frozenDataProjectPlan",
      JSON.stringify(frozenCoulmns)
    );
    localStorage.setItem("sortingData", JSON.stringify(sortData));
    localStorage.setItem(
      "projectPlanAllColumnNames",
      JSON.stringify(projectColumnName)
    );
    showSuccess();
  };

  const clearColumnWiseFilter = () => {
    let jsonFrozenItem = localStorage.getItem("frozenDataProjectPlan");
    const frozenItem = JSON.parse(jsonFrozenItem);
    if (
      frozenItem &&
      frozenItem.length &&
      frozenItem.includes(selectedColumnName)
    ) {
      const index = frozenItem.indexOf(selectedColumnName);
      frozenItem.splice(index, 1);
      localStorage.setItem("frozenDataProjectPlan", JSON.stringify(frozenItem));
      setFrozenColumn(frozenItem);
    }
    if (frozenCoulmns.includes(selectedColumnName)) {
      const index = frozenCoulmns.indexOf(selectedColumnName);
      frozenCoulmns.splice(index, 1);
      setFrozenColumn(frozenCoulmns);
      setProjectFrozen(!ProjectFrozen);
    }
    let jsonSortItem = localStorage.getItem("sortingData");
    const sortItem = JSON.parse(jsonSortItem);
    if (sortItem && sortItem.length && sortItem[0] === selectedColumnName) {
      localStorage.setItem("sortingData", JSON.stringify([]));
    }
    if (sortData && sortData.length && sortData[0] === selectedColumnName) {
      setSortData([]);
    }
    if (filters && filters.length) {
      localStorage.setItem("columnWiseFilterData", JSON.stringify({}));
      setSelectedCities([]);
      setFilters([]);
    }
  };

  const rowExpansionColumnNames = [
    "Task",
    "Dependency",
    "Role",
    "Owner",
    "State",
    "Duration",
    "Start_Date",
    "End_Date",
    "Consumed_Buffer",
    "Help_Needed",
  ];
  const location = useLocation();
  const elementTemplate = (options, rowData) => {
    const field = rowData.field;
    const currentUrl = location.pathname;
    let currentUrlLastSeg = currentUrl.split("/")[2];
    const key = options?.key;
    const keyCode = key?.split("_");
    const url = `MyTasks/${keyCode[0]}/${key}/${currentUrlLastSeg}`;

    return (
      <>
        {field === "Task" && (
          <span
            className={`${options.redirect === true ? "task-link" : "task"}`}
            // style={{ color: "#003DA5", cursor: "pointer" }}
            onClick={() => {
              if (field && field.length && keyCode[0] !== "CPPFA") {
                // dispatch(selectedProject(options.data, "My Projects"));
                options.redirect === true &&
                  navigate(`../${url}`, { replace: true });
              } else {
                handleApproveDialogCPPFA(options);
              }
            }}
          >
            {options.data[field]}
          </span>
        )}

        {options.children && options.children.length > 0 ? (
          <>
            {(field === "Role" ||
              field === "Owner" ||
              field === "State" ||
              field === "Duration") && (
              <img
                src={hyphen}
                alt="Hyphen"
                onClick={(e) => {
                  op.current.toggle(e);
                }}
              />
            )}
          </>
        ) : (
          <>
            {(field === "Role" || field === "Owner") && (
              <div className="d-flex">
                <Dropdown
                  editable
                  value={options?.data[field]}
                  onChange={(e) => onDropdownChange(options, e, field)}
                  options={
                    field === "Role"
                      ? options.data["RoleOptions"]
                      : field === "Owner"
                      ? options.data["OwnerOptions"]
                      : []
                  }
                  optionLabel="Name"
                  placeholder={`Select ${field}`}
                  className="w-full md:w-14rem"
                />

                {field === "Owner" && options.key.includes("ARDT_") && (
                  <img
                    src={override}
                    alt="Override"
                    onClick={() => handleApproveDialog(options)}
                    // onClick={(e) => {
                    //   op.current.toggle(e);
                    //   setSelectedColumnName(options);
                    // }}
                    className="overrideIcon"
                  />
                )}
              </div>
            )}
            {field === "State" && options.data[field] === "Complete" ? (
              <>
                <img
                  src={complete}
                  alt="Check"
                  onClick={(e) => {
                    op.current.toggle(e);
                  }}
                  className="iconsStyle"
                />
                <span className="iconsTextStyle" onClick={() => {}}>
                  {options.data[field]}
                </span>
              </>
            ) : field === "State" && options.data[field] === "In Progress" ? (
              <>
                <img
                  src={inprogress}
                  alt="In Progress"
                  onClick={(e) => {
                    op.current.toggle(e);
                  }}
                  className="iconsStyle"
                />
                <span
                  className="iconsTextStyle iconInprogress"
                  onClick={() => {}}
                >
                  {options.data[field]}
                </span>
              </>
            ) : field === "State" && options.data[field] === "Available" ? (
              <>
                <img
                  src={available}
                  alt="Lock"
                  onClick={(e) => {
                    op.current.toggle(e);
                  }}
                  className="iconsStyle"
                />
                <span className="iconsTextStyle iconLock" onClick={() => {}}>
                  {options.data[field]}
                </span>
              </>
            ) : field === "State" && options.data[field] === "Awaiting" ? (
              <>
                <img
                  src={Awaiting}
                  alt="Awaiting"
                  onClick={(e) => {
                    op.current.toggle(e);
                  }}
                  className="iconsStyle"
                />
                <span
                  className="iconsTextStyle iconAwaiting"
                  onClick={() => {}}
                >
                  {options.data[field]}
                </span>
              </>
            ) : (
              <>{field === "State" && options.data[field]}</>
            )}
            {field === "Duration" && (
              <InputNumber
                className="input-duration"
                inputId="integeronly"
                value={options?.data[field]}
                onValueChange={(e) => onDurationChange(options, e, field)}
              />
            )}
          </>
        )}

        {field === "HelpNeeded" && (
          <button
            type="button"
            onClick={() => handleHelpNeededClick(options)}
            className="btn btn-success helpNeeded"
          >
            {options.data[field] === "true" ? "YES" : "NO"}
          </button>
        )}

        {field === "StartDate" && changeDateFormat(options.data[field])}
        {field === "EndDate" && (
          <span>{changeDateFormat(options.data[field])}</span>
        )}
        {field !== "Task" &&
          field !== "Role" &&
          field !== "Owner" &&
          field !== "State" &&
          field !== "StartDate" &&
          field !== "EndDate" &&
          field !== "Duration" &&
          field !== "HelpNeeded" && <>{options.data[field]}</>}
      </>
    );
  };

  const updateProjectPlanDesign = () => {
    let arr = [];

    pegadata.forEach((data) => {
      if (data.children.length === 0) {
        let obj = {};
        obj["AWM_Project_ID"] = selectedProjectDetails.Project_ID; //to be changed
        obj["Help_Needed"] = data.data.HelpNeeded;
        obj["AWM_Task_ID"] = data.key;
        obj["End_Date"] = data.data.EndDate;
        obj["Consumed_Buffer"] = data.data.ConsumedBuffer;
        obj["Start_Date"] = data.data.StartDate;
        obj["Assignee"] = data.data.Owner;
        obj["Duration"] = data.data.Duration;
        obj["Dependency"] = data.data.Dependency;
        obj["Task_Name"] = data.data.Task;
        obj["Role"] = data.data.Role;
        obj["State"] = data.data.State;
        arr.push(obj);
      } else if (data.children.length > 0) {
        data.children.forEach((child) => {
          let tempObj = {};
          tempObj["AWM_Project_ID"] = selectedProjectDetails.Project_ID;
          tempObj["Help_Needed"] = child.data.HelpNeeded;
          tempObj["AWM_Task_ID"] = child.key;
          tempObj["End_Date"] = child.data.EndDate;
          tempObj["Consumed_Buffer"] = child.data.ConsumedBuffer;
          tempObj["Start_Date"] = child.data.StartDate;
          tempObj["Assignee"] = child.data.Owner;
          tempObj["Duration"] = child.data.Duration;
          tempObj["Dependency"] = child.data.Dependency;
          tempObj["Task_Name"] = child.data.Task.split("). ")[1];
          tempObj["Role"] = child.data.Role;
          tempObj["State"] = child.data.State;
          arr.push(tempObj);
        });
      }
    });
    dispatch(updateProjectPlanDesignAction(arr));
  };

  useEffect(() => {
    // alert(pegadata);
    pegadata && updateProjectPlanDesign();
  }, [pegadata]);

  const onDropdownChange = (rowData, { value }, ele) => {
    // Update the data with the new value
    rowData.data[ele] = value.Name;
    console.log("Pegadata: ", pegadata);
    setPegaData([...pegadata]);
    updateProjectPlanDesign();
  };

  const onDurationChange = (rowData, { value }, ele) => {
    rowData.data[ele] = value < 1 ? "0" : value?.toString();
    console.log("Pegadata: ", pegadata);
    setPegaData([...pegadata]);
  };

  const rowExpansionColumns = () => {
    if (rowExpansionColumnNames.length) {
      return rowExpansionColumnNames.map((ele, i) => {
        return (
          <Column
            key={ele}
            field={ele?.split("_").join("")}
            filterField={ele}
            header={projectNameHeader(ele)}
            expander={ele === "Task"}
            columnKey={ele || i}
            frozen={frozenCoulmns.includes(ele)}
            alignFrozen="left"
            className={frozenCoulmns.includes(ele) ? "font-bold" : ""}
            showFilterMenu={false}
            body={elementTemplate}
          />
        );
      });
    }
  };

  const onSort = (column, direction) => (event) => {
    const sortedData = [...pegadata].sort((a, b) => {
      return a[column] > b[column] ? 1 : -1;
    });

    if (direction === "desc") {
      sortedData.reverse();
    }

    setPegaData(sortedData);
    setSortData([column, direction]);
    localStorage.setItem("allProjectSortingData", JSON.stringify(sortData));
  };

  const pegadata1 = pegadata?.map((obj) => obj.data);

  const [showApproveDialogCPPFA, setShowApproveDialogCPPFA] = useState(false);
  const [selectedTaskApproveDialogCPPFA, setSelectedTaskApproveDialogCPPFA] = useState(
    []
  );
  const handleApproveDialogCPPFA = (options) => {
    setShowApproveDialogCPPFA(true);
    // let task = [{ TaskID: options.key, TaskName: options.data.Task }];
    // setSelectedTaskApproveDialogCPPFA(task);
  };

  return (
    <div className="myProjectAnddAllProjectList">
      {showApproveDialog && (
        <ApproveDesignDialog
          onClose={() => setShowApproveDialog(!showApproveDialog)}
          showTaskDialog={showApproveDialog}
          selectedTaskData={selectedTaskApproveDialog}
        />
      )}
      {showApproveDialogCPPFA && (
        <CPPFA
          onClose={() => setShowApproveDialogCPPFA(!showApproveDialogCPPFA)}
          showTaskDialog={showApproveDialogCPPFA}
          selectedTaskData={selectedTaskApproveDialogCPPFA}
        />
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Toast ref={toast} />
        <div className="card">
          <ConfirmationPopUp
            onSort={onSort}
            setProjectFrozen={setProjectFrozen}
            saveSettings={saveSettings}
            projectData={pegadata1}
            addFrozenColumns={addFrozenColumns}
            onGlobalFilterChange={onGlobalFilterChange}
            selectedColumnName={selectedColumnName}
            ProjectFrozen={ProjectFrozen}
            selectedFields={selectedCities}
            setFrozenColumn={setFrozenColumn}
            frozenCoulmns={frozenCoulmns}
            sortData={sortData}
            setSortData={setSortData}
            setFilters={setFilters}
            filters={filters}
            op={op}
            clearColumnWiseFilter={clearColumnWiseFilter}
          />
          <TreeTable
            resizableColumns
            dataKey="Task"
            reorderableColumns
            value={filters.length ? filters : pegadata}
            loading={loader}
            className="mt-3 textAlignTreeTable"
            tableStyle={{ minWidth: "119rem", tableLayout: "auto" }}
          >
            {/* <Column header="" expander={true}></Column> */}
            {rowExpansionColumns()}
          </TreeTable>
          {showTaskDialog && (
            <TaskDialog
              onClose={() => setShowTaskDialog(!showTaskDialog)}
              showTaskDialog={showTaskDialog}
              selectedTaskData={selectedTask}
              flag={flag}
            />
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default ProjectPlanList;
