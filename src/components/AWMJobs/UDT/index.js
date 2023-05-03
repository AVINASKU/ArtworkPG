import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import AddNewDesign from "../DesignJobs/TaskHeader";
import { ProjectService } from "../../../service/PegaService";
import ApproveDesignIntentContent from "../DesignJobs/ApproveDesignIntentContent";

const breadcrumb = [
  { label: "My Tasks", url: "/tasks" },
  { label: "Upload Regional Design Intent" },
];
const headerName = "Upload Regional Design Intent";

const UDT = () => {
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
      />

      {<AddNewDesign {...data} />}
      <ApproveDesignIntentContent {...taskData} />

      <FooterButtons />
    </PageLayout>
  );
};
export default UDT;
