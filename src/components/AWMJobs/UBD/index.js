import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import AddNewDesign from "../DesignJobs/TaskHeader";
import AddNewDesignContent from "../DesignJobs/AddNewDesignContent";
import FooterButtons from "../DesignJobs/FooterButtons";
import {
  saveDefineProductionReadyArt,
  submitDefineProductionReadyArt,
} from "../../../apis/defineProductionReadyArt";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toLower } from "lodash";
import { AddNavigation, Loading } from "../../../utils";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { CheckReadOnlyAccess } from "../../../utils";
import { useLocation } from "react-router-dom";
import "../DesignJobs/index.scss";

const headerName = "Upload Graphic Adaption Brief Document";
const roleName = "PRA_";

function UBD() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [
    displayBriefDocumentDataGraphicAdaption,
    setDisplayBriefDocumentDataGraphicAdaption,
  ] = useState([]);
  const [
    displayBriefDocumentDataReferenceDocuments,
    setDisplayBriefDocumentDataReferenceDocuments,
  ] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [projectData, setProjectData] = useState([]);
  const [loader, setLoader] = useState(false);
  let { TaskID, ProjectID } = useParams();
  const [clickCountGraphicAdaption, setClickCountGraphicAdaption] = useState(1);
  const [clickCountReferenceDocuments, setClickCountReferenceDocuments] =
    useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  console.log("TaskDetailsData is", TaskDetailsData);
  const { allProjects } = useSelector((state) => state.myProject);
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;

  let breadcrumb = AddNavigation(headerName);

  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;

  let bu = userInformation?.bu;
  // if bu is home care show tire field else not
  let checkBU = toLower(bu) === toLower("Home Care") ? true : false;
  const checkReadWriteAccess = CheckReadOnlyAccess();

  const location = useLocation();
  const currentUrl = location.pathname;

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

  useEffect(() => {
    let projectData = allProjects.find(
      (project) => project.Project_ID === ProjectID
    );
    setProjectData(projectData);
  }, [projectData]);

  const handleCancel = () => {
    return navigate(`/${currentUrl?.split("/")[1]}`);
  };

  // const handleDelete = (index) => {
  //   console.log("lindex lindex is", index);
  //   const sub = designIntent.map((item, i) => {
  //     if (i === index) {
  //       item.Action = "delete";
  //     }
  //     return item;
  //   });
  //   setDesignIntent(sub);
  // };

  const handleDelete = (index) => {
    console.log("lindex lindex is", index);
    const sub = displayBriefDocumentDataGraphicAdaption.map((item, i) => {
      // if (i === index) {
      //   item.Action = "delete";
      // }
      // return item;
      console.log("nitem is", item);
      console.log("ni is", i);
    });
    // setDesignIntent(sub);
  };

  const displayBriefDocument = (val, taskName) => {
    if (taskName === "Graphic Adaption Brief*") {
      setDisplayBriefDocumentDataGraphicAdaption([
        ...displayBriefDocumentDataGraphicAdaption,
        val,
      ]);
      console.log("clickCountGraphicAdaption is", clickCountGraphicAdaption);
      setClickCountGraphicAdaption(clickCountGraphicAdaption + 1);
    }
    if (taskName === "Other Reference Documents & Assets") {
      setDisplayBriefDocumentDataReferenceDocuments([
        ...displayBriefDocumentDataReferenceDocuments,
        val,
      ]);
      setClickCountReferenceDocuments(clickCountReferenceDocuments + 1);
    }
    // setDisplayBriefDocumentDataReferenceDocuments([
    //   ...displayBriefDocumentDataReferenceDocuments,
    //   val,
    // ]);
    // setClickCount(clickCount + 1);

    //   setDisplayBriefDocumentDataGraphicAdaption([...displayBriefDocumentDataGraphicAdaption, val]);
    console.log("taskName taskName is", taskName);

    // displayBriefDocumentDataGraphicAdaption.push(val);
  };

  const addNewEmptyDesign = () => {
    console.log("designIntent is", designIntent);
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
    // add here design job name here check it out from API.
    data["Design_Job_Name"] = Design_Intent_Name;
    submittedDI.push(data);
    let values = false;
    const hasValues = designIntent.every((item) => {
      setEnableSubmit(true);
      if (item.Select) {
        values = item.Agency_Reference !== "" && item.Cluster !== "";
      } else {
        console.log("designIntent else", designIntent);
        let data = designIntent.filter(
          (item) =>
            item.Select && item.Agency_Reference !== "" && item.Cluster !== ""
        );
        console.log("value else", data);
        if (data.length !== 0) {
          values = true;
        } else {
          values = false;
        }
      }
      return values;
    });
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
      updatedData.Select = task.Select ? task.Select : false;
      updatedData.Tier = task.Tier;
      updatedData.Action = task.Action;

      updatedDataList.push({
        instruction: "APPEND",
        target: "PRAList",
        content: updatedData,
      });
      return console.log("updatedDataList", updatedDataList);
    });

    let formData = {
      caseTypeID: "PG-AAS-Work-DefineProductionReadyArt",
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        Project_Name: TaskDetailsData?.ArtworkAgilityTasks[0]?.Project_Name,
      },
      pageInstructions: updatedDataList,
    };
    console.log("formData formData is", formData);
    await submitDefineProductionReadyArt(formData, id, headers);
    setLoader(false);
    navigate(`/${currentUrl?.split("/")[1]}`);
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
        Additional_Info: task.Additional_Info,
        Select: task.Select ? task.Select : false,
        Tier: task.Tier,
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
      ProductionReadyArtList: updatedData,
    };
    console.log("full draft data --->", formData);
    await saveDefineProductionReadyArt(formData);
    setLoader(false);
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
        label="Upload Graphic Adaption Brief Document"
        checkReadWriteAccess={checkReadWriteAccess}
        taskName="Production Ready Art"
      />
      <div className="task-details">
        {<AddNewDesign {...data} checkReadWriteAccess={checkReadWriteAccess} />}
        {loading || loader || designIntent === null ? (
          <Loading />
        ) : (
          designIntent &&
          designIntent.length &&
          designIntent.map((item, index) => {
            if (item && item?.Action !== "delete") {
              return (
                <AddNewDesignContent
                  setAddNewDesign={addNewEmptyDesign}
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
                  displayBriefDocument={displayBriefDocument}
                  displayBriefDocumentDataGraphicAdaption={
                    displayBriefDocumentDataGraphicAdaption
                  }
                  displayBriefDocumentDataReferenceDocuments={
                    displayBriefDocumentDataReferenceDocuments
                  }
                  taskName="Graphic Adaption Brief*"
                  taskName2="Other Reference Documents & Assets"
                  clickCountGraphicAdaption={clickCountGraphicAdaption}
                  clickCountReferenceDocuments={clickCountReferenceDocuments}
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
        bottomFixed={true}
        checkReadWriteAccess={checkReadWriteAccess}
        formValid={enableSubmit}
      />
    </PageLayout>
  );
}

export default UBD;
