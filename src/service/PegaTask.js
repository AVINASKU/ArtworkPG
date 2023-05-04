const myTaskColumnNames = [
  "Project_Name",
  "Task_Name",
  "Status",
  "Help_Needed",
  "Remaining_Buffer",
  "PM",
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
