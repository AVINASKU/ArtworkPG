// @flow
import React, { Component } from "react";
import Column from "./Column";
import entities1 from "./Data";
import { mutliDragAwareReorder, multiSelectTo as multiSelect } from "./Utils";
import { DragDropContext } from "react-beautiful-dnd";
import { Button } from "primereact/button";

const getTasks = (entities, columnId) =>
  entities.columns[columnId].fieldsData.map((taskId) => entities.tasks[taskId]);

class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: entities1(this.props.availableFields),
      selectedTaskIds: [],
      draggingTaskId: null,
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.onWindowClick);
    window.addEventListener("keydown", this.onWindowKeyDown);
    window.addEventListener("touchend", this.onWindowTouchEnd);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onWindowClick);
    window.removeEventListener("keydown", this.onWindowKeyDown);
    window.removeEventListener("touchend", this.onWindowTouchEnd);
  }

  onDragStart = (start) => {
    const id = start.draggableId;
    const selected = this.state.selectedTaskIds.find((taskId) => taskId === id);
    // if dragging an item that is not selected - unselect all items
    if (!selected) {
      this.unselectAll();
    }
    this.setState({ draggingTaskId: start.draggableId });
  };

  onDragEnd = (result) => {
    // console.log("result:", result);
    const destination = result.destination;
    const source = result.source;
    // nothing to do
    if (!destination || result.reason === "CANCEL") {
      this.setState({
        draggingTaskId: null,
      });
      return;
    }
    const processed = mutliDragAwareReorder({
      entities: this.state.entities,
      selectedTaskIds: this.state.selectedTaskIds,
      source,
      destination,
    });
    this.setState({
      ...processed,
      draggingTaskId: null,
    });
  };

  onWindowKeyDown = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Escape") {
      this.unselectAll();
    }
  };

  onWindowClick = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    this.unselectAll();
  };

  onWindowTouchEnd = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    this.unselectAll();
  };

  toggleSelection = (taskId) => {
    const selectedTaskIds = this.state.selectedTaskIds;
    const wasSelected = selectedTaskIds.includes(taskId);
    const newTaskIds = (() => {
      // Task was not previously selected
      // now will be the only selected item
      if (!wasSelected) {
        return [taskId];
      }
      // Task was part of a selected group
      // will now become the only selected item
      if (selectedTaskIds.length > 1) {
        return [taskId];
      }

      // task was previously selected but not in a group
      // we will now clear the selection
      return [];
    })();
    this.setState({ selectedTaskIds: newTaskIds });
  };

  toggleSelectionInGroup = (taskId) => {
    const selectedTaskIds = this.state.selectedTaskIds;
    const index = selectedTaskIds.indexOf(taskId);
    // if not selected - add it to the selected items
    if (index === -1) {
      this.setState({ selectedTaskIds: [...selectedTaskIds, taskId] });
      return;
    }
    // it was previously selected and now needs to be removed from the group
    const shallow = [...selectedTaskIds];
    shallow.splice(index, 1);
    this.setState({ selectedTaskIds: shallow });
  };

  // This behaviour matches the MacOSX finder selection
  multiSelectTo = (newTaskId) => {
    const updated = multiSelect(
      this.state.entities,
      this.state.selectedTaskIds,
      newTaskId
    );
    if (updated == null) {
      return;
    }

    this.setState({
      selectedTaskIds: updated,
    });
  };

  unselectAll = () => {
    this.setState({
      selectedTaskIds: [],
    });
  };

  resetToPGDefault = () => {
    let { entities } = this.state;
    let obj = entities.columns.freezedColumns.fieldsData;
    const data = obj.length > 0 ? obj.splice(0, obj.length) : entities;
    entities = {...entities, data };
  };

  handleSubmit = async () => {
    const { entities } = this.state;
    const selectedFieldsData = [];
    const freezedColumnsData = [];
    entities.columnOrder.find((id) => {
      const column = entities.columns[id];

      if (column.fieldsData.length > 0 && id !== "availableFields") {
        column.fieldsData.find((fieldName, index) => {
          // console.log("handleSubmit 1:", entities.tasks[fieldName], entities);
          const obj = entities.tasks[fieldName]["Field_Name"];
          if (id === "selectedFields") {
            if (fieldName === obj) {
              const d = entities.tasks[fieldName];
              d.Sequence = index + 1;
              selectedFieldsData.push(d);
            }
          }
          if (id === "freezedColumns") {
            if (fieldName === obj) {
              const f = entities.tasks[fieldName];
              f.Sequence = index + 1;
              freezedColumnsData.push(f);
            }
            // console.log("handleSubmit:", column.fieldsData, entities);
          }
        });
      }
    });
    console.log("handleSubmit:", selectedFieldsData, freezedColumnsData);
    // if (availableFieldsList && availableFieldsList.length) {
    //   availableFieldsList.filter((list) => {
    //     if (selectedFieldsList.includes(list)) {
    //       list["select"] = true;
    //     }
    //     if (freezedColumnsList.includes(list)) {
    //       list["freeze"] = true;
    //     }
    //   });
    // }
    // localStorage.setItem(
    //   "columnWidthDSBPArtwork",
    //   JSON.stringify(availableFieldsList)
    // );
    // await this.props.hideDialog();
  };

  render() {
    const entities = this.state.entities;
    const selected = this.state.selectedTaskIds;
    return (
      <>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <div style={{ display: "flex" }}>
            {entities.columnOrder.map((columnId) => (
              <Column
                column={entities.columns[columnId]}
                tasks={getTasks(entities, columnId)}
                selectedTaskIds={selected}
                key={columnId}
                draggingTaskId={this.state.draggingTaskId}
                toggleSelection={this.toggleSelection}
                toggleSelectionInGroup={this.toggleSelectionInGroup}
                multiSelectTo={this.multiSelectTo}
                entities={entities}
              />
            ))}
          </div>
        </DragDropContext>
        <div className="form-buttons dsbp-form-buttons">
          <Button
            className="btn button-layout firstAndSecond"
            variant="secondary"
            onClick={() => this.props.hideDialog()}
          >
            Cancel
          </Button>

          <Button
            className="btn button-layout firstAndSecond"
            variant="secondary"
            onClick={() => this.resetToPGDefault()}
          >
            Reset to P&G Default
          </Button>

          <Button
            className="btn button-layout updateButton"
            variant="primary"
            onClick={this.handleSubmit}
          >
            Update
          </Button>
        </div>
      </>
    );
  }
}
export default DragAndDrop;
