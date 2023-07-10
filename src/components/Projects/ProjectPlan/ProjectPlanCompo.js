import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import ProjectPlan from "./ProjectPlanList";
import { getProjectPlan } from "../../../apis/projectPlanApi";
import {
  updateProjectPlanAction,
  updateProjectPlanDesignAction,
} from "../../../store/actions/ProjectPlanActions";
import "primeicons/primeicons.css";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  activateProjectPlan,
  saveProjectPlanAction,
} from "../../../apis/projectPlanApi";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from "moment";
import {
  CheckReadOnlyAccess,
  Loading,
  hasProjectPlanAccess,
} from "../../../utils";
import { getMyProject } from "../../../store/actions/ProjectActions";

function ProjectPlanCompo(props) {
  const toast = useRef(null);
  const [projectPlanDesignData, setProjectPlanDesignData] = useState([]);
  const [updatedProjectPlanDesignData, setUpdatedProjectPlanDesignData] =
    useState([]);
  const [pegadata, setPegaData] = useState(null);
  const [activeSave, setActiveSave] = useState(true);
  // const [activeFlag, setActiveFlag] = useState(false);
  // Check if access is empty for the user's role and page
  const isAccessEmpty = CheckReadOnlyAccess();
  console.log(isAccessEmpty);
  const [activeFlag, setActiveFlag] = useState(!isAccessEmpty);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { ProjectID } = useParams();

  const { userInformation } = useSelector((state) => state.UserReducer);

  const { myProject, ...myProjectData } = useSelector(
    (state) => state.myProject
  );
  const { projectPlanDesign, projectPlan, loading } = useSelector(
    (state) => state.ProjectPlanReducer
  );
  const { selectedProject, mode } = useSelector(
    (state) => state.ProjectSetupReducer
  );

  useEffect(() => {
    if (updatedProjectPlanDesignData) {
      setProjectPlanDesignData(updatedProjectPlanDesignData || []);
    }
  }, [updatedProjectPlanDesignData]);

  useEffect(() => {
    if (!isAccessEmpty) {
      setActiveSave(true);
    }
  }, [isAccessEmpty]);

  useEffect(() => {
    setActiveFlag(false);
    let projectData = myProject.find(
      (project) => project.Project_ID === ProjectID
    );
    const firstTime = projectPlanDesign.some(
      (item) => item.Assignee !== "" || item.Role !== ""
    );
    if (
      (!firstTime && projectData?.Project_State === "Draft") ||
      projectData?.Project_State === "Active" ||
      !isAccessEmpty ||
      projectPlan.length === 0
    ) {
      setActiveFlag(true);
    }
  }, [myProject, projectPlan, isAccessEmpty, projectPlanDesign]);

  const getProjectPlanApi = async () => {
    setLoader(true);
    let restructuredData = [];
    const apiData =
      (mode === "edit" || mode === "design") && selectedProject.Project_ID
        ? await getProjectPlan(selectedProject.Project_ID)
        : [];
    apiData && dispatch(updateProjectPlanDesignAction(apiData));
    restructuredData = apiData?.length > 0 ? getRestructuredData(apiData) : [];
    dispatch(updateProjectPlanAction(restructuredData));
    setLoader(false);
  };

  useEffect(() => {
    getProjectPlanApi();
  }, [mode, props.tabNameForPP]);

  const getRestructuredData = (apiData) => {
    let mainTempArr = [];
    let tasks = [];
    if (props.tabNameForPP === "Input") {
      tasks = [
        {
          name: "Start Artwork Alignment",
          code: "SAA",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("SAA_")),
        },
      ];
    } else {
      tasks = [
        {
          name: "Define Design Intent",
          code: "DDI",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("DDI_")),
        },
        {
          name: "Upload Approved Design Intent",
          code: "UADI",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("UADI_")),
        },
        {
          name: "Define Design Template",
          code: "DDT",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("DDT_")),
        },
        {
          name: "Upload Regional Design Template",
          code: "URDT",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("URDT_")),
        },
        {
          name: "Approve Regional Design Template",
          code: "ARDT",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("ARDT_")),
        },
        {
          name: "Define Production Ready Art",
          code: "DPRA",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("DPRA_")),
        },
        {
          name: "Upload Production Ready Art",
          code: "UPRA",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("UPRA_")),
        },
        {
          name: "Approve Production Ready Art",
          code: "APRA",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("APRA_")),
        },

        {
          name: "Confirm Preliminary print feasibility Assessment",
          code: "CPPFA",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("CPPFA_")),
        },
        {
          name: "Define New Print Feasibility Scope",
          code: "DNPF",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("DNPF_")),
        },
        {
          name: "Confirm Color Development",
          code: "CCD",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("CCD_")),
        },
        {
          name: "Confirm Print Trial",
          code: "CPT",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("CPT_")),
        },
        {
          name: "Define New Ink Qualification scope",
          code: "DNIQ",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("DNIQ_")),
        },
        {
          name: "Confirm New Ink Qualification",
          code: "CNIQ",
          data: apiData.filter((data) => data.AWM_Task_ID.includes("CNIQ_")),
        },
      ];
    }

    tasks.forEach((task) => {
      if (task.data?.length > 0) {
        if (
          task.data[0]?.AWM_Task_ID.includes("DDI_") ||
          task.data[0]?.AWM_Task_ID.includes("DDT_") ||
          task.data[0]?.AWM_Task_ID.includes("DPRA_") ||
          task.data[0]?.AWM_Task_ID.includes("CPPFA_") ||
          task.data[0]?.AWM_Task_ID.includes("DNPF_") ||
          task.data[0]?.AWM_Task_ID.includes("DNIQ_") ||
          task.data[0]?.AWM_Task_ID.includes("SAA_")
        ) {
          let tempObj = {};
          tempObj["key"] = task.data[0]?.AWM_Task_ID;

          let dataObj = {};
          dataObj["Task"] = task.data[0]?.AWM_Task_ID.includes("DNPF_")
            ? "Define New Print Feasibility Scope"
            : task.data[0]?.Task_Name;
          dataObj["Dependency"] = task.data[0]?.Dependency;
          dataObj["Role"] = task.data[0]?.Role;
          dataObj["RoleOptions"] = task.data[0]?.RoleOptions;
          dataObj["Assignee"] = task.data[0]?.Assignee;
          dataObj["OwnerOptions"] = task.data[0]?.OwnerOptions;
          dataObj["State"] = task.data[0]?.State;
          dataObj["Duration"] = task.data[0]?.Duration;
          dataObj["StartDate"] = task.data[0]?.Start_Date;
          dataObj["EndDate"] = task.data[0]?.End_Date;
          dataObj["ConsumedBuffer"] = task.data[0]?.Consumed_Buffer;
          dataObj["HelpNeeded"] = task.data[0]?.Help_Needed;

          tempObj["data"] = dataObj;
          tempObj["children"] = [];
          tempObj["redirect"] = true;

          mainTempArr.push(tempObj);
        } else {
          let tempObj = {};
          let tempArr = [];
          let pStartDate = "";
          let pEndDate = "";
          let startDateArr = [];
          let endDateArr = [];

          tempObj["key"] = task.code;
          let dataObj = {};
          dataObj["Task"] = `${task.name} (X${task.data?.length})`;
          dataObj["Dependency"] = task.data[0]?.Dependency;
          dataObj["Role"] = "";
          dataObj["RoleOptions"] = "";
          dataObj["Assignee"] = "";
          dataObj["OwnerOptions"] = "";
          dataObj["State"] = "";
          dataObj["Duration"] = "";

          dataObj["ConsumedBuffer"] = "";
          dataObj["HelpNeeded"] = false;

          tempObj["data"] = dataObj;
          tempObj["redirect"] = true;

          //child array creation

          task.data.forEach((dt, index) => {
            dt.Start_Date && startDateArr?.push(dt.Start_Date);
            dt.End_Date && endDateArr?.push(dt.End_Date);
            pStartDate =
              startDateArr.length > 0 &&
              moment.min(
                startDateArr.map((date) =>
                  moment(date, "YYYYMMDDTHHmmss.SSS [GMT]")
                )
              );
            pEndDate =
              endDateArr.length > 0 &&
              moment.max(
                endDateArr.map((date) =>
                  moment(date, "YYYYMMDDTHHmmss.SSS [GMT]")
                )
              );
            let tempObj = {};
            tempObj["key"] = dt.AWM_Task_ID;

            let dataObj = {};
            dataObj["Task"] = `${index + 1}). ${dt.Task_Name}`;
            dataObj["Dependency"] = dt.Dependency;
            dataObj["Role"] = dt.Role;
            dataObj["RoleOptions"] = dt.RoleOptions;
            dataObj["Assignee"] = dt.Assignee;
            dataObj["OwnerOptions"] = dt.OwnerOptions;
            dataObj["State"] = dt.State;
            dataObj["Duration"] = dt.Duration;
            dataObj["StartDate"] = dt.Start_Date;
            dataObj["EndDate"] = dt.End_Date;
            dataObj["ConsumedBuffer"] = dt.Consumed_Buffer;
            dataObj["HelpNeeded"] = dt.Help_Needed;

            tempObj["data"] = dataObj;
            tempObj["children"] = [];

            tempArr.push(tempObj);
          });
          dataObj["StartDate"] = pStartDate;
          dataObj["EndDate"] = pEndDate;

          tempObj["children"] = tempArr;

          mainTempArr.push(tempObj);
        }
      }
    });

    return mainTempArr; //toBeReplacedWithapiData;
  };

  const onSave = async () => {
    let updatedData = [];
    projectPlanDesignData.filter(
      ({ AWM_Project_ID, AWM_Task_ID, Assignee, Role, Duration }) =>
        projectPlanDesign.some((object2) => {
          if (
            AWM_Task_ID === object2.AWM_Task_ID &&
            ((Role !== undefined && Role !== "" && Role !== object2.Role) ||
              (Assignee !== undefined &&
                Assignee !== "" &&
                Assignee !== object2.Assignee) ||
              (Duration !== undefined &&
                Duration !== "" &&
                Duration !== object2.Duration))
          ) {
            updatedData.push({
              AWM_Project_ID: AWM_Project_ID,
              AWM_Task_ID: AWM_Task_ID,
              Assignee: Assignee,
              Role: Role,
              Duration: Duration,
            });
            return console.log("updatedData", updatedData);
          }
        })
    );
    if (updatedData.length !== 0) {
      const formData = {
        ArtworkAgilityProjects: updatedData,
      };
      dispatch(updateProjectPlanDesignAction(updatedProjectPlanDesignData));
      await saveProjectPlanAction(formData, selectedProject.Project_ID);
      setActiveSave(true);
    }
  };

  const activate = async () => {
    setLoader(true);
    await activateProjectPlan(selectedProject.Project_ID);
    await dispatch(getMyProject(userInformation));
    getProjectPlanApi();
    setLoader(false);
    await toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Project activated successfully!",
      life: 5000,
    });
  };

  return (
    console.log("projectPlan", projectPlan),
    (
      <>
        <Toast ref={toast} />
        {loading || loader || myProjectData.loading || projectPlan === null ? (
          <Loading />
        ) : (
          <>
            <ProjectPlan
              {...props}
              projectPlan={projectPlan}
              selectedProject={selectedProject}
              projectPlanDesign={projectPlanDesign}
              setPegaData={setPegaData}
              pegadata={pegadata}
              setUpdatedProjectPlanDesignData={setUpdatedProjectPlanDesignData}
              setActiveSave={setActiveSave}
              getProjectPlanApi={getProjectPlanApi}
              isAccessEmpty={isAccessEmpty}
              view={props.view}
              setTabName={props.setTabName}
            />
            {props.view === "Tabular" && (
              <div className="form-buttons" style={{ background: "#FAFAFA" }}>
                <Button
                  className={
                    !isAccessEmpty ? "btn btn-disabled" : "button-layout"
                  }
                  variant="secondary"
                  onClick={() => navigate("/myProjects")}
                  disabled={!isAccessEmpty}
                >
                  Cancel
                </Button>

                <Button
                  className={activeSave ? "btn btn-disabled" : "button-layout"}
                  variant="secondary"
                  onClick={onSave}
                  disabled={activeSave}
                >
                  Save
                </Button>

                <Button
                  className="button-layout"
                  variant="primary"
                  onClick={activate}
                  disabled={activeFlag}
                >
                  Activate
                </Button>
              </div>
            )}
          </>
        )}
      </>
    )
  );
}

export default ProjectPlanCompo;
