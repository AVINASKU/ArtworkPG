import React, { useEffect, useState } from "react";
import moment from "moment";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import UploadDesignIntentProofscope from "../DesignJobs/UploadDesignIntentProofscope";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { submitUploadProductionReadyArt } from "../../../apis/uploadSubmitAPIs";

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
  const [date, setDate] = useState("");
  const [version, setVersion] = useState("V0");
  const location = useLocation();
  const currentUrl = location.pathname;

  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  let { TaskID, ProjectID } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;
  const roleName = "DI_";
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
        TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails[0]?.FileMetaDataList[0] || [];
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

  const filePath = "cloudflow://PP_FILE_STORE/aacdata/" + fileName;

  const onSaveAsDraft = async () => {
    const fileSize = Math.round(formattedValue / 1000000);
    const formData = {
      AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      Size: fileSize === 0 ? "1" : fileSize,
      Version: version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
      Filename: fileName,
    };
    console.log("azure file details", azureFile, fileName, filePath);
    await dispatch(UploadFileToServer(azureFile, filePath));
    await postSaveDesignIntent(formData);
  };

  const handleCancel = () => {
    return navigate(
      `/${currentUrl?.split("/")[1]}/${currentUrl?.split("/")[2]}/${ProjectID}`
    );
  };

  const onSubmit = async () => {
    const fileSize = Math.round(formattedValue / 1000000);
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    console.log("azureFile", azureFile);
    const formData = {
      caseTypeID: "PG-AAS-Work-UploadProductionReadyArt",
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID
      },
      pageInstructions: [{
        instruction: "APPEND",
        target: "PRAUploadList",
        content: {
          Action: "add",
          Filename: fileName,
          Size: fileSize === 0 ? "1" : fileSize,
          Version: version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
        }
      }],
    };
    await dispatch(UploadFileToServer(azureFile, filePath));
    await submitUploadProductionReadyArt(formData, id, headers);
    navigate(
      `/${currentUrl?.split("/")[1]}/${currentUrl?.split("/")[2]}/${ProjectID}`
    );
  };

  return (
    <PageLayout>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label="Upload Production Ready Art"
        checkReadWriteAccess={checkReadWriteAccess}
        taskName="Production Ready Art"
        actionButtonsFlag={true}
      />
      <div className="task-details">
        {<AddNewDesign {...data} TaskDetailsData={TaskDetailsData}/>}
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
              checkReadWriteAccess={checkReadWriteAccess}
              date={date}
              fileName={fileName}
            />
          )
        )}{" "}
      </div>
      
      <FooterButtons
        onSubmit={onSubmit}
        handleCancel={handleCancel}
        onSaveAsDraft={onSaveAsDraft}
        checkReadWriteAccess={checkReadWriteAccess}
        bottomFixed={true}
      />
    </PageLayout>
  );
};
export default UPRA;
