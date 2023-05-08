import React, { useState } from "react";
import { CSVLink } from "react-csv";
import export2excel from "../../assets/images/export2excel.svg";

// const headers = [
//   "ProjectName",
//   "TaskName",
//   "Status",
//   "HelpNeeded",
//   "RemainingBuffer",
// ];

export const ExportSelectedRows = ({ allData, selectedRows, headers }) => {
  console.log("exportheaders is is", headers);
  console.log("selectedRows is", selectedRows);
  allData = [
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
    {
      Project_Name: "SUD IWBG Tornado",
      Task: "Define DI",
      Status: "In Progress",
      help_needed: "No",
      "Remaining Buffer": "04 Days",
    },
  ];
  console.log("allData is", allData);

  //   selectedRows = [
  //     // {
  //     //   Project_Name: "SUD IWBG Tornado",
  //     //   Task: "Define DI",
  //     //   Status: "In Progress",
  //     //   help_needed: "No",
  //     //   "Remaining Buffer": "04 Days",
  //     // },
  //     // {
  //     //   Project_Name: "SUD IWBG Tornado",
  //     //   Task: "Define DI",
  //     //   Status: "In Progress",
  //     //   help_needed: "No",
  //     //   "Remaining Buffer": "04 Days",
  //     // },
  //   ];

  if (!selectedRows || selectedRows.length === 0) {
    const allRows = allData.map(
      ({ Project_Name, Task_Name, Status, Help_Needed, Remaining_Buffer }) => [
        Project_Name,
        Task_Name,
        Status,
        Help_Needed ? Help_Needed.toString() : "",
        Remaining_Buffer ? Remaining_Buffer.toString() : "",
      ]
    );
    const csvReport = {
      data: allRows,
      headers: headers,
      filename: "all_Rows.csv",
    };
    return <>{csvTag(csvReport)}</>;
  } else if (selectedRows.length > 0) {
    const checkedRows = selectedRows.map(
      ({ Project_Name, Task_Name, Status, Help_Needed, Remaining_Buffer }) => [
        Project_Name,
        Task_Name,
        Status,
        Help_Needed ? Help_Needed.toString() : "",
        Remaining_Buffer ? Remaining_Buffer.toString() : "",
      ]
    );
    const csvReport = {
      data: checkedRows,
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

// const ExportCSV = ({ data }) => {
//   const csvData = [[...Object.values(data)]];
//   const csvReport = {
//     data: csvData,
//     headers: headers,
//     filename: "PG Artwork.csv",
//   };

//   return <>{csvTag(csvReport)}</>;
// };

export default ExportSelectedRows;
