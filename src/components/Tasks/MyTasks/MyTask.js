import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import "../../Projects/MyProjects/index.scss";

// import ProjectListHeader from "./ProjectListHeader";
import ProjectListHeader from "../../Projects/MyProjects/ProjectListHeader";
import { TaskService } from "../../../service/PegaTask";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import filter from "../../../assets/images/filter.svg";
import { Button } from "primereact/button";
import {
  getTasks,
  // updateProject,
} from "../../../store/actions/TaskActions";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { ProjectService } from "../../../service/PegaService";
// import ConfirmationPopUp from "../ConfirmationPopUp";
// import { Toast } from "primereact/toast";
// import { FilterMatchMode } from "primereact/api";
// import ProjectListHeader from "./ProjectListHeader";
// import { Tag } from "primereact/tag";

const MyTask = (props) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isSearch, isSearchSet] = useState(false);
  const [selectedProdSrchList, setSelectedProdSrchList] = useState([]);
  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.TaskReducer.myTasks);

  const getMyTasks = (myTasks) => {
    const getMyTasksList = [];
    myTasks.forEach((project) => {
      project.TaskDetails.forEach((taskDetails) => {
        getMyTasksList.push(taskDetails);
      });
    });
    setSelectedProdSrchList(getMyTasksList);
  };

  useEffect(() => {
    const gettasks = dispatch(getTasks());
    console.log("my gettasks", gettasks);
  }, [dispatch]);

  useEffect(() => {
    getMyTasks(myTasks);
  }, [myTasks]);

  useEffect(() => {
    if (TaskService.getProjectData()?.length !== selected.length) {
      setSelectAllChecked(false);
    }
  }, [TaskService.getProjectData(), selected, selectAllChecked]);
  const handleSelect = (item) => {
    if (selected?.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
      console.log("selected is", selected);
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

  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };
  const dt = useRef(null);
  const exportCSV = (selectionOnly) => {
    console.log("dt.current is", dt.current);
    console.log("selectionOnly is", selectionOnly);
    dt.current.exportCSV({ selectionOnly: true });
  };

  const handleSelectAll = (e) => {
    // console.log("MyTaskData is", MyTaskData);
    if (e.target.checked) {
      // setSelected(TaskService.getProjectData());
      setSelected(selectedProdSrchList);
    } else {
      setSelected([]);
    }
    setSelectAllChecked(e.target.checked);
  };

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
          <span className="header-name">{options}</span>
        </>
      </div>
    );
  };
  const taskBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        {/* <div class="p-checkbox p-component">
          <div
            class="p-checkbox-box p-component"
            role="checkbox"
            aria-checked="false"
            tabindex="0"
            aria-label="Select 1007"
          ></div>
        </div> */}
        <input
          type="checkbox"
          checked={selected?.includes(rowData)}
          onChange={() => handleSelect(rowData)}
        />
        {/* <div className="card flex justify-content-center">
          <Checkbox
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
          ></Checkbox>
        </div> */}
        <span className="task_name">{rowData.TaskName}</span>{" "}
      </div>
    );
  };

  const helpNeededBodyTemplate = (rowData) => {
    return <div className="helpneeded_value">{rowData.Help_Needed}</div>;
  };
  const statusTemplate = (rowData) => {
    return <div className="status-value">{rowData.Status}</div>;
  };

  const dynamicColumns = () => {
    console.log(
      "TaskService.getMyTaskColumnNames().length is",
      TaskService.getMyTaskColumnNames()
    );
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
    <div className="my-task-project">
      {console.log("TaskService is", TaskService.getProjectData())}

      <ProjectListHeader
        header={props.header}
        exportCSV={() => exportCSV(false)}
        onSearchClick={onSearchClick}
      />

      <DataTable
        resizableColumns
        value={selectedProdSrchList}
        reorderableColumns
        scrollable
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
  );
};

export default MyTask;
