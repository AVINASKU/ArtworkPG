import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import UploadBriefingDocuments from "../DesignJobs/UploadBriefingDocuments";
import FooterButtons from "../DesignJobs/FooterButtons";
import {
  deleteUploadBrefingDocs,
  saveAsDraftUploadBrefingDocs,
  submitUploadBrefingDocs,
} from "../../../store/actions/UploadBrefingDocsAction";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";

import editName from "../../../assets/images/editName.svg";
import TickUBD from "../../../assets/images/TickUBD.svg";
import CrossUBD from "../../../assets/images/CrossUBD.svg";
import { AddNavigation, Loading } from "../../../utils";
import { getTaskDetails } from "../../../store/actions/taskDetailAction";
import { CheckReadOnlyAccess } from "../../../utils";
import "../DesignJobs/index.scss";
import "./index.scss";

const headerName = "Upload Graphic Adaptation Brief Document";
const graphicAdaptionBrief = "Graphic Adaptation Brief*";
const otherReferenceDocs = "Other Reference Documents & Assets";
const fileUploadType = { uploadFile: "Upload File", upVersion: "Up-Version" };
const roleName = "UBD_";

function UBD() {
  const [data, setData] = useState(null);
  const [gABriefAdaptationForUI, setGABriefAdaptationForUI] = useState([]);
  const [otherRefernceDocsForUI, setOtherRefernceDocsForUI] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [loader, setLoader] = useState(false);
  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const { allProjects } = useSelector((state) => state.myProject);
  const location = useLocation();
  const currentUrl = location.pathname;
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;

  let breadcrumb = AddNavigation(headerName);
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
    const fileMetaDataListData =
      TaskDetailsData?.ArtworkAgilityTasks[0]?.FileMetaDataList || [];
    if (TaskDetailsData) {
      const graphicABData = [],
        otherRDData = [];
      fileMetaDataListData.map((item) => {
        if (item.GroupName === "GA Brief Adaptation 1") {
          graphicABData.push(item);
        }
        if (item.GroupName === "Other Reference Document") {
          otherRDData.push(item);
        }
      });
      setGABriefAdaptationForUI(graphicABData || []);
      setOtherRefernceDocsForUI(otherRDData || []);
      setData(TaskDetailsData?.ArtworkAgilityTasks[0] || []);
    }
    const data = fileMetaDataListData[0] || {};
    if (data) {
      data.Version !== "" && data.Version && setVersion(data.Version);
    }
  }, [TaskDetailsData]);

  const handleCancel = () => {
    return navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const handleDelete = (index, sectionType) => {
    if (sectionType === graphicAdaptionBrief) {
      const subData = gABriefAdaptationForUI.map((item, i) => {
        if (i === index) {
          item.Action = "delete";
        }
        return item;
      });
      setGABriefAdaptationForUI(subData);
    }
    if (sectionType === otherReferenceDocs) {
      const subData = otherRefernceDocsForUI.map((item, i) => {
        if (i === index) {
          item.Action = "delete";
        }
        return item;
      });
      setOtherRefernceDocsForUI(subData);
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
    gABriefAdaptationForUI.push({
      Design_Job_ID: gABriefAdaptationForUI.length + 1,
      isNew: true,
      Additional_Info: "Test",
      Select: false,
      UploadFile: "",
    });
    setGABriefAdaptationForUI(gABriefAdaptationForUI);
    setUpdated(!updated);
  };

  let checkTaskISComplete =
    TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Status === "Complete";

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
          className="heade-plus-icon"
          disabled={!checkReadWriteAccess}
        />{" "}
        Add Files
      </div>
    </>
  );

  const otherRDAddNewEmptyDesign = () => {
    otherRefernceDocsForUI.push({
      Design_Job_ID: otherRefernceDocsForUI.length + 1,
      isNew: true,
      Additional_Info: "Test",
      Select: false,
      UpVersion: "",
    });
    setOtherRefernceDocsForUI(otherRefernceDocsForUI);
    setUpdated(!updated);
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
          className="heade-plus-icon"
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
  const [pageInstructionsData, setPageInstructionsData] = useState([]);

  const getDataSaveAsDraft = (fileInfo, uploadType, sequence) => {
    const fileSize = Math.round(fileInfo.files[0].size / 1000000);
    const obj = {
      File_Name: fileInfo.files[0].name,
      Version: version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
      Size: fileSize === 0 ? "1" : `${fileSize}`,
      Sequence: `${sequence}`,
      Action: "add",
    };
    let data = {};
    if (
      uploadType === graphicAdaptionBrief + fileUploadType.uploadFile ||
      uploadType === graphicAdaptionBrief + fileUploadType.upVersion
    ) {
      obj.GroupName = "GA Brief Adaptation 1";
      setSaveAsDraftGABriefList([...saveAsDraftGABriefList, obj]);
      data = {
        instruction: "APPEND",
        target: "GABriefList",
        content: {
          GroupName: "GA Brief Adaptation 1",
          Sequence: `${sequence}`,
          Action: "",
          Filename: fileInfo.files[0].name,
          Size: fileSize === 0 ? "1" : `${fileSize}`,
          Version:
            version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
        },
      };
    }
    if (
      uploadType === otherReferenceDocs + fileUploadType.uploadFile ||
      uploadType === otherReferenceDocs + fileUploadType.upVersion
    ) {
      setSaveAsDraftOtherReferenceDoc([...saveAsDraftOtherReferenceDoc, obj]);
      data = {
        instruction: "APPEND",
        target: "OtherReferenceDoc",
        content: {
          Sequence: `${sequence}`,
          Action: "",
          Filename: fileInfo.files[0].name,
          Size: fileSize === 0 ? "1" : `${fileSize}`,
          Version:
            version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
        },
      };
    }
    setPageInstructionsData([...pageInstructionsData, data]);
  };

  const onSaveAsDraft = async () => {
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

  const onSubmit1 = async () => {
    setLoader(true);
    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };

    let formData = {
      caseTypeID: "PG-AAS-Work-UploadBriefingDocuments",
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        Project_Name: TaskDetailsData?.ArtworkAgilityTasks[0]?.Project_Name,
      },
      pageInstructions: pageInstructionsData,
    };
    await submitUploadBrefingDocs(formData, id, headers);
    setLoader(false);
    navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const [graphicData, setGraphicData] = useState("Graphic Adaption Brief 1");
  const [isEditMode, setIsEditMode] = useState(false);

  const graphicInputRef = useRef(null);

  const updateData = () => {
    setIsEditMode(!isEditMode);
    setGraphicData(graphicInputRef.current.value);
  };

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
        checkTaskISComplete={false}
        closeFlag={true}
        actionButtonsFlag={true}
      />
      <div className="task-details">
        {<AddNewDesign {...data} checkReadWriteAccess={checkReadWriteAccess} />}
        {loading ||
        loader ||
        gABriefAdaptationForUI === null ||
        otherRefernceDocsForUI === null ? (
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
              {isEditMode ? (
                <div>
                  <input
                    type="text"
                    className="graphicInput"
                    defaultValue={graphicData}
                    ref={graphicInputRef}
                  />

                  <img
                    src={TickUBD}
                    alt="TickUBD logo"
                    onClick={() => updateData()}
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
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="header-icons"
                    style={{
                      borderBottom: "1.5px solid blue",
                      marginRight: "6px",
                      marginBottom: "-2px",
                    }}
                  />
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  <div>{graphicData}</div>
                  <img
                    src={editName}
                    alt="edit logo"
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="header-icons"
                    style={{ marginLeft: "12px" }}
                  />
                </div>
              )}
            </div>
            {gABriefAdaptationForUI &&
              gABriefAdaptationForUI.length > 0 &&
              gABriefAdaptationForUI.map((item, index) => {
                if (item && item?.Action !== "delete") {
                  return (
                    <UploadBriefingDocuments
                      key={item.Design_Job_ID}
                      // {...data}
                      item={item}
                      index={index}
                      handleDelete={handleDelete}
                      checkReadWriteAccess={checkReadWriteAccess}
                      length={gABriefAdaptationForUI.length}
                      fileUploadSection={graphicAdaptionBrief}
                      fileUploadType={fileUploadType}
                      getDataSaveAsDraft={getDataSaveAsDraft}
                    />
                  );
                }
              })}
            {/* Other Reference Documents & Assets */}
            <div className="design-intent-header">{ORDAssetsHeader}</div>
            {otherRefernceDocsForUI &&
              otherRefernceDocsForUI.length > 0 &&
              otherRefernceDocsForUI.map((item, index) => {
                if (item && item?.Action !== "delete") {
                  return (
                    <UploadBriefingDocuments
                      key={item.Design_Job_ID}
                      // {...data}
                      item={item}
                      index={index}
                      handleDelete={handleDelete}
                      checkReadWriteAccess={checkReadWriteAccess}
                      length={otherRefernceDocsForUI.length}
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
        onSubmit={onSubmit1}
        checkReadWriteAccess={checkReadWriteAccess}
        bottomFixed={true}
        formValid={false}
        checkTaskISComplete={checkTaskISComplete}
      />
    </PageLayout>
  );
}

export default UBD;
