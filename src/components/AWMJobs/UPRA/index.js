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
    const [fileName, setFileName] = useState("");
  const [azureFile, setAzureFile] = useState("");

  useEffect(() => {
    const data1 = ProjectService.getApproveDI();
    setData(data1);
    setTaskData(data1.DesignIntentList);
  }, [data]);

  console.log("file name and azure file", fileName,azureFile);

  return (
    <PageLayout>
      <DesignHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        disabled={true}
        label="Upload Production Ready Art"
      />
      {/* {<CloneJobs {...data} />} */}
      <ApproveDesignIntentContent {...taskData} upload={true} setAzureFile={setAzureFile} setFileName={setFileName} />
      <FooterButtons />
    </PageLayout>
  );
};
export default UPRA;
