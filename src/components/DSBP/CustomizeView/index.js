import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import { Draggable, Droppable } from "react-drag-and-drop";
import "./index.scss";
import _ from "lodash";

const CPPFA = ({ showTaskDialog, onClose }) => {
  const objects1 = [
    {
      ID: 7,
      Color: "blue",
    },
    {
      ID: 8,
      Color: "red",
    },
    {
      ID: 9,
      Color: "green",
    },
    {
      ID: 10,
      Color: "purple",
    },
  ];

  const objects2 = [
    {
      ID: 1,
      Color: "yellow",
    },
    {
      ID: 2,
      Color: "orange",
    },
    {
      ID: 3,
      Color: "brown",
    },
  ];
  const objects3 = [
    {
      ID: 11,
      Color: "Test1",
    },
    // {
    //   ID: 12,
    //   Color: "Test2",
    // },
    // {
    //   ID: 13,
    //   Color: "Test3",
    // },
  ];

  const [list1, setList1] = React.useState(objects1);
  const [list2, setList2] = React.useState(objects2);
  const [list3, setList3] = React.useState(objects3);

  const [visible, setVisible] = useState(showTaskDialog);

  useEffect(() => {
    setVisible(showTaskDialog);
  }, [showTaskDialog]);

  useEffect(() => {
    if (_.isEqual(list2.sort(), list3.sort())) {
      console.log("list3:", list3);
    }
  }, [list3]);

  const hideDialog = () => {
    setVisible(false);
    onClose();
  };

  const resetToPGDefault = () => {
    setList3([]);
  };

  const handleSubmit = async () => {
    localStorage.setItem("dsbpFreezedColumnsData", JSON.stringify(list3));
    await hideDialog();
  };

  const DraggableList = ({ list, type }) => {
    return (
      <div>
        {list.map(({ Color, ID }) => (
          <Draggable type={type} data={ID} key={ID}>
            <div>{Color}</div>
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
    const index = list1Data.findIndex(
      (obj) => obj.ID === parseInt(data[dropType], 10)
    );
    if (index >= -1) {
      const newList1 = [...list1Data];
      if (dropType === "drop1") {
        if (!_.includes(list2Data, list1Data[index])) {
          setList2Func([...list2Data, list1Data[index]]);
        }
      } else {
        setList2Func([...list2Data, list1Data[index]]);
        newList1.splice(index, 1);
      }
      setList1Func(newList1);
    }
  };

  const onItemDrop = (data, data1) => {
    console.log("dropType data:", data1);
    const index = list2.findIndex((obj) => obj.ID === parseInt(data.drop1, 10));
    if (index >= -1) {
      setList1([...list1, { ...list2[index] }]);
      const newList2 = [...list2];
      newList2.splice(index, 1);
      setList2(newList2);
    }
  };

  return (
    <Dialog
      visible={visible}
      className="ppfaDialog"
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
                onDrop={(e, e1) => onItemDrop(e, e1)}
              >
                <DraggableList list={list1} type="appointment" />
              </Droppable>
            </div>
          </Col>
          <Col className="dragAndDropColumnPaddingRight">
            <div className="dragAndDropColumnData">Selected Fields</div>
            <div className="dragAndDropColumn">
              <Droppable
                types={["appointment"]}
                className="dragAndDrop100"
                onDrop={(e) =>
                  onAppointmentDrop(
                    e,
                    list1,
                    list2,
                    setList1,
                    setList2,
                    "appointment"
                  )
                }
              >
                <DraggableList list={list2} type="drop1" />
              </Droppable>
            </div>
          </Col>
          <Col>
            <div className="dragAndDropColumnData">Freezed Columns</div>
            <div className="dragAndDropColumn">
              <Droppable
                types={["drop1"]}
                className="dragAndDrop100"
                onDrop={(e) =>
                  onAppointmentDrop(
                    e,
                    list2,
                    list3,
                    setList2,
                    setList3,
                    "drop1"
                  )
                }
              >
                <DraggableList list={list3} type="" />
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

export default CPPFA;
