/**
 * Taken from the original example
 */
import { Column, ColumnStore } from "@bryntum/gantt";

/**
 * @module TaskColumn
 */

/**
 * A column showing the task of a task
 *
 * @extends Gantt/column/Column
 * @classType taskcolumn
 */
export default class TaskColumn extends Column {
  static get $name() {
    return "TaskColumn";
  }

  static get type() {
    return "taskcolumn";
  }

  static get isGanttColumn() {
    return true;
  }

  static get defaults() {
    return {
      // Set your default instance config properties here
      field: "task",
      text: "Task",
      editor: false,
      cellCls: "b-task-column-cell",
      htmlEncode: false,
      filterable: {
        filterField: {
          type: "combo",
          items: ["Not Started", "Started", "Completed", "Late"],
        },
      },
    };
  }

  //endregion

  renderer({ record }) {
    console.log(record._data.task);
    const task = record.task;

    return task;

    
    //   ? [
    //       {
    //         tag: "i",
    //         className: `b-fa b-fa-circle ${task}`,
    //       },
    //       task,
    //     ]
    //   : "";
  }
  // renderer ({ record }) {
  //   return  [
  //           {
  //               tag : 'i',
  //               class : `b-tree-expander b-icon b-icon-tree-collapse b-tree-parent-cell`
  //           },
  //           `${record.task}`
            
  //       ]
    
  // }
}

ColumnStore.registerColumnType(TaskColumn);