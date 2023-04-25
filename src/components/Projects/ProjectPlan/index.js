import React, { useState, useEffect } from "react";
import "./index.scss";
import ProjectPlanList from "./ProjectPlanList";
import { ProjectService } from "../../../service/PegaService";

const MyProjects = (props) => {
  const [pegadata, setPegaData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const ProjectData = await ProjectService.getProjectData();
        if (ProjectData.length) {
          setPegaData(ProjectData);
        }
      } catch (err) {
        console.log("error", err);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
          {!loading && (
            <ProjectPlanList pegadata={pegadata} header="My Projects" />
          )}
        </div>
      </div>
    </>
  );
};
export default MyProjects;
