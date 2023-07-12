import React from "react";

import searchMyProjects from "../../../assets/images/searchMyProjects.svg";
import filter from "../../../assets/images/filter.svg";
import BlueFilterIcon from "../../../assets/images/BlueFilterIcon.svg";
import { useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ExportSelectedRows } from "../../ExportCSV";
import { CheckReadOnlyAccess, changeDateFormat } from "../../../utils";

const ProjectListHeader = ({
  header,
  clearFilter,
  clearFilters,
  setVisible,
  // saveSettings,
  onSearchClick,
  // exportCSV,
  isFilterEnabled,
  isResetEnabled,
  handleDelegateClick,
  handleHelpNeededClick,
  handleHelpProvidedClick,
  actionFlag,
  // exportCSVTasks,
  selected,
  allData,
  headers,
  filterFLag,
  CustomizeViewFlag,
  ResetToDefaultFlag,
  isTreeTableFlag
}) => {
  let modifiedAllData = allData;
  if(isTreeTableFlag){
    modifiedAllData = allData?.map((obj) => obj.data);
  }
  const location = useLocation();
  // const [downloadCSV, setDownloadCSV] = useState(false);
  // const [showCSV, setShowCSV] = useState(true);
  const isReadOnly = false;
  const shouldShowResetButton =
    location.pathname.includes("/AllTasks") ||
    location.pathname.includes("/MyTasks");
  const handleDelegate = () => {
    handleDelegateClick();
  };
  const handleHelpNeeded = () => {
    handleHelpNeededClick();
  };
  const handleHelpProvided = () => {
    handleHelpProvidedClick();
  };
  // const handleClick = () => {
  //   setShowCSV(false);
  //   setDownloadCSV(true);
  // };

  // let splittedHeader = headers.map((ele) => ele.split("_").join(" "));

  // let newObj = allData.map((data) => {
  //   console.log("artwork brand", data, data.Artwork_Brand);
  //   let obj = {};
  //   obj["Brand"] = data.Artwork_Brand;
  //   obj["Category"] = data.Artwork_Category;
  //   obj["SMO"] = data.Artwork_SMO;
  //   obj["BU"] = data.BU;
  //   obj["Buffer To Work"] = data.Buffer_To_Work;
  //   obj["CICs"] = data.CICs;
  //   obj["Case_ID"] = data.Case_ID;
  //   obj["Cluster"] = data.Cluster;
  //   obj["Comments"] = data.Comments;
  //   obj["Design_Intent"] = data.Design_Intent;
  //   obj["Design_Template"] = data.Design_Template;
  //   obj["Estimated AW@Printer"] =
  //     data?.Estimated_AW_Printer &&
  //     data.Estimated_AW_Printer !== "" &&
  //     changeDateFormat(data.Estimated_AW_Printer);
  //   obj["Estimated AW Readiness"] =
  //     data?.Estimated_AW_Readiness &&
  //     data.Estimated_AW_Readiness !== "" &&
  //     changeDateFormat(data.Estimated_AW_Readiness);
  //   obj["Estimated No Of CICs"] = data.Estimated_No_Of_CICs;
  //   obj["Estimated No Of DI"] = data.Estimated_No_Of_DI;
  //   obj["Estimated No Of DT"] = data.Estimated_No_Of_DT;
  //   obj["Estimated No Of IQ"] = data.Estimated_No_Of_IQ;
  //   obj["Estimated No Of NPF"] = data.Estimated_No_Of_NPF;
  //   obj["Estimated No Of POAs"] = data.Estimated_No_Of_POAs;
  //   obj["Estimated No Of PRA"] = data.Estimated_No_Of_PRA;
  //   obj["Estimated SOP"] =
  //     data?.Estimated_SOP &&
  //     data.Estimated_SOP &&
  //     changeDateFormat(data.Estimated_SOP);
  //   obj["Estimated SOS"] =
  //     data?.Estimated_SOS &&
  //     data.Estimated_SOS &&
  //     changeDateFormat(data.Estimated_SOS);
  //   obj["Etag"] = data.Etag;
  //   obj["IL"] = data.IL;
  //   obj["Initiative Group Name"] = data.Initiative_Group_Name;
  //   obj["Ink_Qualification"] = data.Ink_Qualification;
  //   obj["New_Print_Feasibility"] = data.New_Print_Feasibility;
  //   obj["PM"] = data.PM;
  //   obj["POAs"] = data.POAs;
  //   obj["Production_Ready_Art"] = data.Production_Ready_Art;
  //   obj["Production Strategy"] = data.Production_Strategy;
  //   obj["Project Description"] = data.Project_Description;
  //   obj["Project ID"] = data.Project_ID;
  //   obj["Project Name"] = data.Project_Name;
  //   obj["Scale"] = data.Project_Scale;
  //   obj["Project State"] = data.Project_State;
  //   obj["Project Type"] = data.Project_Type;
  //   obj["Region"] = data.Project_region;
  //   obj["Tier"] = data.Tier;
  //   obj["Timestamp"] = data.Timestamp;
  //   return obj;
  // });

  // console.log("new obj", newObj);

  return (
    <div className="actions">
      <div className="project-title">{header}</div>

      <div className="action-buttons">
        {isFilterEnabled ? (
          <img
            src={BlueFilterIcon}
            alt="filter logo"
            onClick={clearFilter}
            className="header-icons"
            hidden={filterFLag}
          />
        ) : (
          <img
            src={filter}
            alt="filter logo"
            onClick={clearFilter}
            className="header-icons"
            hidden={filterFLag}
          />
        )}
        <img
          src={searchMyProjects}
          alt="search field"
          onClick={onSearchClick}
          className="header-icons"
        />

        {!shouldShowResetButton && (
          <>

              <ExportSelectedRows
                allData={modifiedAllData}
                selectedRows={selected}
                headers={headers}
              />
            <Button
              className="button-layout"
              variant="secondary"
              onClick={() => setVisible(true)}
              hidden={CustomizeViewFlag}
            >
              Customize View
            </Button>

            <button
              type="button"
              disabled={!isResetEnabled}
              className={
                isResetEnabled
                  ? "btn btn-primary reset-to-default-view"
                  : "btn btn-disabled"
              }
              onClick={() => {
                clearFilters();
              }}
              hidden={ResetToDefaultFlag}
            >
              Reset to Default
            </button>
          </>
        )}

          <>
            {shouldShowResetButton && (
              <>
                <ExportSelectedRows
                  selectedRows={selected}
                  allData={modifiedAllData}
                  headers={headers}
                />

                <DropdownButton
                  title="Action"
                  disabled={actionFlag || !isReadOnly}
                  id={actionFlag ? "tasksInActive" : "tasksActive"}
                  className="dropdown-button-custom"
                >
                  <Dropdown.Item onClick={handleDelegate}>
                    Delegate
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleHelpNeeded}>
                    Help Needed
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleHelpProvided}>
                    Help Provided
                  </Dropdown.Item>
                </DropdownButton>
              </>
            )}
          </>
      </div>
    </div>
  );
};

export default ProjectListHeader;
