import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home.js";
import { Outlet } from "react-router-dom";
import AllProjects from "./components/Projects/AllProjects/index";
import MyProjects from "./components/Projects/MyProjects/index.js";
import ProjectCreation from "./projectCreation.js";
import Login from "./login.js";

const RoutesNav = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Login />} />
        <Route index element={<Home />} />
        <Route path="/myProjects" element={<MyProjects />} />
        <Route path="/allProjects" element={<AllProjects />} />
        {/* <Route path="/createProject" element={<AddProject />} /> */}
         <Route path="/addProject" element={<ProjectCreation />} />
        <Route path="/addProject/:ProjectID" element={<ProjectCreation />} />
        {/* <Route path="/gant" element={<GantChart />} />
        <Route path="/reports" element={<Reports />} /> */}
      </Route>
    </Routes>
  );
};

export default RoutesNav;
