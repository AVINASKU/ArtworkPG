import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import UploadDesignIntentProofscope from "../DesignJobs/UploadDesignIntentProofscope";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { submitUploadApproveDesignIntent } from "../../../apis/uploadSubmitAPIs";

import AddNewDesign from "../DesignJobs/TaskHeader";
import { UploadFileToServer } from "../../../store/actions/ProofScopeActions";
import { postSaveDesignIntent } from "../../../apis/uploadSaveAsDraft";
import { CheckReadOnlyAccess } from "../../../utils";

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Upload Production Ready Art" },
];
const headerName = "Upload Production Ready Art";

const UPRA = () => {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState(null);
  const [fileName, setFileName] = useState("");
  const [azureFile, setAzureFile] = useState("");
  const [formattedValue, setformattedValue] = useState(0);
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

    const checkReadWriteAccess = CheckReadOnlyAccess();

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
    console.log("azure file details", azureFile, fileName, filePath);
    await dispatch(UploadFileToServer(azureFile, filePath));
    await postSaveDesignIntent(formData);
  };

  const handleCancel = () => {
    return navigate(url[0] === "myTasks" ? `/myTasks` : "/allTasks");
  };

  const onSubmit = async () => {
    console.log("TaskDetailsData", TaskDetailsData);
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
    await dispatch(UploadFileToServer(azureFile, filePath));
    console.log("formData", formData, "id", id);
    await submitUploadApproveDesignIntent(formData, id, headers);
  };

  return (
    <PageLayout>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label="Upload Production Ready Art"
      />
      {<AddNewDesign {...data} />}
      {loading ? (
        <div className="align-item-center">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      ) : (
        designIntent && (
          <UploadDesignIntentProofscope
            {...designIntent}
            upload={true}
            setformattedValue={setformattedValue}
            setAzureFile={setAzureFile}
            setFileName={setFileName}
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
    </PageLayout>
  );
};
export default UPRA;
