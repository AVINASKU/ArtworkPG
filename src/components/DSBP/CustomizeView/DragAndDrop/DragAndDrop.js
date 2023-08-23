import React, { useState, useEffect } from "react";
import Column from "./Column";
import entities1 from "./Data";
import { mutliDragAwareReorder, multiSelectTo as multiSelect } from "./Utils";
import { DragDropContext } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";

const getTasks = (entities, columnId) => entities?.columns[columnId]?.fieldsData.map((taskId) => entities.tasks[taskId]);

// .sort((a, b) => {
//   if (a.Field_Name < b.Field_Name) {
//     return -1;
//   } if (a.Field_Name > b.Field_Name) {
//     return 1;
//   }
//   return 0;
// });

const DragAndDrop = (props) => {
  const [entities, setEntities] = useState(props?.availableFields && entities1(props?.availableFields, props?.headerName));
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [draggingTaskId, setDraggingTaskId] = useState(null);
  const [localDestination, setLocalDestination] = useState(null);

  useEffect(() => {
    if (props?.customizeViewFields && props?.customizeViewFields !== "[]" && props?.customizeViewFields !== null) {
      const updatedData = {
        ...entities,
        columns: JSON.parse(props?.customizeViewFields)
      };
      if (updatedData !== undefined)
        setEntities(updatedData)
    } else {
      setEntities(props?.availableFields && props?.headerName && entities1(props?.availableFields, props?.headerName))
    }
  }, [props.customizeViewFields])

  useEffect(() => {
    const onWindowClick = (event) => {
      if (!event.defaultPrevented) {
        unselectAll();
      }
    };

    const onWindowKeyDown = (event) => {
      if (!event.defaultPrevented && event.key === "Escape") {
        unselectAll();
      }
    };

    const onWindowTouchEnd = (event) => {
      if (!event.defaultPrevented) {
        unselectAll();
      }
    };

    window.addEventListener("click", onWindowClick);
    window.addEventListener("keydown", onWindowKeyDown);
    window.addEventListener("touchend", onWindowTouchEnd);

    return () => {
      window.removeEventListener("click", onWindowClick);
      window.removeEventListener("keydown", onWindowKeyDown);
      window.removeEventListener("touchend", onWindowTouchEnd);
    };
  }, []);

  const onDragStart = (start) => {
    const id = start.draggableId;
    const selected = selectedTaskIds.find((taskId) => taskId === id);
    if (!selected) {
      unselectAll();
    }
    setDraggingTaskId(id);
  };

  const onDragEnd = (result) => {
    const destination = result.destination;
    const source = result.source;
    const draggableId = result.draggableId;

    if (!destination || result.reason === "CANCEL") {
      setDraggingTaskId(null);
      setLocalDestination(null);
      return;
    }

    const processed = mutliDragAwareReorder({
      draggableId,
      entities,
      selectedTaskIds,
      source,
      destination,
    });
    processed !== undefined && setEntities(processed?.entities);
    setDraggingTaskId(null);
    setLocalDestination(destination);
  };

  const onWindowKeyDown = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Escape") {
      unselectAll();
    }
  };

  const onWindowClick = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    unselectAll();
  };

  const onWindowTouchEnd = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    unselectAll();
  };

  const toggleSelection = (taskId) => {
    const wasSelected = selectedTaskIds.includes(taskId);
    const newTaskIds = (() => {
      if (!wasSelected) {
        return [taskId];
      }
      if (selectedTaskIds.length > 1) {
        return [taskId];
      }
      return [];
    })();
    setSelectedTaskIds(newTaskIds);
  };

  const toggleSelectionInGroup = (taskId) => {
    const index = selectedTaskIds.indexOf(taskId);
    if (index === -1) {
      setSelectedTaskIds([...selectedTaskIds, taskId]);
    } else {
      const shallow = [...selectedTaskIds];
      shallow.splice(index, 1);
      setSelectedTaskIds(shallow);
    }
  };

  const multiSelectTo = (newTaskId) => {
    const updated = multiSelect(entities, selectedTaskIds, newTaskId);
    if (updated == null) {
      return;
    }
    setSelectedTaskIds(updated);
  };

  const unselectAll = () => {
    setSelectedTaskIds([]);
  };

  const resetToPGDefault = () => {
    let obj = entities.columns.freezedColumns.fieldsData;
    let selectedObj = entities.columns.selectedFields.fieldsData;
    let data = [];
    let freezeData = [];
    if (obj.length > 0 && selectedObj.length > 0) {
      freezeData = obj.splice(0, obj.length);
      data = selectedObj.splice(0, selectedObj.length);
    } else if (selectedObj.length > 0) {
      data = selectedObj.splice(0, selectedObj.length);
    }

    const updatedData = {
      ...entities,
      columns: {
        ...entities.columns,
        availableFields: {
          ...entities.columns.availableFields,
          fieldsData: [
            ...data,
            ...freezeData,
            ...entities.columns.availableFields.fieldsData
          ]
        }
      }
    };
    setEntities(updatedData);
    localStorage.setItem("customizeViewFields", JSON.stringify([]));
    localStorage.setItem("customizeViewDependancyFields", JSON.stringify([]));
    props.setCustomizeViewFields(JSON.stringify([]));
    props.hideDialog();
  };

  const handleSubmit = async () => {
    props.setCustomizeViewFields(JSON.stringify([]));
    if (props?.headerName === "Dependency Mapping") {
      localStorage.setItem(
        "customizeViewDependancyFields",
        JSON.stringify(entities.columns)
      );
    } else {
      localStorage.setItem(
        "customizeViewFields",
        JSON.stringify(entities.columns)
      );
    }

    props.setCustomizeViewFields(JSON.stringify(entities.columns));
    props.hideDialog();
  };
  const selected = selectedTaskIds;
  // Shiva
  // const alphabeticalSort = (tasks)=>{
  //   const sortedList = tasks.sort((a,b)=>{
  //      if(a.Field_Name < b.Field_Name){
  //        return -1;
  //      }if(a.Field_Name > b.Field_Name){
  //        return 1;
  //      }
  //      return 0;
  //    })
  //    return sortedList;
  //  }

  return (
    <>
      {/* {JSON.stringify(entities)} */}
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          {entities?.columnOrder.map((columnId) => (
            <Column
              column={entities?.columns[columnId]}
              tasks={getTasks(entities, columnId)}
              selectedTaskIds={selected}
              key={columnId}
              draggingTaskId={draggingTaskId}
              toggleSelection={toggleSelection}
              toggleSelectionInGroup={toggleSelectionInGroup}
              multiSelectTo={multiSelectTo}
              entities={entities}
              droppableId={localDestination ? localDestination.droppableId : null}
            />
          ))}
        </div>
      </DragDropContext>
      <div className="form-buttons dsbp-form-buttons">
        <Button
          className="button-layout"
          variant="secondary"
          onClick={() => props.hideDialog()}
        >
          Cancel
        </Button>

        <Button
          className="button-layout"
          variant="secondary"
          onClick={resetToPGDefault}
        >
          Reset to P&G Default
        </Button>

        <Button
          className="button-layout"
          variant="primary"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default DragAndDrop;
