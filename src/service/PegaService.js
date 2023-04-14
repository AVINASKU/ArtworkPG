import pegaJsonData from "../pega.json";

const frozenColData = ["Record ID#", "Timestamp", "Status", "SOP"];

const sortingData = ["Record ID#", "desc"];

const allColumnNames = [
  "ProjectID",
  "ProjectName",
  "Project_Category",
  "Project_SMO",
  "Project State",
  "Buffer to work",
  "EstimatedAWPrinters",
  "Full Kit Readiness Tracking",
];

const allColumnNamesAllProjects = [
  "ProjectID",
  "ProjectName",
  "Project_Category",
  "Project_SMO",
  "PM",
  "Project State",
  "Buffer to work",
  "EstimatedAWPrinters",
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
