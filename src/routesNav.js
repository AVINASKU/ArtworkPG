import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home.js";
import { Outlet } from "react-router-dom";
import AllProjects from "./components/Projects/AllProjects/index";
import MyProjects from "./components/Projects/MyProjects/index.js";
import ProjectCreation from "./projectCreation.js";
import Login from "./login.js";
import DefineDesignIntent from "./components/Tasks/DesignIntent/index.js";
import ApproveDesignIntent from "./components/Tasks/DesignIntent/ApproveDesignIntent";
import AllTasksPage from "./AllTaksPage.js";
import MyTasksPage from "./MyTaskPage.js";

const RoutesNav = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Login />} />
        <Route index element={<Home />} />
        <Route path="/myProjects" element={<MyProjects />} />
        <Route path="/allProjects" element={<AllProjects />} />
        <Route path="/myTasks" element={<MyTasksPage />} />
         <Route path="/AllTasks" element={<AllTasksPage />} />
        {/* <Route path="/createProject" element={<AddProject />} /> */}
        <Route path="/projectPlan" element={<ProjectCreation />} />
        <Route path="/projectPlan/:ProjectID" element={<ProjectCreation />} />
        <Route
          path="/myTasks/define-design-intent"
          element={<DefineDesignIntent />}
        />
        <Route
          path="/myTasks/approve-define-design-intent"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/allTasks/define-design-intent"
          element={<DefineDesignIntent />}
        />
        <Route
          path="/allTasks/approve-define-design-intent"
          element={<ApproveDesignIntent />}
        />
        {/* <Route path="/reports" element={<Reports />} /> */}
      </Route>
    </Routes>
  );
};

export default RoutesNav;
