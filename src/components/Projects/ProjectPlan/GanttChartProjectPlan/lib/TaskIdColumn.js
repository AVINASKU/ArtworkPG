/**
 * Taken from the original example
 */
import { Column, ColumnStore } from "@bryntum/gantt";

/**
 * @module TaskIdColumn
 */

/**
 * A column showing the task of a task
 *
 * @extends Gantt/column/Column
 * @classType taskidcolumn
 */
export default class TaskIdColumn extends Column {
  static get $name() {
    return "TaskIdColumn";
  }

  static get type() {
    return "taskidcolumn";
  }

  static get isGanttColumn() {
    return true;
  }

  //endregion

  renderer({ record }) {
    const id = record.id;

    return typeof id === "string" ? id : "";
  }
}

ColumnStore.registerColumnType(TaskIdColumn);
