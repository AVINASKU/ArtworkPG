import React from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { MultiSelect } from "primereact/multiselect";
import filter from "../../assets/images/filter.svg";

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
        <div className="clearAllFilterIcon">
        <img
          src={filter}
          alt=""
          className="columnFilterIcon"
          // className="pi pi-align-justify"
        />
        </div>
        </div>
        <div
          id="sortZtoA"
          className="sortAndFrozen"
          onClick={() => {
            onSort(selectedColumnName, "desc");
            saveSettings();
            // changeColor("sortZtoA");
          }}
        >
          Sort z to a
        </div>
        <div
          id="sortAtoZ"
          className="sortAndFrozen"
          onClick={() => {
            onSort(selectedColumnName, "asc");
            saveSettings();
            // changeColor("sortAtoZ");
          }}
        >
          Sort a to z
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
          Frozen
        </div>
        <div className="multiSelect">
          <MultiSelect
            value={selectedCities}
            onChange={(e) => onGlobalFilterChange(e)}
            options={multiselectOptions(selectedColumnName)}
            optionLabel={selectedColumnName}
            filter
            placeholder="Select"
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
