// import
import pegatasksJsonData from "../tasks.json";

const myTaskColumnNames = [
  "Project_Name",
  "Task",
  "Status",
  "Help Needed",
  "Remaining Buffer",
];

export const TaskService = {
  getProjectData() {
    return pegatasksJsonData.ArtworkAgilityTasks;
  },

  getMyTaskColumnNames() {
    return myTaskColumnNames;
  },

  // getFilterData() {
  //   return filterProjectData;
  // },

  // getSortingData() {
  //   return sortingData;
  // },

  // getFrozenData() {
  //   return frozenColData;
  // },

  // getAllColumnNames() {
  //   return allColumnNames;
  // },

  // getAllColumnNamesAllProjects() {
  //   return allColumnNamesAllProjects;
  // },
};
