import React from "react";
import export2excel from "../../../assets/images/export2excel.svg";
import searchMyProjects from "../../../assets/images/searchMyProjects.svg";
import filter from "../../../assets/images/filter.svg";
import BlueFilterIcon from "../../../assets/images/BlueFilterIcon.svg";
import customizedFields from "../../../assets/images/customizedFields.svg";

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
}) => {
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
        <img
          src={customizedFields}
          alt="alternate img"
          onClick={() => setVisible(true)}
          className="header-icons"
        />
        {/* <button
          type="button"
          className={isResetEnabled? "btn btn-secondary reset-to-default-view": " btn btn-secondary resetToPgDefault"}
          onClick={()=> clearFilters()}
        >
          Reset to default View
        </button> */}
        <button
          type="button"
          className={
            isResetEnabled
              ? "btn btn-secondary reset-to-default-view"
              : " btn btn-secondary resetToPgDefault"
          }
          onClick={() => clearFilters()}
        >
          Actions
        </button>
      </div>
    </div>
  );
};

export default ProjectListHeader;
