import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
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
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from "moment";

function ProjectPlanCompo(props) {
  const [projectPlanDesignData, setProjectPlanDesignData] = useState([]);
  const [updatedProjectPlanDesignData, setUpdatedProjectPlanDesignData] =
    useState([]);
  const [pegadata, setPegaData] = useState(null);
  const [activeSave, setActiveSave] = useState(true);
  const [activeFlag, setActiveFlag] = useState(false);
  const [loader, setLoader] = useState(false);
  const [updatedList, setUpdatedList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    setActiveFlag(false);
    if (projectPlanDesign) {
      setActiveFlag(projectPlanDesign[0]?.Project_State === "Available");
    }
  }, [projectPlanDesign]);

  const getProjectPlanApi = async () => {
    let restructuredData = [];
    setLoader(true);
    const apiData =
      mode === "design" && selectedProject.Project_ID
        ? await getProjectPlan(selectedProject.Project_ID)
        : [];
    setLoader(false);
    apiData && dispatch(updateProjectPlanDesignAction(apiData));
    restructuredData = apiData?.length > 0 ? getRestructuredData(apiData) : [];
    dispatch(updateProjectPlanAction(restructuredData));
  };

  useEffect(() => {
    getProjectPlanApi();
  }, [mode]);

  const getRestructuredData = (apiData) => {
    let mainTempArr = [];

    const tasks = [
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
        name: "Confirm Preliminary print feasibility Assessment done (& upload documents - optional)",
        code: "CPPFA",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CPPFA_")),
      },
      {
        name: "Define New Print Feasibility Scope",
        code: "DNPF",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("DNPF_")),
      },
      {
        name: "Color Confirm Development done (& upload documents - optional) (can be multiple)",
        code: "CCD",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CCD_")),
      },
      {
        name: "Confirm Print Trial (if applicable) done (& upload documents - optional) (can be multiple)",
        code: "CPT",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CPT_")),
      },
      {
        name: "Define New Link Ink Qualification scope",
        code: "DNIQ",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("DNIQ_")),
      },
      {
        name: "Confirm New Ink Qualification done (& upload documents - optional) (can be multiple)",
        code: "CNIQ",
        data: apiData.filter((data) => data.AWM_Task_ID.includes("CNIQ_")),
      },
    ];
    tasks.forEach((task) => {
      if (task.data?.length === 1) {
        let tempObj = {};
        tempObj["key"] = task.data[0].AWM_Task_ID;

        let dataObj = {};
        dataObj["Task"] = task.data[0].Task_Name;
        dataObj["Dependency"] = task.data[0].Dependency;
        dataObj["Role"] = task.data[0].Role;
        dataObj["RoleOptions"] = task.data[0].RoleOptions;
        dataObj["Assignee"] = task.data[0].Assignee;
        dataObj["OwnerOptions"] = task.data[0].OwnerOptions;
        dataObj["State"] = task.data[0].State;
        dataObj["Duration"] = task.data[0].Duration;
        dataObj["StartDate"] = task.data[0].Start_Date;
        dataObj["EndDate"] = task.data[0].End_Date;
        dataObj["ConsumedBuffer"] = task.data[0].Consumed_Buffer;
        dataObj["HelpNeeded"] = task.data[0].Help_Needed;

        tempObj["data"] = dataObj;
        tempObj["children"] = [];
        tempObj["redirect"] = true;

        mainTempArr.push(tempObj);
      } else if (task.data?.length > 1) {
        let tempObj = {};
        let tempArr = [];
        let pStartDate = "";
        let pEndDate = "";
        let startDateArr = [];
        let endDateArr = [];

        tempObj["key"] = task.code;
        let dataObj = {};
        dataObj["Task"] = `${task.name} (X${task.data?.length})`;
        dataObj["Dependency"] = task.data[0].Dependency;
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
    await activateProjectPlan(selectedProject.Project_ID);
    getProjectPlanApi();
  };

  return (
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
      />
      {/* <Accordion className="projectPlanAccordian" defaultActiveKey="2">
          <Accordion.Item eventKey="2">
            <Accordion.Header>Design</Accordion.Header>
            <Accordion.Body>
              <ProjectPlan
                {...props}
                projectPlan={projectPlan}
                selectedProject={selectedProject}
                projectPlanDesign={projectPlanDesign}
                setPegaData={setPegaData}
                pegadata={pegadata}
                setUpdatedProjectPlanDesignData={
                  setUpdatedProjectPlanDesignData
                }
                setActiveSave={setActiveSave}
                getProjectPlanApi={getProjectPlanApi}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Input</Accordion.Header>
            <Accordion.Body>Input</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>FA Assembly</Accordion.Header>
            <Accordion.Body>FA Assembly</Accordion.Body>
          </Accordion.Item>
        </Accordion> */}
      <div className="form-buttons">
        <Button
          className="button-layout"
          variant="secondary"
          onClick={() => navigate("/myProjects")}
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
    </>
  );
}

export default ProjectPlanCompo;
