import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay-ts";
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
import { CheckReadOnlyAccess } from "../../../utils";
import IQCDFooterButtons from "../DesignJobs/IQCDFooterButtons";
import { cloneDeep } from "lodash";
const breadcrumb = [{ label: "Define Ink Qualification" }];

const headerName = "Define Ink Qualification";
const jobName = "IQ_";

function DNIQ() {
  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const [data, setData] = useState(null);
  const [IQ, setIQ] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);

  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  const checkReadWriteAccess = CheckReadOnlyAccess();

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
    return navigate(`/MyTasks`);
  };

  const handleDelete = (index) => {
    const sub = IQ?.map((item, i) => {
      if (i === index) {
        item.Action = "delete";
      }
      return item;
    });
    console.log("DNIQ Handle delete: ", IQ);
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
    let IQdata = cloneDeep(IQ);
    let data = IQdata[index];
    console.log(data);
    data[fieldName] = value;
    setIQ(IQdata);
    // submittedDI.push(data);
    setSubmittedDI(Math.random());
    checkFormValidity();
  };

  useEffect(() => {
    let count = 0;
    IQ?.forEach((obj) => {
      if (obj.Select) {
        count++;
      }
    });
    if (IQ.length === count) {
      setSelectAllCheckbox(true);
    } else {
      setSelectAllCheckbox(false);
    }
  }, [submittedDI]);

  const onSelectAll = (checked) => {
    IQ?.forEach((task) => {
      // if (task?.Event !== "submit") {
      task.Select = checked;
      // }
      // return task;
    });
    setIQ(IQ);
    setUpdated(!updated);
  };

  const onSubmit = async () => {
    setLoader(true);
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
      if (task?.Action === "delete") {
        taskAction = "delete";
      }
      let taskDesignJobID = task?.Design_Job_ID;
      if (task?.isNew) {
        taskDesignJobID = "";
      }
      let temp = {};
      temp["instruction"] = "APPEND";
      temp["target"] = "IQList";
      temp["content"] = {
        DesignJobName: "Confirm New Ink Qualification",
        DesignJobID: taskDesignJobID,
        AdditionalInfo: task?.Additional_Info,
        Pantone: task?.Pantone,
        Printer: task?.Printer,
        Select: task?.Select.toString(),
        Action: taskAction,
      };
      pageInstructions.push(temp);
    });
    let formData = {
      caseTypeID: "PG-AAS-Work-DefineInkQualification",
      content: {
        AWMTaskID: data.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      },
      pageInstructions: pageInstructions,
    };
    console.log("full submit data --->", formData);
    let id = data.Task_Key;
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    console.log("Submit Data", formData, id, headers);
    await submitInkQualification(formData, id, headers);
    setLoader(false);
    navigate("/MyTasks");
  };

  const onSaveAsDraft = async () => {
    setLoader(true);
    // let submitOnlySelectedData = designIntent.filter(
    //   (task) => task?.Event !== "submit"
    // );
    let counter = 0;
    let submitOnlySelectedData = IQ?.map((task) => {
      counter++;
      // task.Action = "update";
      if (task?.Action !== "delete" && task?.Design_Job_ID) {
        task.Action = "update";
      }
      if (task?.Action !== "delete" && task?.isNew === true) {
        task.Action = "add";
      }
      if (task?.Action === "delete") {
        task.Action = "delete";
      }
      if (task?.isNew) {
        task.Design_Job_ID = "";
      }

      task.Design_Job_Name = `Confirm New Ink Qualification ${counter}`;

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
    await saveInkQualification(formData);
    setLoader(false);
    navigate("/MyTasks");
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
    <LoadingOverlay active={loader || loading || IQ === null} spinner text="">
      <PageLayout>
        <IQHeader
          setAddNewDesign={addNewEmptyDesign}
          onSelectAll={onSelectAll}
          selectAllCheckbox={selectAllCheckbox}
          breadcrumb={breadcrumb}
          headerName={headerName}
          label="Define Ink Qualification"
          showPage="DNIQ"
          checkReadWriteAccess={checkReadWriteAccess}
          data={data}
        />
        <div
          className="task-details"
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            width: "100%",
            height: "400px",
            // display: "grid",
          }}
        >
          {<TaskHeader {...data} />}
          {data?.Task_Status === "Complete" && (
            <div className="task-completion">
              This task is already submitted
            </div>
          )}
          {IQ &&
            IQ.length > 0 &&
            IQ.map((item, index) => {
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
                    checkReadWriteAccess={checkReadWriteAccess}
                  />
                );
              }
            })}
        </div>
        <IQCDFooterButtons
          handleCancel={handleCancel}
          onSaveAsDraft={onSaveAsDraft}
          onSubmit={onSubmit}
          formValid={!formValid}
          checkReadWriteAccess={checkReadWriteAccess}
          bottomFixed={true}
          data={data}
        />
      </PageLayout>
    </LoadingOverlay>
  );
}

export default DNIQ;
