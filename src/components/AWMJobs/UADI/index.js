import React, { useEffect, useState } from 'react';
import PageLayout from '../../PageLayout';
import DesignHeader from '../DesignJobs/DesignHeader';
import FooterButtons from '../DesignJobs/FooterButtons';
import AddNewDesign from '../DesignJobs/TaskHeader';
import ApproveDesignIntentContent from '../DesignJobs/ApproveDesignIntentContent';
import {
  getTaskDetails,
  submitUploadApproveDesignIntent,
} from '../../../store/actions/taskDetailAction';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const breadcrumb = [
  { label: 'My Tasks', url: '/tasks' },
  { label: 'Upload Approved Design Intent' },
];
const headerName = 'Upload Approved Design Intent';

const UADI = () => {
  const [data, setData] = useState(null);
  const [base64data, setBase64data] = useState(null);
  const [designIntent, setDesignIntent] = useState(null);
  let { TaskID, ProjectID } = useParams();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = `PG-AAS-WORK ${TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID}`;

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
    return navigate(`/myTasks`);
  };

  const onSaveAsDraft = () => {
    console.log('design intent onSaveAsDraft');
  };
  const customBase64Uploader = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      setBase64data(reader.result);
    };
  };

  const onSubmit = async () => {
    let mainDiv = document.getElementsByClassName('p-fileupload-buttonbar');
    mainDiv[0].getElementsByTagName('button')[0].click();
    console.log('base 64', base64data);

    const Size = document
      .getElementsByClassName('p-fileupload-row')[0]
      .getElementsByTagName('div')[0]
      .getElementsByTagName('span')[0].innerHTML;

    const Filename = document
      .getElementsByClassName('p-fileupload-row')[0]
      .getElementsByTagName('div')[0]
      .getElementsByTagName('div')[0].innerHTML;

    const headers = {
      key: 'If-Match',
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    const Timestamp = Date.now();

    const formData = {
      caseTypeID: 'PG-AAS-Work-UploadApprovedDesignIntent',
      content: {
        AWMTaskID: 'UADI_Task-244',
        AWMProjectID: 'A-827',
        Filename,
        Version: 'v 1.0',
        Size,
        Timestamp,
      },
    };
    console.log('formData', formData);
    await submitUploadApproveDesignIntent(formData, id, headers);
  };

  console.log('task data project-content', designIntent);

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
            customBase64Uploader={customBase64Uploader}
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
