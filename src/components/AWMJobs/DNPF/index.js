import React, { useEffect, useState } from "react";
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
import "./index.scss";
import CDHeader from "../DesignJobs/CDHeader";
import {
  saveColorDevelopment,
  submitColorDevelopment,
} from "../../../apis/colorDevelopmentApi";
import { CheckReadOnlyAccess } from "../../../utils";
import IQCDFooterButtons from "../DesignJobs/IQCDFooterButtons";
import { cloneDeep } from "lodash";

const breadcrumb = [{ label: "Define Color Development & Print Trial" }];

const headerName = "Define Color Development  & Print Trial";
const jobName = "CD_";

function DNPF() {
  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const [data, setData] = useState(null);
  const [CD, setCD] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);

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
    }
  }, [TaskDetailsData]);

  useEffect(() => {
    if (CD.length < 1) {
      addNewEmptyDesign();
    }
  }, [CD]);

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

  // useEffect(() => {
  //   setSubmittedDI(Math.random());
  // });

  const handleDelete = (index) => {
    const sub = CD?.map((item, i) => {
      if (i === index) {
        item.Action = "delete";
      }
      return item;
    });
    // console.log("index here", sub1);
    // const sub = subProject.splice(index,1);

    setCD(sub);
  };

  useEffect(() => {
    checkFormValidity(CD);
  }, [data]);

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
    setCD(newDesignIntent);
    setUpdated(!updated);
  };

  const addData = (fieldName, index, value, Design_Intent_Name) => {
    let CDdata = cloneDeep(CD);
    let data = CDdata[index];
    data[fieldName] = value;
    data["Design_Job_Name"] = Design_Intent_Name;
    setCD(CDdata);
    // submittedDI.push(data);
    setSubmittedDI(Math.random());
    checkFormValidity(CDdata);
  };

  useEffect(() => {
    let count = 0;
    CD?.forEach((obj) => {
      if (obj.Select) {
        count++;
      }
    });
    if (CD.length === count) {
      setSelectAllCheckbox(true);
    } else {
      setSelectAllCheckbox(false);
    }
  }, [submittedDI]);

  const checkFormValidity = (CDdata) => {
    const validTasks = CDdata?.filter((task) => {
      return task?.Printing_Process && task?.Substrate && task?.Select;
    });
    const selectedTasks = CDdata?.filter((task) => {
      return task?.Select;
    });

    // console.log(
    //   "Valid and selected: ",
    //   validTasks.length,
    //   selectedTasks.length
    // );
    if (
      validTasks?.length > 0 &&
      selectedTasks?.length > 0 &&
      validTasks?.length === selectedTasks?.length
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const onSelectAll = (checked) => {
    CD?.forEach((task) => {
      // if (task?.Event !== "submit") {
      task.Select = checked;
      // }
      // return task;
    });
    setCD(CD);
    setUpdated(!updated);
  };

  // const onSubmit = () => {
  //   let submitOnlySelectedData = CD?.filter((task) => task?.Select === true);
  //   // submitOnlySelectedData.map((task) => {
  //   //   task.Event = "submit";
  //   // });
  //   console.log("full submit data --->", submitOnlySelectedData);
  // };
  const onSubmit = async () => {
    setLoader(true);
    let pageInstructions = [];

    let submitOnlySelectedData = CD?.filter((task) => task?.Select === true);
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
      temp["target"] = "NewPrintFeasibilityList";
      temp["content"] = {
        DesignJobName: task?.Design_Job_Name,
        DesignJobID: taskDesignJobID,
        PrintingProcess: task?.Printing_Process,
        Substrate: task?.Substrate,
        Select: task?.Select?.toString(),
        PrintTrialNeeded: task?.Print_Trial_Needed?.toString(),
        AdditionalInfo: task?.Additional_Info,
        Action: taskAction,
        Printer: task?.Printer,
      };
      pageInstructions.push(temp);
    });
    let formData = {
      caseTypeID: "PG-AAS-Work-DefineNewPrintFeasibilityScope",
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
    console.log("Submit Data for CD", formData, id, headers);
    await submitColorDevelopment(formData, id, headers);
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
    setLoader(true);
    let counter = 0;
    let submitOnlySelectedData = CD?.map((task) => {
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

      task.Design_Job_Name = task?.Design_Job_Name;

      return task;
    });

    let formData = {
      AWM_Project_ID: selectedProjectDetails.Project_ID,
      AWM_Task_ID: data.Task_ID,
      Project_Name: selectedProjectDetails.Project_Name,
      BU: selectedProjectDetails.BU,
      Region: selectedProjectDetails.Project_region,
      NewPrintFeasibilityList: submitOnlySelectedData,
    };
    console.log("full draft data --->", formData);
    await saveColorDevelopment(formData);
    dispatch(getTaskDetails(TaskID, ProjectID));
    setLoader(false);
    // navigate(`/MyTasks`);
  };

  return (
    <LoadingOverlay active={loader || loading || CD === null} spinner text="">
    
        <CDHeader
          setAddNewDesign={addNewEmptyDesign}
          onSelectAll={onSelectAll}
          selectAllCheckbox={selectAllCheckbox}
          breadcrumb={breadcrumb}
          headerName={headerName}
          label="Define Color Development & Print Trial"
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
                    // key={item.Design_Job_ID}
                    key={index}
                    {...data}
                    data={data}
                    item={item}
                    index={index}
                    addData={addData}
                    handleDelete={handleDelete}
                    jobName={jobName}
                    setFormValid={setFormValid}
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
          {/* <FooterButtons
          handleCancel={handleCancel}
          onSaveAsDraft={onSaveAsDraft}
          onSubmit={onSubmit}
          formValid={formValid}
        /> */}
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

export default DNPF;
