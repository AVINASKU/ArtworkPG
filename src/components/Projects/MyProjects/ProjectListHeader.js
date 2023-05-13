import React, { useState } from "react";
import { CSVLink } from "react-csv";

import export2excel from "../../../assets/images/export2excel.svg";
import searchMyProjects from "../../../assets/images/searchMyProjects.svg";
import filter from "../../../assets/images/filter.svg";
import BlueFilterIcon from "../../../assets/images/BlueFilterIcon.svg";
import customizedFields from "../../../assets/images/customizedFields.svg";
import { useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ExportCSV, { ExportSelectedRows } from "../../ExportCSV";

const ProjectListHeader = ({
  header,
  clearFilter,
  clearFilters,
  setVisible,
  saveSettings,
  onSearchClick,
  // exportCSV,
  isFilterEnabled,
  isResetEnabled,
  handleDelegateClick,
  handleHelpNeededClick,
  actionFlag,
  // exportCSVTasks,
  selected,
  allData,
  headers,
}) => {
  const location = useLocation();
  const [downloadCSV, setDownloadCSV] = useState(false);
  const [showCSV, setShowCSV] = useState(true);
  const shouldShowResetButton =
    location.pathname.includes("/AllTasks") ||
    location.pathname.includes("/MyTasks");
  const handleDelegate = () => {
    handleDelegateClick();
  };
  const handleHelpNeeded = () => {
    handleHelpNeededClick();
  };

  const handleClick = () => {
    setShowCSV(false);
    setDownloadCSV(true);
  };

  
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

        {!shouldShowResetButton && (
          // <>
          //   {(selected.length === 0) ? (
          //     // <img src="/user-profile.jpg" alt="User Profile" />
          //     <img
          //     src={export2excel}
          //     alt="download file"
          //     // onClick={() => exportCSV(false)}
          //     onClick={handleClick}
          //     className="pi pi-file-excel header-icons"
          //     style={{ display: 'none'}}
          //   />
          //   {downloadCSV && (
          //     <ExportSelectedRows selectedRows={selected} allData={allData}
          //   ) : (
          //     // <img src="/default-profile.jpg" alt="Default Profile" />
          //     <img
          //     src={export2excel}
          //     alt="download file"
          //     // onClick={() => exportCSV(false)}
          //     onClick={handleClick}
          //     className="pi pi-file-excel header-icons"
          //   />
          //   {downloadCSV && (
          //     <ExportSelectedRows selectedRows={selected} allData={allData}
          //   )}
          //    />
          //   )}
          <>
            <img
              src={customizedFields}
              alt="alternate img"
              onClick={() => setVisible(true)}
              className="header-icons"
            />

            {
              // showCSV && (
              //   // (selected.length = 0 ? (
              //   // <img
              //   //   src={export2excel}
              //   //   alt="download file"
              //   //   onClick={handleClick}
              //   //   className="pi pi-file-excel header-icons"
              //   // />
              // )
              // ) : (
              // <img
              //   src={export2excel}
              //   alt="download file"
              //   onClick={handleClick}
              //   className="pi pi-file-excel header-icons"
              // style={{ display: "none" }}
              // />
              // ))
            }
            {/* {downloadCSV && allData && (
              <ExportSelectedRows allData={allData} selectedRows={selected} />
            )} */}
            <ExportSelectedRows
              allData={allData}
              selectedRows={selected}
              headers={headers}
            />

            <button
              type="button"
              className={
                isResetEnabled
                  ? "btn btn-secondary reset-to-default-view"
                  : " btn btn-secondary"
              }
              onClick={() => clearFilters()}
            >
              Reset to Default
            </button>

            {/* {
              // (selected.length = 0 ? (
              <img
                src={export2excel}
                alt="download file"
                onClick={handleClick}
                className="pi pi-file-excel header-icons"
              />
              // ) : (
              // <img
              //   src={export2excel}
              //   alt="download file"
              //   onClick={handleClick}
              //   className="pi pi-file-excel header-icons"
              // style={{ display: "none" }}

              // />
              // ))
            }
            {downloadCSV && allData && (
              <ExportSelectedRows allData={allData} selectedRows={selected} />
            )} */}
          </>
        )}
        {shouldShowResetButton && (
          <>
            {/* <img
              src={export2excel}
              // alt="download file"
              // onClick={exportCSVTasks}
              onClick={handleClick}
              // onClick={hiddenLink.current.link.click()}
              className="pi pi-file-excel header-icons"
            /> */}
            {/* {downloadCSV && allData && (
              <ExportSelectedRows selectedRows={selected} allData={allData} />
            )} */}
            <ExportSelectedRows
              selectedRows={selected}
              allData={allData}
              headers={headers}
            />

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
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectListHeader;
