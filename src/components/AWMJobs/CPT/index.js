import React, { useEffect, useState } from "react";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay-ts";
import PageLayout from "../../PageLayout";
import TaskHeader from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import { saveDesignIntent } from "../../../apis/designIntentApi";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import "../DesignJobs/index.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CloneJobs from "../DesignJobs/CloneJobs";
import { uploadFileAzure } from "../../../store/actions/AzureFileActions";
import "./index.scss";
import CDHeader from "../DesignJobs/CDHeader";
import { submitConfirmPrintTrial } from "../../../apis/colorDevelopmentApi";
import { CheckReadOnlyAccess } from "../../../utils";
import IQCDFooterButtons from "../DesignJobs/IQCDFooterButtons";

const breadcrumb = [{ label: "Confirm Color Development & Print Trial" }];

const headerName = "Confirm Color Development & Print Trial";
const jobName = "CD_";

function CPT() {
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
  const [CD, setCD] = useState([]);
  const [formValid, setFormValid] = useState(true);
  const [cptFormValid, setCptFormValid] = useState(true);
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
      setCD(TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails || []);
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
    const handleCancel = () => {
      // return navigate(`/${currentUrl?.split("/")[1]}`);
      if (page2 && page2 === "projectPlan") {
        return navigate(
          `/${page1}/${page2}/${TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID}`
        );
      } else if (pageType) {
        return navigate(`/${pageType}`);
      }
    };
  };

  const addNewEmptyDesign = () => {
    const newDesignIntent = [
      ...CD,
      {
        Design_Job_ID: CD.length + 1,
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
    setCD(newDesignIntent);
    setUpdated(!updated);
  };

  const addData = (fieldName, index, value, Design_Intent_Name) => {
    let data = CD[index];
    data[fieldName] = value;
    submittedDI.push(data);
    setSubmittedDI(submittedDI);
    checkFormValidity();
  };

  useEffect(() => {
    checkFormValidity();
    checkCPTFormValidity();
  }, [data]);

  const checkCPTFormValidity = () => {
    console.log(CD);
    const validTasks = CD?.filter((task) => {
      return task?.Print_Trial_Needed && task?.CD_Approved;
    });
    console.log(validTasks.length);
    if (validTasks.length > 0) {
      setCptFormValid(true);
    } else {
      setCptFormValid(false);
    }
  };

  const checkFormValidity = () => {
    console.log(CD);
    const validTasks = CD?.filter((task) => {
      return (
        task?.Printer &&
        task?.Printing_Process &&
        task?.Substrate &&
        task?.CD_Approved
      );
    });
    console.log(validTasks.length);
    if (validTasks.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const onSelectAll = (checked) => {
    CD?.map((task) => {
      if (task?.Event !== "submit") {
        task.Select = checked;
      }
      return task;
    });
    setCD(CD);
    setUpdated(!updated);
  };

  // const onSubmit = async () => {
  //   let submitOnlySelectedData = CD?.filter((task) => task?.Select === true);
  //   submitOnlySelectedData.map((task) => {
  //     task.Event = "submit";
  //   });
  //   console.log("full submit data --->", submitOnlySelectedData);
  //   await dispatch(uploadFileAzure());
  // };

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
    // console.log(CD);

    // CD?.forEach((task) => {
    //   let taskDesignJobID = task?.Design_Job_ID;
    //   if (task?.isNew) {
    //     taskDesignJobID = "";
    //   }
    // })
    let formData = {
      caseTypeID: "PG-AAS-Work-ConfirmColorDevelopmentDone",
      content: {
        AWMTaskID: data.Task_ID,
        AWMProjectID: selectedProjectDetails.Project_ID,
        DesignJobID: CD[0].Design_Job_ID,
        Size: formattedValue,
        Version: version,
        Filename: fileName,
        Timestamp: Timestamp,
        CDApproved: CD[0].CD_Approved,
        PrintTrialDone: CD[0].Print_Trial_Done,
      },
    };
    console.log("full submit data --->", formData);
    let id = data.Task_Key;
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    await dispatch(uploadFileAzure(azureFile, ProjectID + projectName, BU, "Print Feasibility Documents"));
    await submitConfirmPrintTrial(formData, id, headers);
    setLoader(false);
    // navigate(`/MyTasks`);
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
    let submitOnlySelectedData = CD?.map((task) => {
      task.Action = "update";
      if (task?.Action !== "delete" && task?.Design_Job_ID) {
        task.Action = "update";
      } else if (task?.Action !== "delete" && task?.isNew === true)
        task.Action = "add";

      if (task?.isNew) {
        task.Design_Job_ID = "";
      }

      task.Event = "draft";
      task.AWM_Project_ID = "A-1000";
      return task;
    });
    let formData = {
      DesignIntentList: submitOnlySelectedData,
    };
    console.log("full draft data --->", submitOnlySelectedData);
    await dispatch(uploadFileAzure(azureFile, ProjectID + projectName, BU, "Print Feasibility Documents"));
    await saveDesignIntent(formData);
  };

  return (
    <LoadingOverlay active={loader || loading || CD === null} spinner text="">
      <PageLayout>
        <CDHeader
          setAddNewDesign={addNewEmptyDesign}
          onSelectAll={onSelectAll}
          breadcrumb={breadcrumb}
          headerName={headerName}
          label="Confirm Color Development & Print Trial"
          disabled={true}
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
          {<TaskHeader {...data} TaskDetailsData={TaskDetailsData} />}
          {data?.Task_Status === "Complete" && (
            <div className="task-completion">
              This task is already submitted
            </div>
          )}
          {CD &&
            CD.length > 0 &&
            CD.map((item, index) => {
              if (item && item?.Action !== "delete") {
                return (
                  <CloneJobs
                    key={item.Design_Job_ID}
                    {...data}
                    CD={CD}
                    data={data}
                    item={item}
                    index={index}
                    addData={addData}
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
          cptFormValid={cptFormValid}
          checkReadWriteAccess={checkReadWriteAccess}
          bottomFixed={true}
          data={data}
        />
      </PageLayout>
    </LoadingOverlay>
  );
}

export default CPT;
