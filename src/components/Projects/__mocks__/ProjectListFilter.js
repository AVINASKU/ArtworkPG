// __mocks__/ProjectListFilter.js
import React from "react";

const ProjectListFilterMock = ({ onSort,
    setProjectFrozen,
    saveSettings,
    projectData,
    addFrozenColumns,
    onGlobalFilterChange,
    selectedColumnName,
    ProjectFrozen,
    selectedFields,
    setFrozenColumn,
    frozenCoulmns,
    sortData,
    setSortData,
    setFilters,
    filters,
    op,
    clearColumnWiseFilter,} ) => {
  return (
    <div data-testid="ProjectList-Filter-Mock">
      Mocked ProjectListFilter Component
    </div>
  );
};

export default ProjectListFilterMock;