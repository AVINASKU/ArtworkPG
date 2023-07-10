/**
 * Gantt Component
 */

// React libraries
import React from "react";

// Bryntum libraries
import { BryntumGantt } from "@bryntum/gantt-react";

import { ganttConfig } from "./GanttConfig";

const Gantt = (props) => {
  return <BryntumGantt {...ganttConfig} {...props} />;
};

export default Gantt;
