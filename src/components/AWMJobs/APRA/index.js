import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import AddNewDesign from "../DesignJobs/TaskHeader";
import { ProjectService } from "../../../service/PegaService";
import ApproveDesignIntentContent from "../DesignJobs/ApproveDesignIntentContent";

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Approve Production Ready Art"},
];
const headerName = "Approve Production Ready Art";

const ADT = () => {
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
        label="Approve Production Ready Art"
      />

      {<AddNewDesign {...data} />}

      <ApproveDesignIntentContent {...taskData} approve={true} />

      <FooterButtons />
    </PageLayout>
  );
};
export default ADT;
