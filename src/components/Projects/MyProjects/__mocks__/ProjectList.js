// __mocks__/ProjectList.js
import React from "react";

const ProjectListMock = ({ pegadata ,header}) => {
  return (
    <div data-testid="project-list-mock">
      Mocked ProjectList Component - {header}
    </div>
  );
};

export default ProjectListMock;
