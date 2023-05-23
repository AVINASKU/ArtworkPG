import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import { BreadCrumb } from "primereact/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { changeDateFormat } from "../../../utils";
import { FileUpload } from "primereact/fileupload";

import "./index.scss";

const CPPFA = ({ showTaskDialog, selectedTaskData, onClose }) => {
  const [visible, setVisible] = useState(showTaskDialog);
  const [designIntent, setDesignIntent] = useState([]);

  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  console.log("props", TaskDetailsData);

  const { TaskID, ProjectID } = selectedTaskData;

  useEffect(() => {
    setVisible(showTaskDialog);
  }, [showTaskDialog]);

  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    if (TaskDetailsData) {
      setDesignIntent(TaskDetailsData?.ArtworkAgilityTasks[0] || []);
    }
  }, [TaskDetailsData]);

  const handleSubmit = () => {
    // Code to handle form submission
    const helpNeededData = {
      taskName: selectedTaskData?.map((task) => task.TaskName).join(", "),
    };
    const delegateData = {
      taskName: selectedTaskData?.map((task) => task.TaskName).join(", "),
    };
  };

  const hideDialog = () => {
    setVisible(false);
    onClose();
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
          <div className="p-dialog-header1">{designIntent.Task_Name}</div>
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
            <Col>{designIntent.Duration}</Col>
            <Col>{changeDateFormat(designIntent.Start_Date)}</Col>
            <Col>{changeDateFormat(designIntent.End_Date)}</Col>
            <Col className="ppfaDialogTextColor">
              {designIntent.Consumed_Buffer}
            </Col>
          </Row>
          <br />
          <Row>
            <Col>Risk Level*</Col>
            {/* <Col>Upload (optional)</Col> */}
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
            <Col>
              <FileUpload
                name="demo[]"
                url={"/api/upload"}
                multiple
                accept="image/*"
                maxFileSize={1000000}
                emptyTemplate={
                  <p className="m-0">Drag and drop files to here to upload.</p>
                }
              />
            </Col>
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
