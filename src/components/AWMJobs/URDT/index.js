import React, { useEffect, useState } from 'react';
import PageLayout from '../../PageLayout';
import DesignHeader from '../DesignJobs/DesignHeader';
import FooterButtons from '../DesignJobs/FooterButtons';
import AddNewDesign from '../DesignJobs/TaskHeader';
import ApproveDesignIntentContent from '../DesignJobs/ApproveDesignIntentContent';
import {
  getTaskDetails
} from '../../../store/actions/taskDetailAction';
import { submitUploadRegionalDesignIntent } from '../../../apis/uploadSubmitAPIs';
import { postSaveDesignIntent } from '../../../apis/uploadSaveAsDraft'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const breadcrumb = [
  { label: 'My Tasks', url: '/tasks' },
  { label: 'Upload Regional Design Template' },
];
const headerName = 'Upload Regional Design Template';

const URDT = () => {
  const [data, setData] = useState(null);
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

  const handleCancel = () => {
    navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const onSaveAsDraft = async () => {
    const formData = {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        Size : '1',
        Version: version,
        Filename: fileName
    };
    await postSaveDesignIntent(formData);
  };

  const onSubmit = async () => {
    const headers = {
      key: 'If-Match',
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    console.log("azureFile", azureFile);
    const formData = {
      caseTypeID: 'PG-AAS-Work-UploadRegionalDesignTemplate',
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        Size : '1',
        Version: version,
        Filename: fileName
      },
    };
   // console.log('formData', formData, "id", id);
   await submitUploadRegionalDesignIntent(formData, id, headers);
    navigate(`/${currentUrl?.split("/")[1]}`);
  };
  return (
    <PageLayout>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label={data?.Task_Name}
      />

      {<AddNewDesign {...data} />}
      {loading ? (
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
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
      )}
      <FooterButtons
        handleCancel={handleCancel}
        onSaveAsDraft={onSaveAsDraft}
        onSubmit={onSubmit}        
      />
    </PageLayout>
  );
};
export default URDT;