import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import TaskHeader from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import {
  saveInkQualification,
  submitInkQualification,
} from "../../../apis/inkQualificationApi";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import "../DesignJobs/index.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CloneJobs from "../DesignJobs/CloneJobs";
import "./index.scss";
import CDHeader from "../DesignJobs/CDHeader";
import IQHeader from "../DesignJobs/IQHeader";
const breadcrumb = [{ label: "Define Ink Qualification" }];

const headerName = "Define Ink Qualification";
const jobName = "IQ_";

function DNIQ() {
  const dispatch = useDispatch();
  const { TaskDetailsData } = useSelector((state) => state.TaskDetailsReducer);
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const [data, setData] = useState(null);
  const [IQ, setIQ] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // const data1 = ProjectService.getDIData();
    let taskId;
    if (TaskID) {
      taskId = TaskID.split("_")[1];
    }
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    if (TaskDetailsData) {
      console.log("TaskDetailsData: ", TaskDetailsData);
      setIQ(TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails || []);
      setData(TaskDetailsData?.ArtworkAgilityTasks[0] || []);
    }
  }, [TaskDetailsData]);
  const handleCancel = () => {
    return navigate(`/myTasks`);
  };

  const handleDelete = (index) => {
    const sub = IQ?.map((item, i) => {
      if (i === index) {
        item.Action = "delete";
      }
      return item;
    });
    // console.log("index here", sub1);
    // const sub = subProject.splice(index,1);

    setIQ(sub);
  };

  const addNewEmptyDesign = () => {
    const newDesignIntent = [
      ...IQ,
      {
        Design_Job_ID: IQ.length + 1,
        isNew: true,
        Pantone: "",
        Printer: "",
        Design_Job_Name: "",
        Additional_Info: "",
        CD_Approved: null,
        Select: null,
      },
    ];
    setIQ(newDesignIntent);
    setUpdated(!updated);
  };

  const addData = (fieldName, index, value, Design_Intent_Name) => {
    let data = IQ[index];
    data[fieldName] = value;
    submittedDI.push(data);
    setSubmittedDI(submittedDI);
    checkFormValidity();
  };

  const onSelectAll = (checked) => {
    IQ?.map((task) => {
      if (task?.Event !== "submit") {
        task.Select = checked;
      }
      return task;
    });
    setIQ(IQ);
    setUpdated(!updated);
  };

  const onSubmit = async () => {
    let pageInstructions = [];

    let submitOnlySelectedData = IQ?.filter((task) => task?.Select === true);
    submitOnlySelectedData.forEach((task) => {
      let taskAction = "update";
      if (task?.Action !== "delete" && task?.Design_Job_ID) {
        taskAction = "update";
      }
      if (task?.Action !== "delete" && task?.isNew === true) {
        taskAction = "add";
      }
      let taskDesignJobID = task?.Design_Job_ID;
      if (task?.isNew) {
        taskDesignJobID = "";
      }
      let temp = {};
      temp["instruction"] = "Append";
      temp["target"] = "IQList";
      temp["content"] = {
        DesignJobName: "DCINF",
        DesignJobID: taskDesignJobID,
        AdditionalInfo: task?.Additional_Info,
        Pantone: task?.Pantone,
        Printer: task?.Printer,
        Select: task?.Select,
        Action: taskAction,
      };
      pageInstructions.push(temp);
    });
    let formData = {
      caseTypeID: "PG-AAS-Work-DefineInkQualification",
      content: {
        AWMTaskID: data.Task_ID,
        AWMProjectID: selectedProjectDetails.Project_ID,
      },
      pageInstructions: pageInstructions,
    };
    console.log("full submit data --->", formData);
    let id = `PG-AAS-WORK ${selectedProjectDetails.Project_ID}`;
    const headers = { key: "If-Match", value: selectedProjectDetails?.Etag };

    await submitInkQualification(formData, id, headers);
  };

  const onSaveAsDraft = async () => {
    // let submitOnlySelectedData = designIntent.filter(
    //   (task) => task?.Event !== "submit"
    // );
    let counter = 0;
    let submitOnlySelectedData = IQ?.map((task) => {
      counter++;
      task.Action = "update";
      if (task?.Action !== "delete" && task?.Design_Job_ID) {
        task.Action = "update";
      }
      if (task?.Action !== "delete" && task?.isNew === true) {
        task.Action = "add";
      }

      if (task?.isNew) {
        task.Design_Job_ID = "";
      }

      task.Design_Job_Name = `IQ${counter}`;

      return task;
    });

    let formData = {
      AWM_Project_ID: selectedProjectDetails.Project_ID,
      AWM_Task_ID: data.Task_ID,
      Project_Name: selectedProjectDetails.Project_Name,
      BU: selectedProjectDetails.BU,
      Region: selectedProjectDetails.Project_region,
      IQList: submitOnlySelectedData,
    };
    console.log("full draft data --->", formData);
    // await saveInkQualification(formData);
  };

  const checkFormValidity = () => {
    const validTasks = IQ?.filter((task) => {
      return task?.Printer && task?.Pantone && task?.Select;
    });
    if (validTasks.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  return (
    <PageLayout>
      <IQHeader
        setAddNewDesign={addNewEmptyDesign}
        onSelectAll={onSelectAll}
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Define Ink Qualification"
        showPage="DNIQ"
      />
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          width: "100%",
          height: "400px",
        }}
      >
        {<TaskHeader {...data} />}

        {IQ.map((item, index) => {
          if (item && item?.Action !== "delete") {
            return (
              <CloneJobs
                key={item.Design_Job_ID}
                {...data}
                item={item}
                index={index}
                addData={addData}
                handleDelete={handleDelete}
                jobName={jobName}
                setFormValid={setFormValid}
              />
            );
          }
        })}
        <FooterButtons
          handleCancel={handleCancel}
          onSaveAsDraft={onSaveAsDraft}
          onSubmit={onSubmit}
          formValid={formValid}
        />
      </div>
    </PageLayout>
  );
}

export default DNIQ;
