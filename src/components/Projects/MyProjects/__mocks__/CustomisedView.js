// __mocks__/CustomisedView.js
import React from "react";

const CustomisedViewMock = ({ visible,
    setVisible,
    allColumnNames,
    projectColumnName,
    setProjectColumnNames,
    saveAsPersonaliDefault,
    resetToPgDefault, }) => {
  return (
    <div data-testid="customised-view-mock">
      Mocked CustomisedView Component
    </div>
  );
};

export default CustomisedViewMock;
