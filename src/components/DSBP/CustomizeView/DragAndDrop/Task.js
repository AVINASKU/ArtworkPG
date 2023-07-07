// @flow
import React from "react";
import { Draggable } from "react-beautiful-dnd";

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

  // Using onClick as it will be correctly
  // preventing if there was a drag
  const onClick = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== primaryButton) {
      return;
    }
    // marking the event as used
    event.preventDefault();
    performAction(event);
  };

  const onTouchEnd = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    // marking the event as used
    // we would also need to add some extra logic to prevent the click
    // if this element was an anchor
    event.preventDefault();
    toggleSelectionInGroup(task.Field_Name);
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
    <Draggable draggableId={task.Field_Name} index={index}>
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
                isSelected && selectionCount > 0
                  ? { backgroundColor: "gray" }
                  : {}
              }
            >
              {task.Field_Name}
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
