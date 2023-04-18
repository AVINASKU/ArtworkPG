import pegaJsonData from "../pega.json";

const frozenColData = ["Record ID#", "Timestamp", "Status", "SOP"];

const sortingData = ["Record ID#", "desc"];

const allColumnNames = [
  "ProjectID",
  "ProjectName",
  "Project_Categories",
  "Project_SMO",
  "Project_State",
  "Project_Brands",
  "Buffer_To_Work",
  "Estimated_AW_Printer",
  "Full Kit Readiness Tracking",

];

const allColumnNamesAllProjects = [
  "Project_ID",
  "Project_Name",
  "Project_Categories",
  "Project_SMO",
  "PM",
  "Project_State",
  "Project_Brands",
  "Buffer_To_Work",
  "Estimated_AW_Printer",
  "Full Kit Readiness Tracking",
];

const filterProjectData = [
  { "Record ID#": { frozen: true, sort: "desc", width: 50 } },
  { "Group Name": { frozen: true, width: 100 } },
  { Category: {} },
  { "Group Name": {} },
  { Status: { frozen: true } },
];

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

  getAllColumnNames() {
    return allColumnNames;
  },

  getAllColumnNamesAllProjects() {
    return allColumnNamesAllProjects;
  },
};
