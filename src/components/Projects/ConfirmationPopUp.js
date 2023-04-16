import React, { useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { MultiSelect } from "primereact/multiselect";
import filter from "../../assets/images/filter.svg";
import fileattach from "../../assets/images/fileattach.svg";

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
}) => {
  const multiselectOptions = (colName) => {
    let optionList = [];
    optionList = projectData?.filter(
      (ele) =>
        colName !== "" && colName && colName !== null && ele[colName] && ele
    );
    return optionList;
  };

  const changeColor = (id) => {
    document.addEventListener("click", (e) => {
      const flyoutEl = document.getElementById(id);
      let targetEl = e.target;
      do {
        if (targetEl === flyoutEl) {
          document.getElementById(id).style.color = "#003DA5";
          document.getElementById(id).style.backgroundColor = "#FAFCFF";
          return;
        }
        targetEl = targetEl.parentNode;
      } while (targetEl);
      document.getElementById(id).style.color = "";
      document.getElementById(id).style.backgroundColor = "";
    });
  };

  const [filterIcon, setFilterIcon] = useState(false);

  const onChangeFilter = () => {
    setFilterIcon(!filterIcon);
  }

  const confirmPopData = () => {
    return (
      <div>
        <div className="clearAllFilterMainDiv">
        <div
          id="clearAllFilter"
          className="clearAllFilter"
          onClick={() => {
            let jsonFrozenItem = localStorage.getItem("frozenData");
            const frozenItem = JSON.parse(jsonFrozenItem);
            if (
              frozenItem &&
              frozenItem.length &&
              frozenItem.includes(selectedColumnName)
            ) {
              const index = frozenItem.indexOf(selectedColumnName);
              frozenItem.splice(index, 1);
              localStorage.setItem("frozenData", JSON.stringify(frozenItem));
              setFrozenColumn(frozenItem);
            }
            if (frozenCoulmns.includes(selectedColumnName)) {
              const index = frozenCoulmns.indexOf(selectedColumnName);
              frozenCoulmns.splice(index, 1);
              setFrozenColumn(frozenCoulmns);
              setProjectFrozen(!ProjectFrozen);
            }
            let jsonSortItem = localStorage.getItem("sortingData");
            const sortItem = JSON.parse(jsonSortItem);
            if (
              sortItem &&
              sortItem.length &&
              sortItem[0] === selectedColumnName
            ) {
              localStorage.setItem("sortingData", JSON.stringify([]));
            }
            if (
              sortData &&
              sortData.length &&
              sortData[0] === selectedColumnName
            ) {
              setSortData([]);
            }
            if (filters && filters.length) {
              setFilters([]);
            }
            changeColor("clearAllFilter");
          }}
        >
          Clear all filter
        </div>
        <div className="clearAllFilterIcon">
        <img
          src={filterIcon ? filter : fileattach}
          alt=""
          onClick={(e) => {
            onChangeFilter()
          }}
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
            changeColor("sortZtoA");
          }}
        >
          Sort z to a
        </div>
        <div
          id="sortAtoZ"
          className="sortAndFrozen"
          onClick={() => {
            onSort(selectedColumnName, "asc");
            changeColor("sortAtoZ");
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
            changeColor("frozen");
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
            placeholder="Select Project ID"
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
