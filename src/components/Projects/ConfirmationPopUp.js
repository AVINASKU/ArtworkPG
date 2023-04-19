import React from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { MultiSelect } from "primereact/multiselect";
import filter from "../../assets/images/filter.svg";
import BlueFilterIcon from "../../assets/images/BlueFilterIcon.svg";


const ConfirmationPopUp = ({
  op,
  onSort,
  selectedCities,
  onGlobalFilterChange,
  setProjectFrozen,
  addFrozenColumns,
  ProjectFrozen,
  projectData,
  selectedColumnName,
  setFrozenColumn,
  frozenCoulmns,
  sortData,
  setSortData,
  setFilters,
  filters,
  saveSettings,
  clearColumnWiseFilter,
}) => {
  const multiselectOptions = (colName) => {
    let optionList = [];
    optionList = projectData?.filter(
      (ele) =>
        colName !== "" && colName && colName !== null && ele[colName] && ele
    );
    return optionList;
  };

  // const changeColor = (id) => {
  //   document.addEventListener("click", (e) => {
  //     const flyoutEl = document.getElementById(id);
  //     let targetEl = e.target;
  //     do {
  //       if (targetEl === flyoutEl) {
  //         document.getElementById(id).style.color = "red";
            //  document.getElementById(id).style.backgroundColor = "#FAFCFF";
  //         return;
  //       }
  //       targetEl = targetEl.parentNode;
  //     } while (targetEl);
  //     document.getElementById(id).style.color = "";
  // document.getElementById(id).style.backgroundColor = "";
  //   });
  // };

  const isFilterActivated =
    (frozenCoulmns &&
      frozenCoulmns.length &&
      frozenCoulmns.includes(selectedColumnName)) ||
    (sortData && sortData.length) ||
    (filters && filters.length);

  const confirmPopData = () => {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div
            id="clearAllFilter"
            className="clearAllFilter"
            onClick={() => clearColumnWiseFilter()}
          >
            Clear all filter
          </div>
          <div>
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
            <div> Frozen</div>
          )}
        </div>
        <div className="multiSelect">
          <MultiSelect
            value={selectedCities}
            onChange={(e) => onGlobalFilterChange(e)}
            options={multiselectOptions(selectedColumnName)}
            optionLabel={selectedColumnName}
            filter
            placeholder={`Select ${selectedColumnName}`}
            maxSelectedLabels={3}
            className="p-column-filter"
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
export default ConfirmationPopUp;
