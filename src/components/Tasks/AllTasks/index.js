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
import { getAllTasks } from "../../../store/actions/TaskActions";
import TaskDialog from "../../TaskDialog";

const AllTasks = (props) => {
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isSearch, isSearchSet] = useState(false);
  const [selectedProdSrchList, setSelectedProdSrchList] = useState([]);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [flag, setFlag] = useState("");
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state?.TaskReducer?.allTasks);
  useEffect(() => {
    const getMyAllTasksList = [];
    if (allTasks) {
      allTasks.forEach((project) => {
        project.TaskDetails.forEach((taskDetails) => {
          getMyAllTasksList.push(taskDetails);
        });
      });
      setSelectedProdSrchList(getMyAllTasksList);
    }
  }, [allTasks]);

  useEffect(() => {
    dispatch(getAllTasks(userInformation));
  }, [dispatch]);

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

  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };
  const dt = useRef(null);
  const headerColumns = [
    { title: "ProjectName", field: "ProjectName" },
    { title: "TaskName", field: "TaskName" },
    { title: "Status", field: "Status" },
    { title: "Help_Needed", field: "Help_Needed" },
    { title: "Remaining_Buffer", field: "Remaining_Buffer" },
    { title: "Assignee", field: "Remaining_Buffer" },
  ];

  const exportCSV = (selectionOnly) => {
    const columns = headerColumns.map((col) => ({
      title: col.title,
      field: col.field,
    }));
    if (selectionOnly || dt.current.getSelectedData().length === 0) {
      dt.current.exportCSV({
        selectionOnly: true,
        columns: columns,
        data: selected,
      });
    } else {
      dt.current.exportCSV({ columns: columns });
    }
  };

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
          />
          <span className="header-name">{options?.replace(/_/g, " ")}</span>
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

  const dynamicColumns = () => {
    if (TaskService.getMyTaskColumnNames().length) {
      return TaskService.getMyTaskColumnNames().map((ele, i) => {
        const cbadd = ele === "TaskName" ? "checkbox-added" : "";
        return (
          <Column
            key={ele}
            header={myTaskHeader(ele)}
            field={ele}
            filter
            showFilterMenu={false}
            classNme={cbadd}
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
  return (
    <>
      <div className="my-task-project">
        {/* {console.log("TaskService is", TaskService.getProjectData())} */}

        <ProjectListHeader
          exportCSV={selected ? () => exportCSV(true) : () => exportCSV(false)}
          onSearchClick={onSearchClick}
          handleDelegateClick={handleDelegateClick}
          handleHelpNeededClick={handleHelpNeededClick}
          actionFlag={!selected || selected.length === 0}
          header="All Tasks"
        />

        <DataTable
          resizableColumns
          value={selectedProdSrchList}
          reorderableColumns
          scrollable
          selection={selected}
          onSelectionChange={(e) => setSelected(e.value)}
          responsiveLayout="scroll"
          className="mt-3"
          ref={dt}
          filterDisplay={isSearch && "row"}
          tableStyle={{ minWidth: "50rem" }}
        >
          {dynamicColumns()}
          {/* <Column field="Project_Name" header="Project_Name"></Column>
        <Column field="Task" header="Task"></Column>
        <Column field="Status" header="Status"></Column>
        <Column field="Help Needed" header="Help Needed"></Column>
        <Column field="Remaining Buffer" header="Remaining Buffer"></Column> */}
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

export default AllTasks;
