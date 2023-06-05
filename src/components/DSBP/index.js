import React from "react";
import ArtworkHeader from "./ArtworkHeader";
import SelectDsbpId from "./SelectDsbpId";
import ProjectNameHeader from "./ProjectNameHeader";
import AgilityList from "./AgilityList";
import "./index.scss";

const DSBP = () => {
  const breadcrumb = [
    { label: "My Tasks", url: "/myTasks" },
    { label: "Approve Regional Design Template" },
  ];
  const headerName = "Artwork Alignment";

  return (
    <div className="myProjectAnddAllProjectList">
      <ArtworkHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Artwork Alignment"
      />
      <ProjectNameHeader />
      {/* <SelectDsbpId /> */}
      <AgilityList />
    </div>
  );
};



export default DSBP;
