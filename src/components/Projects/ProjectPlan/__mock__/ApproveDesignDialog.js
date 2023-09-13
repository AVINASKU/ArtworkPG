// __mocks__/ApproveDesignDialog.js
import React from "react";

const ApproveDesignDialogMock = ({ onClose,
showTaskDialog,
selectedTaskData}) => {
  return (
    <div data-testid="Approve-Design-Dialog-mock">
      Mocked ApproveDesignDialog Component - {selectedTaskData}
    </div>
  );
};

export default ApproveDesignDialogMock;
