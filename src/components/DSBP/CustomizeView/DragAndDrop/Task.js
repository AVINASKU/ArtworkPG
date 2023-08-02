// @flow
import _ from "lodash";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../index.scss";

const primaryButton = 0;
const keyCodes = {
  enter: 13,
  escape: 27,
  arrowDown: 40,
  arrowUp: 38,
  tab: 9,
};

const Task = ({
  task,
  toggleSelection,
  toggleSelectionInGroup,
  multiSelectTo,
  index,
  isSelected,
  selectionCount,
  isGhosting,
  singleDragFlag,
  entities,
  droppableId,
  selectedTaskIds
}) => {
  const onKeyDown = (event, provided, snapshot) => {
    if (event.defaultPrevented) {
      return;
    }
    if (snapshot.isDragging) {
      return;
    }
    if (event.keyCode !== keyCodes.enter) {
      return;
    }
    // we are using the event for selection
    event.preventDefault();
    performAction(event);
  };

  const copySelectedTasksToClipboard = () => {
    // Get the selected tasks from the state or props
  
    // Create a new array to hold the copied tasks
    const copiedTasks = [];
  
    // Iterate over the selectedTaskIds and add the corresponding tasks to the copiedTasks array
    selectedTaskIds.forEach((taskId) => {
      const task = entities.tasks[taskId];
      copiedTasks.push(task);
    });
  
    // Convert the copiedTasks array to a JSON string and copy it to the clipboard
    const jsonString = JSON.stringify(copiedTasks);
    navigator.clipboard.writeText(jsonString);
  };
  // Using onClick as it will be correctly
  // preventing if there was a drag
  const onClick = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== primaryButton) {
      return;
    }
    event.preventDefault();
    performAction(event);
    if (event.shiftKey) {
      // Initiate copy operation if Shift key is pressed
      copySelectedTasksToClipboard();
    }
  };
  

  const onTouchEnd = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    toggleSelectionInGroup(task.Field_Name);
    if (event.nativeEvent.shiftKey) {
      // Initiate copy operation if Shift key is pressed
      copySelectedTasksToClipboard();
    }
  };

  // Determines if the platform specific toggle selection in group key was used
  const wasToggleInSelectionGroupKeyUsed = (event) => {
    const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

  // Determines if the multiSelect key was used
  const wasMultiSelectKeyUsed = (event) => event.shiftKey;

  const performAction = (event) => {
    if (wasToggleInSelectionGroupKeyUsed(event)) {
      toggleSelectionInGroup(task.Field_Name);
      return;
    }
    if (wasMultiSelectKeyUsed(event)) {
      multiSelectTo(task.Field_Name);
      return;
    }
    toggleSelection(task.Field_Name);
  };

  return (
    <Draggable draggableId={task?.Field_Name} index={index}>
      {(provided, snapshot) => {
        const shouldShowSelection = snapshot.isDragging && selectionCount > 1;

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={onClick}
            onTouchEnd={onTouchEnd}
            onKeyDown={(event) => onKeyDown(event, provided, snapshot)}
            isDragging={snapshot.isDragging}
            isSelected={isSelected}
            isGhosting={isGhosting}
          >
            <div
              style={
                (isSelected && selectionCount > 0) || !singleDragFlag
                  ? {
                      backgroundColor: "#c2bdbd",
                      color: "#000",
                      fontWeight: "900",
                    }
                  : {}
              }
              className={`${
                entities.columns.availableFields.fieldsData &&
                entities.columns.availableFields.fieldsData.find(
                  (r, ind) =>
                    entities.columns.selectedFields.fieldsData.includes(r) &&
                    index === ind
                )
                  ? "test"
                  : ""
              }`}
            >
              {task?.Field_Name}
            </div>
            {shouldShowSelection ? (
              <div style={{ color: "red", fontWeight: "900" }}>
                {selectionCount}
              </div>
            ) : null}
          </div>
        );
      }}
    </Draggable>
  );
};
export default Task;
