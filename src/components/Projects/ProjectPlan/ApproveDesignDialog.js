import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import "./index.scss";

const ApproveDesignDialog = (props) => {
  const [visible, setVisible] = useState(props.showTaskDialog);

  useEffect(() => {
    setVisible(props.showTaskDialog);
  }, [props.showTaskDialog]);

  const handleSubmit = () => {
    // Code to handle form submission
    const helpNeededData = {
      taskName: props?.selectedTaskData
        ?.map((task) => task.TaskName)
        .join(", "),
    };
    const delegateData = {
      taskName: props?.selectedTaskData
        ?.map((task) => task.TaskName)
        .join(", "),
    };
    console.log(helpNeededData, delegateData);
  };

  const hideDialog = () => {
    setVisible(false);
    props.onClose();
  };

  const cities = [
    { name: "Upload Design Template 2", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <Dialog
      visible={visible}
      style={{ width: "50vw" }}
      onHide={hideDialog}
      header="Approve Design Template 2"
    >
      <div className="p-fluid popup-details">
        <div className="p-field">
          <Row className="columnBorder">
            <Col>Approval Sequence</Col>
            <Col>Role</Col>
            <Col>Owner</Col>
            <Col>Over Rule</Col>
          </Row>
          <Row className="columnBorder1">
            <Col>
              <select className="dropdownStyles">
                <option value="">Select</option>
                {cities.map((obj, index) => (
                  <option key={index + 1} value={obj.code}>
                    {obj.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <div className="textAlignLeft">
                <label for="Approver1">Approver 1</label>
              </div>
              <select name="Approver1" className="dropdownStyles">
                <option value="">Select</option>
                {cities.map((obj, index) => (
                  <option key={index + 1} value={obj.code}>
                    {obj.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <div className="visuallyHidden">
                <label for="Approver1">1</label>
              </div>
              <select name="Approver2" className="dropdownStyles">
                <option value="">Select</option>
                {cities.map((obj, index) => (
                  <option key={index + 1} value={obj.code}>
                    {obj.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <div className="visuallyHidden">
                <label for="Approver1">2</label>
              </div>
               <input type="radio" id="html" name="fav_language" value="HTML" />
            </Col>
          </Row>
          <Row className="columnBorder2">
            <Col></Col>
            <Col>
              <div className="textAlignLeft">
                <label for="Approver2">Approver 2</label>
              </div>
              <select name="Approver2" className="dropdownStyles">
                <option value="">Select</option>
                {cities.map((obj, index) => (
                  <option key={index + 1} value={obj.code}>
                    {obj.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <div className="visuallyHidden">
                <label for="Approver1">3</label>
              </div>
              <select name="Approver2" className="dropdownStyles">
                <option value="">Select</option>
                {cities.map((obj, index) => (
                  <option key={index + 1} value={obj.code}>
                    {obj.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <div className="visuallyHidden">
                <label for="Approver1">4</label>
              </div>
               <input type="radio" id="html" name="fav_language" value="HTML" />
            </Col>
          </Row>
        </div>
      </div>
      <div className="p-dialog-footer submitButton">
        <Button label="Submit" onClick={handleSubmit} />
      </div>
    </Dialog>
  );
};

export default ApproveDesignDialog;
