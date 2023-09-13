// __mocks__/ProjectListHeader.js
import React from "react";

const ProjectListHeaderMock = ({ header,
  clearFilters,
  clearFilter,
  setVisible,
  saveSettings,
  onSearchClick,
  // exportCSV={exportCSV}
  isFilterEnabled,
  isResetEnabled,
  allData,
  headers,
  filterFLag,
  CustomizeViewFlag,
  ResetToDefaultFlag,
  isTreeTableFlag,} ) => {
  return (
    <div data-testid="ProjectList-Header-Mock">
      Mocked ProjectListHeader Component
    </div>
  );
};

export default ProjectListHeaderMock;

