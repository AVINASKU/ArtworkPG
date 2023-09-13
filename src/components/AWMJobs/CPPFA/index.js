/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileAzure } from "../../../store/actions/AzureFileActions";
import { submitCPPFA } from "../../../store/actions/taskDetailAction";
import { changeDateFormat, hasAllAccess, Loading } from "../../../utils";
import { FileUpload } from "primereact/fileupload";
import { NavLink, useLocation } from "react-router-dom";
import upload1 from "../../../assets/images/upload1.svg";
import { getTasks } from "../../../store/actions/TaskActions";
import "./index.scss";
import { downloadFileAzure } from "../../../store/actions/AzureFileDownload";
import { Image } from "primereact/image";
import { CppfaPopOverBtn } from "./CPPFAStyled";
import TaskDetailsReducer from './../../../store/reducers/TaskDetailsReducer';
const CPPFA = ({
  showTaskDialog,
  selectedTaskData,
  onClose,
  pegadata,
  TaskDetailsData,
  userInformation,
  getProjectPlanApi,
  fullResponse,
}) => {
console.log("first", pegadata)
  const location = useLocation();
  const locationPath = location?.pathname;
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const BU = selectedProjectDetails?.BU;
  const projectName = selectedProjectDetails?.Project_Name;
  const url = locationPath?.split("/");
  const [loader, setLoader] = useState(false);

  const [visible, setVisible] = useState(showTaskDialog);
  const [taskDetailsDataObj, setTaskDetailsDataObj] = useState(null);
  const [newPrintFeasibilityFlag, setNewPrintFeasibilityFlag] = useState(null);
  const [version, setVersion] = useState("V0");
 
 

  // shivu
  

  const fullpageInfo = useSelector(state =>state.TaskDetailsReducer.TaskDetailsData)

  // let allAccess = hasAllAccess();
  const allAccess = true;
  let isAccessEmpty = !allAccess;

  const dispatch = useDispatch();

  const { ProjectID } = selectedTaskData;
  const [cppfaDialogFlag, setCppfaDialogFlag] = useState(false);

  useEffect(() => {
    setLoader(true);
    if (TaskDetailsData) {
      setTaskDetailsDataObj(TaskDetailsData?.ArtworkAgilityTasks[0] || {});
      setNewPrintFeasibilityFlag(
        TaskDetailsData?.ArtworkAgilityPage?.New_Print_Feasibility || false
      );
    }
    if (taskDetailsDataObj) {
      taskDetailsDataObj?.FileMetaDataList?.find((el) => {
        if (el.Version !== "" && el.Version !== null) {
          setVersion(el.Version);
        }
      });
      pegadata.find((el) => {
        if (
          (el.AWM_Project_ID === ProjectID &&
            el.Task === "Define Color Development & Print Trial") ||
          (el.AWM_Project_ID === ProjectID &&
            (el.Task_Name === "Define New Print Feasibility scope" ||
              el.Task_Name ===
                "Confirm Preliminary Print Feasibility Assessment"))
        ) {
          setCppfaDialogFlag(true);
        }
      });
      setLoader(false);
    }
  }, [TaskDetailsData]);

  const hideDialog = () => {
    setVisible(false);
    onClose();
  };
  const [riskLevel, setRiskLevel] = useState("");
  const [highRiskYesOrNo, setHighRiskYesOrNo] = useState("");
  const [yesOrNo, setYesOrNo] = useState("");

  const setRiskLevelFunc = (level) => {
    setRiskLevel(level);
    const data = { ...taskDetailsDataObj };
    data.RiskLevel = level;
    setTaskDetailsDataObj(data);
    setHighRiskYesOrNo("");
    setYesOrNo("");
  };

  const [fileName, setFileName] = useState(null);
  const [formattedValue, setFormattedValue] = useState(null);
  const [azureFile, setAzureFile] = useState(null);
  const [needCppfa, setNeedCppfa] = useState("");
  const [isError, setIsError] =useState(false)
  // shivu code start

  const scopeCd = TaskDetailsData?.ArtworkAgilityPage.New_Print_Feasibility;
  const toggle = (e) => {
    setNeedCppfa(e.target.innerText);
  };

  const getNeedCppfaValue = (param) => {
    let result = "";
    if (param === "") {
      return result;
    } else if (param === "Yes") {
      return (result = "true");
    } else {
      return (result = "false");
    }
  };

  const getCssClass = (beforeCreate, afterCreate) => {
    let finalClass = "";
    if (beforeCreate === "") {
      finalClass = "btn-secondary";
    } else if (afterCreate === "false") {
      finalClass = "btn-primary";
    } else if (afterCreate === "false") {
      finalClass = "btn-secondary";
    } else {
      finalClass = "btn-primary";
    }
    return finalClass;
  };
  // shivu code End

  const styles = {
    activeBg: { background: "#003da5", color: "#fff" },
    disabledBlock: {
      opacity: "0.5",
      pointerEvents: "none",
    },
  };
  const itemTemplate = (file, props) => {
    setFileName(file.name);
    setFormattedValue(file.size);
    setAzureFile(file);
    return (
      <div className="upload-row">
        {/* <div className="card flex justify-content-center">
          <Image
            src={file.objectURL}
            zoomSrc={file.objectURL}
            alt="Image"
            width="60"
            height="60"
            preview
          />
        </div> */}
        <div
          className="flex flex-column text-left ml-3"
          // hidden={
            // file.name.includes(".pdf") ||
            // file.name.includes(".zip") ||
            // file.name.includes(".csv")
          // }
        >
          {file.name}
        </div>
      </div>
    );
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

  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (pegadata !== undefined) {
      pegadata?.forEach((obj) => {
        if (
          obj?.data?.Task === "Define New Print Feasibility Scope" ||
          obj?.data?.Task === "Define Color Development & Print Trial"
        ) {
          setFlag(true);
        }
      });
    } else return;
  }, [pegadata]);

  const [hideFlag, setHideFlag] = useState(false);
  useEffect(() => {
    if (taskDetailsDataObj?.RiskLevel !== undefined) {
      setRiskLevel(taskDetailsDataObj?.RiskLevel?.toLowerCase());
    }
    if (
      taskDetailsDataObj?.RiskLevel?.toLowerCase() === "low" ||
      taskDetailsDataObj?.RiskLevel === ""
    ) {
      setHideFlag(true);
    } else if (newPrintFeasibilityFlag) {
      // setHideFlag(true);
      // } else if (flag && taskDetailsDataObj?.Task_Status !== "Complete" && newPrintFeasibilityFlag) {
      //   setHideFlag(true);
      // } else if (!flag && taskDetailsDataObj?.Task_Status === "Complete" && !newPrintFeasibilityFlag) {
      //   setHideFlag(false);
    } else {
      setHideFlag(false);
    }
  }, [taskDetailsDataObj, flag, showTaskDialog]);

  const handleSubmit = async () => {
    setLoader(true);
    if(needCppfa === ""){
      setIsError(true)
      return false;
    }
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    const fileSize = Math.round(formattedValue / 1000000);
   
    const formData = {
      caseTypeID: "PG-AAS-Work-ConfirmPreliminaryPrintFeasibilityAssessment",
      content: {
        RiskLevel: riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1),
        NPFNeeded: needCppfa,
        // cppfaDialogFlag ? String(false) : String(yesOrNo === "yes"),
        AWMTaskID: selectedTaskData.TaskID,
        AWMProjectID: ProjectID,
        Size: fileName ? (fileSize === 0 ? "1" : fileSize) : null,
        Version: fileName
          ? version.substring(0, 1) + (parseInt(version.substring(1)) + 1)
          : null,
        Filename: fileName ? fileName : null,
      },
    };

    // if (!hideFlag && yesOrNo === "") {
    //   if (riskLevel !== "low" && !cppfaDialogFlag) {
    //     setHighRiskYesOrNo("selectYesOrNo");
    //   }
    // } else {
    azureFile &&
      (await dispatch(
        uploadFileAzure(
          azureFile,
          ProjectID + " " + projectName,
          BU,
          "Print Feasibility Documents"
        )
      ));
    await submitCPPFA(
      formData,
      `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`,
      headers
    );
    setFileName(null);
    hideDialog();
    if (url[2] === "projectPlan") {
      getProjectPlanApi();
    } else if (url[1] === "MyTasks") {
      await dispatch(getTasks(userInformation));
    }
    // }
    setLoader(false);
  };
  const downloadAzure = async (event, fileUrl) => {
    event.preventDefault();
    dispatch(
      downloadFileAzure(
        fileUrl,
        ProjectID + " " + projectName,
        BU,
        "Print Feasibility Documents"
      )
    );
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
                        className="p-menuitem-link">
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
          <div className="p-dialog-header1">
            {taskDetailsDataObj?.Project_Name}
          </div>
        </div>
      }>
      {loader || taskDetailsDataObj === null ? (
        <div className="p-fluid popup-details ppfaDialogBorder">
          <br />
          <br />
          <br />
          <br />
          <Loading />
        </div>
      ) : (
        <>
          <div className="p-fluid popup-details ppfaDialogBorder">
            <div className="p-field">
              <Row>
                <Col>Duration (Days)</Col>
                <Col>Start Date</Col>
                <Col>End Date</Col>
                <Col>Consumed Buffer</Col>
              </Row>
              <Row>
                <Col>{taskDetailsDataObj?.Duration}</Col>
                <Col>{changeDateFormat(taskDetailsDataObj?.Start_Date)}</Col>
                <Col>{changeDateFormat(taskDetailsDataObj?.End_Date)}</Col>
                <Col className="ppfaDialogTextColor">
                  {taskDetailsDataObj?.Consumed_Buffer}
                </Col>
              </Row>
              <br />
              <Row>
                <Col>Risk Level*</Col>
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
                      value="low"
                      checked={riskLevel === "low"}
                      onChange={(e) => setRiskLevelFunc(e.target.value)}
                      disabled={
                        isAccessEmpty ||
                        taskDetailsDataObj?.Task_Status === "Complete"
                      }
                    />
                    <label className="radioLabel">Low Risk</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="medium"
                      checked={riskLevel === "medium"}
                      onChange={(e) => setRiskLevelFunc(e.target.value)}
                      disabled={
                        isAccessEmpty ||
                        taskDetailsDataObj?.Task_Status === "Complete"
                      }
                    />
                    <label className="radioLabel">Medium Risk</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="high"
                      checked={riskLevel === "high"}
                      onChange={(e) => setRiskLevelFunc(e.target.value)}
                      disabled={
                        isAccessEmpty ||
                        taskDetailsDataObj?.Task_Status === "Complete"
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
                    disabled={
                      isAccessEmpty ||
                      taskDetailsDataObj?.Task_Status === "Complete"
                    }
                    onValidationFail={(e) => onValidationFail(e)}
                  />
                  <p className="uploadImage">
                    {taskDetailsDataObj?.FileMetaDataList &&
                    taskDetailsDataObj?.FileMetaDataList.length > 0 ? (
                      taskDetailsDataObj?.FileMetaDataList[0].File_Name ===
                        "" && !fileName ? (
                        <>
                          <span>Drop or Browse file here</span> <br />
                          <span className="fileSupportedData">
                            File supported: PDF, DOCX, JPEG
                          </span>
                        </>
                      ) : (
                        <a
                          className="flex flex-column text-left ml-3"
                          onClick={(event) =>
                            downloadAzure(
                              event,
                              `${taskDetailsDataObj?.FileMetaDataList[0].File_Name}`
                            )
                          }>
                          {taskDetailsDataObj?.FileMetaDataList[0].File_Name}
                        </a>
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
                </Col>
                <Col></Col>
              </Row>
              <Row >

                <Col 
                hidden={ riskLevel==="" || riskLevel==="low" || fullpageInfo["ArtworkAgilityPage"].New_Print_Feasibility}
                  className={`highRiskData`}
                  style={ 
                    taskDetailsDataObj?.Task_Status === "Complete"
                      ? styles.disabledBlock
                      : {}
                  }>
                  <div className="highRiskDataColor">
                    Print Feasibility Assessment is{" "}
                    {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}{" "}
                    Risk whereas there is no Color Development in scope of this
                    project. Do you want to add Color Development to the project
                    scope?
                  </div>

                  <CppfaPopOverBtn>
                    <button
                      type="button"
                      // className={`btn btn-sm
                      // ${getCssClass(needCppfa, taskDetailsDataObj?.NPFNeeded)}`}
                      className={`btn btn-sm ${
                        needCppfa === ""
                          ? "btn-secondary"
                          : needCppfa === "No"
                          ? "btn-primary"
                          : "btn-secondary"
                      } `}
                      style={
                        taskDetailsDataObj?.NPFNeeded === "No"
                          ? styles.activeBg
                          : {}
                      }
                      onClick={(event) => toggle(event)}>
                      No
                    </button>
                    {/* {getCssClass(needCppfa, taskDetailsDataObj?.NPFNeeded)} */}
                    <button
                      type="button"
                      className={`btn btn-sm ${
                        needCppfa === ""
                          ? "btn-secondary"
                          : needCppfa === "No"
                          ? "btn-secondary"
                          : "btn-primary"
                      } `}
                      style={
                        taskDetailsDataObj?.NPFNeeded === "Yes"
                          ? styles.activeBg
                          : {}
                      }
                      onClick={(event) => toggle(event)}>
                      Yes
                    </button>
                  </CppfaPopOverBtn>
                </Col>

                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              {/* hidden={hideFlag || yesOrNo !== "" || highRiskYesOrNo === ""} */}
              <Row>
              <Col className="highRiskError" hidden={!isError ? true : false}>
                    *Please select Yes/No in order to proceed further.
                  </Col>
                
              </Row>
            </div>
          </div>
          <div className="p-dialog-footer confirmPPFA">
            {taskDetailsDataObj?.Task_Status === "Complete" ? (
              <Button label="Confirm PPFA" onClick={handleSubmit} disabled />
            ) : (
              <Button
                label="Confirm PPFA"
                onClick={handleSubmit}
                disabled={
                  isAccessEmpty ||
                  riskLevel === "" ||
                  (riskLevel === "low" ? false : yesOrNo === "" ? false : false)
                }
              />
            )}
          </div>
        </>
      )}
    </Dialog>
  );
};

export default CPPFA;
