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
import { AddNavigation, Loading } from "../../../utils";
import { toLower } from "lodash";
import _ from "lodash";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { CheckReadOnlyAccess, selectedDesignItems } from "../../../utils";
import "../DesignJobs/index.scss";

const headerName = "Define Regional Design Template";
const roleName = "RDT";

function DDT() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [enableCheckBox, setEnableCheckBox] = useState(true);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
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

  // const checkReadWriteAccess = CheckReadOnlyAccess();
  const checkReadWriteAccess = true;

  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    let projectData = allProjects?.find(
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

  const handleCancel = () => {
    return navigate(
      `/${currentUrl?.split("/")[1]}/${currentUrl?.split("/")[2]}/${ProjectID}`
    );
  };

  const handleDelete = (index) => {
    const updatedDesignIntent = [...designIntent]; // Create a copy of the original array
    updatedDesignIntent[index].Action = "delete"; // Set the Action property to "delete" for the specified item
  
    // Check if all items have "Action" set to "delete"
    const allItemsDeleted = updatedDesignIntent.every((item) => item.Action === "delete");
  
    // If all items are marked for deletion, reset the selectAll flag
    if (allItemsDeleted) {
      setChecked(false);
      setEnableCheckBox(false);
    }
    // Update the state with the modified array
    setDesignIntent(updatedDesignIntent);
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
    const checkBoxUnselected = designIntent.find((item) => !item.Select);
    if (checkBoxUnselected) {
      setChecked(false);
    } 
    setEnableCheckBox(true);
    setDesignIntent(designIntent);
    setUpdated(!updated);
  };

  const addData = (fieldName, index, value, Design_Intent_Name) => {
    let data = designIntent[index];
    data[fieldName] = value;
    data["Design_Job_Name"] = Design_Intent_Name;
    submittedDI.push(data);
    const hasValues = selectedDesignItems(designIntent, setEnableSubmit);
    setEnableSubmit(!hasValues);
    setSubmittedDI(submittedDI);

    const allItemsSelected = designIntent.every((item) => item.Select);
    const checkBoxUnselected = designIntent.find((item) => !item.Select);
    
    if (allItemsSelected) {
      setChecked(true);
    } else if (checkBoxUnselected) {
      setChecked(false);
    } 
  };

  const onSelectAll = (checked) => {
    designIntent.map((task) => {
      if (task?.Event !== "submit") {
        task.Select = checked;
      }
      return task;
    });
    const hasValues = selectedDesignItems(designIntent, setEnableSubmit)
    setEnableSubmit(!hasValues);
    setDesignIntent(designIntent);
    setUpdated(!updated);
  };

  const onSubmit = async () => {
    setLoader(true);
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
      if (task?.Action === "delete") {
        task.Action = "delete";
      } else if (task?.Action !== "delete" && task?.Design_Job_ID) {
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
    setLoader(false);
    navigate(
      `/${currentUrl?.split("/")[1]}/${currentUrl?.split("/")[2]}/${ProjectID}`
    );
  };

  const onSaveAsDraft = async () => {
    setLoader(true);
    let updatedData = [];
    designIntent.filter((task) => {
      if (task?.isNew) {
        task.Design_Job_ID = "";
      }
      if (task?.Action === "delete") {
        task.Action = "delete";
      } else if (task?.Action !== "delete" && task?.Design_Job_ID) {
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
    setLoader(false);
  };

  let Brand = [];
  let Category = [];

  if (TaskDetailsData?.ArtworkAgilityPage) {
    Brand = TaskDetailsData.ArtworkAgilityPage.Artwork_Brand;
    Category = TaskDetailsData.ArtworkAgilityPage.Artwork_Category;
  }

  return (
    console.log("DT designIntent", designIntent),
    <PageLayout>
      <DesignHeader
        setAddNewDesign={addNewEmptyDesign}
        onSelectAll={onSelectAll}
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Define Regional Design Template"
        checkReadWriteAccess={checkReadWriteAccess}
        taskName="Regional Design Template"
        checked={checked}
        setChecked={setChecked}
        enableCheckBox={enableCheckBox}
      />
      <div className="task-details">
        {<AddNewDesign {...data} checkReadWriteAccess={checkReadWriteAccess} TaskDetailsData={TaskDetailsData}/>}
       
        {loading || loader || designIntent === null ? (
          <Loading />
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
                  taskName="Regional Design Template"
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
        bottomFixed={true}
        formValid={enableSubmit}
      />
    </PageLayout>
  );
}

export default DDT;
