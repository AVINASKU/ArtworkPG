import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import "../../Projects/MyProjects/index.scss";
import ProjectListHeader from "../../Projects/MyProjects/ProjectListHeader";
import { TaskService } from "../../../service/PegaTask";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import filter from "../../../assets/images/filter.svg";
import { NavLink } from "react-router-dom";
import { onSortData } from "../../../utils";
import ConfirmationPopUp from "../../Projects/ConfirmationPopUp";
import TaskDialog from "../../TaskDialog";

const TaskList = (props) => {
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

  const getMyTasks = (myTasksList) => {
    const myTasks = myTasksList?.flatMap(
      (project) => project?.TaskDetails ?? []
    );
    if (myTasks.length === 0) {
      console.log("No records found");
    }
    return myTasks;
  };

  useEffect(() => {
    const myTasksList = getMyTasks(props?.myTasks);
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
  }, [props.myTasks]);

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

  // const exportCSVTasks = (selectionOnly) => {
  //   const columnNames = headerColumns.map((col) => col.title);
  //   if (selectionOnly || dt.current.getSelectedData().length === 0) {
  //     dt.current.exportCSV({
  //       selectionOnly: true,
  //       fileName: "selected_data.csv",
  //       columnNames: columnNames,
  //       data: selected,
  //     });
  //   } else {
  //     dt.current.exportCSV({
  //       fileName: "all_data.csv",
  //       columnNames: columnNames,
  //     });
  //   }
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
    const taskId = rowData?.TaskID;
    const projectID = rowData?.Project_ID;
    const TaskCode = taskId?.split("_");
    const url = `${TaskCode[0]}/${taskId}/${projectID}`;
    return (
      <div className="flex align-items-center gap-2">
        <input
          type="checkbox"
          className="p-checkbox-box p-highlight"
          checked={selected?.includes(rowData)}
          onChange={() => handleSelect(rowData)}
        />
        <NavLink className="task_name" to={url}>
          {rowData.TaskName} - {rowData.TaskID}
        </NavLink>
      </div>
    );
  };

  const helpNeededBodyTemplate = (rowData) => {
    return (
      <div
        className={`${
          rowData.Help_Needed ? "helpneeded_no" : "helpneeded_yes"
        }`}
      >
        {rowData.Help_Needed ? "yes" : "No"}
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
  const assigneeTemplate = (rowData) => {
    return <div>{rowData?.Assignee}</div>;
  };

  const dynamicColumns = () => {
    if (props.flag === "myTasks" && TaskService.getMyTaskColumnNames().length) {
      return TaskService.getMyTaskColumnNames()
        .slice(0, 5)
        .map((ele, i) => {
          const checkBoxAdded = ele === "TaskName" ? "checkbox-added" : "";
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
                (ele === "TaskName" && taskBodyTemplate) ||
                (ele === "Help_Needed" && helpNeededBodyTemplate) ||
                (ele === "Status" && statusTemplate)
              }
              // body={ele === "Help Needed" && countryBodyTemplate}
            />
          );
        });
    } else if (
      props.flag === "allTasks" &&
      TaskService.getMyTaskColumnNames().length
    ) {
      return TaskService.getMyTaskColumnNames().map((ele, i) => {
        const checkBoxAdded = ele === "TaskName" ? "checkbox-added" : "";
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
              (ele === "TaskName" && taskBodyTemplate) ||
              (ele === "Help_Needed" && helpNeededBodyTemplate) ||
              (ele === "Status" && statusTemplate) ||
              (ele === "PM" && assigneeTemplate)
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

  //search each columns
  const searchHeader = projectColumnName.reduce(
    (columns, curr) => ({
      ...columns,
      [curr]: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }),

    {}
  );
  return (
    <>
      <div className="my-task-project">
        {/* {console.log("TaskService is", TaskService.getProjectData())} */}

        <ProjectListHeader
          // exportCSVTasks={
          //   selected ? exportCSVTasks(true) : exportCSVTasks(true)
          // }
          onSearchClick={onSearchClick}
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
          filterDisplay={isSearch && "row"}
          tableStyle={{ minWidth: "50rem" }}
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
          flag={flag}
        />
      )}
    </>
  );
};

export default TaskList;