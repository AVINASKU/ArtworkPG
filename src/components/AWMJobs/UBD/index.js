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
import {
  deleteUploadBrefingDocs,
  saveAsDraftUploadBrefingDocs,
  submitUploadBrefingDocs,
} from "../../../store/actions/UploadBrefingDocsAction";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toLower } from "lodash";
import { AddNavigation, Loading } from "../../../utils";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { CheckReadOnlyAccess } from "../../../utils";
import { useLocation } from "react-router-dom";
import "../DesignJobs/index.scss";
import { uploadFileAzure } from "../../../store/actions/AzureFileActions";

const headerName = "Upload Graphic Adaption Brief Document";
const roleName = "PRA_";

function UBD() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([{}]);
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
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [loader, setLoader] = useState(false);
  let { TaskID, ProjectID } = useParams();
  const [clickCountGraphicAdaption, setClickCountGraphicAdaption] = useState(1);
  const [clickCountReferenceDocuments, setClickCountReferenceDocuments] =
    useState(1);

  const [formattedValue, setformattedValue] = useState(0);
  const [azureFile, setAzureFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [version, setVersion] = useState("V0");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { TaskDetailsData, loading } = useSelector(
  //   (state) => state.TaskDetailsReducer
  // );
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
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

  // const TaskID = "UBD_Task-97", ProjectID = "A-2830"
  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    if (TaskDetailsData) {
      setDesignIntent(TaskDetailsData?.ArtworkAgilityTasks || []);
      setData(TaskDetailsData?.ArtworkAgilityTasks[0] || {});
    }
    const data = TaskDetailsData?.ArtworkAgilityTasks[0] || {};
    if (data) {
      data.Version !== "" && data.Version && setVersion(data.Version);
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

    // displayBriefDocumentDataGraphicAdaption.push(val);
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

  const [selectDialog, setSelectDialog] = useState(false);

  const onSubmit = async () => {
    setLoader(true);
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
      const updatedData = [
        {
            instruction: "APPEND",
            target: "GABriefList",
            content: {
                GroupName: "GA Brief Adaptation 1",
                Sequence: "1",
                Action: "",
                Filename: "Upload GA Brief Document V 80",
                Size: "5",
                Version: "v1"
            }
        },
        {
            instruction: "APPEND",
            target: "OtherReferenceDoc",
            content: {
                Sequence: "1",
                Action: "",
                Filename: "Upload GA Brief Document V 90",
                Size: "5",
                Version: "v2"
            }
        }
      ];


    let formData = {
      caseTypeID: "PG-AAS-Work-UploadBriefingDocuments",
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        Project_Name: TaskDetailsData?.ArtworkAgilityTasks[0]?.Project_Name,
      },
      pageInstructions: updatedData,
    };
    await submitUploadBrefingDocs(formData, id, headers);
    setLoader(false);
    // navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const onSaveAsDraft = async () => {
    setLoader(true);
    const fileSize = Math.round(formattedValue / 1000000);
    const formData = {
      AWM_Project_ID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      AWM_Task_ID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      GABriefList: [
        {
          File_Name: fileName,
          Version:
            version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
          Size: fileSize === 0 ? "1" : `${fileSize}`,
          Sequence: "1",
          GroupName: "GA Brief Adaptation 1",
          Action: "add",
        },
      ],
      OtherReferenceDoc: [
        {
          File_Name: "Upload Reference Document V 200",
          Version: "V1",
          Size: "5",
          Sequence: "1",
          Action: "add",
        },
      ],
    };
    // await dispatch(uploadFileAzure(azureFile));
    await saveAsDraftUploadBrefingDocs(formData);
    setLoader(false);
    // navigate(`/${currentUrl?.split("/")[1]}`);
  };
  const handleDelete = () => {
    // For Ga Brief 
    const formData = {
      AWM_Project_ID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      AWM_Task_ID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      Sequence: "1",
      GroupName: "GA Brief Adaptation 1",
    };
    // For Other reference
    // const formData = {
    //   AWM_Project_ID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
    //   AWM_Task_ID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
    //   GroupName: "",
    //   Sequence: "1",
    // };
    deleteUploadBrefingDocs(formData);
    setSelectDialog(false);
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
        taskName="Graphic Adaption Brief*"
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
                  setformattedValue={setformattedValue}
                  setAzureFile={setAzureFile}
                  setFileName1={setFileName}
                  selectDialog={selectDialog}
                  setSelectDialog={setSelectDialog}
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
