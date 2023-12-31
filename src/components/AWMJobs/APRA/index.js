import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import AddNewDesign from "../DesignJobs/TaskHeader";
import { useProofScopeURL } from "../../ProofScope/ViewFiles";
import UploadDesignIntentProofscope from "../DesignJobs/UploadDesignIntentProofscope";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { useDispatch, useSelector } from "react-redux";
import { CheckReadOnlyAccess } from "../../../utils";

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Approve Production Ready Art" },
];
const headerName = "Approve Production Ready Art";

const APRA = () => {
  const [data, setData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const viewProofScopeFile = useProofScopeURL();
  const [designIntent, setDesignIntent] = useState(null);
  const [formattedValue, setformattedValue] = useState(0);
  const [mappedFiles, setMappedFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [azureFile, setAzureFile] = useState("");
  let { TaskID, ProjectID } = useParams();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;
  const roleName = "DI_";
  const version = "V1";
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
    }
  }, [TaskDetailsData]);

  const handleViewProofScopeClick = (event, fileUrl) => {
    event.preventDefault();
    viewProofScopeFile(
      `cloudflow://PP_FILE_STORE/aacdata/DI__Pampers__Artwork project 2_V1`
    );
  };

  const handleCancel = () => {
    return navigate(currentUrl === "myTasks" ? `/myTasks` : "/allTasks");
  };

  return (
    <PageLayout>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label="Approve Production Ready Art"
        checkReadWriteAccess={checkReadWriteAccess}
      />
      {<AddNewDesign {...data} TaskDetailsData={TaskDetailsData}/>}
      {loading ? (
        <div className="align-item-center">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      ) : (
        designIntent && (
          <UploadDesignIntentProofscope
            {...designIntent}
            approve={true}
            setformattedValue={setformattedValue}
            setAzureFile={setAzureFile}
            setFileName={setFileName}
            setMappedFiles={setMappedFiles}
            item={data}
            roleName={roleName}
            ArtworkAgilityPage={TaskDetailsData?.ArtworkAgilityPage}
            version={version}
            checkReadWriteAccess={checkReadWriteAccess}
          />
        )
      )}{" "}
      <FooterButtons
        checkReadWriteAccess={checkReadWriteAccess}
        // onSubmit={onSubmit}
        handleCancel={handleCancel}
        // onSaveAsDraft={onSaveAsDraft}
      />
    </PageLayout>
  );
};
export default APRA;
