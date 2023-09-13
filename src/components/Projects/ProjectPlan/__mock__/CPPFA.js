import React from 'react';
const  CPPFAmock = ({ onClose,
    showTaskDialog,
    selectedTaskData,
    pegadata,
    getProjectPlanApi,
    TaskDetailsData }) => {
    return (
      <div data-testid="CPPFA-mock">
        Mocked CPPFA Component - {TaskDetailsData}
      </div>
    );
  };
export default CPPFAmock