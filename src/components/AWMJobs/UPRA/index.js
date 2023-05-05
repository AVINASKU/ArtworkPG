import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import CloneJobs from "../DesignJobs/CloneJobs";
import { ProjectService } from "../../../service/PegaService";
import ApproveDesignIntentContent from "../DesignJobs/ApproveDesignIntentContent";

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Upload Production Ready Art" },
];
const headerName = "Upload Production Ready Art";

const UPRA = () => {
  const [data, setData] = useState(null);
  const [taskData, setTaskData] = useState(null);

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
      />
      {<CloneJobs {...data} />}
      <ApproveDesignIntentContent {...taskData} />
      <FooterButtons />
    </PageLayout>
  );
};
export default UPRA;
