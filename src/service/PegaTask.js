const myTaskColumnNames = [
  "Task_Name",
  "Task_Type",
  "Project_Name",
  "Status",
  "Help_Needed",
  "Remaining_Buffer",
  "Assignee",
];

export const TaskService = {
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
