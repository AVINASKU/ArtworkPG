/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileAzure } from "../../../store/actions/AzureFileActions";
import {
  getTaskDetails,
  submitCPPFA,
} from "../../../store/actions/taskDetailAction";
import { changeDateFormat } from "../../../utils";
import { FileUpload } from "primereact/fileupload";
import { NavLink, useLocation } from "react-router-dom";
import upload1 from "../../../assets/images/upload1.svg";
import "./index.scss";

const CPPFA = ({ showTaskDialog, selectedTaskData, onClose, pegadata }) => {
  const [visible, setVisible] = useState(showTaskDialog);
  const [designIntent, setDesignIntent] = useState({});
  const [version, setVersion] = useState("V0");

  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );

  const { TaskID, ProjectID } = selectedTaskData;
  const [cppfaDialogFlag, setCppfaDialogFlag] = useState(false);

  useEffect(() => {
    setVisible(showTaskDialog);
  }, [showTaskDialog]);

  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    if (TaskDetailsData) {
      setDesignIntent(TaskDetailsData?.ArtworkAgilityTasks[0] || {});
    }
    if (designIntent) {
      designIntent.FileMetaDataList?.find((el) => {
        if(el.Version !== "" && el.Version !== null){
          setVersion(el.Version);
        }
      });
    }
  }, [TaskDetailsData]);

  useEffect(() => {
    pegadata.find((el) => {
      if (el.Task === "Define New Print Feasibility scope") {
        setCppfaDialogFlag(true);
      }
    });
  }, []);

  const hideDialog = () => {
    setVisible(false);
    onClose();
  };
  const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");

  const [riskLevel, setRiskLevel] = useState("Low");
  const [highRiskYesOrNo, setHighRiskYesOrNo] = useState("");
  const [yesOrNo, setYesOrNo] = useState("");

  const setRiskLevelFunc = (level) => {
    setRiskLevel(level);
    if (level === "Low") {
      setHighRiskYesOrNo("");
      setYesOrNo("");
    }
  };

  const [fileName, setFileName] = useState(null);
  const [formattedValue, setFormattedValue] = useState(null);
  const [azureFile, setAzureFile] = useState(null);

  const itemTemplate = (file, props) => {
    setFileName(file.name);
    setFormattedValue(
      props.formatSize.substring(0, props.formatSize.length - 3)
    );
    setAzureFile(file);
    return (
      <div className="upload-row">
        <img
          alt={file.name}
          role="presentation"
          src={file.objectURL}
          width={50}
        />
        <div className="flex flex-column text-left ml-3">{file.name}</div>
      </div>
    );
  };

  const handleSubmit = async () => {
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    const formData = {
      caseTypeID: "PG-AAS-Work-ConfirmPreliminaryPrintFeasibilityAssessment",
      content: {
        RiskLevel: riskLevel,
        NPFNeeded: cppfaDialogFlag ? false : yesOrNo === "yes",
        AWMTaskID: selectedTaskData.TaskID,
        AWMProjectID: selectedTaskData.ProjectID,
        Size: formattedValue,
        Version: version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
        Filename: fileName,
      },
    };

    await dispatch(uploadFileAzure(azureFile));
    await submitCPPFA(
      formData,
      `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`,
      headers
    );

    setHighRiskYesOrNo("selectYesOrNo");
    hideDialog();
  };

  const chooseOptions = {
    icon: <img src={upload1} alt="upload" className="uploadIcon" />,
    iconOnly: false,
    className: "",
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
                      {url[1] === "myProjects"
                        ? "My Projects"
                        : url[1] === "projectPlan"
                        ? "Project Plan"
                        : "All Projects"}
                    </span>
                  </NavLink>
                </li>
                <li className="p-breadcrumb-chevron pi pi-chevron-right"></li>
                <li className="">
                  <NavLink
                    to={`/${url[2]}`}
                    className="p-menuitem-link"
                    onClick={() => hideDialog()}
                  >
                    <span className="p-menuitem-text">
                      {url[2] === "projectPlan" ? "Project Plan" : ""}
                    </span>
                  </NavLink>
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
                  value="Low"
                  onChange={(e) => setRiskLevelFunc(e.target.value)}
                />
                <label className="radioLabel">Low Risk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="Medium"
                  onChange={(e) => setRiskLevelFunc(e.target.value)}
                />
                <label className="radioLabel">Medium Risk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="High"
                  onChange={(e) => setRiskLevelFunc(e.target.value)}
                />
                <label className="radioLabel">High Risk</label>
              </div>
            </Col>
            <Col>
              <FileUpload
                name="demo[]"
                url={"/api/upload"}
                // multiple
                accept="image/*"
                maxFileSize={1000000}
                chooseOptions={chooseOptions}
                itemTemplate={itemTemplate}
                emptyTemplate={
                  <p className="m-0">
                    Drop or Browse file here <br />
                    <span className="fileSupportedData">
                      File supported: PDF, DOCX, JPEG
                    </span>
                  </p>
                }
              />
            </Col>
            <Col></Col>
          </Row>
          <Row
            hidden={riskLevel === "Low" || cppfaDialogFlag}
            className={
              (riskLevel !== "Low" && highRiskYesOrNo === "") || yesOrNo !== ""
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
              riskLevel === "Low" || yesOrNo !== "" || highRiskYesOrNo === ""
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
