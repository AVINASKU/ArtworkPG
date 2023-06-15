import React from "react";
import ArtworkHeader from "./ArtworkHeader";
import SelectDsbpId from "./SelectDsbpId";
import ProjectNameHeader from "./ProjectNameHeader";
import AgilityList from "./AgilityList";
import "./index.scss";


  const customStyles = {
    '.p-checkbox': {
      display: 'none',
      // Add any other custom styles you want to override
    }
  };

const DSBP = () => {
  const breadcrumb = [
    { label: "My Tasks", url: "/myTasks" },
    { label: "Approve Regional Design Template" },
  ];
  const headerName = "Artwork Alignment";

  return (
    <div className="artwork-dsbp">
      <ArtworkHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Artwork Alignment"
      />
      <ProjectNameHeader />
      <SelectDsbpId />
      <AgilityList />
    </div>
  );
};



export default DSBP;
