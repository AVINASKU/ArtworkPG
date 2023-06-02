import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import AddNewDesign from "../DesignJobs/TaskHeader";
import { ProjectService } from "../../../service/PegaService";
import ApproveDesignIntentContent from "../DesignJobs/ApproveDesignIntentContent";
import { CheckReadOnlyAccess } from "../../../utils";
import { useLocation, useNavigate } from "react-router-dom";

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Approve Regional Design Template" },
];
const headerName = "Approve Regional Design Template";

const ARDT = () => {
  const [data, setData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUrl = location.pathname;
  const checkReadWriteAccess = CheckReadOnlyAccess();

  const handleCancel = () => {
    navigate(`/${currentUrl?.split("/")[1]}`);
  };

  useEffect(() => {
    const data1 = ProjectService.getApproveDI();
    setData(data1);
    setTaskData(data1.DesignIntentList);
  }, [data]);

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
