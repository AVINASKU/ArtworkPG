import React from "react";
import { CSVLink } from "react-csv";
import export2excel from "../../assets/images/export2excel.svg";

export const ExportSelectedRows = ({ allData, selectedRows, headers }) => {
  if (!selectedRows || selectedRows.length === 0) {
    const csvReport = {
      data: allData,
      headers: headers,
      filename: "all_Rows.csv",
    };
    return (
      <>{allData !== null && allData !== undefined && csvTag(csvReport)}</>
    );
  } else if (selectedRows.length > 0) {
    const csvReport = {
      data: selectedRows,
      headers: headers,
      filename: "Selected_Rows.csv",
    };
    return <>{csvTag(csvReport)}</>;
  }
};

const csvTag = (data) => {
  return (
    <CSVLink {...data}>
      <img
        src={export2excel}
        alt="Export to csv"
        style={{ marginTop: "8px" }}
      />
    </CSVLink>
  );
};

export default ExportSelectedRows;
