// @flow
import React from "react";
import memoizeOne from "memoize-one";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import "../index.scss";

const getSelectedMap = memoizeOne((selectedTaskIds) =>
  selectedTaskIds.reduce((previous, current) => {
    previous[current] = true;
    return previous;
  }, {})
);

const Column = ({
  column,
  tasks,
  selectedTaskIds,
  draggingTaskId,
  toggleSelection,
  toggleSelectionInGroup,
  multiSelectTo,
}) => {
  return (
    <div className="columnMain">
      <div className="dragAndDropColumnData">{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className="dragAndDropColumn"
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => {
              const isSelected =
                getSelectedMap(selectedTaskIds)[task.Field_Name];
              const isGhosting =
                isSelected &&
                Boolean(draggingTaskId) &&
                draggingTaskId !== task.Field_Name;
              return (
                <Task
                  task={task}
                  index={index}
                  key={task.Field_Name}
                  isSelected={isSelected}
                  isGhosting={isGhosting}
                  selectionCount={selectedTaskIds.length}
                  toggleSelection={toggleSelection}
                  toggleSelectionInGroup={toggleSelectionInGroup}
                  multiSelectTo={multiSelectTo}
                  singleDragFlag={draggingTaskId !== task.Field_Name}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default Column;
