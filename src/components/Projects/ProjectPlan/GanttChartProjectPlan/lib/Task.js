/**
 * Taken from the original example
 */
import { TaskModel } from "@bryntum/gantt";

// here you can extend our default Task class with your additional fields, methods and logic
export default class Task extends TaskModel {
  static get fields() {
    return [{ name: "deadline", type: "date" }, "taskColor", "pColor"];
  }

  get isLate() {
    return this.deadline && Date.now() > this.deadline;
  }

  get status() {
    let status = "Awaiting";

    if (this.isCompleted) {
      status = "Complete";
    } else if (this.endDate < Date.now()) {
      status = "Awaiting";
    } else if (this.isStarted) {
      status = "In-Progress";
    }

    return status;
  }
}
