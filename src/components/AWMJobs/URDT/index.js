import React, { useEffect, useState } from "react";
import moment from "moment";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import AddNewDesign from "../DesignJobs/TaskHeader";
import ApproveDesignIntentContent from "../DesignJobs/ApproveDesignIntentContent";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { submitUploadRegionalDesignIntent } from "../../../apis/uploadSubmitAPIs";
import { postSaveDesignIntent } from "../../../apis/uploadSaveAsDraft";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckReadOnlyAccess, Loading } from "../../../utils";
import UploadDesignIntentProofscope from "../DesignJobs/UploadDesignIntentProofscope";
import { uploadProofscopeFileAzure } from "../../../store/actions/AzureFileProofscopeAction";
import { uploadtoAzurefileShare } from "../../../apis/uploadAzureFileShareApi";
const breadcrumb = [
  { label: "My Tasks", url: "/tasks" },
  { label: "Upload Regional Design Template" },
];
const headerName = "Upload Regional Design Template";

const URDT = () => {
  const [data, setData] = useState(null);
  const [date, setDate] = useState("");
  const [version, setVersion] = useState("V0");
  const [designIntent, setDesignIntent] = useState(null);
  const [formattedValue, setformattedValue] = useState(0);
  const [mappedFiles, setMappedFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [azureFile, setAzureFile] = useState("");
  const [loader, setLoader] = useState(false);
  let { TaskID, ProjectID } = useParams();
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup?.selectedProject;
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;
  const roleName = "DI_";
  const location = useLocation();
  const currentUrl = location.pathname;
  // const checkReadWriteAccess = CheckReadOnlyAccess();
  const checkReadWriteAccess = true;

  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    if (TaskDetailsData) {
      setDesignIntent(
        TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails || []
      );
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
    return navigate(
      `/${currentUrl?.split("/")[1]}/${currentUrl?.split("/")[2]}/${ProjectID}`
    );
  };
  const BU = selectedProjectDetails?.BU;
  const projectName = selectedProjectDetails?.Project_Name;

  const onSaveAsDraft = async () => {
    setLoader(true);
    const fileSize = Math.round(formattedValue / 1000000);
    const formData = {
      AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      Size: fileSize === 0 ? "1" : fileSize,
      Version: version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
      Filename: fileName,
    };
    await postSaveDesignIntent(formData);

    await uploadtoAzurefileShare(azureFile, ProjectID + projectName, BU, "RDT");
    setLoader(false);
  };

  const onSubmit = async () => {
    setLoader(true);
    const fileSize = Math.round(formattedValue / 1000000);
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    console.log("azureFile", azureFile);
    const formData = {
      caseTypeID: "PG-AAS-Work-UploadRegionalDesignTemplate",
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      },
      pageInstructions: [
        {
          instruction: "APPEND",

          target: "UploadRDTList",

          content: {
            Action: "add",

            Filename: fileName,

            Size: fileSize === 0 ? "1" : fileSize,

            Version:
              version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
          },
        },
      ],
    };
    // console.log('formData', formData, "id", id);
    await submitUploadRegionalDesignIntent(formData, id, headers);
    await uploadtoAzurefileShare(azureFile, ProjectID + projectName, BU, "RDT");
    setLoader(false);
    navigate(
      `/${currentUrl?.split("/")[1]}/${currentUrl?.split("/")[2]}/${ProjectID}`
    );
  };
  return (
   <>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label="Upload Regional Design Template"
        checkReadWriteAccess={checkReadWriteAccess}
        taskName="Regional Design Intent"
        actionButtonsFlag={true}
      />
      <div className="task-details">
        {
          <AddNewDesign
            {...data}
            checkReadWriteAccess={checkReadWriteAccess}
            TaskDetailsData={TaskDetailsData}
          />
        }
        {loading || loader || designIntent === null ? (
          <Loading />
        ) : (
          designIntent && (
            <UploadDesignIntentProofscope
              {...designIntent}
              designIntent={designIntent}
              upload={true}
              setformattedValue={setformattedValue}
              setAzureFile={setAzureFile}
              setFileName={setFileName}
              setMappedFiles={setMappedFiles}
              item={data}
              roleName={roleName}
              ArtworkAgilityPage={TaskDetailsData?.ArtworkAgilityPage}
              version={version}
              date={date}
              checkReadWriteAccess={checkReadWriteAccess}
              fileName={fileName}
              buName={selectedProjectDetails?.BU}
              taskFolder="RDT"
              TaskID={TaskID}
              projectName={projectName}
              ProjectID={ProjectID}
            />
          )
        )}
      </div>

      <FooterButtons
        handleCancel={handleCancel}
        onSaveAsDraft={onSaveAsDraft}
        onSubmit={onSubmit}
        checkReadWriteAccess={checkReadWriteAccess}
        bottomFixed={true}
      />
   </>
  );
};
export default URDT;
