/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { uploadFileAzure } from "../../../store/actions/AzureFileActions";
import { submitCPPFA } from "../../../store/actions/taskDetailAction";
import { changeDateFormat, hasAllAccess } from "../../../utils";
import { FileUpload } from "primereact/fileupload";
import { NavLink, useLocation } from "react-router-dom";
import upload1 from "../../../assets/images/upload1.svg";
import { getTasks } from "../../../store/actions/TaskActions";
import "./index.scss";

const CPPFA = ({
  showTaskDialog,
  selectedTaskData,
  onClose,
  pegadata,
  TaskDetailsData,
  userInformation,
  getProjectPlanApi,
}) => {
  const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");

  const [visible, setVisible] = useState(showTaskDialog);
  const [designIntent, setDesignIntent] = useState({});
  const [version, setVersion] = useState("V0");
  // let allAccess = hasAllAccess();
  const allAccess = true;
  let isAccessEmpty = allAccess;

  // if (url[1] === "AllTasks") {
  //   isAccessEmpty = true;
  // } else if (url[1] === "MyTasks" || url[2] === "projectPlan") {
  //   isAccessEmpty = false;
  // }
  const dispatch = useDispatch();

  console.log("pranali check is access", isAccessEmpty, url[1]);

  const { TaskID, ProjectID } = selectedTaskData;
  const [cppfaDialogFlag, setCppfaDialogFlag] = useState(false);

  useEffect(() => {
    setVisible(showTaskDialog);
  }, [showTaskDialog]);

  // useEffect(() => {
  //   dispatch(getProjectPlanApi(TaskID, ProjectID));
  // }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    if (TaskDetailsData) {
      setDesignIntent(TaskDetailsData?.ArtworkAgilityTasks[0] || {});
    }
    if (designIntent) {
      designIntent.FileMetaDataList?.find((el) => {
        if (el.Version !== "" && el.Version !== null) {
          setVersion(el.Version);
        }
      });
      if (
        designIntent.RiskLevel !== undefined &&
        designIntent.RiskLevel !== ""
      ) {
        setRiskLevel(designIntent.RiskLevel);
      }
      pegadata.find((el) => {
        if (
          (el.AWM_Project_ID === ProjectID &&
            el.Task === "Define Color Development & Print Trial") ||
          (el.AWM_Project_ID === ProjectID &&
            el.Task_Name === "Define New Print Feasibility scope")
        ) {
          setCppfaDialogFlag(true);
        }
      });
      console.log("TaskDetailsData:", TaskDetailsData);
    }
  }, [TaskDetailsData]);

  const hideDialog = () => {
    setVisible(false);
    onClose();
  };
  const [riskLevel, setRiskLevel] = useState("Low");
  const [highRiskYesOrNo, setHighRiskYesOrNo] = useState("");
  const [yesOrNo, setYesOrNo] = useState("");

  const setRiskLevelFunc = (level) => {
    setRiskLevel(level);
    const data = { ...designIntent };
    data.RiskLevel = level;
    setDesignIntent(data);
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
    setFormattedValue(file.size);
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
    const fileSize = Math.round(formattedValue / 1000000);
    const formData = {
      caseTypeID: "PG-AAS-Work-ConfirmPreliminaryPrintFeasibilityAssessment",
      content: {
        RiskLevel: riskLevel,
        NPFNeeded: cppfaDialogFlag ? String(false) : String(yesOrNo === "yes"),
        AWMTaskID: selectedTaskData.TaskID,
        AWMProjectID: ProjectID,
        Size: fileSize === 0 ? "1" : fileSize,
        Version: version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
        Filename: fileName ? fileName.split(".").slice(0, -1).join(".") : null,
      },
    };

    if (riskLevel !== "Low" && !cppfaDialogFlag && yesOrNo === "") {
      setHighRiskYesOrNo("selectYesOrNo");
    } else {
      await dispatch(uploadFileAzure(azureFile));
      await submitCPPFA(
        formData,
        `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`,
        headers
      );
      hideDialog();
      if (url[2] === "projectPlan") {
        getProjectPlanApi();
      } else if (url[1] === "MyTasks") {
        await dispatch(getTasks(userInformation));
      }
    }
  };

  const chooseOptions = {
    icon: <img src={upload1} alt="upload" className="uploadIcon" />,
    iconOnly: false,
    className: "",
  };
  const myProjects = url[1];

  const onValidationFail = (uploadData) => {
    if (uploadData.size > 1000000) {
      setFileName(null);
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
                  <NavLink to={`/${myProjects}`} className="p-menuitem-link">
                    <span className="p-menuitem-text">
                      {url[1] === "myProjects"
                        ? "My Projects"
                        : url[1] === "MyTasks"
                        ? "My Tasks"
                        : url[1] === "AllTasks"
                        ? "All Tasks"
                        : "All Projects"}
                    </span>
                  </NavLink>
                </li>
                <li className="p-breadcrumb-chevron pi pi-chevron-right piChevronRightMargin"></li>
                {url.length > 2 ? (
                  <>
                    <li className="">
                      <NavLink
                        to={`/${url[1]}/${url[2]}/${ProjectID}`}
                        className="p-menuitem-link"
                      >
                        <span className="p-menuitem-text">
                          {url[2] === "projectPlan"
                            ? "Project Plan"
                            : "All Projects"}
                        </span>
                      </NavLink>
                    </li>
                    <li className="p-breadcrumb-chevron pi pi-chevron-right piChevronRightMargin"></li>
                  </>
                ) : (
                  ""
                )}
                <li className="">
                  <a href="#" className="p-menuitem-link">
                    <span className="p-menuitem-text">
                      Preliminary Print Feasibility Assessment
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="p-dialog-header1">{designIntent.Project_Name}</div>
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
                  checked={
                    designIntent.RiskLevel === "Low" ||
                    designIntent.RiskLevel === ""
                  }
                  onChange={(e) => setRiskLevelFunc(e.target.value)}
                  disabled={
                    isAccessEmpty || designIntent.Task_Status === "Complete"
                  }
                />
                <label className="radioLabel">Low Risk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="Medium"
                  checked={designIntent.RiskLevel === "Medium"}
                  onChange={(e) => setRiskLevelFunc(e.target.value)}
                  disabled={
                    isAccessEmpty || designIntent.Task_Status === "Complete"
                  }
                />
                <label className="radioLabel">Medium Risk</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="High"
                  checked={designIntent.RiskLevel === "High"}
                  onChange={(e) => setRiskLevelFunc(e.target.value)}
                  disabled={
                    isAccessEmpty || designIntent.Task_Status === "Complete"
                  }
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
                    {designIntent.FileMetaDataList &&
                    designIntent.FileMetaDataList.length > 0 ? (
                      designIntent.FileMetaDataList[0].File_Name === "" ? (
                        <>
                          <span>Drop or Browse file here</span> <br />
                          <span className="fileSupportedData">
                            File supported: PDF, DOCX, JPEG
                          </span>
                        </>
                      ) : (
                        designIntent.FileMetaDataList[0].File_Name
                      )
                    ) : (
                      <>
                        <span>Drop or Browse file here</span> <br />
                        <span className="fileSupportedData">
                          File supported: PDF, DOCX, JPEG
                        </span>
                      </>
                    )}
                  </p>
                }
                disabled={
                  isAccessEmpty || designIntent.Task_Status === "Complete"
                }
                onValidationFail={(e) => onValidationFail(e)}
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
                  disabled={
                    isAccessEmpty ||
                    cppfaDialogFlag ||
                    designIntent.Task_Status === "Complete"
                  }
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`btn highRiskButton ${
                    yesOrNo === "no" ? "yesOrNoButtonsColor" : "btn-secondary"
                  }`}
                  onClick={() => setYesOrNo("no")}
                  disabled={
                    isAccessEmpty ||
                    cppfaDialogFlag ||
                    designIntent.Task_Status === "Complete"
                  }
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
        {designIntent.Task_Status === "Complete" ? (
          <Button label="Confirm PPFA" onClick={handleSubmit} disabled />
        ) : (
          <Button
            label="Confirm PPFA"
            onClick={handleSubmit}
            disabled={
              isAccessEmpty || riskLevel !== "Low"
                ? cppfaDialogFlag
                  ? false
                  : yesOrNo === ""
                : false
            }
          />
        )}
      </div>
    </Dialog>
  );
};

export default CPPFA;
