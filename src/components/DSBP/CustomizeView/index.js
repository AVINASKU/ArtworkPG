import React from "react";
import CustomizeViewDialog from "./CustomizeViewDialog";

const CustomizeView = ({ showTaskDialog, onClose }) => {
  const objects1 = [
    {
      ID: 7,
      Color: "blue",
    },
    {
      ID: 8,
      Color: "red",
    },
    {
      ID: 9,
      Color: "green",
    },
    {
      ID: 10,
      Color: "purple",
    },
  ];

  const objects2 = [
    {
      ID: 1,
      Color: "yellow",
    },
    {
      ID: 2,
      Color: "orange",
    },
    {
      ID: 3,
      Color: "brown",
    },
  ];
  const objects3 = [
    {
      ID: 11,
      Color: "Test1",
    },
    // {
    //   ID: 12,
    //   Color: "Test2",
    // },
    // {
    //   ID: 13,
    //   Color: "Test3",
    // },
  ];

  return (
    <>
      <CustomizeViewDialog
        onClose={onClose}
        showTaskDialog={showTaskDialog}
        objects1={objects1}
        objects2={objects2}
        objects3={objects3}
      />
    </>
  );
};

export default CustomizeView;
