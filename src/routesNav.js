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
import AllProjectRoute from "./components/Projects/AllProjects/AllProjectRoute";
import ProtectedRoute from "./ProtectedRoute";
import {
  AllProjects,
  MyProjects,
  ProjectCreation,
  Login,
  DDI,
  UADI,
  AllTasksPage,
  MyTasksPage,
  DDT,
  UBD,
  DPRA,
  CCD,
  DCD,
  DNIQ,
  CPT,
  DNPF,
  ARDT,
  APRA,
  UPRA,
  CPPFA,
  DsbpPage,
  DsbpTabPage,
  DMDsbpTabPage,
  URDT,
  CNIQ,
} from "./Routes/index.js";
import PageLayout from "./components/PageLayout";

const RoutesNav = () => {
  const params = useParams();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route index  element={<PageLayout />} > */}
        <Route path="/roles" element={<Role />} />
        <Route path="/allProjects">
          <Route index element={<AllProjects />} />
          <Route
            path="projectPlan/:ProjectID"
            element={
              <ProjectCreation key={`projectPlan-${params.ProjectID}`} />
            }
          />
          <Route
            path="projectSetup/:ProjectID"
            element={
              <ProjectCreation key={`projectSetup-${params.ProjectID}`} />
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
        <Route path="/myProjects">
          <Route index element={<MyProjects />} />
          <Route
            path="projectPlan/:ProjectID"
            element={
              <ProjectCreation key={`projectPlan-${params.ProjectID}`} />
            }
          />
          <Route
            path="projectSetup/:ProjectID"
            element={
              <ProjectCreation key={`projectSetup-${params.ProjectID}`} />
            }
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

        {/* <ProtectedRoute auth={true}> */}
        <Route path="/allProjects">
          <Route index element={<AllProjects />} />
          <Route
            path="projectPlan/:ProjectID"
            element={
              <ProjectCreation key={`projectPlan-${params.ProjectID}`} />
            }
          />
          <Route
            path="projectSetup/:ProjectID"
            element={
              <ProjectCreation key={`projectSetup-${params.ProjectID}`} />
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
        {/* </ProtectedRoute> */}

        {/* <Route path='/allProjects' component={AllProjects} /> */}

        <Route path="/myTasks">
          <Route index element={<MyTasksPage />} />
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
        <Route
          path="/:page1/:page2/UADI/:TaskID/:ProjectID"
          element={<UADI />}
        />
        <Route path="/:pageType/UADI/:TaskID/:ProjectID" element={<UADI />} />
        <Route path="/:page1/:page2/DDT/:TaskID/:ProjectID" element={<DDT />} />
        <Route path="/:pageType/DDT/:TaskID/:ProjectID" element={<DDT />} />
        <Route path="/:page1/:page2/UBD/:TaskID/:ProjectID" element={<UBD />} />
        <Route path="/:pageType/UBD/:TaskID/:ProjectID" element={<UBD />} />

        <Route
          path="/:page1/:page2/ARDT/:TaskID/:ProjectID"
          element={<ARDT />}
        />
        <Route path="/:pageType/ARDT/:TaskID/:ProjectID" element={<ARDT />} />

        <Route
          path="/:page1/:page2/DPRA/:TaskID/:ProjectID"
          element={<DPRA />}
        />
        <Route path="/:pageType/DPRA/:TaskID/:ProjectID" element={<DPRA />} />

        <Route
          path="/:page1/:page2/APRA/:TaskID/:ProjectID"
          element={<APRA />}
        />
        <Route path="/:pageType/APRA/:TaskID/:ProjectID" element={<APRA />} />

        <Route
          path="/:page1/:page2/URDT/:TaskID/:ProjectID"
          element={<URDT />}
        />
        <Route path="/:pageType/URDT/:TaskID/:ProjectID" element={<URDT />} />

        <Route
          path="/:page1/:page2/UPRA/:TaskID/:ProjectID"
          element={<UPRA />}
        />
        <Route path="/:pageType/UPRA/:TaskID/:ProjectID" element={<UPRA />} />

        <Route path="/:page1/:page2/CCD/:TaskID/:ProjectID" element={<CCD />} />
        <Route path="/:pageType/CCD/:TaskID/:ProjectID" element={<CCD />} />

        <Route
          path="/:page1/:page2/CNIQ/:TaskID/:ProjectID"
          element={<CNIQ />}
        />
        <Route path="/:pageType/CNIQ/:TaskID/:ProjectID" element={<CNIQ />} />

        <Route
          path="/:page1/:page2/DNIQ/:TaskID/:ProjectID"
          element={<DNIQ />}
        />
        <Route path="/:pageType/DNIQ/:TaskID/:ProjectID" element={<DNIQ />} />

        <Route path="/allTasks/CPPFA/:TaskID/:ProjectID" element={<CPPFA />} />

        <Route path="/:page1/:page2/CPT/:TaskID/:ProjectID" element={<CPT />} />
        <Route path="/:pageType/CPT/:TaskID/:ProjectID" element={<CPT />} />

        <Route
          path="/:page1/:page2/DNPF/:TaskID/:ProjectID"
          element={<DNPF />}
        />
        <Route path="/:pageType/DNPF/:TaskID/:ProjectID" element={<DNPF />} />

        <Route path="/:page1/:page2/DCD/:TaskID/:ProjectID" element={<DCD />} />
        <Route path="/:pageType/DCD/:TaskID/:ProjectID" element={<DCD />} />

        <Route path="/DSBP/:ProjectID" element={<DsbpPage />} />
        <Route path="/DSBP/tab/artworkAlignment" element={<DsbpTabPage />} />
        <Route path="/DSBP/tab/dependencyMapping" element={<DMDsbpTabPage />} />
      {/* </Route> */}

      <Route
        path="*"
        element={
          <>
            <h1>Page Not Found</h1>
          </>
        }
      />
    </Routes>
  );
};

export default RoutesNav;
