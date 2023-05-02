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
import DDT from "./components/AWMJobs/DDT/index.js";
import PRA from "./components/AWMJobs/PRA/index.js";

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
          path="/myTasks/DDI/:TaskID/:ProjectID"
          element={<DefineDesignIntent />}
        />
        <Route
          path="/allTasks/DDI/:TaskID/:ProjectID"
          element={<DefineDesignIntent />}
        />
        <Route
          path="/myTasks/UADI/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/allTasks/UADI/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route path="/myTasks/DDT/:TaskID/:ProjectID" element={<DDT />} />
        <Route path="/allTasks/DDT/:TaskID/:ProjectID" element={<DDT />} />
        <Route
          path="/myTasks/ADT/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route path="/myTasks/PRA/:TaskID/:ProjectID" element={<PRA />} />
        <Route path="/allTasks/PRA/:TaskID/:ProjectID" element={<PRA />} />
        <Route
          path="/myTasks/APRA/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/allTasks/APRA/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/myTasks/UPRA/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/allTasks/UPRA/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/myTasks/CCD/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/allTasks/CCD/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/myTasks/CNIQ/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/allTasks/CCD/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/myTasks/CPPFA/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/allTasks/CPPFA/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/myTasks/CPT/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/allTasks/CPT/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/myTasks/CPT/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        <Route
          path="/allTasks/CPT/:TaskID/:ProjectID"
          element={<ApproveDesignIntent />}
        />
        {/* <Route path="/reports" element={<Reports />} /> */}
      </Route>
    </Routes>
  );
};

export default RoutesNav;
