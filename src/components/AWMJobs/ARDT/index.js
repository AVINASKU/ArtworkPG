import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import AddNewDesign from "../DesignJobs/TaskHeader";
import { ProjectService } from "../../../service/PegaService";
import ApproveDesignIntentContent from "../DesignJobs/ApproveDesignIntentContent";
import { CheckReadOnlyAccess } from "../../../utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { useProofScopeURL } from "../../ProofScope/ViewFiles";

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Approve Regional Design Template" },
];
const headerName = "Approve Regional Design Template";

const ARDT = () => {
  const [data, setData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const viewProofScopeFile = useProofScopeURL();
  const location = useLocation();
  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const currentUrl = location.pathname;
  const checkReadWriteAccess = CheckReadOnlyAccess();

  const handleCancel = () => {
    navigate(`/${currentUrl?.split("/")[1]}`);
  };

  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    if (TaskDetailsData) {
      setTaskData(
        TaskDetailsData?.ArtworkAgilityTasks[0]?.DesignJobDetails || []
      );
      setData(TaskDetailsData?.ArtworkAgilityTasks[0] || []);
    }
  }, [TaskDetailsData]);
  const handleViewProofScopeClick = (event, fileUrl) => {
    event.preventDefault();
    viewProofScopeFile(`DI__Pampers__Artwork project 2_V1`);
  };

  return (
    <PageLayout>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label="Approve Regional Design Template"
        checkReadWriteAccess={checkReadWriteAccess}
      />

      {<AddNewDesign {...data} />}

      <ApproveDesignIntentContent
        {...taskData}
        designIntent={taskData}
        approve={true}
        checkReadWriteAccess={checkReadWriteAccess}
      />

      <FooterButtons
        handleCancel={handleCancel}
        approve={true}
        checkReadWriteAccess={checkReadWriteAccess}
      />
    </PageLayout>
  );
};
export default ARDT;
