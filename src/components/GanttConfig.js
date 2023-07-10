import Task from "../lib/Task";
// Application imports
import "../lib/StatusColumn";
import "../lib/GanttToolbar";

export const ganttConfig = {
  tbar: { type: "gantttoolbar" },

  dependencyIdField: "wbsCode",

  project: {
    // Let the Project know we want to use our own Task model with custom fields / methods
    taskModelClass: Task,
    transport: {
      load: {
        url: `data/launch-saas.json`,
      },
    },
    autoLoad: true,

    // The State TrackingManager which the UndoRedo widget in the toolbar uses
    stm: {
      autoRecord: true,
    },
  },

  startDate: "2019-01-12",
  endDate: "2019-03-24",
  resourceImageFolderPath: "users/",
  columns: [
    { type: "wbs" },
    { type: "name", width: 250 },
    { type: "startdate" },
    { type: "duration" },
    { type: "resourceassignment", width: 120, showAvatars: true },
    { type: "percentdone", showCircle: true, width: 70 },
    {
      type: "predecessor",
      width: 112,
    },
    {
      type: "successor",
      width: 112,
    },
    { type: "schedulingmodecolumn" },
    { type: "calendar" },
    { type: "constrainttype" },
    { type: "constraintdate" },
    { type: "statuscolumn" },
    {
      type: "date",
      text: "Deadline",
      field: "deadline",
    },
    { type: "addnew" },
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
    statusDate: new Date(2019, 0, 25),
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
