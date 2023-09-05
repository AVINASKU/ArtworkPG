// export default RoutesNav;
import React from "react";
import loadable from "@loadable/component";
import {
  Route,
  Routes,
  createBrowserRouter,
  useParams,
} from "react-router-dom";
// import Home from "./home.js";
import Role from "./role";

import { Outlet } from "react-router-dom";

const AllProjects = loadable(
  () => import("./components/Projects/AllProjects/index"),
  {
    fallback: <h1>Loading...</h1>,
  }
);
const MyProjects = loadable(
  () => import("./components/Projects/MyProjects/index.js"),
  {
    fallback: <h1>Loading...</h1>,
  }
);
const ProjectCreation = loadable(() => import("./projectCreation.js"), {
  fallback: <h1>Loading...</h1>,
});
const Login = loadable(() => import("./login.js"), {
  fallback: <h1>Loading...</h1>,
});
const DDI = loadable(() => import("./components/AWMJobs/DDI/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const UADI = loadable(() => import("./components/AWMJobs/UADI"), {
  fallback: <h1>Loading...</h1>,
});
const AllTasksPage = loadable(() => import("./AllTaksPage.js"), {
  fallback: <h1>Loading...</h1>,
});
const MyTasksPage = loadable(() => import("./MyTaskPage.js"), {
  fallback: <h1>Loading...</h1>,
});
const DDT = loadable(() => import("./components/AWMJobs/DDT/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const UBD = loadable(() => import("./components/AWMJobs/UBD/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const DPRA = loadable(() => import("./components/AWMJobs/DPRA/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const CCD = loadable(() => import("./components/AWMJobs/CCD/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const DCD = loadable(() => import("./components/AWMJobs/DCD/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const DNIQ = loadable(() => import("./components/AWMJobs/DNIQ/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const CPT = loadable(() => import("./components/AWMJobs/CPT/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const DNPF = loadable(() => import("./components/AWMJobs/DNPF/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const ARDT = loadable(() => import("./components/AWMJobs/ARDT/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const APRA = loadable(() => import("./components/AWMJobs/APRA/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const UPRA = loadable(() => import("./components/AWMJobs/UPRA/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const CPPFA = loadable(() => import("./components/AWMJobs/CPPFA/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const DsbpPage = loadable(() => import("./DsbpPage"), {
  fallback: <h1>Loading...</h1>,
});
const DsbpTabPage = loadable(() => import("./DsbpTabPage"), {
  fallback: <h1>Loading...</h1>,
});
const DMDsbpTabPage = loadable(() => import("./DMDsbpTabPage"), {
  fallback: <h1>Loading...</h1>,
});
const URDT = loadable(() => import("./components/AWMJobs/URDT/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const CNIQ = loadable(() => import("./components/AWMJobs/CNIQ/index.js"), {
  fallback: <h1>Loading...</h1>,
});

const RoutesNav = () => {
  const params = useParams();
  return (
    <Routes>
      <Route exact path="/" element={<Outlet />} />
      <Route index element={<Login />} />
      {/* <Route index element={<Home />} /> */}
      <Route path="/myProjects" element={<MyProjects />}>
        <Route
          path="projectPlan/:ProjectID"
          element={<ProjectCreation key={`projectPlan-${params.ProjectID}`} />}
        />
        <Route
          path="projectSetup/:ProjectID"
          element={<ProjectCreation key={`projectSetup-${params.ProjectID}`} />}
        />
        <Route
          path="artworkAlignment/:ProjectID"
          element={
            <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
          }
        />
        <Route
          path="artworkAlignment/:ProjectID"
          element={
            <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
          }
        />
        <Route
          path="dependencyMapping/:ProjectID"
          element={
            <ProjectCreation key={`dependencyMapping-${params.ProjectID}`} />
          }
        />
        <Route
          path="readinessPerPMP/:ProjectID"
          element={
            <ProjectCreation key={`readinessPerPMP-${params.ProjectID}`} />
          }
        />
      </Route>
      <Route path="/roles" element={<Role />}></Route>

      <Route path="/allProjects" element={<AllProjects />}>
        <Route
          path="projectPlan/:ProjectID"
          element={<ProjectCreation key={`projectPlan-${params.ProjectID}`} />}
        />
        <Route
          path="projectSetup/:ProjectID"
          element={<ProjectCreation key={`projectSetup-${params.ProjectID}`} />}
        />
        <Route
          path="artworkAlignment/:ProjectID"
          element={
            <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
          }
        />

        <Route
          path="dependencyMapping/:ProjectID"
          element={
            <ProjectCreation key={`dependencyMapping-${params.ProjectID}`} />
          }
        />
        <Route
          path="readinessPerPMP/:ProjectID"
          element={
            <ProjectCreation key={`readinessPerPMP-${params.ProjectID}`} />
          }
        />
      </Route>

      <Route path="/myTasks" element={<MyTasksPage />}>
        <Route
          path="artworkAlignment/:ProjectID"
          element={
            <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
          }
        />
      </Route>

      <Route path="/AllTasks" element={<AllTasksPage />} />
      <Route path="/projectPlan" element={<ProjectCreation />} />

      {/* projectPlan */}
      {/* projectSetup */}
      <Route
        path="/projectSetup"
        element={<ProjectCreation key="projectSetup" />}
      />

      {/* projectSetup */}
      {/* artworkAlignment */}
      <Route
        path="/artworkAlignment"
        element={<ProjectCreation key="artworkAlignment" />}
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
        path="/allTasks/artworkAlignment/:ProjectID"
        element={
          <ProjectCreation key={`artworkAlignment-${params.ProjectID}`} />
        }
      />
      {/* artworkAlignment */}

      {/* mapping */}
      <Route
        path="/dependencyMapping"
        element={<ProjectCreation key="mapping" />}
      />

      {/* mapping */}
      {/* readinessPerPMP */}
      <Route
        path="/readinessPerPMP"
        element={<ProjectCreation key="readinessPerPMP" />}
      />

      {/* readinessPerPMP */}
      <Route path="/:page1/:page2/DDI/:TaskID/:ProjectID" element={<DDI />} />
      <Route path="/:pageType/DDI/:TaskID/:ProjectID" element={<DDI />} />
      <Route path="/:page1/:page2/UADI/:TaskID/:ProjectID" element={<UADI />} />
      <Route path="/:pageType/UADI/:TaskID/:ProjectID" element={<UADI />} />
      <Route path="/:page1/:page2/DDT/:TaskID/:ProjectID" element={<DDT />} />
      <Route path="/:pageType/DDT/:TaskID/:ProjectID" element={<DDT />} />
      <Route path="/:page1/:page2/UBD/:TaskID/:ProjectID" element={<UBD />} />
      <Route path="/:pageType/UBD/:TaskID/:ProjectID" element={<UBD />} />

      <Route path="/:page1/:page2/ARDT/:TaskID/:ProjectID" element={<ARDT />} />
      <Route path="/:pageType/ARDT/:TaskID/:ProjectID" element={<ARDT />} />

      <Route path="/:page1/:page2/DPRA/:TaskID/:ProjectID" element={<DPRA />} />
      <Route path="/:pageType/DPRA/:TaskID/:ProjectID" element={<DPRA />} />

      <Route path="/:page1/:page2/APRA/:TaskID/:ProjectID" element={<APRA />} />
      <Route path="/:pageType/APRA/:TaskID/:ProjectID" element={<APRA />} />

      <Route path="/:page1/:page2/URDT/:TaskID/:ProjectID" element={<URDT />} />
      <Route path="/:pageType/URDT/:TaskID/:ProjectID" element={<URDT />} />

      <Route path="/:page1/:page2/UPRA/:TaskID/:ProjectID" element={<UPRA />} />
      <Route path="/:pageType/UPRA/:TaskID/:ProjectID" element={<UPRA />} />

      <Route path="/:page1/:page2/CCD/:TaskID/:ProjectID" element={<CCD />} />
      <Route path="/:pageType/CCD/:TaskID/:ProjectID" element={<CCD />} />

      <Route path="/:page1/:page2/CNIQ/:TaskID/:ProjectID" element={<CNIQ />} />
      <Route path="/:pageType/CNIQ/:TaskID/:ProjectID" element={<CNIQ />} />

      <Route path="/:page1/:page2/DNIQ/:TaskID/:ProjectID" element={<DNIQ />} />
      <Route path="/:pageType/DNIQ/:TaskID/:ProjectID" element={<DNIQ />} />

      <Route path="/allTasks/CPPFA/:TaskID/:ProjectID" element={<CPPFA />} />

      <Route path="/:page1/:page2/CPT/:TaskID/:ProjectID" element={<CPT />} />
      <Route path="/:pageType/CPT/:TaskID/:ProjectID" element={<CPT />} />

      <Route path="/:page1/:page2/DNPF/:TaskID/:ProjectID" element={<DNPF />} />
      <Route path="/:pageType/DNPF/:TaskID/:ProjectID" element={<DNPF />} />

      <Route path="/:page1/:page2/DCD/:TaskID/:ProjectID" element={<DCD />} />
      <Route path="/:pageType/DCD/:TaskID/:ProjectID" element={<DCD />} />

      <Route path="/DSBP/:ProjectID" element={<DsbpPage />} />
      <Route path="/DSBP/tab/artworkAlignment" element={<DsbpTabPage />} />
      <Route path="/DSBP/tab/dependencyMapping" element={<DMDsbpTabPage />} />
    </Routes>
  );
};

export default RoutesNav;
