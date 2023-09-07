import React from "react";
import AllTasks from "./components/Tasks/AllTasks";
import PageLayout from "./components/PageLayout";

const AllTasksPage = (props) => {
  return (
    <div className="content-layout" id="tableDiv">
      <div className="tabular-view">
        <AllTasks />
      </div>
    </div>
  );
};
export default AllTasksPage;
