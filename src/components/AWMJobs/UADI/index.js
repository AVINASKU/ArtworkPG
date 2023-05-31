import React, { useEffect, useState } from 'react';
import moment from "moment";
import PageLayout from '../../PageLayout';
import DesignHeader from '../DesignJobs/DesignHeader';
import FooterButtons from '../DesignJobs/FooterButtons';
import AddNewDesign from '../DesignJobs/TaskHeader';
import ApproveDesignIntentContent from '../DesignJobs/ApproveDesignIntentContent';
import {
  getTaskDetails,
 
} from '../../../store/actions/taskDetailAction';
import { postSaveDesignIntent } from '../../../apis/uploadSaveAsDraft';
import { submitUploadApproveDesignIntent } from '../../../apis/uploadSubmitAPIs';
import { uploadFileAzure } from "../../../store/actions/AzureFileActions";
import { useParams, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const breadcrumb = [
  { label: 'My Tasks', url: '/tasks' },
  { label: 'Upload Approved Design Intent' },
];
const headerName = 'Upload Approved Design Intent';

const UADI = () => {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState(null);
  const [formattedValue, setformattedValue] = useState(0);
  const [mappedFiles, setMappedFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [azureFile, setAzureFile] = useState("");
  const [version, setVersion] = useState("V0");
  const [date, setDate]= useState("");
  let { TaskID, ProjectID } = useParams();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;
  const roleName = "DI_";
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
      const data = TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails[0]?.FileMetaDataList[0] || [];
        if(data){
          data.Version !== "" && setVersion(data.Version);
          data.Timestamp !== "" && setDate(moment(data.Timestamp, "YYYYMMDD[T]HHmmss.SSS [GMT]").format("DD-MMMM-YYYY"));
        }
    }
    
  }, [TaskDetailsData]);


  const handleCancel = () => {
   return navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const onSaveAsDraft = async () => {
    const fileSize = Math.round(formattedValue/1000000);
    const formData = {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        Size : fileSize === 0 ? "1" : fileSize,
        Version: version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
        Filename: fileName
    };
    await dispatch(uploadFileAzure(azureFile));
    await postSaveDesignIntent(formData);
  };

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
        Size : '1',
        Version: version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
        Filename: fileName
      },
    };
    await dispatch(uploadFileAzure(azureFile));
    // console.log('formData', formData, "id", id);
   await submitUploadApproveDesignIntent(formData, id, headers);
    
    navigate(`/${currentUrl?.split("/")[1]}`);
  };
  return (
    <PageLayout>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label="Upload Approved Design Intent"
      />

      {<AddNewDesign {...data} />}
      {loading ? (
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
      ) : (
        designIntent && (
          <ApproveDesignIntentContent
            {...designIntent}
            designIntent={designIntent}
            upload={true}
            setformattedValue={setformattedValue}
            setAzureFile={setAzureFile}
            setFileName={setFileName}
            fileName={fileName}
            setMappedFiles={setMappedFiles}
            item={data}
            roleName={roleName}
            ArtworkAgilityPage={TaskDetailsData?.ArtworkAgilityPage}
            version={version}
            date={date}
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
export default UADI;
