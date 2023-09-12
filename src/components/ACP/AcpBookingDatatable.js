import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function AcpBookingDatatable({ bookingTableData, columns }) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <span className="group-header vertical-align-middle ml-2 font-bold line-height-3">
          {data.Group}
        </span>
      </React.Fragment>
    );
  };

  useEffect(() => {});
  const dynamicColumns = () => {
    return columns.map((col, i) => (
      <Column key={col.field} field={col.field} header={col.header} />
    ));
  };

  return (
    <div className="acp-booking-table">
      <DataTable
        value={bookingTableData}
        resizableColumns
        reorderableColumns
        scrollable
        responsiveLayout="scroll"
        className="mt-3"
        columnResizeMode="expand"
        tableStyle={{ width: "max-content", minWidth: "100%" }}
        selectionMode="checkbox"
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        rowGroupMode="subheader"
        groupRowsBy="Group"
        sortMode="single"
        sortField="Group"
        sortOrder={1}
        expandableRowGroups
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowGroupHeaderTemplate={headerTemplate}
        showGridlines
      >
        {dynamicColumns()}
      </DataTable>
    </div>
  );
}

export default AcpBookingDatatable;
