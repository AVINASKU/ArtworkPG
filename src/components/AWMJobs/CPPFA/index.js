import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { changeDateFormat } from "../../../utils";
import { FileUpload } from "primereact/fileupload";
import { NavLink, useLocation } from "react-router-dom";
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
    setHighRiskYesOrNo("selectYesOrNo");
  };

  const hideDialog = () => {
    setVisible(false);
    onClose();
  };
  const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");

  const [riskLevel, setRiskLevel] = useState("lowRisk");
  const [highRiskYesOrNo, setHighRiskYesOrNo] = useState("");
  const [yesOrNo, setYesOrNo] = useState("");

  const setRiskLevelFunc = (level) => {
    setRiskLevel(level);
    if (level === "lowRisk") {
      setHighRiskYesOrNo("");
      setYesOrNo("");
    }
  };

  return (
    <Dialog
      visible={visible}
      className="ppfaDialog"
      onHide={hideDialog}
      header={
        <div>
          <div>
            <nav className="p-breadcrumb p-component" aria-label="Breadcrumb">
              <ul>
                <li className="p-breadcrumb-chevron pi pi-chevron-right"></li>
                <li className="">
                  <NavLink
                    to={`/${url[1]}`}
                    className="p-menuitem-link"
                    onClick={() => hideDialog()}
                  >
                    <span className="p-menuitem-text">
                      {url[1] === "projectPlan"
                        ? "Project Setup"
                        : "All Projects"}
                    </span>
                  </NavLink>
                </li>
                <li className="p-breadcrumb-chevron pi pi-chevron-right"></li>
                <li className="">
                  <a href="#" className="p-menuitem-link">
                    <span className="p-menuitem-text">
                      {url[1] === "projectPlan" ? "Project Plan" : ""}
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
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
                  value="lowRisk"
                  onChange={(e) => setRiskLevelFunc(e.target.value)}
                />
                <label className="radioLabel">Low Risk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="mediumRisk"
                  onChange={(e) => setRiskLevelFunc(e.target.value)}
                />
                <label className="radioLabel">Medium Risk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="highRisk"
                  onChange={(e) => setRiskLevelFunc(e.target.value)}
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
          <Row
            hidden={riskLevel === "lowRisk"}
            className={
              (riskLevel !== "lowRisk" && highRiskYesOrNo === "") ||
              yesOrNo !== ""
                ? "highRiskDataPaddingBottom"
                : ""
            }
          >
            <Col
              className={`highRiskData ${
                yesOrNo === "" && highRiskYesOrNo !== ""
                  ? "highRiskErrorBorderColor"
                  : ""
              }`}
            >
              <div className="highRiskDataColor">
                Print Feasibility Assessment is High Risk whereas there is no
                Color Development in scope of this project. Do you want to add
                Color Development to the project scope?
              </div>
              <div className="highRiskButtons">
                <button
                  type="button"
                  className={`btn highRiskButton ${
                    yesOrNo === "yes" ? "yesOrNoButtonsColor" : "btn-secondary"
                  }`}
                  onClick={() => setYesOrNo("yes")}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`btn highRiskButton ${
                    yesOrNo === "no" ? "yesOrNoButtonsColor" : "btn-secondary"
                  }`}
                  onClick={() => setYesOrNo("no")}
                >
                  No
                </button>
              </div>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row
            hidden={
              riskLevel === "lowRisk" ||
              yesOrNo !== "" ||
              highRiskYesOrNo === ""
            }
          >
            <Col className="highRiskError">
              *Please select Yes/No in order to proceed further.
            </Col>
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
