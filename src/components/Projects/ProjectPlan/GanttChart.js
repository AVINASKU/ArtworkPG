import React from "react";
import { BryntumGantt } from "@bryntum/gantt-react";
import { Gantt } from "@bryntum/gantt";
import { ganttConfig } from "../../../Utils/BryntumConfig";
import { Button } from "react-bootstrap";

function GanttChart() {
  const handleCellButtonClick = (record) => {
    alert("Go " + record.team + "!");
  };

  return (
    <BryntumGantt
      {...ganttConfig}
      // other props, event handlers, etc
      columns={[
        {
          // Using custom React component
          renderer: ({ record }) => (
            <Button
              text={"Go " + record.team + "!"}
              onClick={() => handleCellButtonClick(record)}
            />
          ),
          // other column props,
        },
        // ... other columns
      ]}
      // ... other BryntumGantt props
    />
  );
}

export default GanttChart;
