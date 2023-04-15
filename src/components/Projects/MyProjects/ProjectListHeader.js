import React from "react";
import export2excel from "../../../assets/images/export2excel.svg";
import searchMyProjects from "../../../assets/images/searchMyProjects.svg";
import filter from "../../../assets/images/filter.svg";
import customizedFields from "../../../assets/images/customizedFields.svg";
import renameMyProjects from "../../../assets/images/renameMyProjects.svg";
import save from "../../../assets/images/save.svg";

const ProjectListHeader = ({
  header,
  clearFilter,
  clearFilters,
  setVisible,
  saveSettings,
  onSearchClick,
  exportCSV,
}) => {
  return (
    <div className="actions">
      <div className="project-title">{header}</div>

      <div className="action-buttons">
        <img
          src={filter}
          alt="filter logo"
          // onClick={clearFilter}
          className="header-icons"
          disabled
        />
        <img
          src={save}
          alt="save settings"
          // onClick={saveSettings}
          className="pi pi-save header-icons"
          disabled
        />
        <img
          src={searchMyProjects}
          alt="search field"
          // onClick={saveSettings}
          onClick={onSearchClick}
          className="header-icons"
        />
        <img
          src={export2excel}
          alt="download file"
          // onClick={saveSettings}
          onClick={() => exportCSV(false)}
          className="pi pi-file-excel header-icons"
        />
        <img
          src={customizedFields}
          alt="alternate img"
          onClick={() => setVisible(true)}
          className="header-icons"
        />
        <button
          type="button"
          className="btn btn-secondary resetToPgDefault"
          onClick={() => clearFilters()}
        >
          Reset to default
        </button>
      </div>
    </div>
  );
};

export default ProjectListHeader;
