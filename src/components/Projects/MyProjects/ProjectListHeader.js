import React from "react";
import export2excel from "../../../assets/images/export2excel.svg";
import searchMyProjects from "../../../assets/images/searchMyProjects.svg";
import filter from "../../../assets/images/filter.svg";
import BlueFilterIcon from "../../../assets/images/BlueFilterIcon.svg";
import customizedFields from "../../../assets/images/customizedFields.svg";
import { useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ProjectListHeader = ({
  header,
  clearFilter,
  clearFilters,
  setVisible,
  saveSettings,
  onSearchClick,
  exportCSV,
  isFilterEnabled,
  isResetEnabled,
  handleDelegateClick,
  handleHelpNeededClick,
  actionFlag,
}) => {
  const location = useLocation();
  const shouldShowResetButton =
    location.pathname.includes("/mytasks") ||
    location.pathname.includes("/alltasks");
  const handleDelegate = () => {
    handleDelegateClick();
  };
  const handleHelpNeeded = () => {
    handleHelpNeededClick();
  };

  // if (actionFlag) {
  //   dropdown.disabled = false;
  // } else {
  //   dropdown.disabled = true;
  // }
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
          />
        ) : (
          <img
            src={filter}
            alt="filter logo"
            onClick={clearFilter}
            className="header-icons"
          />
        )}
        <img
          src={searchMyProjects}
          alt="search field"
          onClick={onSearchClick}
          className="header-icons"
        />
        <img
          src={export2excel}
          alt="download file"
          onClick={() => exportCSV(false)}
          className="pi pi-file-excel header-icons"
        />
        {!shouldShowResetButton && (
          <>
            <img
              src={customizedFields}
              alt="alternate img"
              onClick={() => setVisible(true)}
              className="header-icons"
            />

            <button
              type="button"
              className={
                isResetEnabled
                  ? "btn btn-secondary reset-to-default-view"
                  : " btn btn-secondary resetToPgDefault"
              }
              onClick={() => clearFilters()}
            >
              Reset to Default
            </button>
          </>
        )}
        {shouldShowResetButton && (
          <DropdownButton
            id="tasksActions"
            title="Action"
            disabled={actionFlag}
          >
            <Dropdown.Item onClick={handleHelpNeeded}>
              Help Needed
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDelegate}>Delegate</Dropdown.Item>
          </DropdownButton>
        )}
      </div>
    </div>
  );
};

export default ProjectListHeader;
