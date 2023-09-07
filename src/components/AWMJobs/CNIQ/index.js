import React, { useEffect, useState } from "react";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay-ts";
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
import { CheckReadOnlyAccess } from "../../../utils";
import IQCDFooterButtons from "../DesignJobs/IQCDFooterButtons";
import { uploadFileAzure } from "../../../store/actions/AzureFileActions";

const breadcrumb = [{ label: "Confirm Ink Qualification" }];

const headerName = "Confirm Ink Qualification";
const jobName = "IQ_";

function CNIQ() {
  const dispatch = useDispatch();
  // const version = "V1";
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const BU = selectedProjectDetails?.BU;
  const projectName = selectedProjectDetails?.Project_Name;
  const [data, setData] = useState(null);
  const [IQ, setIQ] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [formattedValue, setformattedValue] = useState(0);
  const [fileName, setFileName] = useState("");
  const [azureFile, setAzureFile] = useState("");
  const [loader, setLoader] = useState(false);
  const [version, setVersion] = useState("V0");
  const [date, setDate] = useState("");
  let { page1, page2, pageType, TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  // const checkReadWriteAccess = CheckReadOnlyAccess();
  const checkReadWriteAccess = true;
  const AzureSubFolder = "Print Feasibility Documents";

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
      const data =
        TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails[0]
          ?.FileMetaDataList[0] || [];
      if (data) {
        data.Version !== "" && setVersion(data.Version);
        data.Timestamp !== "" &&
          setDate(
            moment(data.Timestamp, "YYYYMMDD[T]HHmmss.SSS [GMT]").format(
              "DD-MMMM-YYYY"
            )
          );
      }
    }
  }, [TaskDetailsData]);
  const handleCancel = () => {
    // return navigate(`/MyTasks`);
    if (page2 && page2 === "projectPlan") {
      navigate(
        `/${page1}/${page2}/${TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID}`
      );
    } else if (pageType) {
      navigate(`/${pageType}`);
    }
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
        Printer: [],
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
    setLoader(true);
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
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        IDDSampleApproved: data.IDDSampleApproved,
        IDDSampleLabTestApproved: data.IDDSampleLabTestApproved,
        Size: formattedValue,
        Version: version,
        Filename: fileName,
        Timestamp: Timestamp,
      },
    };
    console.log("full submit data --->", formData, data);
    let id = data.Task_Key;
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    await dispatch(
      uploadFileAzure(azureFile, ProjectID + " " + projectName, BU, AzureSubFolder)
    );
    await submitConfirmInkQualification(formData, id, headers);
    setLoader(false);
    // navigate("/MyTasks");.
    if (page2 && page2 === "projectPlan") {
      navigate(
        `/${page1}/${page2}/${TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID}`
      );
    } else if (pageType) {
      navigate(`/${pageType}`);
    }
  };

  const onSaveAsDraft = async () => {
    // let submitOnlySelectedData = designIntent.filter(
    //   (task) => task?.Event !== "submit"
    // );
    setLoader(true);
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

    await dispatch(
      uploadFileAzure(azureFile, ProjectID + " " + projectName, BU, AzureSubFolder)
    );
    await saveInkQualification(formData);
    setLoader(false);
    navigate("/MyTasks");
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
      return task?.Printer && data?.IDDSampleApproved;
    });
    if (validTasks.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
    // }
  };

  return (
    <LoadingOverlay active={loader || loading || IQ === null} spinner text="">
   
        <IQHeader
          setAddNewDesign={addNewEmptyDesign}
          onSelectAll={onSelectAll}
          breadcrumb={breadcrumb}
          headerName={headerName}
          label="Confirm Ink Qualification"
          showPage="CNIQ"
          checkReadWriteAccess={checkReadWriteAccess}
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
          {<TaskHeader {...data} TaskDetailsData={TaskDetailsData} />}
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
                    // key={item.Design_Job_ID}
                    key={index}
                    {...IQ}
                    IQ={IQ}
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
                    fileName={fileName}
                    version={version}
                    date={date}
                    checkReadWriteAccess={checkReadWriteAccess}
                    Artwork_Brand={
                      TaskDetailsData?.ArtworkAgilityPage?.Artwork_Brand
                    }
                    Artwork_Category={
                      TaskDetailsData?.ArtworkAgilityPage?.Artwork_Category
                    }
                    azureSubFolder={AzureSubFolder}
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
    
    </LoadingOverlay>
  );
}

export default CNIQ;
