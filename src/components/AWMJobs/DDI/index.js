import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import AddNewDesignContent from "../DesignJobs/AddNewDesignContent";
import FooterButtons from "../DesignJobs/FooterButtons";
import {
  getDesignIntent,
  saveDesignIntent,
} from "../../../apis/designIntentApi";
import "../DesignJobs/index.scss";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
  const [submitActive, setSubmitActive] = useState(true);
  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector((state) => state.TaskDetailsReducer);

  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    if (TaskDetailsData) {
      setDesignIntent(
        TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails || []
      );
      setData(TaskDetailsData?.ArtworkAgilityTasks[0] || []);
    }
  }, [TaskDetailsData]);

  // useEffect(() => {
  //   console.log("useEffect designIntent",designIntent);
  //   if(!submitActive){
  //     const checkboxCheck = designIntent.some((task) => task?.Select === true);
  //     setSubmitActive(checkboxCheck ? false : true);
  //   }
  // }, [submitActive])

  const handleCancel = () => {
    return navigate(`/myTasks`);
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

  const onSubmit = () => {
    let submitOnlySelectedData = designIntent.filter(
      (task) => task?.Select === true
    );
    submitOnlySelectedData.map((task) => {
      task.Action = "add";
      task.AWM_Project_ID = TaskID;
      const taskData = [];
      taskData.Agency_Reference = task.Agency_Reference;
      taskData.Cluster = task.Cluster;
      taskData.Additional_Info = task.Additional_Info;
      return taskData;
    });
    const pageInstructions = [];
    pageInstructions.instruction = "APPEND";
    pageInstructions.target = "DesignIntentList";
    pageInstructions.content = submitOnlySelectedData;

    let formData = {
      pageInstructions: pageInstructions,
    };

    console.log("full submit data --->", formData);
    // await saveDesignIntent(formData);
  };

  const onSaveAsDraft = async () => {
    let updatedData = [];
    console.log("design intent list full", designIntent);
    // let submitOnlySelectedData = designIntent.filter(
    //   (task) => task?.Event !== "submit"
    // );
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
            Additional_Info:task.Additional_Info,
            Select: task.Select ? task.Select : false,
            Action: task.Action
          });
      return console.log('updatedData', updatedData);
    });
   
    let formData = {
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
      />
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          width: "100%",
          height: "400px",
        }}
      >
        {<AddNewDesign {...data} />}

        {loading || designIntent === null ? 
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
          : designIntent &&
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
                  setSubmitActive={setSubmitActive}
                />
              );
            }
          })}
      </div>
      <FooterButtons
          handleCancel={handleCancel}
          onSaveAsDraft={onSaveAsDraft}
          onSubmit={onSubmit}
          formValid={submitActive}
        />
      </PageLayout>
    
  );
}

export default DDI;
