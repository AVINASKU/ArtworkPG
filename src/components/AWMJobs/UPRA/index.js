import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import CloneJobs from "../DesignJobs/CloneJobs";
import { ProjectService } from "../../../service/PegaService";
import ApproveDesignIntentContent from "../DesignJobs/ApproveDesignIntentContent";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaskDetails,
  submitUploadApproveDesignIntent,
} from "../../../store/actions/taskDetailAction";
import AddNewDesign from "../DesignJobs/TaskHeader";
import { UploadFileToServer } from "../../../store/actions/ProofScopeActions";


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

  console.log("file name and azure file", fileName, azureFile);
  const filePath = "cloudflow://PP_FILE_STORE/aacdata/" + fileName;

    const onSubmit = async () => {
    const headers = {
      key: 'If-Match',
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    console.log("azureFile", azureFile);
    const formData = {
      caseTypeID: 'PG-AAS-Work-UploadApprovedDesignIntent',
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        Size : formattedValue,
        Version: version,
        Filename: fileName
      },
    };
    await dispatch(UploadFileToServer(azureFile, filePath));
    console.log('formData', formData, "id", id);
    // await submitUploadApproveDesignIntent(formData, id, headers);
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
      <FooterButtons onSubmit={onSubmit} />
    </PageLayout>
  );
};
export default UPRA;
