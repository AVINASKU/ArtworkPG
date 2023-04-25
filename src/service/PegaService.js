import pegaJsonData from "../pega.json";

const frozenColData = ["Record ID#", "Timestamp", "Status", "SOP"];

const sortingData = ["Record ID#", "desc"];

const projectPlanAllColumnNames = [
  "Task",
  "Dependancy",
  "Role",
  "Owner",
  "State",
  "Duration(Days)",
  "Start Date",
  "End Date",
  "Consumed Buffer",
  "Help Needed",
  // "Project_ID",
  // "Project_Name",
  // "Artwork_Category",
  // "Artwork_SMO",
  // "Project_State",
  // "Artwork_Brand",
  // "Buffer_To_Work",
  // "Estimated_AW_Printer",
  // "Full Kit Readiness Tracking",
];
const allColumnNames = [
  "Project_ID",
  "Project_Name",
  "Artwork_Category",
  "Artwork_Brand",
  "Artwork_SMO",
  "Project_State",
  "Buffer_To_Work",
  "Estimated_AW_Printer",
  // "Full Kit Readiness Tracking",
];

const allColumnNamesAllProjects = [
  "Project_ID",
  "Project_Name",
  "Artwork_Category",
  "Artwork_Brand",
  "Artwork_SMO",
  "Project_State",
  "Buffer_To_Work",
  "Estimated_AW_Printer",
  "PM",
  // "Full Kit Readiness Tracking",
];

const filterProjectData = [
  { "Record ID#": { frozen: true, sort: "desc", width: 50 } },
  { "Group Name": { frozen: true, width: 100 } },
  { Category: {} },
  { "Group Name": {} },
  { Status: { frozen: true } },
];

const DI = {
  projectName: "Paste Mulsaane Oral-B Medical Device Europe",
  duration: "15 days",
  start_date: "20-mar-2023",
  end_date: "4-apr-23",
  consumed_buffer: "15",
  DI_Submit:false,
  sub_project: [
    {
      name: "DI_Abc_Linen&sky_FrontLebel_Xyz",
      id:1,
      prefix: "abc",
      varient: "Linen & sky",
      usage: "FrontLabel",
      suffex: "Xyz",
      submitted:true,
    },
    {
      name: "DI_Abc_Sprint&Renewal_FrontLebel_Pqr",
      id:2,
      prefix: "abc",
      varient: "Sprint&Renewal",
      usage: "FrontLabel",
      suffex: "Pqr",
      submitted:true,
    },
    {
      id:3,
      submitted:false,
    },
  ],
};

export const ProjectService = {
  getProjectData() {
    return pegaJsonData.ArtworkAgilityProjects;
  },

  getFilterData() {
    return filterProjectData;
  },

  getSortingData() {
    return sortingData;
  },

  getFrozenData() {
    return frozenColData;
  },

  getProjectPlanAllColumnNames() {
    return projectPlanAllColumnNames;
  },
  getAllColumnNames() {
    return allColumnNames;
  },

  getDIData() {
    return DI;
  },

  getAllColumnNamesAllProjects() {
    return allColumnNamesAllProjects;
  },
};
