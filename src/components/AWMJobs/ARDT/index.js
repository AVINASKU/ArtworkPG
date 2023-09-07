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

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Approve Regional Design Template" },
];
const headerName = "Approve Regional Design Template";

const ARDT = () => {
  const [data, setData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const location = useLocation();
  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const currentUrl = location.pathname;
  // const checkReadWriteAccess = CheckReadOnlyAccess();
  const checkReadWriteAccess = true;

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

  return (
    <>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label="Approve Regional Design Template"
        checkReadWriteAccess={checkReadWriteAccess}
      />

      {<AddNewDesign {...data} TaskDetailsData={TaskDetailsData} />}

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
    </>
  );
};
export default ARDT;
