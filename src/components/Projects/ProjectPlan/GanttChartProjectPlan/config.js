import Task from "./lib/Task";
// Application imports
import "./lib/StatusColumn";
import "./lib/StateColumn";
import "./lib/GanttToolbar";
import "./lib/TaskColumn";

// console.log("Gantt Data: ", data);
export const ganttConfig = {
  tbar: { type: "gantttoolbar" },

  dependencyIdField: "wbsCode",

  // project: {
  //   // Let the Project know we want to use our own Task model with custom fields / methods
  //   taskModelClass: Task,
  //   transport: {
  //     load: {
  //       url: "data/launch-saas.json",
  //     },
  //   },
  //   // loadUrl : 'data/launch-saas.json',
  //   autoLoad: true,

  //   // The State TrackingManager which the UndoRedo widget in the toolbar uses
  //   stm: {
  //     autoRecord: true,
  //   },
  // },

  startDate: "2023-08-12",
  endDate: "2023-12-24",
  resourceImageFolderPath: "users/",
  columns: [
    { type: "wbs", editor: false },
    { type: "name", width: 250, text: "Task", editor: false },
    {
      type: "predecessor",
      width: 112,
      text: "Dependency",
    },
    {
      type: "resourceassignment",
      width: 120,
      text: "Owner",
    },
    { type: "statecolumn" },
    { type: "duration", text: "Duration" },
    { type: "startdate", text: "Start Date" },
    { type: "enddate", text: "End Date" },
    { type: "constrainttype" },
    // { type: "constraintdate" },
    // { type: "taskcolumn" },
    // {
    //   type: "successor",
    //   width: 112,
    // },

    // {
    //   type: "date",
    //   text: "Deadline",
    //   field: "deadline",
    // },
    // { type: "percentdone", showCircle: true, width: 70 },

    // { type: "schedulingmodecolumn" },
    // { type: "calendar" },
    // { type: "addnew" },
  ],

  subGridConfigs: {
    locked: {
      flex: 3,
    },
    normal: {
      flex: 4,
    },
  },

  columnLines: false,

  rollupsFeature: {
    disabled: true,
  },
  baselinesFeature: {
    disabled: true,
  },
  progressLineFeature: {
    disabled: true,
    statusDate: new Date(2023, 7, 25),
  },
  filterFeature: true,
  dependencyEditFeature: true,
  timeRangesFeature: {
    showCurrentTimeLine: true,
  },
  labelsFeature: {
    left: {
      field: "name",
      editor: {
        type: "textfield",
      },
    },
  },
};
