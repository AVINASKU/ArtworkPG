import React from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import filter from "../../assets/images/filter.svg";
import BlueFilterIcon from "../../assets/images/BlueFilterIcon.svg";
import { optionList } from "../../utils";
import { MultiSelect } from "primereact/multiselect";

const DSBPFilter = ({
  op,
  onSort,
  selectedColumnName,
  dsbpPmpData,
  selectedFields,
  onGlobalFilterChange,
}) => {
  console.log("field", selectedColumnName);
  const optionList1 = optionList(dsbpPmpData, selectedColumnName);

  const confirmPopData = () => {
    return (
      <div>
        <div className="clearAllFilterMainDiv">
          <div
            id="clearAllFilter"
            className="clearAllFilter"
            // onClick={() => clearColumnWiseFilter()}
          >
            Clear all filter
          </div>
          <div className="clearAllFilterDiv">
            {/* {isFilterActivated ? (
              <img
                src={BlueFilterIcon}
                alt="filter logo"
                // onClick={() => clearColumnWiseFilter()}
                className="header-icons"
              />
            ) : ( */}
            {
              <img
                src={filter}
                alt="filter logo"
                // onClick={() => clearColumnWiseFilter()}
                className="header-icons"
              />
            }
          </div>
        </div>
        <div
          id="sortZtoA"
          className="sortAndFrozen"
          onClick={onSort(selectedColumnName, "desc")}
        >
          <div> Sort z to a</div>
        </div>
        <div
          id="sortAtoZ"
          className="sortAndFrozen"
          onClick={onSort(selectedColumnName, "asc")}
        >
          <div> Sort a to z</div>
        </div>
        <div className="multiSelect">
          <MultiSelect
            value={selectedFields}
            onChange={(e) => onGlobalFilterChange(e, selectedColumnName)}
            options={optionList1}
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
export default DSBPFilter;
