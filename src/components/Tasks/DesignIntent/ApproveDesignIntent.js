import React from "react";
import PageLayout from "../../PageLayout";
import DesignHeader from "./DesignHeader";
import FooterButtons from "./FooterButtons";

const breadcrumb = [
  { label: "My Tasks", url: "/tasks" },
  { label: "Upload Approved Design Intent" },
];
const headerName = "Upload Approved Design Intent";


const ApproveDesignIntent = () => {
  return (
    <PageLayout>
      <DesignHeader
      breadcrumb={breadcrumb}
      headerName={headerName}
      disabled={true}
        // setAddNewDesign={addNewEmptyDesign}
        // onSelectAll={onSelectAll}
      />
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          width: "100%",
          height: "400px",
        }}
      >

        <FooterButtons/>
      </div>
    </PageLayout>
  );};
export default ApproveDesignIntent;
