import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import TaskHeader from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import {
  saveInkQualification,
  submitInkQualification,
  submitConfirmInkQualification,
} from "../../../apis/inkQualificationApi";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import "../DesignJobs/index.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CloneJobs from "../DesignJobs/CloneJobs";
import "./index.scss";
import CDHeader from "../DesignJobs/CDHeader";
import { cloneDeep } from "lodash";
import IQHeader from "../DesignJobs/IQHeader";
const breadcrumb = [{ label: "Confirm Ink Qualification" }];

const headerName = "Confirm Ink Qualification";
const jobName = "IQ_";

function CNIQ() {
  const dispatch = useDispatch();
  const version = "V1";
  const { TaskDetailsData } = useSelector((state) => state.TaskDetailsReducer);
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const [data, setData] = useState(null);
  const [IQ, setIQ] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [formattedValue, setformattedValue] = useState(0);
  const [fileName, setFileName] = useState("");
  const [azureFile, setAzureFile] = useState("");
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
    // if (TaskDetailsData) {
    //   console.log("TaskDetailsData: ", TaskDetailsData);
    //   setIQ(TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails || []);
    //   setData(TaskDetailsData?.ArtworkAgilityTasks[0] || []);
    // }
    let TaskDetailData = {
      ArtworkAgilityTasks: [
        {
          Consumed_Buffer: "",
          DesignJobDetails: [
            {
              Print_Trial_Done: null,
              Tier: "",
              Cluster: "",
              Agency_Reference: "",
              Printer: ["ALL4LABELS ITALY NMS S R L~15144637"],
              Printing_Process: "",
              Design_Job_Name: "IQ1",
              Substrate: "",
              Additional_Info: "test1",
              Pantone: "Dropdown",
              Design_Job_ID: "IQ_DJob-213",
              CD_Approved: null,
              Select: true,
              Print_Trial_Needed: null,
            },
          ],
          IDDSampleApproved: null,
          Task_Key: "",
          Duration: "",
          Project_Name: "For Color",
          Start_Date: "",
          End_Date: "",
          Task_Name: "Confirm New Ink Qualification done",
          Task_ID: "CNIQ_Task-228",
          RiskLevel: "",
          IDDSampleLabTestApproved: null,
        },
      ],
      ArtworkAgilityPage: {
        Artwork_Category: [
          {
            code: "BFCND",
            Category_Name: "Baby & Feminine Care No Detail",
          },
          {
            code: "BCA",
            Category_Name: "Baby Care Adjacencies",
          },
        ],
        AWM_Project_ID: "A-1167",
        Artwork_Brand: [
          {
            code: "J29",
            Brand_Name: "Pampers",
          },
          {
            code: "BV0102",
            Brand_Name: "Charlie Banana",
          },
        ],
        Artwork_SMO: [
          {
            code: "DEU",
            SMO_Name: "Germany",
          },
          {
            code: "FRA",
            SMO_Name: "France",
          },
        ],
      },
    };
    console.log("TaskDetailData: ", TaskDetailData);
    setIQ(TaskDetailData?.ArtworkAgilityTasks[0]?.DesignJobDetails || []);
    setData(TaskDetailData?.ArtworkAgilityTasks[0] || []);
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
        Print_Trial_Done: null,
        Tier: "",
        Cluster: "",
        Agency_Reference: "",
        Printer: "",
        Printing_Process: "",
        Design_Job_Name: "",
        Substrate: "",
        Additional_Info: "",
        CD_Approved: null,
        Select: null,
        Print_Trial_Needed: null,
      },
    ];
    setIQ(newDesignIntent);
    setUpdated(!updated);
  };

  const addData = (fieldName, index, value, Design_Intent_Name) => {
    let dt = IQ[index];
    dt[fieldName] = value;
    submittedDI.push(dt);
    setSubmittedDI(submittedDI);
    console.log("data: ", data);
    checkFormValidity();
  };

  const addIddData = (fieldName, value, Design_Intent_Name) => {
    data[fieldName] = value;
    checkFormValidity();
  };

  const onSelectAll = (checked) => {
    // IQ?.map((task) => {
    //   task.IDDSampleApproved = checked;
    //   task.IDDSampleLabTestApproved = checked;
    //   return task;
    // });
    const dt = cloneDeep(data);
    dt.IDDSampleApproved = checked;
    dt.IDDSampleLabTestApproved = checked;
    // setIQ(IQ);
    // setUpdated(!updated);
    setData(dt);
  };

  useEffect(() => {
    checkFormValidity();
  }, [data]);

  const onSubmit = async () => {
    let IDDSampleApproved = "";
    let IDDSampleLabTestApproved = "";
    let Timestamp;
    // IQ.forEach((task) => {
    //   // Filename = task?.Filename;
    //   // Timestamp = task?.Timestamp;
    //   // Version = task?.Version;
    //   // Size = task?.Size;
    // });
    let formData = {
      caseTypeID: "PG-AAS-Work-ConfirmInkQualification",
      content: {
        AWMTaskID: data.Task_ID,
        AWMProjectID: selectedProjectDetails.Project_ID,
        IDDSampleApproved: data.IDDSampleApproved,
        IDDSampleLabTestApproved: data.IDDSampleLabTestApproved,
        Size: formattedValue,
        Version: version,
        Filename: fileName,
        Timestamp: Timestamp,
      },
    };
    console.log("full submit data --->", formData);
    let id = `PG-AAS-WORK ${selectedProjectDetails.Project_ID}`;
    const headers = { key: "If-Match", value: selectedProjectDetails?.Etag };

    await submitConfirmInkQualification(formData, id, headers);
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
    await saveInkQualification(formData);
  };

  const checkFormValidity = () => {
    // if (!idd) {
    //   const validTasks = IQ?.filter((task) => {
    //     return task?.Printer && task?.Pantone && task?.IDDSampleApproved;
    //   });
    //   if (validTasks.length > 0) {
    //     setFormValid(true);
    //   } else {
    //     setFormValid(false);
    //   }
    // } else {
    const validTasks = IQ?.filter((task) => {
      return task?.Printer && task?.Pantone && data?.IDDSampleApproved;
    });
    if (validTasks.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
    // }
  };

  return (
    <PageLayout>
      <IQHeader
        setAddNewDesign={addNewEmptyDesign}
        onSelectAll={onSelectAll}
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Confirm Ink Qualification"
        showPage="CNIQ"
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
                data={data}
                index={index}
                addData={addData}
                addIddData={addIddData}
                handleDelete={handleDelete}
                jobName={jobName}
                formValid={formValid}
                setFormValid={setFormValid}
                setformattedValue={setformattedValue}
                setAzureFile={setAzureFile}
                setFileName={setFileName}
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

export default CNIQ;
