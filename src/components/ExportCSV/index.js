import React from "react";
import { CSVLink } from "react-csv";
import export2excel from "../../assets/images/export2excel.svg";
import { changeDateFormat, onSortData } from "../../utils";

export const ExportSelectedRows = ({ allData, selectedRows, headers }) => {
  var headers = headers.map(function (str) {
    {
      str === "Estimated_SOP" && changeDateFormat(allData[str]);
    }
    {
      str === "Estimated_SOS" && changeDateFormat(allData[str]);
    }
    {
      str === "Estimated_AW_Printer" && changeDateFormat(allData[str]);
    }
    {
      str === "Estimated_AW_Readiness" && changeDateFormat(allData[str]);
    }
    if (
      str.startsWith("Artwork_") ||
      str.startsWith("Project_region") ||
      str.startsWith("Project_Scale")
    ) {
      return str.substring(8); // Remove the first 8 characters ("Artwork_")
    } else {
      return str; // Keep the original string
    }
  });
  if (!selectedRows || selectedRows.length === 0) {
    const csvReport = {
      data: allData,
      headers: headers,
      filename: "Project_Records.csv",
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
      <img src={export2excel} alt="Export to csv" />
    </CSVLink>
  );
};

export default ExportSelectedRows;
