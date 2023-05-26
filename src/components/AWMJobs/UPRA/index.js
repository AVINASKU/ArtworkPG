import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import ApproveDesignIntentContent from "../DesignJobs/ApproveDesignIntentContent";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { submitUploadApproveDesignIntent } from "../../../apis/uploadSubmitAPIs";

import AddNewDesign from "../DesignJobs/TaskHeader";
import { UploadFileToServer } from "../../../store/actions/ProofScopeActions";
import { postSaveDesignIntent } from "../../../apis/uploadSaveAsDraft";

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Upload Production Ready Art" },
];
const headerName = "Upload Production Ready Art";

const UPRA = () => {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [azureFile, setAzureFile] = useState("");
  const [formattedValue, setformattedValue] = useState(0);
  const [mappedFiles, setMappedFiles] = useState([]);
    const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");

  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  let { TaskID, ProjectID } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;
  const roleName = "DI_";
  const version = "V1";

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

  const filePath = "cloudflow://PP_FILE_STORE/aacdata/" + fileName;

  const onSaveAsDraft = async () => {
    const formData = {
      AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      Size: "1",
      Version: version,
      Filename: fileName,
    };
    // await dispatch(UploadFileToServer(azureFile, filePath));
    await postSaveDesignIntent(formData);
  };

  const handleCancel = () => {
    return navigate(url[0] === "myTasks" ?`/myTasks`:"/allTasks");
  };

  const onSubmit = async () => {
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    console.log("azureFile", azureFile);
    const formData = {
      caseTypeID: "PG-AAS-Work-UploadProductionReadyArt",
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        Size: formattedValue,
        Version: version,
        Filename: fileName,
      },
    };
    // await dispatch(UploadFileToServer(azureFile, filePath));
    console.log("formData", formData, "id", id);
    await submitUploadApproveDesignIntent(formData, id, headers);
  };

  console.log("file name and azure file", fileName,azureFile);

  return (
    <PageLayout>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label="Upload Production Ready Art"
      />
<<<<<<< HEAD
      {/* {<CloneJobs {...data} />} */}
      <ApproveDesignIntentContent {...taskData} upload={true} setAzureFile={setAzureFile} setFileName={setFileName} />
      <FooterButtons />
=======
      {<AddNewDesign {...data} />}
      {loading ? (
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
      ) : (
        designIntent && (
          <ApproveDesignIntentContent
            {...designIntent}
            upload={true}
            setformattedValue={setformattedValue}
            setAzureFile={setAzureFile}
            setFileName={setFileName}
            setMappedFiles={setMappedFiles}
            item={data}
            roleName={roleName}
            ArtworkAgilityPage={TaskDetailsData?.ArtworkAgilityPage}
            version={version}
          />
        )
      )}{" "}
      <FooterButtons
        onSubmit={onSubmit}
        handleCancel={handleCancel}
        onSaveAsDraft={onSaveAsDraft}
      />
>>>>>>> 837c120a3adb0c09fe25e5fa28a74db1f2e2bc95
    </PageLayout>
  );
};
export default UPRA;
