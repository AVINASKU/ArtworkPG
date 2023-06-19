import React from "react";
import { useNavigate } from "react-router-dom";
import ArtworkHeader from "./ArtworkHeader";
import SelectDsbpId from "./SelectDsbpId";
import ProjectNameHeader from "./ProjectNameHeader";
import AgilityList from "./AgilityList";
import { getDSBPDropdownData } from "../../store/actions/DSBPActions";
import { useDispatch, useSelector } from "react-redux";
import FooterButtons from "../AWMJobs/DesignJobs/FooterButtons";
import "./index.scss";
import { useEffect } from "react";
import { useState } from "react";

const DSBP = () => {
    const navigate = useNavigate();
  const [dropdownlist, setDropdownList] = useState(null);
  const DropDownData = useSelector((state) => state.DSBPDropdownReducer);

  const breadcrumb = [
    { label: "My Tasks", url: "/myTasks" },
    { label: "Approve Regional Design Template" },
  ];

  const dispatch = useDispatch();
  const headerName = "Artwork Alignment";
  const BU = "BABY CARE";
  const Region = "EUROPE";
  console.log("dropdown data", DropDownData);

  useEffect(() => {
    dispatch(getDSBPDropdownData(BU, Region));
  }, [dispatch]);

  useEffect(() => {
    setDropdownList(DropDownData.DSBPDropdownData);
  }, [DropDownData]);

  const addDSBPIntoProject = (InitiativeID, operation) => {
    console.log("dsbp id", InitiativeID, operation);
    // project id and initiative id i need to pass here
  };

  const handleCancel = () => {
    return navigate(`/myProjects`);
  };

  const onSubmit = () => {
    return navigate(`/myProjects`);
  };

  console.log("dropdownlist", dropdownlist);

  return (
    <div className="artwork-dsbp myProjectAnddAllProjectList">
      <ArtworkHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Artwork Alignment"
      />
      <ProjectNameHeader />
      <SelectDsbpId
        dropdownlist={dropdownlist}
        addDSBPIntoProject={addDSBPIntoProject}
      />
      <AgilityList />
      <FooterButtons
        handleCancel={handleCancel}
        hideSaveButton={true}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default DSBP;