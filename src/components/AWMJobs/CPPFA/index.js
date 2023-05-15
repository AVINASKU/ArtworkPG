import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import { BreadCrumb } from "primereact/breadcrumb";
import "./index.scss";

const CPPFA = (props) => {
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
  };

  const hideDialog = () => {
    setVisible(false);
    props.onClose();
  };

  const items = [{ label: "Project Setup" }, { label: "Project Plan" }];

  return (
    <Dialog
      visible={visible}
      className="ppfaDialog"
      onHide={hideDialog}
      header={
        <div>
          <div>
            <BreadCrumb model={items} className="ppfaDialogBreadCrumb" />
          </div>
          <div className="p-dialog-header1">
            Paste Mulsanne Oral-B Medical Device Europe
          </div>
        </div>
      }
    >
      <div className="p-fluid popup-details ppfaDialogBorder">
        <div className="p-field">
          <Row>
            <Col>Duration (Days)</Col>
            <Col>Start Date</Col>
            <Col>End Date</Col>
            <Col>Consumed Buffer</Col>
          </Row>
          <Row>
            <Col>15 Days</Col>
            <Col>20-Mar-23</Col>
            <Col>04-Apr-23</Col>
            <Col className="ppfaDialogTextColor">+2</Col>
          </Row>
          <br />
          <Row>
            <Col>Risk Level*</Col>
            <Col>Upload (optional)</Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <div>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="HTML"
                />
                <label className="radioLabel">Low Risk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="HTML"
                />
                <label className="radioLabel">Medium Risk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="HTML"
                />
                <label className="radioLabel">High Risk</label>
              </div>
            </Col>
            <Col>UploadFile</Col>
            <Col></Col>
          </Row>
        </div>
      </div>
      <div className="p-dialog-footer confirmPPFA">
        <Button label="Confirm PPFA" onClick={handleSubmit} />
      </div>
    </Dialog>
  );
};

export default CPPFA;
