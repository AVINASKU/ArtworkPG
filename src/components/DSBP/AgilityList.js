import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import filter from "../../../assets/images/filter.svg";
import filter from "../../assets/images/filter.svg";
import DSBPFilter from "./DSBPFilter";
import "../Projects/MyProjects/index.scss";

const AgilityList = ({
  selected,
  dsbpPmpData,
  setSelected,
  selectAllChecked,
  handleSelect,
  handleSelectAll,
  products,
}) => {
  const columnName = [
    "DSBP_InitiativeID",
    "DSBP_IL",
    "DSBP_PMP_PIMaterialID",
    "DSBP_PO_PMP_poPoa",
    "DSBP_PO_PMP_poMaterialNumber",
    "Add to Project",
    "DSBP_PO_PMP_poLanguages",
    "DSBP_PMP_regulatoryStickeringCos",
    "DSBP_PMP_PIMaterialDescription",
    "DSBP_InitiativeState",
    "DSBP_PO_PMP_poPoaApprovedCountries",
    "POA #",
    "POAA Creation Status",
    "Rejection reason",
    "RTA Rejection Reason",
    "Assign a Tagging",
    "Assembly Mech",
    "Artwork Reference Material",
    "AISE",
    "Biocide",
    "Brand",
    "Product Form/Sub Brand",
    "PO Flavor/Scent",
    "Ref COS",
    "PO Languages",
    "PO POA #",
    "PO FPC",
    "PO FPC DESC",
  ];
  const op = useRef(null);

  const addBody = (options, rowData) => {
    let field = rowData.field;
    return (
      <>
        <div className="flex align-items-center gap-2">
          <input
            type="checkbox"
            className="p-checkbox-box p-highlight"
            checked={selected?.some(
              (item) => item.InitiativeID === options.InitiativeID
            )}
            onChange={() => handleSelect(options)}
          />
          {options[field]}
        </div>
      </>
    );
  };

  const renderHeader = (field, isFilterActivated = false) => {
    return (
      <span key={field}>
        {field === "DSBP_InitiativeID" && (
          <input
            type="checkbox"
            checked={selectAllChecked}
            onChange={handleSelectAll}
          />
        )}
        <img
          src={filter}
          key={field}
          alt="Column Filter"
          // onClick={(e) => projectNameOnClick(e, options)}
          className={
            isFilterActivated
              ? "columnFilterIcon filter-color-change"
              : "columnFilterIcon"
          }
        />
        {field}
      </span>
    );
  };

  const renderColumns = () => {
    if (columnName && columnName.length) {
      return columnName.map((field, index) => {
        return (
          <Column
            field={field}
            header={() => renderHeader(field)}
            body={field === "DSBP_InitiativeID" && addBody}
            key={field}
            columnKey={field}
            showFilterMenu={false}
            alignFrozen="left"
            filterField={field}
          />
        );
      });
    }
  };
  return (
  <>
  <DSBPFilter op={op}/>

    <DataTable
      dataKey="DSBP_InitiativeID"
      scrollable
      resizableColumns
      reorderableColumns
      responsiveLayout="scroll"
      columnResizeMode="expand"
      value={dsbpPmpData}
      className="mt-3"
      tableStyle={{ width: "max-content", minWidth: "100%" }}
      selection={selected}
      onSelectionChange={(e) => setSelected(e.value)}
    >
      {renderColumns()}
    </DataTable>
    </>
  );
};

export default AgilityList;
