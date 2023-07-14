import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const DependencyMappingList = ({
  dependencyMappingData,
  dependencyColumnNames,
}) => {

  const renderHeader = (field) => {
    return <div style={{ backgroundColor: "FFC0CB" }}>{field}</div>;
  };

  const renderMappingBody = (options, rowData) => {
    let field = rowData.field;
    return <span>{options[field]}</span>;
  };

  const dynamicColumns = () => {
    if (dependencyColumnNames && dependencyColumnNames.length) {
      return dependencyColumnNames.map((field, index) => {
        return (
          <Column
            field={field}
            header={renderHeader(field)}
            // frozen={field.freeze}
            // className={field.freeze ? "font-bold" : ""}
            // bodyClassName={"change-bg-color"}
            body={renderMappingBody}
            key={field}
            columnKey={field}
            showFilterMenu={false}
            alignFrozen="left"
            filterField={field}
            style={{
              width: 250,
              height: 30,
            }}
          />
        );
      });
    }
  };

  const rowClassName = (rowData) => {
    let field = rowData.field;
    console.log("field and options", rowData.DSBP_PMP_PIMaterialNumber);
    if (
      rowData.DSBP_PMP_PIMaterialNumber === "90039166" ||
      rowData.DSBP_PMP_PIMaterialNumber === "90062074"
    ) {
      return "white-bg-color"; // class name for highlighted rows
    }
    return "pink-bg-color"; // default class name for other rows
  };

  return (
    <DataTable
      dataKey="DSBP_PMP_PIMaterialID"
      value={dependencyMappingData}
      rowClassName={rowClassName}
      className="mt-3"
      responsiveLayout="scroll"
      columnResizeMode="expand"
      scrollable
      resizableColumns
      reorderableColumns
      tableStyle={{
        width: "max-content",
        minWidth: "100%",
      }}
    >
      {dynamicColumns()}
    </DataTable>
  );
};

export default DependencyMappingList;
