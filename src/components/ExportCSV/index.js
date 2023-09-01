
import React from "react";
import { CSVLink } from "react-csv";
import export2excel from "../../assets/images/export2excel.svg";
import { changeDateFormat, onSortData } from "../../utils";

export const ExportSelectedRows = ({ allData, selectedRows, headers }) => {
  // Format date fields in allData and selectedRows

  //console.log("all data", allData, selectedRows);

  const formattedAllData = allData?.map((data) => ({
    ...data,
    Estimated_SOP: changeDateFormat(data["Estimated_SOP"]),
    Estimated_SOS: changeDateFormat(data["Estimated_SOS"]),
    Estimated_AW_Printer: changeDateFormat(data["Estimated_AW_Printer"]),
    Estimated_AW_Readiness: changeDateFormat(data["Estimated_AW_Readiness"]),
    Category: data["Artwork_Category"],
    Brand: data["Artwork_Brand"],
    SMO: data["Artwork_SMO"],
    region: data["Project_region"],
    Scale: data["Project_Scale"],
  }));

  const formattedSelectedRows = selectedRows?.map((data) => ({
    ...data,
    Estimated_SOP: changeDateFormat(data["Estimated_SOP"]),
    Estimated_SOS: changeDateFormat(data["Estimated_SOS"]),
    Estimated_AW_Printer: changeDateFormat(data["Estimated_AW_Printer"]),
    Estimated_AW_Readiness: changeDateFormat(data["Estimated_AW_Readiness"]),
    Category: data["Artwork_Category"],
    Brand: data["Artwork_Brand"],
    SMO: data["Artwork_SMO"],
    region: data["Project_region"],
    Scale: data["Project_Scale"],
  }));

  const modifiedHeaders = headers?.map((str) => {
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
      data: formattedAllData,
      headers: modifiedHeaders,
      filename: "Project_Records.csv",
    };
    return (
      <>{allData !== null && allData !== undefined && csvTag(csvReport)}</>
    );
  } else if (selectedRows.length > 0) {
    const csvReport = {
      data: formattedSelectedRows,
      headers: modifiedHeaders,
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
