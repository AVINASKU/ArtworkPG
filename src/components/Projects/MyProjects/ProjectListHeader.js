import React from "react";

import searchMyProjects from "../../../assets/images/searchMyProjects.svg";
import filter from "../../../assets/images/filter.svg";
import BlueFilterIcon from "../../../assets/images/BlueFilterIcon.svg";
import { useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ExportSelectedRows } from "../../ExportCSV";
import { CheckReadOnlyAccess } from "../../../utils";

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
}) => {
  const location = useLocation();

  // const [downloadCSV, setDownloadCSV] = useState(false);
  // const [showCSV, setShowCSV] = useState(true);
  const isReadOnly = CheckReadOnlyAccess();
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
          <>
            {isReadOnly && (
              <ExportSelectedRows
                allData={allData}
                selectedRows={selected}
                headers={headers}
              />
            )}
            <Button
              className="button-layout"
              variant="secondary"
              onClick={() => setVisible(true)}
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
              onClick={() => clearFilters()}
            >
              Reset to Default
            </button>
          </>
        )}
        {isReadOnly && (
          <>
            {shouldShowResetButton && (
              <>
                <ExportSelectedRows
                  selectedRows={selected}
                  allData={allData}
                  headers={headers}
                />

                <DropdownButton
                  title="Action"
                  disabled={actionFlag}
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
        )}
      </div>
    </div>
  );
};

export default ProjectListHeader;
