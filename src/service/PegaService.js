import pegaJsonData from "../pega.json";

const frozenColData = ["Record ID#", "Timestamp", "Status", "SOP"];

const sortingData = ["Record ID#", "desc"];

const projectPlanAllColumnNames = [
  "Task",
  "Dependency",
  "Role",
  "Owner",
  "State",
  "Duration",
  "StartDate",
  "EndDate",
  "ConsumedBuffer",
  "HelpNeeded",
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
  "Full Kit Readiness Tracking",
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
  "Full Kit Readiness Tracking",
];

const filterProjectData = [
  { "Record ID#": { frozen: true, sort: "desc", width: 50 } },
  { "Group Name": { frozen: true, width: 100 } },
  { Category: {} },
  { "Group Name": {} },
  { Status: { frozen: true } },
];

const DI = {
  Project_Name: "Paste Mulsaane Oral-B Medical Device Europe",
  Brand: [
    {
      Brand_Name: "Charlie Banana",
      code: "BV0102",
    },
    {
      Brand_Name: "Pampers",
      code: "J29",
    },
    {
      Brand_Name: "All Clean",
      code: "BV0121",
    },
    {
      Brand_Name: "Lines",
      code: "D76",
    },
  ],
  Category: [
    {
      Category_Name: "Baby Care Adjacencies",
      code: "BCA",
    },
    {
      Category_Name: "Baby Wipes",
      code: "BW",
    },
    {
      Category_Name: "Diapers",
      code: "DP",
    },
  ],
  Duration: "15 days",
  Start_Date: "20-mar-2023",
  End_Date: "4-apr-23",
  Consumed_Buffer: "15",
  count: 1,
  Design_Intent_Details: [
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
  Project_Name: "Paste Mulsaane Oral-B Medical Device Europe",
  brand: "Fairy",
  Category: "Hand Dish Wash",
  Duration: "15 days",
  Start_Date: "20-mar-2023",
  End_Date: "4-apr-23",
  consumed_buffer: "15",
  count: 1,
  DesignIntentList: {
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
    file_name: "DI_FAI-214_Fairy_Hand Dish Wash_Paste Mulsaane",
  },
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

  getApproveDI() {
    return Approve_di;
  },

  getAllColumnNamesAllProjects() {
    return allColumnNamesAllProjects;
  },
};
