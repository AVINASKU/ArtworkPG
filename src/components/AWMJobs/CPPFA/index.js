import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import "./index.scss";
import { NavLink, useLocation } from "react-router-dom";

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
    setHighRiskYesOrNo("selectYesOrNo");
  };

  const hideDialog = () => {
    setVisible(false);
    props.onClose();
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
            <Col>UploadFile</Col>
            <Col></Col>
          </Row>
          <Row
            hidden={riskLevel === "lowRisk"}
            className={
              (riskLevel !== "lowRisk" && highRiskYesOrNo === "" || yesOrNo !== "")
                ? "highRiskDataPaddingBottom"
                : ""
            }
          >
            <Col
              className={`highRiskData ${
                yesOrNo === "" && highRiskYesOrNo !== "" ? "highRiskErrorBorderColor" : ""
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
                  className={`btn highRiskButton ${yesOrNo === "yes" ? "yesOrNoButtonsColor" : "btn-secondary"}`}
                  onClick={() => setYesOrNo("yes")}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`btn highRiskButton ${yesOrNo === "no" ? "yesOrNoButtonsColor" : "btn-secondary"}`}
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
          <Row hidden={riskLevel === "lowRisk" || yesOrNo !== "" || highRiskYesOrNo === ""}>
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
