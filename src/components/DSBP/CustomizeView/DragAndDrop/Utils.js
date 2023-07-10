// @flow
// Reorder the record in same column
const reorder = (list, startIndex, endIndex) => {
  console.log("list:", list);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const withNewTaskIds = (column, fieldsData) => ({
  id: column.id,
  title: column.title,
  fieldsData,
});

const reorderSingleDrag = ({
  entities,
  selectedTaskIds,
  source,
  destination,
}) => {
  // moving in the same list
  if (source.droppableId === destination.droppableId) {
    const column = entities.columns[source.droppableId];
    const reordered = reorder(column.fieldsData, source.index, destination.index);
    const updated = {
      ...entities,
      columns: {
        ...entities.columns,
        [column.id]: withNewTaskIds(column, reordered),
      },
    };
    return {
      entities: updated,
      selectedTaskIds,
    };
  }
  // moving to a new list
  const home = entities.columns[source.droppableId];
  const foreign = entities.columns[destination.droppableId];

  // the id of the task to be moved
  const taskId = home.fieldsData[source.index];

  // remove from home column
  const newHomeTaskIds = [...home.fieldsData];
  // cut and paste record
  // newHomeTaskIds.splice(source.index, 1);
  // Copy and paste record
  newHomeTaskIds.splice(source.index, 0);

  // add to foreign column
  const newForeignTaskIds = [...foreign.fieldsData];
  newForeignTaskIds.splice(destination.index, 0, taskId);

  const updated = {
    ...entities,
    columns: {
      ...entities.columns,
      [home.id]: withNewTaskIds(home, newHomeTaskIds),
      [foreign.id]: withNewTaskIds(foreign, newForeignTaskIds),
    },
  };

  return {
    entities: updated,
    selectedTaskIds,
  };
};

export const getHomeColumn = (entities, taskId) => {
  const columnId = entities.columnOrder.find((id) => {
    const column = entities.columns[id];
    return column.fieldsData.includes(taskId);
  });
  return entities.columns[columnId];
};

const reorderMultiDrag = ({
  entities,
  selectedTaskIds,
  source,
  destination,
}) => {
  const start = entities.columns[source.droppableId];
  const dragged = start.fieldsData[source.index];

  const insertAtIndex = (() => {
    const destinationIndexOffset = selectedTaskIds.reduce(
      (previous, current) => {
        if (current === dragged) {
          return previous;
        }
        const final = entities.columns[destination.droppableId];
        const column = getHomeColumn(entities, current);
        if (column !== final) {
          return previous;
        }
        const index = column.fieldsData.indexOf(current);
        if (index >= destination.index) {
          return previous;
        }
        // the selected item is before the destination index
        // we need to account for this when inserting into the new location
        return previous + 1;
      },
      0
    );
    const result = destination.index - destinationIndexOffset;
    return result;
  })();

  // doing the ordering now as we are required to look up columns
  // and know original ordering
  const orderedSelectedTaskIds = [...selectedTaskIds];
  orderedSelectedTaskIds.sort((a, b) => {
    // moving the dragged item to the top of the list
    if (a === dragged) {
      return -1;
    }
    if (b === dragged) {
      return 1;
    }
    // sorting by their natural indexes
    const columnForA = getHomeColumn(entities, a);
    const indexOfA = columnForA.fieldsData.indexOf(a);
    const columnForB = getHomeColumn(entities, b);
    const indexOfB = columnForB.fieldsData.indexOf(b);

    if (indexOfA !== indexOfB) {
      return indexOfA - indexOfB;
    }
    // sorting by their order in the selectedTaskIds list
    return -1;
  });

  // we need to remove all of the selected tasks from their columns
  const withRemovedTasks = entities.columnOrder.reduce((previous, columnId) => {
    const column = entities.columns[columnId];

    // remove the id's of the items that are selected
    const remainingTaskIds = column.fieldsData.filter(
      (id) => !selectedTaskIds.includes(id)
    );

    previous[column.id] = withNewTaskIds(column, remainingTaskIds);
    return previous;
  }, entities.columns);

  const final = withRemovedTasks[destination.droppableId];
  const withInserted = (() => {
    const base = [...final.fieldsData];
    base.splice(insertAtIndex, 0, ...orderedSelectedTaskIds);
    return base;
  })();

  // insert all selected tasks into final column
  const withAddedTasks = {
    ...withRemovedTasks,
    [final.id]: withNewTaskIds(final, withInserted),
  };

  const updated = {
    ...entities,
    columns: withAddedTasks,
  };

  return {
    entities: updated,
    selectedTaskIds: orderedSelectedTaskIds,
  };
};

export const mutliDragAwareReorder = (args) => {
  if (args.selectedTaskIds.length > 1) {
    return reorderMultiDrag(args);
  }
  return reorderSingleDrag(args);
};

export const multiSelectTo = (entities, selectedTaskIds, newTaskId) => {
  // Nothing already selected
  if (!selectedTaskIds.length) {
    return [newTaskId];
  }

  const columnOfNew = getHomeColumn(entities, newTaskId);
  const indexOfNew = columnOfNew.fieldsData.indexOf(newTaskId);
  const lastSelected = selectedTaskIds[selectedTaskIds.length - 1];
  const columnOfLast = getHomeColumn(entities, lastSelected);
  const indexOfLast = columnOfLast.fieldsData.indexOf(lastSelected);

  // multi selecting to another column
  // select everything up to the index of the current item
  if (columnOfNew !== columnOfLast) {
    return columnOfNew.fieldsData.slice(0, indexOfNew + 1);
  }
  // multi selecting in the same column
  // need to select everything between the last index and the current index inclusive
  // nothing to do here
  if (indexOfNew === indexOfLast) {
    return null;
  }
  const isSelectingForwards = indexOfNew > indexOfLast;
  const start = isSelectingForwards ? indexOfLast : indexOfNew;
  const end = isSelectingForwards ? indexOfNew : indexOfLast;
  const inBetween = columnOfNew.fieldsData.slice(start, end + 1);

  // everything inbetween needs to have it's selection toggled.
  // with the exception of the start and end values which will always be selected
  const toAdd = inBetween.filter((taskId) => {
    // if already selected: then no need to select it again
    if (selectedTaskIds.includes(taskId)) {
      return false;
    }
    return true;
  });

  const sorted = isSelectingForwards ? toAdd : [...toAdd].reverse();
  const combined = [...selectedTaskIds, ...sorted];
  return combined;
};
