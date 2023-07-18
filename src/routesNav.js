// import React, { useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "./home.js";
// import { Outlet } from "react-router-dom";
// import AllProjects from "./components/Projects/AllProjects/index";
// import MyProjects from "./components/Projects/MyProjects/index.js";
// import ProjectCreation from "./projectCreation.js";
// import DDI from "./components/AWMJobs/DDI/index.js";
// import UADI from "./components/AWMJobs/UADI";
// import AllTasksPage from "./AllTaksPage.js";
// import MyTasksPage from "./MyTaskPage.js";
// import DDT from "./components/AWMJobs/DDT/index.js";
// import DPRA from "./components/AWMJobs/DPRA/index.js";
// import CCD from "./components/AWMJobs/CCD/index.js";
// import DCD from "./components/AWMJobs/DCD/index.js";
// import DNIQ from "./components/AWMJobs/DNIQ/index.js";
// import CNIQ from "./components/AWMJobs/CNIQ/index.js";
// import CPT from "./components/AWMJobs/CPT/index.js";
// import DNPF from "./components/AWMJobs/DNPF/index.js";
// import ARDT from "./components/AWMJobs/ARDT/index.js";
// import APRA from "./components/AWMJobs/APRA/index.js";
// import UPRA from "./components/AWMJobs/UPRA/index.js";
// import URDT from "./components/AWMJobs/URDT/index.js";
// import CPPFA from "./components/AWMJobs/CPPFA/index.js";

// import { checkReadOnlyAccess } from "./utils";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAccessMatrix } from "./store/actions/RoleBasedActions";
// import { useLocation } from "react-router-dom";

// const RoutesNav = (props) => {
//   return (
//     <Routes>
//       <Route path="/" element={<Outlet />}>
//         {<Route index element={<Home {...props} />} />}
//         <Route path="/myProjects" element={<MyProjects />} />
//         <Route path="/allProjects" element={<AllProjects />} />
//         <Route path="/myTasks" element={<MyTasksPage />} />
//         <Route path="/AllTasks" element={<AllTasksPage />} />
//         {/* <Route path="/createProject" element={<AddProject />} /> */}
//         <Route path="/projectPlan" element={<ProjectCreation />} />
//         <Route
//           path="/myProjects/projectPlan/:ProjectID"
//           element={<ProjectCreation />}
//         />
//         <Route
//           path="/allProjects/projectPlan/:ProjectID"
//           element={<ProjectCreation />}
//         />
//         <Route path="/myTasks/DDI/:TaskID/:ProjectID" element={<DDI />} />
//         <Route path="/allTasks/DDI/:TaskID/:ProjectID" element={<DDI />} />
//         <Route path="/myTasks/UADI/:TaskID/:ProjectID" element={<UADI />} />
//         <Route path="/allTasks/UADI/:TaskID/:ProjectID" element={<UADI />} />
//         <Route path="/myTasks/DDT/:TaskID/:ProjectID" element={<DDT />} />
//         <Route path="/allTasks/DDT/:TaskID/:ProjectID" element={<DDT />} />
//         <Route path="/myTasks/ARDT/:TaskID/:ProjectID" element={<ARDT />} />
//         <Route path="/allTasks/ARDT/:TaskID/:ProjectID" element={<ARDT />} />
//         <Route path="/myTasks/DPRA/:TaskID/:ProjectID" element={<DPRA />} />
//         <Route path="/allTasks/DPRA/:TaskID/:ProjectID" element={<DPRA />} />
//         <Route path="/myTasks/APRA/:TaskID/:ProjectID" element={<APRA />} />
//         <Route path="/allTasks/APRA/:TaskID/:ProjectID" element={<APRA />} />
//         <Route path="/myTasks/URDT/:TaskID/:ProjectID" element={<URDT />} />
//         <Route path="/allTasks/URDT/:TaskID/:ProjectID" element={<URDT />} />
//         <Route path="/myTasks/UPRA/:TaskID/:ProjectID" element={<UPRA />} />
//         <Route path="/allTasks/UPRA/:TaskID/:ProjectID" element={<UPRA />} />
//         <Route path="/myTasks/CCD/:TaskID/:ProjectID" element={<CCD />} />
//         <Route path="/allTasks/CCD/:TaskID/:ProjectID" element={<CCD />} />
//         <Route path="/myTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
//         <Route path="/allTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
//         <Route path="/myTasks/CNIQ/:TaskID/:ProjectID" element={<CNIQ />} />
//         <Route path="/allTasks/CNIQ/:TaskID/:ProjectID" element={<CNIQ />} />
//         <Route path="/myTasks/DNIQ/:TaskID/:ProjectID" element={<DNIQ />} />
//         <Route path="/allTasks/DNIQ/:TaskID/:ProjectID" element={<DNIQ />} />
//         <Route path="/allTasks/CPPFA/:TaskID/:ProjectID" element={<CPPFA />} />
//         <Route path="/myTasks/CPT/:TaskID/:ProjectID" element={<CPT />} />
//         <Route path="/allTasks/CPT/:TaskID/:ProjectID" element={<CPT />} />
//         <Route path="/myTasks/DNPF/:TaskID/:ProjectID" element={<DNPF />} />
//         <Route path="/allTasks/DNPF/:TaskID/:ProjectID" element={<DNPF />} />
//         <Route path="/myTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
//         <Route path="/allTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
//         {/* <Route path="/reports" element={<Reports />} /> */}
//       </Route>
//     </Routes>
//   );
// };

// export default RoutesNav;
import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
// import Home from "./home.js";
import { Outlet } from "react-router-dom";
import AllProjects from "./components/Projects/AllProjects/index";
import MyProjects from "./components/Projects/MyProjects/index.js";
import ProjectCreation from "./projectCreation.js";
import Login from "./login.js";
import DDI from "./components/AWMJobs/DDI/index.js";
import UADI from "./components/AWMJobs/UADI";
import AllTasksPage from "./AllTaksPage.js";
import MyTasksPage from "./MyTaskPage.js";
import DDT from "./components/AWMJobs/DDT/index.js";
import DPRA from "./components/AWMJobs/DPRA/index.js";
import CCD from "./components/AWMJobs/CCD/index.js";
import DCD from "./components/AWMJobs/DCD/index.js";
import DNIQ from "./components/AWMJobs/DNIQ/index.js";
import CNIQ from "./components/AWMJobs/CNIQ/index.js";
import CPT from "./components/AWMJobs/CPT/index.js";
import DNPF from "./components/AWMJobs/DNPF/index.js";
import ARDT from "./components/AWMJobs/ARDT/index.js";
import APRA from "./components/AWMJobs/APRA/index.js";
import UPRA from "./components/AWMJobs/UPRA/index.js";
import URDT from "./components/AWMJobs/URDT/index.js";
import CPPFA from "./components/AWMJobs/CPPFA/index.js";
import UBD from "./components/AWMJobs/UBD/index.js";

import DsbpPage from "./DsbpPage";
import DsbpTabPage from "./DsbpTabPage";

import Role from "./role";

const RoutesNav = () => {
  const params = useParams();
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Login />} />
        {/* <Route index element={<Home />} /> */}
        <Route path="/myProjects" element={<MyProjects />} />
        <Route path="/roles" element={<Role />} />
        <Route path="/allProjects" element={<AllProjects />} />
        <Route path="/myTasks" element={<MyTasksPage />} />
        <Route path="/AllTasks" element={<AllTasksPage />} />
        {/* <Route path="/createProject" element={<AddProject />} /> */}
        {/* projectPlan */}
        <Route path="/projectPlan" element={<ProjectCreation />} />
        <Route
          path="/myProjects/projectPlan/:ProjectID"
          element={<ProjectCreation key={`projectPlan-${params.ProjectID}`} />}
        />
        <Route
          path="/allProjects/projectPlan/:ProjectID"
          element={<ProjectCreation key={`projectPlan-${params.ProjectID}`} />}
        />
        {/* projectPlan */}
        {/* projectSetup */}
          <Route
            path="/projectSetup"
            element={<ProjectCreation key="projectSetup" />}
          />
          <Route
            path="/myProjects/projectSetup/:ProjectID"
            element={<ProjectCreation key={`projectSetup-${params.ProjectID}`} />}
          />
          <Route
            path="/allProjects/projectSetup/:ProjectID"
            element={<ProjectCreation key={`projectSetup-${params.ProjectID}`} />}
          />
         {/* projectSetup */}
          {/* artworkAlignment */}
          <Route
            path="/artworkAlignment"
            element={<ProjectCreation key="artworkAlignment" />}
          />
          <Route
            path="/myProjects/artworkAlignment/:ProjectID"
            element={<ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />}
          />
          <Route
            path="/allProjects/artworkAlignment/:ProjectID"
            element={<ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />}
          />
          <Route
            path="/myTasks/artworkAlignment/:ProjectID"
            element={<ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />}
          />
          <Route
            path="/allTasks/artworkAlignment/:ProjectID"
            element={<ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />}
          />
        {/* artworkAlignment */}
        <Route
          path="/artworkAlignment"
          element={<ProjectCreation key="artworkAlignment" />}
        />
        <Route
          path="/myProjects/artworkAlignment/:ProjectID"
          element={
            <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
          }
        />
        <Route
          path="/allProjects/artworkAlignment/:ProjectID"
          element={
            <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
          }
        />
        <Route
          path="/myTasks/artworkAlignment/:ProjectID"
          element={
            <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
          }
        />
        <Route
          path="/allTasks/artworkAlignment/:ProjectID"
          element={
            <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
          }
        />
        {/* artworkAlignment */}
        <Route
          path="/artworkAlignment"
          element={<ProjectCreation key="artworkAlignment" />}
        />
        <Route
          path="/myProjects/artworkAlignment/:ProjectID"
          element={
            <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
          }
        />
        <Route
          path="/allProjects/artworkAlignment/:ProjectID"
          element={
            <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
          }
        />
        {/* artworkAlignment */}

        {/* mapping */}
        <Route path="/mapping" element={<ProjectCreation key="mapping" />} />
        <Route
          path="/myProjects/mapping/:ProjectID"
          element={<ProjectCreation key={`mapping-${params.ProjectID}`} />}
        />
        <Route
          path="/allProjects/mapping/:ProjectID"
          element={<ProjectCreation key={`mapping-${params.ProjectID}`} />}
        />
        {/* mapping */}
        {/* readinessPerPMP */}
        <Route
          path="/readinessPerPMP"
          element={<ProjectCreation key="readinessPerPMP" />}
        />
        <Route
          path="/myProjects/readinessPerPMP/:ProjectID"
          element={
            <ProjectCreation key={`readinessPerPMP-${params.ProjectID}`} />
          }
        />
        <Route
          path="/allProjects/readinessPerPMP/:ProjectID"
          element={
            <ProjectCreation key={`readinessPerPMP-${params.ProjectID}`} />
          }
        />
        {/* readinessPerPMP */}
        <Route path="/:page1/:page2/DDI/:TaskID/:ProjectID" element={<DDI />} />
        <Route path="/UBD/:ProjectID" element={<UBD />} />
        <Route path="/:pageType/DDI/:TaskID/:ProjectID" element={<DDI />} />
        <Route
          path="/:page1/:page2/DDI/:TaskID/:ProjectID"
          element={<UADI />}
        />
        <Route path="/:pageType/DDI/:TaskID/:ProjectID" element={<UADI />} />
        <Route path="/:page1/:page2/DDI/:TaskID/:ProjectID" element={<DDT />} />
        <Route path="/:pageType/DDI/:TaskID/:ProjectID" element={<DDT />} />

        {/* <Route path="/myTasks/DDI/:TaskID/:ProjectID" element={<DDI />} /> */}
        {/* <Route path="/allTasks/DDI/:TaskID/:ProjectID" element={<DDI />} /> */}
        <Route path="/myTasks/UADI/:TaskID/:ProjectID" element={<UADI />} />
        <Route path="/allTasks/UADI/:TaskID/:ProjectID" element={<UADI />} />
        <Route path="/myTasks/DDT/:TaskID/:ProjectID" element={<DDT />} />
        <Route path="/allTasks/DDT/:TaskID/:ProjectID" element={<DDT />} />
        <Route path="/myTasks/ARDT/:TaskID/:ProjectID" element={<ARDT />} />
        <Route path="/allTasks/ARDT/:TaskID/:ProjectID" element={<ARDT />} />
        <Route path="/myTasks/DPRA/:TaskID/:ProjectID" element={<DPRA />} />
        {/* <Route path="/myTasks/UBD/:TaskID/:ProjectID" element={<UBD />} /> */}
        <Route path="/allTasks/DPRA/:TaskID/:ProjectID" element={<DPRA />} />
        <Route path="/myTasks/APRA/:TaskID/:ProjectID" element={<APRA />} />
        <Route path="/allTasks/APRA/:TaskID/:ProjectID" element={<APRA />} />
        <Route path="/myTasks/URDT/:TaskID/:ProjectID" element={<URDT />} />
        <Route path="/allTasks/URDT/:TaskID/:ProjectID" element={<URDT />} />
        <Route path="/myTasks/UPRA/:TaskID/:ProjectID" element={<UPRA />} />
        <Route path="/allTasks/UPRA/:TaskID/:ProjectID" element={<UPRA />} />
        <Route path="/myTasks/CCD/:TaskID/:ProjectID" element={<CCD />} />
        <Route path="/allTasks/CCD/:TaskID/:ProjectID" element={<CCD />} />
        <Route path="/myTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
        <Route path="/allTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
        <Route path="/myTasks/CNIQ/:TaskID/:ProjectID" element={<CNIQ />} />
        <Route path="/allTasks/CNIQ/:TaskID/:ProjectID" element={<CNIQ />} />
        <Route path="/myTasks/DNIQ/:TaskID/:ProjectID" element={<DNIQ />} />
        <Route path="/allTasks/DNIQ/:TaskID/:ProjectID" element={<DNIQ />} />
        <Route path="/allTasks/CPPFA/:TaskID/:ProjectID" element={<CPPFA />} />
        <Route path="/myTasks/CPT/:TaskID/:ProjectID" element={<CPT />} />
        <Route path="/allTasks/CPT/:TaskID/:ProjectID" element={<CPT />} />
        <Route path="/myTasks/DNPF/:TaskID/:ProjectID" element={<DNPF />} />
        <Route path="/allTasks/DNPF/:TaskID/:ProjectID" element={<DNPF />} />
        <Route path="/myTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
        <Route path="/allTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
        <Route path="/DSBP/:ProjectID" element={<DsbpPage />} />
        <Route path="/DSBP/tab" element={<DsbpTabPage />} />
        {/* <Route path="/reports" element={<Reports />} /> */}
      </Route>
    </Routes>
  );
};

export default RoutesNav;
