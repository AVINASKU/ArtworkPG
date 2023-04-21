import pegaJsonData from "../pega.json";

const frozenColData = ["Record ID#", "Timestamp", "Status", "SOP"];

const sortingData = ["Record ID#", "desc"];

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
