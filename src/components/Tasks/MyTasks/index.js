import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import "../../Projects/MyProjects/index.scss";

// import ProjectListHeader from "./ProjectListHeader";
import ProjectListHeader from "../../Projects/MyProjects/ProjectListHeader";
import { TaskService } from "../../../service/PegaTask";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import filter from "../../../assets/images/filter.svg";
import { NavLink } from "react-router-dom";
import {
  getTasks,
  // updateProject,
} from "../../../store/actions/TaskActions";
import { onSortData } from "../../../utils";
import ConfirmationPopUp from "../../Projects/ConfirmationPopUp";
import TaskDialog from "../../TaskDialog";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { ProjectService } from "../../../service/PegaService";
// import ConfirmationPopUp from "../ConfirmationPopUp";
// import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
// import ProjectListHeader from "./ProjectListHeader";
// import { Tag } from "primereact/tag";

const MyTask = (props) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isSearch, isSearchSet] = useState(false);
  const [selectedProdSrchList, setSelectedProdSrchList] = useState([]);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [flag, setFlag] = useState("");
  const [frozenCoulmns, setFrozenColumn] = useState([]);
  const [ProjectFrozen, setProjectFrozen] = useState(false);
  const [projectColumnName, setProjectColumnNames] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [filters, setFilters] = useState([]);

  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [exportCSVValue, setExportCSVValue] = useState(false);

  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.TaskReducer.myTasks);

  const searchHeader = projectColumnName.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }),
    {}
  );

  // const getMyTasks = (myTasksList) => {
  //   const getMyTasksList = [];
  //   myTasksList.forEach((project) => {
  //     project.TaskDetails.forEach((taskDetails) => {
  //       getMyTasksList.push(taskDetails);
  //     });
  //   });
  //   return getMyTasksList;
  // };

  const getMyTasks = (myTasksList) => {
    const getMyTasksList = [];
    if (Array.isArray(myTasksList)) {
      myTasksList.forEach((project) => {
        if (project && Array.isArray(project.TaskDetails)) {
          project.TaskDetails.forEach((taskDetails) => {
            getMyTasksList.push(taskDetails);
          });
        }
      });
    }
    return getMyTasksList;
  };

  useEffect(() => {
    const gettasks = dispatch(getTasks());
    console.log("my gettasks", gettasks);
  }, [dispatch]);

  useEffect(() => {
    const myTasksList = getMyTasks(myTasks);
    setSelectedProdSrchList(myTasksList);

    let filteredPegaDataJson = localStorage.getItem("columnWiseFilterData");
    const filteredPegaData = JSON.parse(filteredPegaDataJson);

    if (filteredPegaData && filteredPegaData.length) {
      setFilters(filteredPegaData);
      setSelectedCities(filteredPegaData);
      setSelectedProdSrchList(myTasksList);
    }

    let columnNamesJson = localStorage.getItem("myTasksAllColumnNames");
    const columnNames = JSON.parse(columnNamesJson);
    if (columnNames != null && columnNames.length) {
      setProjectColumnNames(columnNames);
    } else {
      const columnNames = TaskService.getMyTaskColumnNames();
      localStorage.setItem(
        "myTasksAllColumnNames",
        JSON.stringify(columnNames)
      );
      setProjectColumnNames(columnNames);
    }
  }, [myTasks]);

  useEffect(() => {
    if (
      selectedProdSrchList.length > 0 &&
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

  // let jsonFrozenrData1 = localStorage.getItem("myTasksFrozenData");
  // const myTasksFrozenData = JSON.parse(jsonFrozenrData1);
  // if (myTasksFrozenData && myTasksFrozenData.length) {
  //   setFrozenColumn(myTasksFrozenData);
  // }

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
      setSelectedCities([]);
      setFilters([]);
    }
  };

  const onGlobalFilterChange = (e) => {
    const value = e.value;
    setSelectedCities(value);
    setFilters(value);
  };

  const clearFilter = () => {
    localStorage.setItem("columnWiseFilterData", JSON.stringify({}));
    localStorage.setItem("sortingData", JSON.stringify({}));
    localStorage.setItem("frozenData", JSON.stringify({}));
    setSelectedCities([]);
    setSortData([]);
    setFilters([]);
    setFrozenColumn([]);
  };

  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };
  const op = useRef(null);
  const dt = useRef(null);
  const headerColumns = [
    { title: "ProjectName", field: "ProjectName", csvExport: true },
    { title: "TaskName", field: "TaskName", csvExport: true },
    { title: "Status", field: "Status", csvExport: true },
    { title: "Help_Needed", field: "Help_Needed", csvExport: true },
    { title: "Remaining_Buffer", field: "Remaining_Buffer", csvExport: true },
  ];
  // const columnNames = headerColumns.map((col) => col.title);

  const exportCSVTasks = (selectionOnly) => {
    setExportCSVValue(true);
    console.log("exportCSVValue is", exportCSVValue);
    // console.log("columnNames is", columnNames);
    console.log("dt.current is", dt.current);
    console.log("dt.current.exportCSV is", dt.current.exportCSV);
    console.log("dt.current.header is", dt.current.header);
    const columnNames = headerColumns.map((col) => col.title);
    // dt.current.header = columnNames;
    if (selectionOnly || dt.current.getSelectedData().length === 0) {
      // if (selectionOnly) {
      dt.current.exportCSV({
        selectionOnly: true,
        fileName: "selected_data.csv",
        // header: columnNames,
        columnNames: columnNames,
        data: selected,
      });
    } else {
      dt.current.exportCSV({
        fileName: "all_data.csv",
        // header: columnNames,
        columnNames: columnNames,
      });
    }
  };

  // const exportCSVTasks = (selectionOnly) => {
  //   setExportCSVValue(true);
  //   console.log("exportCSV is working");
  //   dt.current.exportCSV({ selectionOnly });
  // };

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
    console.log("options are", options);
    const isFilterActivated =
      (frozenCoulmns &&
        frozenCoulmns.length &&
        frozenCoulmns.includes(options)) ||
      (sortData && sortData.length && sortData[0] === options);
    return (
      <div>
        <>
          {options === "TaskName" && (
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
            style={{ margin: "10px" }}
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
            {options?.replace(/_/g, " ")}
          </span>
        </>
      </div>
    );
  };
  const taskBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <input
          type="checkbox"
          className="p-checkbox-box p-highlight"
          checked={selected?.includes(rowData)}
          onChange={() => handleSelect(rowData)}
        />
        <NavLink className="task_name" to="/mytasks/define-design-intent">
          {rowData.TaskName}
        </NavLink>
      </div>
    );
  };

  const helpNeededBodyTemplate = (rowData) => {
    rowData["Help_Needed"] = rowData["Help_Needed"] ? "Yes" : "No";
    console.log("rowData.Help_Needed is", rowData.Help_Needed);
    console.log("rowData is", rowData);
    return (
      <div
        className={`${
          rowData.Help_Needed === "No" ? "helpneeded_no" : "helpneeded_yes"
        }`}
      >
        {rowData.Help_Needed}
      </div>
    );
  };
  const statusTemplate = (rowData) => {
    return (
      <div className={`status-value ${getStatusClassName(rowData.Status)}`}>
        {rowData.Status}
      </div>
    );
  };

  const dynamicColumns = () => {
    if (TaskService.getMyTaskColumnNames().length) {
      return TaskService.getMyTaskColumnNames()
        .slice(0, 5)
        .map((ele, i) => {
          const checkBoxAdded = ele === "TaskName" ? "checkbox-added" : "";
          return (
            <Column
              key={ele}
              field={ele}
              // header={myTaskHeader(ele)}
              // header={ele}
              header={exportCSVValue === "true" ? ele : myTaskHeader(ele)}
              exportable={true}
              filter
              frozen={frozenCoulmns.includes(ele)}
              className={frozenCoulmns.includes(ele) ? "font-bold" : ""}
              showFilterMenu={false}
              classNme={checkBoxAdded}
              filterPlaceholder="Search"
              body={
                (ele === "TaskName" && taskBodyTemplate) ||
                (ele === "Help_Needed" && helpNeededBodyTemplate) ||
                (ele === "Status" && statusTemplate)
              }
              // body={ele === "Help Needed" && countryBodyTemplate}
            />
          );
        });
    }
  };
  // console.log("ProjectData is", ProjectData);
  const isFilterEnabled =
    frozenCoulmns?.length || filters?.length || sortData?.length;

  return (
    <>
      <div className="my-task-project">
        {/* {console.log("TaskService is", TaskService.getProjectData())} */}

        <ProjectListHeader
          // exportCSVTasks={
          //   selected ? exportCSVTasks(true) : exportCSVTasks(false)
          // }
          exportCSVTasks={exportCSVTasks}
          onSearchClick={onSearchClick}
          // columnNames={columnNames}
          handleDelegateClick={handleDelegateClick}
          handleHelpNeededClick={handleHelpNeededClick}
          actionFlag={!selected || selected.length === 0}
          header="My Tasks"
          isFilterEnabled={isFilterEnabled}
          clearFilter={clearFilter}
        />
        <ConfirmationPopUp
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
          selectedCities={selectedCities}
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
          className="mt-3"
          ref={dt}
          filters={searchHeader}
          filterDisplay={isSearch && "row"}
          tableStyle={{ minWidth: "50rem" }}
        >
          {dynamicColumns()}
        </DataTable>
      </div>
      {showTaskDialog && (
        <TaskDialog
          onClose={() => setShowTaskDialog(!showTaskDialog)}
          showTaskDialog={showTaskDialog}
          selectedTaskData={selectedTask}
          flag={flag}
        />
      )}
    </>
  );
};

export default MyTask;
