import React from "react";
import { CSVLink } from "react-csv";
import export2excel from "../../assets/images/export2excel.svg";
import { changeDateFormat, onSortData } from "../../utils";

export const ExportSelectedRows = ({ allData, selectedRows, headers }) => {
if(selectedRows && selectedRows.length){
// selectedRows.map((ele)=>{
// let splittedCol = ele.split("_").join(" ");

// })


}
headers.map((ele) =>  ele.split("_").join(" "));

console.log("all data", allData, headers, selectedRows);


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
    return <div></div>
    // return <>{csvTag(csvReport)}</>;
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
