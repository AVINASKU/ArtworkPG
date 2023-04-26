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
  const [MyTaskData, setMyTaskData] = useState(null);
  const [MyTaskcolumnName, setMyTaskColumnName] = useState(null);
  const [isSearch, isSearchSet] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.TaskReducer.myTasks);
  console.log("myTasks", myTasks);
  //setMyTaskData(myTasks);
  // let a1 = [
  //   {
  //     name: "lakshay",
  //     age: 28,
  //   },
  //   {
  //     name: "lakshay",
  //     age: 28,
  //   },
  //   {
  //     name: "lakshay",
  //     age: 28,
  //   },
  //   {
  //     name: "lakshay",
  //     age: 28,
  //   },
  //   {
  //     name: "lakshay",
  //     age: 28,
  //   },
  //   {
  //     name: "lakshay",
  //     age: 28,
  //   },
  //   {
  //     name: "lakshay",
  //     age: 28,
  //   },
  //   {
  //     name: "lakshay",
  //     age: 28,
  //   },
  // ];
  //   console.log("poo are", props);

  useEffect(() => {
    // if (!myProjectList.myProject.length) {
    const gettasks = dispatch(getTasks());
    console.log("my gettasks", gettasks);
    // }
  }, [dispatch]);

  useEffect(() => {
    // (async () => {
    // try {
    setMyTaskData(TaskService.getProjectData());
    console.log("MyTaskData is", MyTaskData);

    // console.log("ProjectData is", ProjectData);
    // console.log("TaskService is", TaskService.getProjectData);
    // } catch (err) {
    // console.log("error", err);
    // }
    // })();
    // }
    // if (MyTaskData.length) {
    // setMyTaskColumnName(Object.keys(MyTaskData[0]));
    setMyTaskColumnName(Object.keys(TaskService.getProjectData()[0]));
    // }
    console.log("MyTaskcolumnName is", MyTaskcolumnName);
  }, []);

  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };
  const dt = useRef(null);
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const myTaskHeader = (options) => {
    return (
      <div>
        <>
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
        <div class="p-checkbox p-component">
          <div
            class="p-checkbox-box p-component"
            role="checkbox"
            aria-checked="false"
            tabindex="0"
            aria-label="Select 1007"
          ></div>
        </div>
        {/* <div className="card flex justify-content-center">
          <Checkbox
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
          ></Checkbox>
        </div> */}
        <span>{rowData.Task}</span>{" "}
      </div>
    );
  };

  const helpNeededBodyTemplate = (rowData) => {
    return <div className="helpneeded_value">{rowData.help_needed}</div>;
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
        const cbadd = ele === "Task" ? "checkbox-added" : "";
        return (
          <Column
            key={ele}
            header={myTaskHeader(ele)}
            field={ele}
            filter
            showFilterMenu={false}
            classNme={cbadd}
            body={
              (ele === "Task" && taskBodyTemplate) ||
              (ele === "Help Needed" && helpNeededBodyTemplate) ||
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
      {console.log("MyTaskData is", MyTaskData)}
      <ProjectListHeader
        header={props.header}
        exportCSV={exportCSV}
        onSearchClick={onSearchClick}
      />

      <DataTable
        resizableColumns
        value={MyTaskData}
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
