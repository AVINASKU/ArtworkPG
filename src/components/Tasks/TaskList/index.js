import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import "../../Projects/MyProjects/index.scss";
import ProjectListHeader from "../../Projects/MyProjects/ProjectListHeader";
import { TaskService } from "../../../service/PegaTask";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import filter from "../../../assets/images/filter.svg";
import { NavLink, useParams } from "react-router-dom";
import { onSortData, Loading } from "../../../utils";
// import ConfirmationPopUp from "../../Projects/ConfirmationPopUp";
import TaskDialog from "../../TaskDialog";
import CPPFA from "../../AWMJobs/CPPFA";
import { HelpNeededAction } from "../../../store/actions/HelpNeededAction";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, getAllTasks } from "../../../store/actions/TaskActions";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import ProjectListFilter from "../../Projects/ProjectListFilter";
import { cloneDeep } from "lodash";


const TaskList = ({ myTasks, loading, flag, userInformation }) => {
  const dispatch = useDispatch();
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isSearch, isSearchSet] = useState(false);
  const [selectedProdSrchList, setSelectedProdSrchList] = useState(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [setflag, setFlag] = useState("");
  const [frozenCoulmns, setFrozenColumn] = useState([]);
  const [ProjectFrozen, setProjectFrozen] = useState(false);
  const [projectColumnName, setSelectedFields] = useState([]);
  const [selectedFields, setselectedFields] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [loader, setLoader] = useState(false);
  const [fullData, getFullData] = useState({})

  const getMyTasks = (myTasksList) => {
    const myTasks = myTasksList?.map((element) => {
      return element;
    });

    if (!myTasks || myTasks.length === 0) {
      return [];
    }
    return myTasks;
  };

  useEffect(() => {
    setLoader(true);
    const myTasksList = getMyTasks(myTasks);
    setSelectedProdSrchList(myTasksList);

    let filteredPegaDataJson = localStorage.getItem("columnWiseFilterData");
    const filteredPegaData = JSON.parse(filteredPegaDataJson);

    if (filteredPegaData && filteredPegaData.length) {
      setFilters(filteredPegaData);
      setselectedFields(filteredPegaData);
      setSelectedProdSrchList(myTasksList);
    }

    let columnNamesJson = localStorage.getItem("myTasksAllColumnNames");
    const columnNames = JSON.parse(columnNamesJson);
    if (columnNames != null && columnNames.length) {
      setSelectedFields(columnNames);
    } else {
      const columnNames = TaskService.getMyTaskColumnNames();
      localStorage.setItem(
        "myTasksAllColumnNames",
        JSON.stringify(columnNames)
      );
      setSelectedFields(columnNames);
    }
    setLoader(false);
  }, [myTasks]);

  // Find the role that matches the logged-in user's role

  useEffect(() => {
    if (
      selectedProdSrchList?.length > 0 &&
      selected.length === selectedProdSrchList.length
    ) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [selected, selectedProdSrchList]);

  const onSort = (column, direction) => (event) => {
    const sortedData = onSortData(column, direction, selectedProdSrchList);
    setSelectedProdSrchList(sortedData);
    setSortData([column, direction]);
  };

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

  const saveSettings = () => {
    localStorage.setItem("columnWiseFilterData", JSON.stringify(filters));
    localStorage.setItem("myTasksFrozenData", JSON.stringify(frozenCoulmns));
    localStorage.setItem("sortingData", JSON.stringify(sortData));
    localStorage.setItem(
      "myTasksAllColumnNames",
      JSON.stringify(projectColumnName)
    );
  };

  const clearColumnWiseFilter = () => {
    let jsonFrozenItem = localStorage.getItem("myTasksFrozenData");
    const frozenItem = JSON.parse(jsonFrozenItem);
    if (
      frozenItem &&
      frozenItem.length &&
      frozenItem.includes(selectedColumnName)
    ) {
      const index = frozenItem.indexOf(selectedColumnName);
      frozenItem.splice(index, 1);
      localStorage.setItem("myTasksFrozenData", JSON.stringify(frozenItem));
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
      setselectedFields([]);
      setFilters([]);
    }
  };

  const onGlobalFilterChange = (e, colName) => {
     const value = e.value;
    let temp = cloneDeep(selectedFields);
    temp[colName] = value;
    setselectedFields(temp);
    let allValues = [];
    let keys = Object.keys(temp);
    keys.forEach((key) => {
      allValues = [...allValues, ...temp[key]];
    });

    const artworkCategories = value;

    console.log("artwork", artworkCategories);

    if (artworkCategories.length) {
      let filterProjectState = selectedProdSrchList.filter((item) => {
        if (
          item &&
          item[selectedColumnName]
        ) {
          const hasWords = artworkCategories.some((word) =>
           Number.isInteger(word) ? item[selectedColumnName] === word : item[selectedColumnName]?.includes(word) 
          );
          if (hasWords) {
            return item;
          }
        }
      });
      setFilters(filterProjectState);
      // localStorage.setItem("columnWiseFilterData", JSON.stringify(filterProjectState));
    } else {
    // localStorage.removeItem("columnWiseFilterData");
    setFilters([]);
    }
  };

  const clearFilter = () => {
    localStorage.setItem("columnWiseFilterData", JSON.stringify({}));
    localStorage.setItem("sortingData", JSON.stringify({}));
    localStorage.setItem("frozenData", JSON.stringify({}));
    setselectedFields([]);
    setSortData([]);
    setFilters([]);
    setFrozenColumn([]);
    isSearchSet(false);
  };

  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };
  const op = useRef(null);
  const dt = useRef(null);
  const headerColumns = [
    "Project_Name",
    "Task_Name",
    "Task_Type",
    "Status",
    "Help_Needed",
    "Remaining_Buffer",
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(selectedProdSrchList);
      setSelectedTask(selectedProdSrchList);
      setSelectAllChecked(true);
    } else {
      setSelected([]);
      setSelectedTask([]);
      setSelectAllChecked(false);
    }
  };
  const handleSelect = (item) => {
    if (selected?.includes(item)) {
      console.log("item", item);
      console.log("selected.filter((i) => i !== item)", selected.filter((i) => i !== item));
      setSelected(selected.filter((i) => i !== item));
      setSelectedTask(selectedTask.filter((i) => i !== item));
    } else {
      if (selected.length === 0) {
        const selectedList = [];
        selectedList.push(item);
        setSelected(selectedList);
        setSelectedTask([...selectedTask, item]);
      } else {
        setSelected([...selected, item]);
        setSelectedTask([...selectedTask, item]);
      }
    }
  };

  const handleHelpNeededClick = () => {
    setShowTaskDialog(true);
    setFlag("help");
    if (selectedTask.length > 0) {
      setSelectedTask(selected);
    }
  };
  const handleDelegateClick = () => {
    setShowTaskDialog(true);
    setFlag("delegate");
    if (selectedTask.length > 0) {
      setSelectedTask(selected);
    }
  };
  const handleHelpProvidedClick = async (options) => {
    if (selectedTask.length > 0) {
      setSelectedTask(selected);
    }
    const helpResolvedData = {
      ArtworkAgilityTasks: selected
        ?.map((task) => ({
          AWM_Task_ID: task.AWM_Task_ID,
          Help_Needed: "Yes, done",
          Comments: "",
        }))
        .filter((task) => task.AWM_Task_ID),
    };
    await dispatch(HelpNeededAction(helpResolvedData));
    setSelected([]);
    if (flag === "myTasks") {
      await dispatch(getTasks(userInformation));
    } else {
      await dispatch(getAllTasks(userInformation));
    }
  };

  function getStatusClassName(status) {
    switch (status) {
      case "In Progress":
        return "In Progress";
      case "On-Hold":
        return "On-Hold";
      case "Awaiting":
        return "Awaiting";
      case "Available":
        return "available-now";
      default:
        return "";
    }
  }
  const myTaskHeader = (options) => {
    const isFilterActivated =
      (frozenCoulmns &&
        frozenCoulmns.length &&
        frozenCoulmns.includes(options)) ||
      (sortData && sortData.length && sortData[0] === options);
    return (
      <div>
        <>
          {options === "Task_Name" && (
            <input
              type="checkbox"
              checked={selectAllChecked}
              onChange={handleSelectAll}
              // disabled={error && true}
            />
          )}
          <img
            src={filter}
            alt="Column filter"
            className="filter-icon"
            style={{ margin: "10px", cursor: "pointer" }}
            onClick={(e) => {
              op.current.toggle(e);
              setSelectedColumnName(options);
            }}
          />
          <span
            className={`header-name ${
              isFilterActivated && "filter-color-change"
            }`}
          >
            {options === "Task_Name" ? "Task" : options?.replace(/_/g, " ")}
          </span>
        </>
      </div>
    );
  };
  const taskBodyTemplate = (rowData) => {
    const taskId = rowData?.AWM_Task_ID;
    const projectID = rowData?.AWM_Project_ID;
    const TaskCode = taskId?.split("_");
    console.log("TaskCode TaskCode", TaskCode);
    
    const url = `${TaskCode[0]}/${taskId}/${projectID}`;
    const artworkAlignmentUrl = `artworkAlignment/${projectID}`
    return (
      <div className="flex align-items-center gap-2">
        <input
          type="checkbox"
          className="p-checkbox-box p-highlight"
          checked={selected?.includes(rowData)}
          onChange={() => handleSelect(rowData)}
        />
          { TaskCode[0] === "SAA" && (
            <NavLink className="task_name" to={artworkAlignmentUrl}>
              {rowData.Task_Name}
            </NavLink>
          )}
          {
          TaskCode[0] === "CPPFA" && (
          (
            <NavLink
              className="task_name"
              to=""
              onClick={() => handleApproveDialogCPPFA(rowData)}
            >
              {rowData.Task_Name}
            </NavLink>
          )
        )}
        {TaskCode[0] !== "CPPFA" &&  TaskCode[0] !== "SAA" &&
          <NavLink className="task_name" to={url}>
          {rowData.Task_Name}
        </NavLink>
        }
      </div>
    );
  };

  const helpNeededBodyTemplate = (rowData) => {
    let className = "";

    switch (rowData?.Help_Needed) {
      case "Yes,in Process":
        className = "helpneeded_inprocess";
        rowData["Help_Needed"] = "Yes,in Process";
        break;
      case "Yes, done":
        className = "helpneeded_done";
        rowData["Help_Needed"] = "Yes, done";
        break;
      case "":
        className = "helpneeded_no";
        rowData["Help_Needed"] = "No";
        break;
      default:
        break;
    }

    return <span className={className}>{rowData?.Help_Needed}</span>;
  };

  const statusTemplate = (rowData) => {
    return (
      <div className={`status-value ${getStatusClassName(rowData.Status)}`}>
        {rowData.Status}
      </div>
    );
  };
  const taskTemplate = (rowData) => {
    const firstPart = rowData.AWM_Task_ID.split("_")[0];

    if (firstPart === "DDI" || firstPart === "DDT" || firstPart === "DPRA") {
      // Handle DI case
      return <div>Define</div>;
    } else if (firstPart === "UADI") {
      // Handle UADI case
      return <div>Upload and Approve</div>;
    } else if (firstPart === "URDT" || firstPart === "UPRA") {
      // Handle URDT case
      return <div>Upload</div>;
    } else if (firstPart === "ARDT" || firstPart === "APRA") {
      // Handle ARTD case
      return <div>Approve</div>;
    }

    // Default case (no filter match)
    return null;
  };

  const assigneeTemplate = (rowData) => {
    return <div>{rowData?.Assignee}</div>;
  };

  const dynamicColumns = () => {
    if (flag === "myTasks" && TaskService.getMyTaskColumnNames().length) {
      return TaskService.getMyTaskColumnNames()
        .map((ele, i) => {
          const checkBoxAdded = ele === "Task_Name" ? "checkbox-added" : "";
          return (
            <Column
              key={ele}
              header={myTaskHeader(ele)}
              field={ele}
              filter
              frozen={frozenCoulmns.includes(ele)}
              className={frozenCoulmns.includes(ele) ? "font-bold" : ""}
              showFilterMenu={false}
              classNme={checkBoxAdded}
              filterPlaceholder="Search"
              body={
                (ele === "Task_Name" && taskBodyTemplate) ||
                (ele === "Task_Type" && taskTemplate) ||
                (ele === "Help_Needed" && helpNeededBodyTemplate) ||
                (ele === "Status" && statusTemplate) ||
                (ele === "PM" && assigneeTemplate)
              }
              style={{
              width: "200px"
            }}
              // body={ele === "Help Needed" && countryBodyTemplate}
            />
          );
        });
    } else if (
      flag === "allTasks" &&
      TaskService.getMyTaskColumnNames().length
    ) {
      return TaskService.getMyTaskColumnNames().map((ele, i) => {
        const checkBoxAdded = ele === "Task_Name" ? "checkbox-added" : "";
        return (
          <Column
            key={ele}
            header={myTaskHeader(ele)}
            field={ele}
            filter
            frozen={frozenCoulmns.includes(ele)}
            className={frozenCoulmns.includes(ele) ? "font-bold" : ""}
            showFilterMenu={false}
            classNme={checkBoxAdded}
            filterPlaceholder="Search"
            body={
              (ele === "Task_Name" && taskBodyTemplate) ||
              (ele === "Task_Type" && taskTemplate) ||
              (ele === "Help_Needed" && helpNeededBodyTemplate) ||
              (ele === "Status" && statusTemplate) ||
              (ele === "PM" && assigneeTemplate)
            }
            style={{
              width: "200px"
            }}
            // body={ele === "Help Needed" && countryBodyTemplate}
          />
        );
      });
    }
  };
  const isFilterEnabled =
    frozenCoulmns?.length || filters?.length || sortData?.length || isSearch;

  //search each columns
  const searchHeader = projectColumnName.reduce(
    (columns, curr) => ({
      ...columns,
      [curr]: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }),

    {}
  );

  const [showApproveDialogCPPFA, setShowApproveDialogCPPFA] = useState(false);
  const [selectedTaskApproveDialogCPPFA, setSelectedTaskApproveDialogCPPFA] =
    useState([]);

  const handleApproveDialogCPPFA = (options) => {
    setShowApproveDialogCPPFA(true);
    let task = { TaskID: options.AWM_Task_ID, ProjectID: options.AWM_Project_ID };
    let fullResponse = dispatch(getTaskDetails(options.AWM_Task_ID, options.AWM_Project_ID));
    getFullData(fullResponse);
    setSelectedTaskApproveDialogCPPFA(task);
  };
  
  const { TaskDetailsData } = useSelector((state) => state.TaskDetailsReducer);
  console.log("selected", selected);
  return (
      <>
      {loader || loading || selectedProdSrchList === null  ? (
      <Loading />
    ): (
      <>
     
        <div className="my-task-project myProjectAnddAllProjectList">
          {showApproveDialogCPPFA && (
            <CPPFA
              onClose={() => setShowApproveDialogCPPFA(!showApproveDialogCPPFA)}
              showTaskDialog={showApproveDialogCPPFA}
              selectedTaskData={selectedTaskApproveDialogCPPFA}
              pegadata={selectedProdSrchList}
              TaskDetailsData={TaskDetailsData}
              userInformation={userInformation}
              fullResponse={fullData}
            />
          )}
          <ProjectListHeader
            // exportCSVTasks={
            //   selected ? exportCSVTasks(true) : exportCSVTasks(true)
            // }
            onSearchClick={onSearchClick}
            handleDelegateClick={handleDelegateClick}
            handleHelpNeededClick={handleHelpNeededClick}
            handleHelpProvidedClick={handleHelpProvidedClick}
            actionFlag={!selected || selected.length === 0}
            header={flag === "myTasks" ? "My Tasks" : "All Tasks"}
            selected={selected}
            allData={selectedProdSrchList}
            isFilterEnabled={isFilterEnabled}
            clearFilter={clearFilter}
            headers={headerColumns}
            filterFLag={false}
            CustomizeViewFlag={false}
            ResetToDefaultFlag={false}
            isTreeTableFlag={false}
          />
          <ProjectListFilter
            onSort={onSort}
            selectedColumnName={selectedColumnName}
            sortData={sortData}
            op={op}
            addFrozenColumns={addFrozenColumns}
            ProjectFrozen={ProjectFrozen}
            setProjectFrozen={setProjectFrozen}
            setFrozenColumn={setFrozenColumn}
            frozenCoulmns={frozenCoulmns}
            clearColumnWiseFilter={clearColumnWiseFilter}
            saveSettings={saveSettings}
            selectedFields={selectedFields}
            onGlobalFilterChange={onGlobalFilterChange}
            projectData={selectedProdSrchList}
            setFilters={setFilters}
          />
          <DataTable
            resizableColumns
            value={filters?.length ? filters : selectedProdSrchList}
            reorderableColumns
            scrollable
            selection={selected}
            onSelectionChange={(e) => setSelected(e.value)}
            responsiveLayout="scroll"
            className="margin-top-24"
            ref={dt}
            filterDisplay={isSearch && "row"}
            loading={loading}
            // tableStyle={{ minWidth: "50rem" }}
            // tableStyle={{ width: "max-content" }}
            autoLayout={true}
            filters={searchHeader}
          >
            {dynamicColumns()}
          </DataTable>
        </div>
        {showTaskDialog && (
          <TaskDialog
            onClose={() => setShowTaskDialog(!showTaskDialog)}
            showTaskDialog={showTaskDialog}
            selectedTaskData={selectedTask}
            flag={setflag}
            path={flag}
            userInformation={userInformation}
            setSelected={setSelected}
          />
        )}
      </>
    )}
    </>
  );
};

export default TaskList;
