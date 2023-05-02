import pegaJsonData from "../pega.json";

const frozenColData = ["Record ID#", "Timestamp", "Status", "SOP"];

const sortingData = ["Record ID#", "desc"];

const projectPlanAllColumnNames = [
  "Task",
  "Dependancy",
  "Role",
  "Owner",
  "State",
  "Duration",
  "StartDate",
  "EndDate",
  "ConsumedBuffer",
  "HelpNeeded",
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
  brand: "Fairy",
  category: "Hand Dish Wash",
  duration: "15 days",
  start_date: "20-mar-2023",
  end_date: "4-apr-23",
  consumed_buffer: "15",
  count: 1,
  DesignIntentList: [
    {
      Design_Intent_Name:
        "DI_FAI-214_Fairy_Hand Dish Wash_Paste Mulsaane Oral-B Medical Device Europe_UK_Test",
      AWMTaskId: "DI-1",
      DesignJobid: "1234",
      AWMProjectId: "",
      AgencyReference: "FAI-214",
      Cluster: "UK",
      AdditionalInfo: "Test",
      Select: "true",
      event: "submit",
    },
    {
      Design_Intent_Name: "Abc",
      TaskId: "DI-2",
      AgencyReference: "FAI-215",
      Cluster: "UK",
      AdditionalInfo: "Test",
      Select: "false",
      event: "draft",
      DesignJobid: "1112",
    },
    {
      DesignJobid: "2235",
    },
  ],
};


const Approve_di = {
  projectName: "Paste Mulsaane Oral-B Medical Device Europe",
  brand: "Fairy",
  category: "Hand Dish Wash",
  duration: "15 days",
  start_date: "20-mar-2023",
  end_date: "4-apr-23",
  consumed_buffer: "15",
  count: 1,
  DesignIntentList: [
    {
      Design_Intent_Name:
        "DI_FAI-214_Fairy_Hand Dish Wash_Paste Mulsaane Oral-B Medical Device Europe_UK_Test",
      AWMTaskId: "DI-1",
      DesignJobid: "1234",
      AWMProjectId: "",
      AgencyReference: "FAI-214",
      Cluster: "UK",
      AdditionalInfo: "Test",
      Select: "true",
      event: "submit",
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

  getApproveDI(){
  return Approve_di;
  },

  getAllColumnNamesAllProjects() {
    return allColumnNamesAllProjects;
  },
};
