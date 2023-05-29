import React, { useState, useEffect, useRef, Suspense } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { ProjectService } from "../../../service/PegaService";
import ConfirmationPopUp from "../ConfirmationPopUp";
import filter from "../../../assets/images/filter.svg";
import { changeDateFormat } from "../../../utils";
import BlueFilter from "../../../assets/images/BlueFilterIcon.svg";
import complete from "../../../assets/images/complete.svg";
import hyphen from "../../../assets/images/hyphen.svg";
import inprogress from "../../../assets/images/inprogress.svg";
import available from "../../../assets/images/available.svg";
import Awaiting from "../../../assets/images/Awaiting.svg";
import override from "../../../assets/images/override.svg";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { InputNumber } from "primereact/inputnumber";
import "./index.scss";
import TaskDialog from "../../TaskDialog";
import ApproveDesignDialog from "./ApproveDesignDialog";
import { useLocation, useParams } from "react-router-dom";
import CPPFA from "./../../AWMJobs/CPPFA";

const ProjectPlanList = ({
  projectPlan,
  selectedProject,
  projectPlanDesign,
  pegadata,
  setPegaData,
  setUpdatedProjectPlanDesignData,
  setActiveSave,
}) => {
  const [ProjectFrozen, setProjectFrozen] = useState(false);
  const [frozenCoulmns, setFrozenColumn] = useState([]);
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [projectColumnName, setProjectColumnNames] = useState([""]);
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
  //projectPlanDesign
  const navigate = useNavigate();
    let {ProjectID } = useParams();

  const op = useRef(null);

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
      try {
        let filteredPegaDataJson = localStorage.getItem("columnWiseFilterData");
        const filteredPegaData = JSON.parse(filteredPegaDataJson);

        if (filteredPegaData && filteredPegaData.length) {
          setFilters(filteredPegaData);
          setSelectedCities(filteredPegaData);
          setPegaData(projectPlan);
        } else {
          setPegaData(projectPlan);
        }
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
          const sortedData = [...projectPlan].sort((a, b) => {
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
  }, [projectPlan]);

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
    let value = e.value;
    const value1 = pegadata.filter((pegaObj) => {
      return value.some((obj) => {
         return pegaObj.data.Task === obj.Task;
       });
     });
    setSelectedCities(value);
    setFilters(value1);
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

  const location = useLocation();

  const elementTemplate = (options, rowData) => {
    const field = rowData.field;
    const optionsData = options.data;
    const currentUrl = location.pathname;
    let currentUrlLastSeg = currentUrl.split("/")[3];
    const key = options?.key;
    const keyCode = key?.split("_");
    const url = `MyTasks/${keyCode[0]}/${key}/${currentUrlLastSeg}`;

    return (
      <>
        {field === "Task" && (
          <span
            className={`${
              options.redirect === true || optionsData.Task
                ? "task-link"
                : "task"
            }`}
            onClick={() => {
              if (field && field.length && keyCode[0] !== "CPPFA") {
                (options.redirect === true || optionsData.Task) &&
                  navigate(`../${url}`, { replace: true });
              } else {
                handleApproveDialogCPPFA(options);
              }
            }}
          >
            {optionsData[field]}
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
                      ? optionsData["RoleOptions"]
                      : field === "Owner"
                      ? optionsData["OwnerOptions"]
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
            {field === "State" && optionsData[field] === "Complete" ? (
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
                  {optionsData[field]}
                </span>
              </>
            ) : field === "State" && optionsData[field] === "In Progress" ? (
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
                  {optionsData[field]}
                </span>
              </>
            ) : field === "State" && optionsData[field] === "Available" ? (
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
                  {optionsData[field]}
                </span>
              </>
            ) : field === "State" && optionsData[field] === "Awaiting" ? (
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
                  {optionsData[field]}
                </span>
              </>
            ) : (
              <>{field === "State" && optionsData[field]}</>
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
            {optionsData[field] === "true" ? "YES" : "NO"}
          </button>
        )}

        {field === "StartDate" && changeDateFormat(optionsData[field])}
        {field === "EndDate" && (
          <span>{changeDateFormat(optionsData[field])}</span>
        )}
        {field !== "Task" &&
          field !== "Role" &&
          field !== "Owner" &&
          field !== "State" &&
          field !== "StartDate" &&
          field !== "EndDate" &&
          field !== "Duration" &&
          field !== "HelpNeeded" && <>{optionsData[field]}</>}
      </>
    );
  };

  const updateProjectPlanDesign = () => {
    let arr = [];

    pegadata.forEach((data) => {
      if (data.children.length === 0) {
        let obj = {};
        obj["AWM_Project_ID"] = selectedProject.Project_ID; //to be changed
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
          tempObj["AWM_Project_ID"] = selectedProject.Project_ID;
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
    setUpdatedProjectPlanDesignData(arr);
  };

  useEffect(() => {
    pegadata && updateProjectPlanDesign();
  }, [pegadata]);

  const onDropdownChange = (rowData, { value }, ele) => {
    // Update the data with the new value
    rowData.data[ele] = value.Name;
    console.log("Pegadata: ", pegadata);
    setPegaData([...pegadata]);
    setActiveSave(false);
    //updateProjectPlanDesign();
  };

  const onDurationChange = (rowData, { value }, ele) => {
    rowData.data[ele] = value < 1 ? "0" : value?.toString();
    console.log("Pegadata: ", pegadata);
    setPegaData([...pegadata]);
    setActiveSave(false);
  };

  const rowExpansionColumns = () => {
    if (projectColumnName.length) {
      return projectColumnName.map((ele, i) => {
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
            className={
              frozenCoulmns.includes(ele) ? "fontBoldcolor" : "cursorMove"
            }
            showFilterMenu={false}
            body={elementTemplate}
          />
        );
      });
    }
  };

  const onSort = (column, direction) => (event) => {
    const sortedData = [...pegadata].sort((a, b) => {
      return a["data"][column] > b["data"][column] ? 1 : -1;
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
  const [selectedTaskApproveDialogCPPFA, setSelectedTaskApproveDialogCPPFA] =
    useState([]);

  const handleApproveDialogCPPFA = (options) => {
    setShowApproveDialogCPPFA(true);
    let task = { TaskID: options.key, ProjectID: ProjectID };
    setSelectedTaskApproveDialogCPPFA(task);
  };

  const storeReorderedColumns = (e) => {
    const dragColumnName = projectColumnName[e?.dragIndex];
    const index = projectColumnName.indexOf(dragColumnName);
    if (index > -1) {
      // only splice array when item is found
      projectColumnName.splice(index, 1); // 2nd parameter means remove one item only
      projectColumnName.splice(e?.dropIndex, 0, dragColumnName);
    }
    localStorage.setItem(
      "projectPlanAllColumnNames",
      JSON.stringify(projectColumnName)
    );
    setProjectColumnNames(projectColumnName);
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
          pegadata={pegadata1}
        />
      )}
      <Suspense fallback={<div>Loading...</div>}>
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
            onColReorder={storeReorderedColumns}
            value={filters.length ? filters : pegadata}
            loading={loader}
            // className="mt-3 textAlignTreeTable"
            className="textAlignTreeTable"
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
