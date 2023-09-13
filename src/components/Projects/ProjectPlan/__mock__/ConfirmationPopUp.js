// __mocks__/ConfirmationPopUp.js
import React from "react";

const ConfirmationPopUpMock = ({ onSort,
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
    clearColumnWiseFilter}) => {
  return (
    <div data-testid="Confirmation-PopUp-mock">
      Mocked ConfirmationPopUp Component - {clearColumnWiseFilter}
    </div>
  );
};

export default ConfirmationPopUpMock;
