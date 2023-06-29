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
  setFrozenUpdated,
  frozenUpdated,
}) => {
  const optionList1 = optionList(dsbpPmpData, selectedColumnName);
  let jsonColumnWidth = localStorage.getItem("columnWidthDSBPArtwork");
  let allColumns = JSON.parse(jsonColumnWidth);

  let checkSelectedColumnIsFreeze = false;
  let checkSelectedColumnIsSortAtoZ = false;
  let checkSelectedColumnIsSortZtoA = false;

  if (allColumns) {
    let checkSelectedColumn = allColumns.filter(
      (item) => item.Field_Name === selectedColumnName
    );
    checkSelectedColumnIsFreeze = checkSelectedColumn[0]?.freeze === true;
    checkSelectedColumnIsSortAtoZ = checkSelectedColumn[0]?.sortAtoZ === true;
    checkSelectedColumnIsSortZtoA = checkSelectedColumn[0]?.sortZtoA === true;
  }

  // allColumns.filter(
  //   (item) => item.Field_Name === selectedColumnName && item.freeze === true
  // ).length;
  // console.log("hello", checkSelectedColumnIsFreeze, checkSelectedColumn);

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
          onClick={() => {
            allColumns.map((ele) => {
              if (ele.Field_Name === selectedColumnName) {
                ele["sortZtoA"] = !ele.sortZtoA;
                ele["sortAtoZ"] = false;
                console.log("ele", ele, ele.Field_Name);
              } else {
                ele["sortZtoA"] = false;
                ele["sortAtoZ"] = false;
              }
            });
            localStorage.setItem(
              "columnWidthDSBPArtwork",
              JSON.stringify(allColumns)
            );
            onSort(selectedColumnName, "desc");
            setFrozenUpdated(!frozenUpdated);
          }}
        >
          {checkSelectedColumnIsSortZtoA ? (
            <div style={{ color: "#003DA5", fontWeight: 600 }}>
              Sort z to a{" "}
            </div>
          ) : (
            <div> Sort z to a</div>
          )}
        </div>
        <div
          id="sortAtoZ"
          className="sortAndFrozen"
          onClick={() => {
            allColumns.map((ele) => {
              if (ele.Field_Name === selectedColumnName) {
                ele["sortAtoZ"] = !ele.sortAtoZ;
                ele["sortZtoA"] = false;
                console.log("ele", ele, ele.Field_Name);
              } else {
                ele["sortZtoA"] = false;
                ele["sortAtoZ"] = false;
              }
            });
            localStorage.setItem(
              "columnWidthDSBPArtwork",
              JSON.stringify(allColumns)
            );
            setFrozenUpdated(!frozenUpdated);
            onSort(selectedColumnName, "asc");
          }}
        >
          {checkSelectedColumnIsSortAtoZ ? (
            <div style={{ color: "#003DA5", fontWeight: 600 }}>Sort a to z</div>
          ) : (
            <div> Sort a to z</div>
          )}
        </div>
        <div
          id="frozen"
          className="sortAndFrozen"
          onClick={() => {
            allColumns.map((ele) => {
              if (ele.Field_Name === selectedColumnName) {
                ele["freeze"] = !ele.freeze;
                console.log("ele", ele, ele.Field_Name);
              }
            });
            localStorage.setItem(
              "columnWidthDSBPArtwork",
              JSON.stringify(allColumns)
            );
            setFrozenUpdated(!frozenUpdated);
          }}
        >
          {checkSelectedColumnIsFreeze ? (
            <div style={{ color: "#003DA5", fontWeight: 600 }}>Freeze </div>
          ) : (
            <div> Freeze</div>
          )}
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
