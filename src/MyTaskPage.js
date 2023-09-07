import React from "react";
import PageLayout from "./components/PageLayout";
import MyTask from "./components/Tasks/MyTasks";

const MyTasksPage = (props) => {
  return (
    // // <PageLayout>
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
          <MyTask />
        </div>
      </div>
    // // <PageLayout>
  );
};
export default MyTasksPage;
