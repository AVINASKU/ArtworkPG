import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import UploadBriefingDocuments from "../DesignJobs/UploadBriefingDocuments";
import FooterButtons from "../DesignJobs/FooterButtons";
import {
  saveDefineRegionalDesignTemplate,
  submitDefineRegionalDesignTemplate,
} from "../../../apis/defineRegionalDesignTemplate";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";

import editName from "../../../assets/images/editName.svg";
import TickUBD from "../../../assets/images/TickUBD.svg";
import CrossUBD from "../../../assets/images/CrossUBD.svg";
import { AddNavigation, Loading } from "../../../utils";
import { toLower } from "lodash";
import _ from "lodash";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { CheckReadOnlyAccess } from "../../../utils";
import "../DesignJobs/index.scss";
import "./index.scss";
import {
  deleteUploadBrefingDocs,
  saveAsDraftUploadBrefingDocs,
} from "../../../store/actions/UploadBrefingDocsAction";

const headerName = "Upload Graphic Adaptation Brief Document";
const graphicAdaptionBrief = "Graphic Adaptation Brief*";
const otherReferenceDocs = "Other Reference Documents & Assets";
const fileUploadType = { uploadFile: "Upload File", upVersion: "Up-Version" };
const roleName = "UBD_";

function UBD() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [loader, setLoader] = useState(false);
  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const { allProjects } = useSelector((state) => state.myProject);
  const location = useLocation();
  const currentUrl = location.pathname;
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;

  let breadcrumb = AddNavigation(headerName);

  let bu = userInformation?.bu;
  // if bu is baby care show tire field else not
  let checkBU = toLower(bu) === toLower("Home Care") ? true : false;

  const checkReadWriteAccess = CheckReadOnlyAccess();

  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    let projectData = allProjects.find(
      (project) => project.Project_ID === ProjectID
    );
    setProjectData(projectData);
  }, [projectData]);

  useEffect(() => {
    if (TaskDetailsData) {
      setDesignIntent(
        TaskDetailsData?.ArtworkAgilityTasks[0]?.FileMetaDataList || []
      );
      setData(TaskDetailsData?.ArtworkAgilityTasks[0] || []);
    }
    const data = TaskDetailsData?.ArtworkAgilityTasks[0]?.FileMetaDataList[0] || {};
    if (data) {
      data.Version !== "" && data.Version && setVersion(data.Version);
    }
  }, [TaskDetailsData]);

  const handleCancel = () => {
    return navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const [otherRDDesignIntent, setOtherRDDesignIntent] = useState([]);
  const handleDelete = (index, sectionType) => {
    if(sectionType === graphicAdaptionBrief) {
    const sub = designIntent.map((item, i) => {
      if (i === index) {
        item.Action = "delete";
      }
      return item;
    });
    setDesignIntent(sub);
  }
    if(sectionType === otherReferenceDocs) {
      const sub = otherRDDesignIntent.map((item, i) => {
        if (i === index) {
          item.Action = "delete";
        }
        return item;
      });
      setOtherRDDesignIntent(sub);
  }
    // For Ga Brief and Other reference
    const formData = {
      AWM_Project_ID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      AWM_Task_ID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      Sequence: `${index + 1}`,
      GroupName:
        sectionType === graphicAdaptionBrief ? "GA Brief Adaptation 1" : "",
    };
    deleteUploadBrefingDocs(formData);
  };

  const addNewEmptyDesign = () => {
    designIntent.push({
      Design_Job_ID: designIntent.length + 1,
      isNew: true,
      Additional_Info: "Test",
      Select: false,
      UploadFile: "",
    });
    setDesignIntent(designIntent);
    setUpdated(!updated);
  };

  const addData = (fieldName, index, value, Design_Intent_Name) => {
    if (checkTaskISComplete) return setEnableSubmit(true);
    let data = designIntent[index];
    data[fieldName] = value;
    data["Design_Job_Name"] = Design_Intent_Name;
    submittedDI.push(data);
    let values = false;
    const hasValues = designIntent.every((item) => {
      setEnableSubmit(true);
      if (item.Select) {
      } else {
        let data = designIntent.filter((item) => item.Select);
        if (data.length !== 0) {
          values = true;
        } else {
          values = false;
        }
      }
      return values;
    });
    setEnableSubmit(!hasValues);
    setSubmittedDI(submittedDI);
  };

  const onSubmit = async () => {
    setLoader(true);
    let updatedData = {};
    let updatedDataList = [];
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };

    let submitOnlySelectedData = designIntent.filter(
      (task) => task?.Select === true
    );
    submitOnlySelectedData.map((task) => {
      updatedData = {};
      if (task?.isNew) {
        task.Design_Job_ID = "";
      }
      if (task?.Action === "delete") {
        task.Action = "delete";
      } else if (task?.Action !== "delete" && task?.Design_Job_ID) {
        task.Action = "update";
      } else if (task?.Action !== "delete" && task?.isNew === true)
        task.Action = "add";

      updatedData.DesignJobName = task.Design_Job_Name;
      updatedData.DesignJobID = task.Design_Job_ID;
      updatedData.AdditionalInfo = task.Additional_Info;
      updatedData.Tier = task.Tier;
      updatedData.Select = task.Select ? task.Select : false;
      updatedData.Action = task.Action;

      updatedDataList.push({
        instruction: "APPEND",
        target: "DesignTemplateList",
        content: updatedData,
      });
      return console.log("updatedDataList", updatedDataList);
    });

    let formData = {
      caseTypeID: "PG-AAS-Work-DefineRegionalDesignTemplate",
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      },
      pageInstructions: updatedDataList,
    };
    await submitDefineRegionalDesignTemplate(formData, id, headers);
    setLoader(false);
    navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const onSaveAsDraft = async () => {
    setLoader(true);
    let updatedData = [];
    designIntent.filter((task) => {
      if (task?.isNew) {
        task.Design_Job_ID = "";
      }
      if (task?.Action === "delete") {
        task.Action = "delete";
      } else if (task?.Action !== "delete" && task?.Design_Job_ID) {
        task.Action = "update";
      } else if (task?.Action !== "delete" && task?.isNew === true)
        task.Action = "add";

      updatedData.push({
        Design_Job_Name: task.Design_Job_Name,
        Design_Job_ID: task.Design_Job_ID,
        Tier: task.Tier,
        Additional_Info: task.Additional_Info,
        Select: task.Select ? task.Select : false,
        Action: task.Action,
      });
      return console.log("updatedData", updatedData);
    });

    let formData = {
      AWM_Project_ID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      AWM_Task_ID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      Project_Name: TaskDetailsData?.ArtworkAgilityTasks[0]?.Project_Name,
      BU: projectData?.BU,
      Region: projectData?.Project_region,
      DesignTemplateList: updatedData,
    };

    await saveDefineRegionalDesignTemplate(formData);
    setLoader(false);
  };

  let checkTaskISComplete =
    TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Status === "Complete";

  const [graphicAdaptionBriefName, setGraphicAdaptionBriefName] =
    useState(false);
  // console.log("graphicAdaptionBriefName:", graphicAdaptionBriefName);
  const [editNameImg, setEditNameImg] = useState(true);

  const GABriefHeader = (
    <>
      <div
        style={{
          marginLeft: 20,
          padding: 5,
        }}
        className="font-color"
      >
        Graphic Adaptation Brief*
      </div>
      <div>
        <img
          src={plusCollapseImg}
          alt="filter logo"
          onClick={() => checkReadWriteAccess && addNewEmptyDesign()}
          className="header-icons"
          disabled={!checkReadWriteAccess}
        />{" "}
        Add Files
      </div>
    </>
  );

  const [updated1, setUpdated1] = useState(false);

  const otherRDAddNewEmptyDesign = () => {
    otherRDDesignIntent.push({
      Design_Job_ID: otherRDDesignIntent.length + 1,
      isNew: true,
      Additional_Info: "Test",
      Select: false,
      UpVersion: "",
    });
    setOtherRDDesignIntent(otherRDDesignIntent);
    setUpdated1(!updated1);
  };

  const ORDAssetsHeader = (
    <>
      <div
        style={{
          marginLeft: 20,
          padding: 5,
        }}
        className="font-color"
      >
        Other Reference Documents & Assets
      </div>
      <div>
        <img
          src={plusCollapseImg}
          alt="filter logo"
          onClick={() => checkReadWriteAccess && otherRDAddNewEmptyDesign()}
          className="header-icons"
          disabled={!checkReadWriteAccess}
        />{" "}
        Add Files
      </div>
    </>
  );

  const [version, setVersion] = useState("V0");
  const [saveAsDraftGABriefList, setSaveAsDraftGABriefList] = useState([]);
  const [saveAsDraftOtherReferenceDoc, setSaveAsDraftOtherReferenceDoc] =
    useState([]);

  const getDataSaveAsDraft = (fileInfo, uploadType, sequence) => {
    const fileSize = Math.round(fileInfo.files[0].size / 1000000);
    const obj = {
      File_Name: fileInfo.files[0].name,
      Version: version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
      Size: fileSize === 0 ? "1" : `${fileSize}`,
      Sequence: sequence,
      Action: "add",
    };
    if (
      uploadType === graphicAdaptionBrief + fileUploadType.uploadFile ||
      uploadType === graphicAdaptionBrief + fileUploadType.upVersion
    ) {
      obj.GroupName = "GA Brief Adaptation 1";
      setSaveAsDraftGABriefList([...saveAsDraftGABriefList, obj]);
    }
    if (
      uploadType === otherReferenceDocs + fileUploadType.uploadFile ||
      uploadType === otherReferenceDocs + fileUploadType.upVersion
    ) {
      setSaveAsDraftOtherReferenceDoc([...saveAsDraftOtherReferenceDoc, obj]);
    }
  };

  const onSaveAsDraft1 = async () => {
    setLoader(true);
    const formData = {
      AWM_Project_ID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      AWM_Task_ID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      GABriefList: saveAsDraftGABriefList,
      OtherReferenceDoc: saveAsDraftOtherReferenceDoc,
    };
    // await dispatch(uploadFileAzure(azureFile));
    await saveAsDraftUploadBrefingDocs(formData);
    setLoader(false);
    // navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const [graphicData, setGraphicData] = useState("Graphic Adaption Brief 1");
  const [isEditMode, setIsEditMode] = useState(false);

  const inputEl = useRef(null);
  const updateData = () => {
    onChange();
    setGraphicData(inputEl.current.value);
    console.log("121:", inputEl.current.value);
  };
  const onChange = () => {
    // console.log("e graphicData:", e.target.outerText);
    // setGraphicData(e.target.outerText);
    setIsEditMode(!isEditMode);
  };
  const test = () => (
    <div>
      <input
        type="text"
        className="graphicInput"
        defaultValue={graphicData}
        ref={inputEl}
      />

      <img
        src={TickUBD}
        alt="TickUBD logo"
        onClick={() => {
          updateData();
          // setGraphicAdaptionBriefName(false);
          // setEditNameImg(true);
        }}
        className="header-icons"
        style={{
          borderBottom: "1.5px solid #003DA5",
          paddingRight: "4px",
          marginBottom: "-2px",
        }}
      />
      <img
        src={CrossUBD}
        alt="CrossUBD logo"
        onClick={() => {
          onChange();
          // setGraphicAdaptionBriefName(false);
          // setEditNameImg(true);
          // setGraphicData(graphicData);
        }}
        className="header-icons"
        style={{
          borderBottom: "1.5px solid blue",
          marginRight: "6px",
          marginBottom: "-2px",
        }}
      />
    </div>
  );

  const test1 = () => (
    <div style={{ display: "flex" }}>
      <div>{graphicData}</div>
      <img
        src={editName}
        alt="edit logo"
        onClick={() => {
          // setGraphicAdaptionBriefName(true);
          // setEditNameImg(false);
          onChange();
        }}
        className="header-icons"
        style={{ marginLeft: "12px" }}
      />
    </div>
  );

  console.log("graphicData:", graphicData, editNameImg);
  return (
    <PageLayout>
      <DesignHeader
        setAddNewDesign={() => {}}
        onSelectAll={() => {}}
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Upload Briefing Documents"
        checkReadWriteAccess={checkReadWriteAccess}
        taskName=""
        checkTaskISComplete={checkTaskISComplete}
        closeFlag={true}
        actionButtonsFlag={true}
      />
      <div className="task-details">
        {<AddNewDesign {...data} checkReadWriteAccess={checkReadWriteAccess} />}
        {loading || loader || designIntent === null ? (
          <Loading />
        ) : (
          <>
            {/* Graphic Adaptation Brief* */}
            <div className="design-intent-header">{GABriefHeader}</div>
            <div
              className="graphicAdaptionBrief"
              style={{
                marginLeft: 20,
                padding: 5,
                marginTop: 10,
              }}
            >
              {isEditMode ? test() : test1()}
              {/* <label
                // className={!editNameImg ? "my-condition-class" : ""}
                contentEditable={graphicAdaptionBriefName}
                // contentEditable={false}
                onBlur={onChange}
                style={
                  !editNameImg
                    ? {
                        borderBottom: "1.5px solid #003DA5",
                        paddingRight: "10px",
                      }
                    : { marginRight: "10px" }
                }
              >
                {graphicData}
              </label>
              {editNameImg ? (
                <img
                  src={editName}
                  alt="edit logo"
                  onClick={() => {
                    setGraphicAdaptionBriefName(true);
                    setEditNameImg(false);
                  }}
                  className="header-icons"
                  style={
                    !editNameImg
                      ? {
                          borderBottom: "1.5px solid #003DA5",
                          paddingRight: "4px",
                          paddingBottom: "1px",
                        }
                      : { paddingRight: "4px" }
                  }
                />
              ) : (
                <>
                  <img
                    src={TickUBD}
                    alt="TickUBD logo"
                    onClick={() => {
                      setGraphicAdaptionBriefName(false);
                      setEditNameImg(true);
                    }}
                    className="header-icons"
                    style={
                      !editNameImg
                        ? {
                            borderBottom: "1.5px solid #003DA5",
                            paddingRight: "4px",
                            marginBottom: "-2px",
                          }
                        : { paddingRight: "4px" }
                    }
                  />
                  <img
                    src={CrossUBD}
                    alt="CrossUBD logo"
                    onClick={() => {
                      setGraphicAdaptionBriefName(false);
                      setEditNameImg(true);
                      setGraphicData(graphicData);
                    }}
                    className="header-icons"
                    style={
                      !editNameImg
                        ? {
                            borderBottom: "1.5px solid blue",
                            marginRight: "6px",
                            marginBottom: "-2px",
                          }
                        : { marginRight: "6px" }
                    }
                  />
                </>
              )} */}
            </div>
            {designIntent &&
              designIntent.length > 0 &&
              designIntent.map((item, index) => {
                if (item && item?.Action !== "delete") {
                  return (
                    <UploadBriefingDocuments
                      key={item.Design_Job_ID}
                      // {...data}
                      item={item}
                      index={index}
                      handleDelete={handleDelete}
                      checkReadWriteAccess={checkReadWriteAccess}
                      length={designIntent.length}
                      fileUploadSection={graphicAdaptionBrief}
                      fileUploadType={fileUploadType}
                      getDataSaveAsDraft={getDataSaveAsDraft}
                    />
                  );
                }
              })}
            {/* Other Reference Documents & Assets */}
            <div className="design-intent-header">{ORDAssetsHeader}</div>
            {otherRDDesignIntent &&
              otherRDDesignIntent.length > 0 &&
              otherRDDesignIntent.map((item, index) => {
                if (item && item?.Action !== "delete") {
                  return (
                    <UploadBriefingDocuments
                      key={item.Design_Job_ID}
                      // {...data}
                      item={item}
                      index={index}
                      handleDelete={handleDelete}
                      checkReadWriteAccess={checkReadWriteAccess}
                      length={designIntent.length}
                      fileUploadSection={otherReferenceDocs}
                      fileUploadType={fileUploadType}
                      getDataSaveAsDraft={getDataSaveAsDraft}
                    />
                  );
                }
              })}
          </>
        )}
      </div>
      <FooterButtons
        handleCancel={handleCancel}
        onSaveAsDraft={onSaveAsDraft}
        onSubmit={onSubmit}
        checkReadWriteAccess={checkReadWriteAccess}
        bottomFixed={true}
        formValid={enableSubmit}
        checkTaskISComplete={checkTaskISComplete}
      />
    </PageLayout>
  );
}

export default UBD;
