import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import AddNewDesignContent from "../DesignJobs/AddNewDesignContent";
import FooterButtons from "../DesignJobs/FooterButtons";
import {
  saveDefineRegionalDesignTemplate,
  submitDefineRegionalDesignTemplate,
} from "../../../apis/defineRegionalDesignTemplate";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddNavigation } from "../../../utils";
import { toLower } from "lodash";
import _ from "lodash";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { CheckReadOnlyAccess } from "../../../utils";
import "../DesignJobs/index.scss";

const headerName = "Define Regional Design Template";
const roleName = "DT_";

function DDT() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(true);
  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const { allProjects } = useSelector((state) => state.myProject);
  const location = useLocation();
  const currentUrl = location.pathname;
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;

  let breadcrumb = AddNavigation(headerName);

  let bu = userInformation?.bu;
  // if bu is baby care show tire field else not
  let checkBU = toLower(bu) === toLower("Home Care") ? true : false;

  const checkReadWriteAccess = CheckReadOnlyAccess();

  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    let projectData = allProjects.find(
      (project) => project.Project_ID === ProjectID
    );
    setProjectData(projectData);
  }, [projectData]);

  useEffect(() => {
    if (TaskDetailsData) {
      setDesignIntent(
        TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails || []
      );
      setData(TaskDetailsData?.ArtworkAgilityTasks[0] || []);
    }
  }, [TaskDetailsData]);

  useEffect(() => {
    checkFormValidity();
  }, [data]);

  const handleCancel = () => {
    return navigate(currentUrl === "myTasks" ? `/myTasks` : "/allTasks");
  };

  const checkFormValidity = () => {
    const validTasks = designIntent?.filter((task) => {
      return task?.Agency_Reference && task?.Cluster && task?.Select;
    });
    if (validTasks.length > 0) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  };

  const handleDelete = (index) => {
    const sub = designIntent.map((item, i) => {
      if (i === index) {
        item.Action = "delete";
      }
      return item;
    });
    setDesignIntent(sub);
  };

  const addNewEmptyDesign = () => {
    designIntent.push({
      Design_Job_ID: designIntent.length + 1,
      isNew: true,
      Agency_Reference: "",
      Cluster: "",
      Additional_Info: "",
      Select: false,
    });
    setDesignIntent(designIntent);
    setUpdated(!updated);
  };

  const addData = (fieldName, index, value, Design_Intent_Name) => {
    let data = designIntent[index];
    data[fieldName] = value;
    data["Design_Job_Name"] = Design_Intent_Name;
    submittedDI.push(data);
    setSubmittedDI(submittedDI);
    checkFormValidity();
  };

  const onSelectAll = (checked) => {
    designIntent.map((task) => {
      if (task?.Event !== "submit") {
        task.Select = checked;
      }
      return task;
    });
    setDesignIntent(designIntent);
    setUpdated(!updated);
  };

  const onSubmit = async () => {
    let updatedData = {};
    let updatedDataList = [];
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };

    let submitOnlySelectedData = designIntent.filter(
      (task) => task?.Select === true
    );
    submitOnlySelectedData.map((task) => {
      updatedData = {};
      if (task?.isNew) {
        task.Design_Job_ID = "";
      }
      task.Action = "update";
      if (task?.Action !== "delete" && task?.Design_Job_ID) {
        task.Action = "update";
      } else if (task?.Action !== "delete" && task?.isNew === true)
        task.Action = "add";

      updatedData.DesignJobName = task.Design_Job_Name;
      updatedData.DesignJobID = task.Design_Job_ID;
      updatedData.AgencyReference = task.Agency_Reference;
      updatedData.Cluster = task.Cluster;
      updatedData.AdditionalInfo = task.Additional_Info;
      updatedData.Tier = task.Tier;
      updatedData.Select = task.Select ? task.Select : false;
      updatedData.Action = task.Action;

      updatedDataList.push({
        instruction: "APPEND",
        target: "DesignTemplateList",
        content: updatedData,
      });
      return console.log("updatedDataList", updatedDataList);
    });

    let formData = {
      caseTypeID: "PG-AAS-Work-DefineRegionalDesignTemplate",
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      },
      pageInstructions: updatedDataList,
    };
    await submitDefineRegionalDesignTemplate(formData, id, headers);
    navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const onSaveAsDraft = async () => {
    let updatedData = [];
    designIntent.filter((task) => {
      if (task?.isNew) {
        task.Design_Job_ID = "";
      }
      task.Action = "update";
      if (task?.Action !== "delete" && task?.Design_Job_ID) {
        task.Action = "update";
      } else if (task?.Action !== "delete" && task?.isNew === true)
        task.Action = "add";

      updatedData.push({
        Design_Job_Name: task.Design_Job_Name,
        Design_Job_ID: task.Design_Job_ID,
        Agency_Reference: task.Agency_Reference,
        Cluster: task.Cluster,
        Tier: task.Tier,
        Additional_Info: task.Additional_Info,
        Select: task.Select ? task.Select : false,
        Action: task.Action,
      });
      return console.log("updatedData", updatedData);
    });

    let formData = {
      AWM_Project_ID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      AWM_Task_ID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      Project_Name: TaskDetailsData?.ArtworkAgilityTasks[0]?.Project_Name,
      BU: projectData?.BU,
      Region: projectData?.Project_region,
      DesignTemplateList: updatedData,
    };
    // console.log("full draft data --->", formData);
    await saveDefineRegionalDesignTemplate(formData);
  };

  let Brand = [];
  let Category = [];
  let checkTaskISComplete =
    TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Status === "Complete";

  if (TaskDetailsData?.ArtworkAgilityPage) {
    Brand = TaskDetailsData.ArtworkAgilityPage.Artwork_Brand;
    Category = TaskDetailsData.ArtworkAgilityPage.Artwork_Category;
  }

  return (
    <PageLayout>
      <DesignHeader
        setAddNewDesign={addNewEmptyDesign}
        onSelectAll={onSelectAll}
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Define Regional Design Template"
        checkReadWriteAccess={checkReadWriteAccess}
      />
      <div className="task-details">
        {<AddNewDesign {...data} checkReadWriteAccess={checkReadWriteAccess} />}
        {checkTaskISComplete && <div>This task is already submitted</div>}

        {loading || designIntent === null ? (
          <div className="align-item-center">
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
        ) : (
          designIntent &&
          designIntent.length &&
          designIntent.map((item, index) => {
            if (item && item?.Action !== "delete") {
              return (
                <AddNewDesignContent
                  key={item.Design_Job_ID}
                  {...data}
                  item={item}
                  index={index}
                  addData={addData}
                  handleDelete={handleDelete}
                  roleName={roleName}
                  checkBU={checkBU}
                  Brand={Brand}
                  Category={Category}
                  checkReadWriteAccess={checkReadWriteAccess}
                />
              );
            }
          })
        )}
      </div>
      <FooterButtons
        handleCancel={handleCancel}
        onSaveAsDraft={onSaveAsDraft}
        onSubmit={onSubmit}
        checkReadWriteAccess={checkReadWriteAccess}
        disableSaveAsDraft={checkTaskISComplete}
        bottomFixed={true}
        formValid={!enableSubmit || checkTaskISComplete}
      />
    </PageLayout>
  );
}

export default DDT;
