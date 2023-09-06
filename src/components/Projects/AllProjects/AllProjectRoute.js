import React from "react";
import { Route } from "react-router";

function AllProjectRoute() {
    // let { path } = useRouteMatch();
  return (
    <>
      {/* <Route path="/allProjects" element={<AllProjects />}>
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
      </Route> */}
    </>
  );
}

export default AllProjectRoute;

