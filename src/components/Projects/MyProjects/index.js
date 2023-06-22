import React, { useState, useEffect } from "react";
import PageLayout from "../../PageLayout";
import "./index.scss";
import ProjectList from "./ProjectList";
import { ProjectService } from "../../../service/PegaService";
import { useSelector } from "react-redux";
import { hasAllAccess } from "../../../utils";

const MyProjects = (props) => {
  const [pegadata, setPegaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const { accessMatrix } = useSelector((state) => state?.accessMatrixReducer);
  // const accessDetails = getUnAuthoirzedAccess(
  //   userInformation.role,
  //   accessMatrix,
  //   window?.location?.pathname
  // );
  // // Check if access is empty for the user's role and page
  // const isAccessEmpty = accessDetails === null || accessDetails.length === 0;

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
    <PageLayout>
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
          {!hasAllAccess() && (
            <div className="unauthorized-user">
              You are not authorized to access this page.
            </div>
          )}
          {hasAllAccess() && !loading && (
            <ProjectList pegadata={pegadata} header="My Projects" />
          )}
        </div>
      </div>
    </PageLayout>
  );
};
export default MyProjects;
