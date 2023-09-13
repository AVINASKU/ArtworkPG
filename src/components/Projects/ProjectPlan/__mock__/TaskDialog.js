import React from 'react';
const  TaskDialogMock = ({ onClose,
showTaskDialog,
selectedTaskData,
flag }) => {
    return (
      <div data-testid="TaskDialog-mock">
        Mocked TaskDialog Component - {flag}
      </div>
    );
  };
export default TaskDialogmock

