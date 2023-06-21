import React from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import filter from "../../assets/images/filter.svg";
import BlueFilterIcon from "../../assets/images/BlueFilterIcon.svg";

const DSBPFilter = ({ op }) => {
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
            {(
              <img
                src={filter}
                alt="filter logo"
                // onClick={() => clearColumnWiseFilter()}
                className="header-icons"
              />
            )}
          </div>
        </div>
        <div
          id="sortZtoA"
          className="sortAndFrozen"
          //   onClick={onSort(selectedColumnName, "desc")}
        >
          <div> Sort z to a</div>
        </div>
        <div
          id="sortAtoZ"
          className="sortAndFrozen"
          //   onClick={
          //     onSort(selectedColumnName, "asc")
          //   }
        >
          <div> Sort a to z</div>
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
