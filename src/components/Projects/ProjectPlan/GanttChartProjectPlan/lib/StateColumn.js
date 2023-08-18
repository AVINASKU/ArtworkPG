/**
 * Taken from the original example
 */
import { Column, ColumnStore } from "@bryntum/gantt";

/**
 * @module StateColumn
 */

/**
 * A column showing the task of a task
 *
 * @extends Gantt/column/Column
 * @classType statecolumn
 */
export default class StateColumn extends Column {
  static get $name() {
    return "StateColumn";
  }

  static get type() {
    return "statecolumn";
  }

  static get isGanttColumn() {
    return true;
  }

  static get defaults() {
    return {
      // Set your default instance config properties here
      field: "state",
      text: "State",
      editor: false,
      cellCls: "b-task-column-cell",
      htmlEncode: false,
      filterable: {
        filterField: {
          type: "combo",
          items: ["Awaiting", "In-Progress", "Complete"],
        },
      },
    };
  }

  //endregion

  renderer({ record }) {
    const state = record.state;

    return state
      ? [
          {
            tag: "i",
            className: `b-fa b-fa-circle iconsTextStyle ${
              state === "In-Progress" && "iconInprogress"
            } ${state === "Awaiting" && "iconAwaiting"}
            `,
          },
          {
            tag: "div",
            className: `iconsTextStyle ${
              state === "In-Progress" && "iconInprogress"
            } ${state === "Awaiting" && "iconAwaiting"}
              `,
            text: state,
          },
        ]
      : "";
  }
}

ColumnStore.registerColumnType(StateColumn);
