/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import { Draggable, Droppable } from "react-drag-and-drop";
import "./index.scss";
import _ from "lodash";

const CustomizeViewDialog = ({
  showTaskDialog,
  onClose,
  availableFields,
  selectedFields,
  freezedColumns,
}) => {
  const [availableFieldsList, setAvailableFieldsList] =
    useState(availableFields);
  const [selectedFieldsList, setSelectedFieldsList] = useState(selectedFields);
  const [freezedColumnsList, setFreezedColumnsList] = useState(freezedColumns);

  const [visible, setVisible] = useState(showTaskDialog);

  useEffect(() => {
    setVisible(showTaskDialog);
  }, [showTaskDialog]);

  useEffect(() => {
    if (_.isEqual(selectedFieldsList.sort(), freezedColumnsList.sort())) {
      // console.log("freezedColumnsList:", freezedColumnsList);
    }
  }, [freezedColumnsList]);

  const hideDialog = () => {
    setVisible(false);
    onClose();
  };

  const resetToPGDefault = () => {
    setFreezedColumnsList([]);
  };

  const handleSubmit = async () => {
    if (availableFieldsList && availableFieldsList.length) {
      availableFieldsList.filter((list) => {
        if (selectedFieldsList.includes(list)) {
          list["select"] = true;
        }
        if (freezedColumnsList.includes(list)) {
          list["freeze"] = true;
        }
      });
    }
    localStorage.setItem(
      "columnWidthDSBPArtwork",
      JSON.stringify(availableFieldsList)
    );
    await hideDialog();
  };

  const DraggableList = ({ list, type }) => {
    return (
      <div>
        {list.map(({ Field_Name, Sequence }) => (
          <Draggable type={type} data={Sequence} key={Sequence}>
            <div>{Field_Name}</div>
          </Draggable>
        ))}
      </div>
    );
  };

  const onAppointmentDrop = (
    data,
    list1Data,
    list2Data,
    setList1Func,
    setList2Func,
    dropType
  ) => {
    const index = list1Data.findIndex((obj) => obj.Sequence === data[dropType]);
    if (index >= -1) {
      console.log("dropType:", dropType);
      if (!_.includes(list2Data, list1Data[index])) {
        setList2Func([...list2Data, list1Data[index]]);
      } else {
        if (dropType === "drop2") {
          const index3 = freezedColumnsList.findIndex(
            (obj) => obj.Sequence === data.drop1
          );
          if (index3 >= -1) {
            const newList3 = [...freezedColumnsList];
            newList3.splice(index3, 1);
            setFreezedColumnsList(newList3);
          }
        }
      }
    }
  };

  const onItemDrop = (data, data1) => {
    const index = selectedFieldsList.findIndex(
      (obj) => obj.Sequence === data.drop1
    );
    const index3 = freezedColumnsList.findIndex(
      (obj) => obj.Sequence === data.drop1
    );
    if (index >= -1) {
      // setAvailableFieldsList([...availableFieldsList, { ...selectedFieldsList[index] }]);
      const newList2 = [...selectedFieldsList];
      newList2.splice(index, 1);
      setSelectedFieldsList(newList2);
    }
    if (index3 >= -1) {
      const newList3 = [...freezedColumnsList];
      newList3.splice(index3, 1);
      setFreezedColumnsList(newList3);
    }
  };

  return (
    <Dialog
      visible={visible}
      className="ppfaDialogForDSBP"
      onHide={hideDialog}
      header={<div className="p-dialog-header1">Customize View</div>}
    >
      <div className="p-fluid popup-details">
        <Row>
          <Col className="dragAndDropColumnPaddingRight">
            <div className="dragAndDropColumnData">Available Fields</div>
            <div className="dragAndDropColumn">
              <Droppable
                types={["drop1"]}
                className="dragAndDrop100"
                data="Hello"
                onDrop={(e, e1) => onItemDrop(e, e1)}
              >
                <DraggableList list={availableFieldsList} type="drop2" />
              </Droppable>
            </div>
          </Col>
          <Col className="dragAndDropColumnPaddingRight">
            <div className="dragAndDropColumnData">Selected Fields</div>
            <div className="dragAndDropColumn">
              <Droppable
                types={["drop2"]}
                className="dragAndDrop100"
                onDrop={(e) =>
                  onAppointmentDrop(
                    e,
                    availableFieldsList,
                    selectedFieldsList,
                    setAvailableFieldsList,
                    setSelectedFieldsList,
                    "drop2"
                  )
                }
              >
                <DraggableList list={selectedFieldsList} type="drop1" />
              </Droppable>
            </div>
          </Col>
          <Col>
            <div className="dragAndDropColumnData">Freezed Columns</div>
            <div className="dragAndDropColumn cursorDefault">
              <Droppable
                types={["drop1"]}
                className="dragAndDrop100"
                onDrop={(e) =>
                  onAppointmentDrop(
                    e,
                    selectedFieldsList,
                    freezedColumnsList,
                    setSelectedFieldsList,
                    setFreezedColumnsList,
                    "drop1"
                  )
                }
              >
                <DraggableList list={freezedColumnsList} type="drop2" />
              </Droppable>
            </div>
          </Col>
        </Row>
      </div>
      <div className="form-buttons dsbp-form-buttons">
        <Button
          className="btn button-layout firstAndSecond"
          variant="secondary"
          onClick={() => hideDialog()}
        >
          Cancel
        </Button>

        <Button
          className="btn button-layout firstAndSecond"
          variant="secondary"
          onClick={() => resetToPGDefault()}
        >
          Reset to P&G Default
        </Button>

        <Button
          className="btn button-layout updateButton"
          variant="primary"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </div>
    </Dialog>
  );
};

export default CustomizeViewDialog;
