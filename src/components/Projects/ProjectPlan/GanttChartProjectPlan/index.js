import React, { useEffect, useState } from "react";

import { BryntumGantt } from "@bryntum/gantt-react";

import { ganttConfig } from "./config";

import { projectData } from "../../../../Utils/data/projectData";
import { useSelector } from "react-redux";
import moment from "moment";

const GanttChart = (props) => {
  const designTasks = [
    "DDI",
    "UADI",
    "DDT",
    "URDT",
    "ARDT",
    "DPRA",
    "UPRA",
    "APRA",
    "CPPFA",
    "DNPF",
    "CCD",
    "CPT",
    "DNIQ",
    "CNIQ",
  ];
  const inputTasks = ["SAA"];
  const { projectPlan, projectPlanDesign, loading } = useSelector(
    (state) => state.ProjectPlanReducer
  );

  console.log("projectData: ", projectData);
  const [startDate, setStartDate] = useState("");
  const [calendars, setCalendars] = useState(projectData.calendars);
  const [tasks, setTasks] = useState(projectData.tasks);
  const [assignments, setAssignments] = useState(projectData.assignments);
  const [dependencies, setDependencies] = useState(projectData.dependencies);
  const [resources, setResources] = useState(projectData.resources);

  console.log("Project Data: ", projectPlanDesign);
  console.log("Project Data structured: ", projectPlan);

  useEffect(() => {
    setStartDate(getStartDate());
    createGanttChartData();
  }, [projectPlan]);

  const getStartDate = () => {
    const dateArray = [];
    projectPlanDesign.forEach((element) => {
      dateArray.push(formatDate(element.Start_Date));
    });
    const datesAsMoments = dateArray.map((dateString) => moment(dateString));
    const minDate = moment.min(datesAsMoments);
    const startDate = minDate.format("YYYY-MM-DD");
    return startDate;
  };
  const formatDate = (date) => {
    const dateObj = moment.utc(date, "YYYYMMDDTHHmmss.SSS Z");
    const formattedDate = dateObj.format("YYYY-MM-DD");
    return formattedDate;
  };

  const createGanttChartData = () => {
    const data = {
      success: true,
      project: {
        calendar: "general",
        startDate: startDate,
        hoursPerDay: 24,
        daysPerWeek: 5,
        daysPerMonth: 20,
      },
      calendars: {
        rows: [
          {
            id: "general",
            name: "General",
            intervals: [
              {
                recurrentStartDate: "on Sat at 0:00",
                recurrentEndDate: "on Mon at 0:00",
                isWorking: false,
              },
            ],
            expanded: true,
            children: [
              {
                id: "business",
                name: "Business",
                intervals: [
                  {
                    recurrentStartDate: "every weekday at 12:00",
                    recurrentEndDate: "every weekday at 13:00",
                    isWorking: false,
                  },
                  {
                    recurrentStartDate: "every weekday at 17:00",
                    recurrentEndDate: "every weekday at 08:00",
                    isWorking: false,
                  },
                ],
              },
              {
                id: "night",
                name: "Night shift",
                intervals: [
                  {
                    recurrentStartDate: "every weekday at 6:00",
                    recurrentEndDate: "every weekday at 22:00",
                    isWorking: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      tasks: {
        rows: [
          {
            id: "design",
            name: "Design",
            percentDone: 50,
            startDate: startDate,
            expanded: true,
            children: getTasks("design"),
          },
          {
            id: "input",
            name: "Input",
            percentDone: 50,
            startDate: startDate,
            expanded: true,
            children: getTasks("input"),
          },
        ],
      },
    };
  };

  const getTasks = (category) => {
    const tasks = [];
    if (category === "design") {
      projectPlan.forEach((obj) => {
        designTasks.forEach((task) => {
          if (obj.key.includes(task)) {
            tasks.push(obj);
          }
        });
      });
      // console.log("tasksForDesign: ", tasks);
    } else if (category === "input") {
      projectPlan.forEach((obj) => {
        inputTasks.forEach((task) => {
          if (obj.key.includes(task)) {
            tasks.push(obj);
          }
        });
      });
      // console.log("tasksForInput: ", tasks);
    }

    // const restructredTasks = restructure(tasks);
  };

  // const restructure = (tasks) => {
  //   const tempArray = [];
  // };

  return (
    <BryntumGantt
      calendars={calendars.rows}
      tasks={tasks.rows}
      assignments={assignments.rows}
      dependencies={dependencies.rows}
      resources={resources.rows}
      // columns={}
      {...ganttConfig}
      // {...props}
    />
  );
};

export default GanttChart;