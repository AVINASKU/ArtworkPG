import React, {useEffect, useState} from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { MultiSelect } from "primereact/multiselect";
import filter from "../../assets/images/filter.svg";
import BlueFilterIcon from "../../assets/images/BlueFilterIcon.svg";
import { changeDateFormat, optionList } from "../../utils";

const ProjectListFilter = ({
  op,
  onSort,
  selectedFields,
  onGlobalFilterChange,
  setProjectFrozen,
  addFrozenColumns,
  ProjectFrozen,
  projectData,
  selectedColumnName,
  frozenCoulmns,
  sortData,
  filters,
  saveSettings,
  clearColumnWiseFilter,
}) => {
  const optionList1 = optionList(projectData, selectedColumnName);
  const [columnWiseSelectedFields, setColumnWiseSelectedFields] = useState([]);

  const isFilterActivated =
    (frozenCoulmns &&
      frozenCoulmns.length &&
      frozenCoulmns.includes(selectedColumnName)) ||
    (sortData && sortData.length) ||
    (filters && filters.length);

  let dateFormattedColNames = [
    "Estimated_AW_Printer",
    "Estimated_SOP",
    "Estimated_AW_Readiness",
    "Estimated_SOS",
  ];

      useEffect(()=>{
    if(selectedFields && selectedColumnName){
      setColumnWiseSelectedFields(selectedFields[selectedColumnName]);
    }
  },[selectedFields, selectedColumnName]) 

  const mutilSelectTemplate = (option) => {
    return (
      <div>
        {dateFormattedColNames.includes(selectedColumnName)
          ? changeDateFormat(option)
          : option}
      </div>
    );
  };

  console.log("selectedFields", selectedFields);

  const confirmPopData = () => {
    return (
      <div>
        <div className="clearAllFilterMainDiv">
          <div
            id="clearAllFilter"
            className="clearAllFilter"
            onClick={() => clearColumnWiseFilter()}
          >
            Clear all filter
          </div>
          <div className="clearAllFilterDiv">
            {isFilterActivated ? (
              <img
                src={BlueFilterIcon}
                alt="filter logo"
                onClick={() => clearColumnWiseFilter()}
                className="header-icons"
              />
            ) : (
              <img
                src={filter}
                alt="filter logo"
                onClick={() => clearColumnWiseFilter()}
                className="header-icons"
              />
            )}
          </div>
        </div>
        <div
          id="sortZtoA"
          className="sortAndFrozen"
          onClick={onSort(selectedColumnName, "desc")}
        >
          {sortData &&
          sortData.length &&
          sortData[0] === selectedColumnName &&
          sortData[1] === "desc" ? (
            <div style={{ color: "#003DA5" }}> Sort z to a </div>
          ) : (
            <div> Sort z to a</div>
          )}
        </div>
        <div
          id="sortAtoZ"
          className="sortAndFrozen"
          onClick={
            onSort(selectedColumnName, "asc")
            // saveSettings();
            // changeColor("sortAtoZ");
          }
        >
          {sortData &&
          sortData.length &&
          sortData[0] === selectedColumnName &&
          sortData[1] === "asc" ? (
            <div style={{ color: "#003DA5" }}> Sort a to z </div>
          ) : (
            <div> Sort a to z</div>
          )}
        </div>
        <div
          id="frozen"
          className="sortAndFrozen"
          onClick={() => {
            addFrozenColumns(selectedColumnName);
            setProjectFrozen(!ProjectFrozen);
            // changeColor("frozen");
            saveSettings();
          }}
        >
          {frozenCoulmns.includes(selectedColumnName) ? (
            <div style={{ color: "#003DA5" }}>Frozen </div>
          ) : (
            <div> Freeze</div>
          )}
        </div>
        <div className="multiSelect">
          <MultiSelect
            value={columnWiseSelectedFields}
            onChange={(e) => onGlobalFilterChange(e, selectedColumnName)}
            options={optionList1}
            itemTemplate={mutilSelectTemplate}
            filter
            placeholder={`Select ${selectedColumnName}`}
            maxSelectedLabels={3}
            className="p-column-filter"
            panelClassName="filterPopoverWidth"
          />
        </div>
      </div>
    );
  };

  return (
    <span>
      <OverlayPanel ref={op}>{confirmPopData()}</OverlayPanel>
    </span>
  );
};
export default ProjectListFilter;
