import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import AddNewDesignContent from "../DesignJobs/AddNewDesignContent";
import FooterButtons from "../DesignJobs/FooterButtons";
import {
  saveDesignIntent,
  submitDesignIntent,
} from "../../../apis/designIntentApi";
import "../DesignJobs/index.scss";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckReadOnlyAccess } from "../../../utils";

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Define Design Intent" },
];

const headerName = "Define Design Intent";
const roleName = "DI_";

function DDI() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(true);
  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const myProjectList = useSelector((state) => state.myProject);
  const location = useLocation();
  const currentUrl = location.pathname;
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;

  const checkReadWriteAccess = CheckReadOnlyAccess();

  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    let projectData = myProjectList.myProject.find(
      (project) => project.Project_ID === ProjectID
    );
    setProjectData(projectData);
  }, [projectData, ProjectID, myProjectList.myProject]);

  useEffect(() => {
    if (TaskDetailsData) {
      setDesignIntent(
        TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails || []
      );
      setData(TaskDetailsData?.ArtworkAgilityTasks[0] || []);
    }
  }, [TaskDetailsData]);

  const handleCancel = () => {
    return navigate(currentUrl === "myTasks" ? `/myTasks` : "/allTasks");
  };

  const handleDelete = (index) => {
    console.log("index", index);
    const sub = designIntent.map((item, i) => {
      if (i === index) {
        item.Action = "delete";
      }
      return item;
    });
    // console.log("index here", sub1);
    // const sub = subProject.splice(index,1);
    console.log("sub", sub);
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
    let values = false;
    const hasValues = designIntent.every(
      (item) => {        
        setEnableSubmit(true);
       if(item.Select){
          values = item.Agency_Reference !== "" && item.Cluster !== "";
      } 
        // else{
        //   values = designIntent.some(item => {
        //     console.log("else select", item)
        //     if(item.Select){
        //       values = item.Agency_Reference !== "" && item.Cluster !== ""
        //     }
        //   });
        //   console.log("value else", values)
        // }
        return values
      }
    );
    setEnableSubmit(!hasValues);  
    setSubmittedDI(submittedDI);
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
      console.log("Design_Job_ID", task.Design_Job_ID);
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
      updatedData.Select = `${task.Select ? task.Select : false}`;
      updatedData.Action = task.Action;

      updatedDataList.push({
        instruction: "APPEND",
        target: "DesignIntentList",
        content: updatedData,
      });
      return console.log("updatedDataList", updatedDataList);
    });

    let formData = {
      caseTypeID: "PG-AAS-Work-DefineDesignIntent",
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      },
      pageInstructions: updatedDataList,
    };
    console.log("formData", formData);
    await submitDesignIntent(formData, id, headers);
    // navigate(`/AllTasks`);
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
        AWM_Project_ID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        Agency_Reference: task.Agency_Reference,
        Cluster: task.Cluster,
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
      DesignIntentList: updatedData,
    };
    console.log("full draft data --->", formData);
    await saveDesignIntent(formData);
  };

  let Brand = [];
  let Category = [];

  if (TaskDetailsData?.ArtworkAgilityPage) {
    Brand = TaskDetailsData.ArtworkAgilityPage.Artwork_Brand;
    Category = TaskDetailsData.ArtworkAgilityPage.Artwork_SMO;
  }

  return (
    <PageLayout>
      <DesignHeader
        setAddNewDesign={addNewEmptyDesign}
        onSelectAll={onSelectAll}
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Define Design Intent"
        checkReadWriteAccess={checkReadWriteAccess}
      />
      <div className="task-details">
        {<AddNewDesign {...data} checkReadWriteAccess={checkReadWriteAccess} />}

        {loading || designIntent === null ? (
          <div className="align-item-center">
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
        ) : (
          designIntent &&
          designIntent.length > 0 &&
          designIntent.map((item, index) => {
            if (item && item?.Action !== "delete") {
              return (
                <AddNewDesignContent
                  key={item.Design_Job_ID}
                  {...data}
                  item={item}
                  Brand={Brand}
                  Category={Category}
                  index={index}
                  addData={addData}
                  handleDelete={handleDelete}
                  roleName={roleName}
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
        formValid={enableSubmit}
        // formValid={submitActive}
        checkReadWriteAccess={checkReadWriteAccess}
        bottomFixed={true}
      />
    </PageLayout>
  );
}

export default DDI;
