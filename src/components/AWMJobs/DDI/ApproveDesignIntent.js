import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import AddNewDesign from "../DesignJobs/TaskHeader";
import { ProjectService } from "../../../service/PegaService";
import ApproveDesignIntentContent from "../DesignJobs/ApproveDesignIntentContent";

const breadcrumb = [
  { label: "My Tasks", url: "/tasks" },
  { label: "Upload Approved Design Intent" },
];
const headerName = "Upload Approved Design Intent";

const ApproveDesignIntent = () => {
  const [data, setData] = useState(null);
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const data1 = ProjectService.getApproveDI();
    setData(data1);
    setTaskData(data1.DesignIntentList);
  }, [data]);

  console.log("task data", taskData);

  return (
    <PageLayout>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label="Approve Upload Design Intent"
      />

      {<AddNewDesign {...data} />}
      <ApproveDesignIntentContent {...taskData} upload={true} approve={true}/>
      <FooterButtons />
    </PageLayout>
  );
};
export default ApproveDesignIntent;
