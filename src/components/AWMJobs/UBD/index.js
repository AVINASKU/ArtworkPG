import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import UploadBriefingDocuments from "../DesignJobs/UploadBriefingDocuments";
import UBDFooterButtons from "../DesignJobs/UBDFooterButtons";
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
import { cloneDeep } from "lodash";
import { uploadFileAzure } from "../../../store/actions/AzureFileActions";
import { deleteAzureFile } from "../../../store/actions/AzureFileDeletion.js";

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
  const [formValid, setFormValid] = useState(false);
  const [wrongFileName, setWrongFileName] = useState(false);
  // const [azureFile, setAzureFile] = useState("");
  let { page1, page2, pageType, TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );
  const { allProjects } = useSelector((state) => state.myProject);
  const location = useLocation();
  const currentUrl = location.pathname;
  const id = `${TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Key}`;
  const AzureSubFolder = "GA Briefs";

  let breadcrumb = AddNavigation(headerName);
  // const checkReadWriteAccess = CheckReadOnlyAccess();
  const checkReadWriteAccess = true;

  useEffect(() => {
    dispatch(getTaskDetails(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    let projectData = allProjects.find(
      (project) => project.Project_ID === ProjectID
    );
    setProjectData(projectData);
  }, [projectData]);

  const orderBySequence = (arr) => {
    return arr.sort(function (a, b) {
      return a.Sequence - b.Sequence;
    });
  };

  useEffect(() => {
    if (gABriefAdaptationForUI.length === 0) {
      const temp = cloneDeep(gABriefAdaptationForUI);
      temp.push({
        Design_Job_ID: temp.length + 1,
        isNew: true,
        Additional_Info: "Test",
        Select: false,
        File_Name: "",
        Sequence: temp.length + 1,
        Version: "V0",
      });
      setGABriefAdaptationForUI(orderBySequence(temp));
    }
    if (otherRefernceDocsForUI.length === 0) {
      const temp = cloneDeep(otherRefernceDocsForUI);
      temp.push({
        Design_Job_ID: temp.length + 1,
        isNew: true,
        Additional_Info: "Test",
        Select: false,
        File_Name: "",
        Sequence: temp.length + 1,
        Version: "V0",
      });
      setOtherRefernceDocsForUI(orderBySequence(temp));
    }
  }, [gABriefAdaptationForUI, otherRefernceDocsForUI]);

  useEffect(() => {
    const GABriefListData =
      (TaskDetailsData?.ArtworkAgilityTasks[0]?.GABriefList &&
        TaskDetailsData?.ArtworkAgilityTasks[0]?.GABriefList[0]) ||
      [];
    const OtherReferenceDocData =
      (TaskDetailsData?.ArtworkAgilityTasks[0]?.OtherReferenceDoc &&
        TaskDetailsData?.ArtworkAgilityTasks[0]?.OtherReferenceDoc[0]) ||
      [];
    if (TaskDetailsData) {
      const graphicABData = [],
        otherRDData = [];
      GABriefListData?.FileList?.map((item) => {
        graphicABData.push(item);
      });
      OtherReferenceDocData?.FileList?.map((item) => {
        otherRDData.push(item);
      });
      setGABriefAdaptationForUI(orderBySequence(graphicABData) || []);
      setOtherRefernceDocsForUI(orderBySequence(otherRDData) || []);
      setData(TaskDetailsData?.ArtworkAgilityTasks[0] || []);
    }
    // const data = GABriefListData[0] || {};
    // if (data) {
    //   data.Version !== "" && data.Version && setVersion(data.Version);
    // }
  }, [TaskDetailsData]);

  const handleCancel = () => {
    return navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const handleDelete = (index, sectionType, version, fileUrl) => {
    const GABriefListData =
      (TaskDetailsData?.ArtworkAgilityTasks[0]?.GABriefList &&
        TaskDetailsData?.ArtworkAgilityTasks[0]?.GABriefList[0]) ||
      [];
    const OtherReferenceDocData =
      (TaskDetailsData?.ArtworkAgilityTasks[0]?.OtherReferenceDoc &&
        TaskDetailsData?.ArtworkAgilityTasks[0]?.OtherReferenceDoc[0]) ||
      [];
    console.log("gABriefAdaptationForUI", gABriefAdaptationForUI);
    let grpName = "";
    if (sectionType === graphicAdaptionBrief) {
      grpName = GABriefListData?.GroupName;

      const subData = gABriefAdaptationForUI.filter((item, i) => {
        return item.Sequence !== index;
        // if (item.Sequence === index) {
        //   item.Action = "delete";
        //   grpName = GABriefListData?.GroupName;
        // }
        // return item;
      });
      setGABriefAdaptationForUI(orderBySequence(subData));
    }
    if (sectionType === otherReferenceDocs) {
      grpName = OtherReferenceDocData?.GroupName;
      const subData = otherRefernceDocsForUI.filter((item, i) => {
        return item.Sequence !== index;
        // if (item.Sequence === index) {
        //   item.Action = "delete";
        //   grpName = OtherReferenceDocData?.GroupName;
        // }
        // return item;
      });
      setOtherRefernceDocsForUI(subData);
    }
    // For Ga Brief and Other reference
    console.log("TaskDetailsData:", TaskDetailsData);
    const formData = {
      AWM_Project_ID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      AWM_Task_ID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      // Sequence: `${index + 1}`,
      Sequence: `${index}`,
      // Sequence: TaskDetailsData?.ArtworkAgilityTasks[0]?.FileMetaDataList,
      // GroupName:
      //   sectionType === graphicAdaptionBrief ? "GA Brief Adaptation 1" : "",
      GroupName: grpName,
    };
    // await deleteUploadBrefingDocs(formData);
    // alert(version);
    if (version !== "V0") {
      deleteUploadBrefingDocs(formData);
      dispatch(deleteAzureFile(fileUrl, AzureSubFolder));
    }
    if (version !== "V1" && version !== "V0") {
      dispatch(getTaskDetails(TaskID, ProjectID));
    }
  };

  const addNewEmptyDesign = () => {
    gABriefAdaptationForUI.push({
      Design_Job_ID: gABriefAdaptationForUI.length + 1,
      isNew: true,
      Additional_Info: "Test",
      Select: false,
      File_Name: "",
      Sequence: gABriefAdaptationForUI.length + 1,
      Version: "V0",
    });
    setGABriefAdaptationForUI(orderBySequence(gABriefAdaptationForUI));
    setUpdated(!updated);
  };

  const updateUbdData = (fileInfo, uploadType, sequence, version, id) => {
    console.log("updateUbdData:", fileInfo, uploadType, sequence, id);
    if (uploadType === graphicAdaptionBrief + fileUploadType.uploadFile) {
      console.log("gABriefAdaptationForUI:", gABriefAdaptationForUI);
      const temp = cloneDeep(gABriefAdaptationForUI);
      temp.forEach((obj) => {
        if (obj.Design_Job_ID === id) {
          obj["File_Name"] = fileInfo.files[0].name;
          if (fileInfo.files[0].name !== "") {
            obj["Info"] = {
              fileInfo: fileInfo,
              uploadType: uploadType,
              sequence: sequence,
              version: version,
              id: id,
            };
            obj["AzureFile"] = fileInfo.files[0];
          } else {
            obj["Info"] = "";
            obj["AzureFile"] = "";
          }
        }
        setGABriefAdaptationForUI(orderBySequence(temp));
      });
    } else if (uploadType === graphicAdaptionBrief + fileUploadType.upVersion) {
      console.log("gABriefAdaptationForUI:", gABriefAdaptationForUI);
      const temp = cloneDeep(gABriefAdaptationForUI);
      temp.forEach((obj) => {
        if (obj.FileID === id) {
          obj["UV_File_Name"] = fileInfo.files[0].name;
          if (fileInfo.files[0].name !== "") {
            obj["Info"] = {
              fileInfo: fileInfo,
              uploadType: uploadType,
              sequence: sequence,
              version: version,
              id: id,
            };
            obj["AzureFile"] = fileInfo.files[0];
          } else {
            obj["Info"] = "";
            obj["AzureFile"] = "";
          }
        }
        setGABriefAdaptationForUI(orderBySequence(temp));
      });
    } else if (uploadType === otherReferenceDocs + fileUploadType.uploadFile) {
      console.log("otherRefernceDocsForUI:", otherRefernceDocsForUI);
      const temp = cloneDeep(otherRefernceDocsForUI);
      temp.forEach((obj) => {
        if (obj.Design_Job_ID === id) {
          obj["File_Name"] = fileInfo.files[0].name;
          if (fileInfo.files[0].name !== "") {
            obj["Info"] = {
              fileInfo: fileInfo,
              uploadType: uploadType,
              sequence: sequence,
              version: version,
              id: id,
            };
            obj["AzureFile"] = fileInfo.files[0];
          } else {
            obj["Info"] = "";
            obj["AzureFile"] = "";
          }
        }
        setOtherRefernceDocsForUI(temp);
      });
    } else if (uploadType === otherReferenceDocs + fileUploadType.upVersion) {
      console.log("otherRefernceDocsForUI:", otherRefernceDocsForUI);
      const temp = cloneDeep(otherRefernceDocsForUI);
      temp.forEach((obj) => {
        if (obj.FileID === id) {
          obj["UV_File_Name"] = fileInfo.files[0].name;
          if (fileInfo.files[0].name !== "") {
            obj["Info"] = {
              fileInfo: fileInfo,
              uploadType: uploadType,
              sequence: sequence,
              version: version,
              id: id,
            };
            obj["AzureFile"] = fileInfo.files[0];
          } else {
            obj["Info"] = "";
            obj["AzureFile"] = "";
          }
        }
        setOtherRefernceDocsForUI(temp);
      });
    }

    // getDataSaveAsDraft(fileInfo, uploadType, sequence, version, id);
  };

  useEffect(() => {
    //set Flag to enable or disable submit button
    let flag = false;
    gABriefAdaptationForUI.forEach((obj) => {
      if ((obj.File_Name && obj.isNew === true) || obj.UV_File_Name) {
        if (flag === false && wrongFileName === false) flag = true;
      }
    });
    otherRefernceDocsForUI.forEach((obj) => {
      if ((obj.File_Name && obj.isNew === true) || obj.UV_File_Name) {
        if (flag === false && wrongFileName === false) flag = true;
      }
    });
    console.log("gABriefAdaptationForUI", gABriefAdaptationForUI);
    console.log("otherRefernceDocsForUI", otherRefernceDocsForUI);
    // alert(flag);
    setFormValid(flag);
  }, [gABriefAdaptationForUI, otherRefernceDocsForUI, wrongFileName]);

  let checkTaskISComplete =
    TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Status === "Complete";

  const GABriefHeader = (
    <>
      <div
        style={{
          marginLeft: 20,
          padding: 5,
        }}
        className="ubd-accordion-header"
      >
        Graphic Adaptation Brief*
      </div>
      <div className="add-file-ubd">
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
      File_Name: "",
      Sequence: otherRefernceDocsForUI.length + 1,
      Version: "V0",
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
        className="ubd-accordion-header"
      >
        Other Reference Documents & Assets
      </div>
      <div className="add-file-ubd">
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

  const [graphicData, setGraphicData] = useState("Graphic Adaptation Brief 1");
  const [isEditMode, setIsEditMode] = useState(false);
  const graphicInputRef = useRef(null);

  useEffect(() => {
    if (TaskDetailsData?.ArtworkAgilityTasks[0]?.GABriefList) {
      setGraphicData(
        TaskDetailsData?.ArtworkAgilityTasks[0]?.GABriefList[0]?.GroupName
      );
    }
  }, [TaskDetailsData]);

  const updateData = () => {
    setIsEditMode(!isEditMode);
    if (graphicInputRef.current.value) {
      setGraphicData(graphicInputRef.current.value);
    }
  };

  const getDataSaveAsDraft = (fileInfo, uploadType, sequence, version) => {
    // console.log("gABriefAdaptationForUI: ", gABriefAdaptationForUI);
    const fileSize = Math.round(fileInfo.files[0].size / 1000000);
    const saveAsDraftObj = {
      File_Name: fileInfo.files[0].name,
      Version: version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
      Size: fileSize === 0 ? "1" : `${fileSize}`,
      Sequence: `${sequence}`,
      Action: "add",
    };
    let submitObj = {};
    if (
      uploadType === graphicAdaptionBrief + fileUploadType.uploadFile ||
      uploadType === graphicAdaptionBrief + fileUploadType.upVersion
    ) {
      // saveAsDraftObj.GroupName = "GA Brief Adaptation 1";
      saveAsDraftObj.GroupName = graphicData;
      // saveAsDraftObj.GroupName = graphicData;
      setSaveAsDraftGABriefList([...saveAsDraftGABriefList, saveAsDraftObj]);
      submitObj = {
        instruction: "APPEND",
        target: "GABriefList",
        content: {
          // GroupName: "GA Brief Adaptation 1",
          GroupName: graphicData,
          Sequence: `${sequence}`,
          Action: "add",
          File_Name: fileInfo.files[0].name,
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
      setSaveAsDraftOtherReferenceDoc([
        ...saveAsDraftOtherReferenceDoc,
        saveAsDraftObj,
      ]);
      submitObj = {
        instruction: "APPEND",
        target: "OtherReferenceDoc",
        content: {
          Sequence: `${sequence}`,
          Action: "add",
          File_Name: fileInfo.files[0].name,
          Size: fileSize === 0 ? "1" : `${fileSize}`,
          Version:
            version.substring(0, 1) + (parseInt(version.substring(1)) + 1),
        },
      };
    }
    setPageInstructionsData([...pageInstructionsData, submitObj]);
  };

  const getGABriefListObj = (type) => {
    console.log("getGABriefListObj", gABriefAdaptationForUI);
    let GABriefList = [];
    gABriefAdaptationForUI.map((obj) => {
      if (obj.Info) {
        const fileSize = Math.round(obj.Info.fileInfo.files[0].size / 1000000);
        const temp = {
          // GroupName: "GA Brief Adaptation 1",
          GroupName: graphicData,
          Version:
            obj.Info.version.substring(0, 1) +
            (parseInt(obj.Info.version.substring(1)) + 1),
          Size: fileSize === 0 ? "1" : `${fileSize}`,
          Sequence: `${obj.Info.sequence}`,
          Action: "add",
        };
        if (type === "save") {
          temp["File_Name"] = obj.Info.fileInfo.files[0].name;
        }
        if (type === "submit") {
          temp["Filename"] = obj.Info.fileInfo.files[0].name;
        }

        GABriefList.push(temp);
        dispatch(uploadFileAzure(obj.AzureFile, AzureSubFolder));
      }
    });
    return GABriefList;
  };

  const getOtherReferenceDocObj = (type) => {
    let OtherReferenceDoc = [];
    otherRefernceDocsForUI.map((obj) => {
      if (obj.Info) {
        const fileSize = Math.round(obj.Info.fileInfo.files[0].size / 1000000);
        const temp = {
          Version:
            obj.Info.version.substring(0, 1) +
            (parseInt(obj.Info.version.substring(1)) + 1),
          Size: fileSize === 0 ? "1" : `${fileSize}`,
          Sequence: `${obj.Info.sequence}`,
          Action: "add",
        };
        if (type === "save") {
          temp["File_Name"] = obj.Info.fileInfo.files[0].name;
        }
        if (type === "submit") {
          temp["Filename"] = obj.Info.fileInfo.files[0].name;
        }
        OtherReferenceDoc.push(temp);
        dispatch(uploadFileAzure(obj.AzureFile, AzureSubFolder));
      }
    });
    return OtherReferenceDoc;
  };
  const onSaveAsDraft = async () => {
    setLoader(true);
    const saveAsDraftObjGABriefList = getGABriefListObj("save");
    const saveAsDraftObjOtherReferenceDoc = getOtherReferenceDocObj("save");

    const formData = {
      AWM_Project_ID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
      AWM_Task_ID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
      // GABriefList: saveAsDraftGABriefList,
      // OtherReferenceDoc: saveAsDraftOtherReferenceDoc,
      GABriefList: saveAsDraftObjGABriefList,
      OtherReferenceDoc: saveAsDraftObjOtherReferenceDoc,
    };

    await saveAsDraftUploadBrefingDocs(formData);
    // setSaveAsDraftGABriefList([]);
    // setSaveAsDraftOtherReferenceDoc([]);
    setLoader(false);
    dispatch(getTaskDetails(TaskID, ProjectID));
    // navigate(`/${currentUrl?.split("/")[1]}`);
  };

  const onSubmit1 = async () => {
    setLoader(true);
    const submitObjGABriefList = getGABriefListObj("submit");
    const submitObjOtherReferenceDoc = getOtherReferenceDocObj("submit");
    let pageInstructions = [];
    submitObjGABriefList.forEach((obj) => {
      pageInstructions.push({
        instruction: "APPEND",
        target: "GABriefList",
        content: obj,
      });
    });
    submitObjOtherReferenceDoc.forEach((obj) => {
      pageInstructions.push({
        instruction: "APPEND",
        target: "OtherReferenceDoc",
        content: obj,
      });
    });

    console.log("TaskDetailsData:", TaskDetailsData);

    const headers = {
      key: "If-Match",
      value: TaskDetailsData?.ArtworkAgilityPage?.Etag,
    };
    // TaskDetailsData?.ArtworkAgilityTasks[0]?.
    let formData = {
      caseTypeID: "PG-AAS-Work-UploadBriefingDocuments",
      content: {
        AWMTaskID: TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_ID,
        AWMProjectID: TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID,
        // Project_Name: TaskDetailsData?.ArtworkAgilityTasks[0]?.Project_Name,
      },
      pageInstructions: pageInstructions,
    };
    console.log("submitFormData: ", formData);
    // await dispatch(uploadFileAzure(azureFile));
    await submitUploadBrefingDocs(formData, id, headers);
    setLoader(false);
    if (page2 && page2 === "projectPlan") {
      navigate(
        `/${page1}/${page2}/${TaskDetailsData?.ArtworkAgilityPage?.AWM_Project_ID}`
      );
    } else if (pageType) {
      navigate(`/${pageType}`);
    }
    // navigate(`/${currentUrl?.split("/")[1]}`);
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
        {
          <AddNewDesign
            {...data}
            checkReadWriteAccess={checkReadWriteAccess}
            actionButtonsFlag={true}
          />
        }
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
                      azureSubFolder={AzureSubFolder}
                      serial={index}
                      key={item.Design_Job_ID}
                      // {...data}
                      item={item}
                      index={item.Sequence}
                      version={item.Version}
                      handleDelete={handleDelete}
                      checkReadWriteAccess={checkReadWriteAccess}
                      length={gABriefAdaptationForUI.length}
                      fileUploadSection={graphicAdaptionBrief}
                      fileUploadType={fileUploadType}
                      getDataSaveAsDraft={getDataSaveAsDraft}
                      File_NameFromAPI={item.File_Name}
                      updateUbdData={updateUbdData}
                      setWrongFileName={setWrongFileName}
                      disableDelete={
                        gABriefAdaptationForUI.length === 1 && !item.File_Name
                      }
                      // setAzureFile={setAzureFile}
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
                      azureSubFolder={AzureSubFolder}
                      serial={index}
                      key={item.Design_Job_ID}
                      // {...data}
                      item={item}
                      index={item.Sequence}
                      version={item.Version}
                      handleDelete={handleDelete}
                      checkReadWriteAccess={checkReadWriteAccess}
                      length={otherRefernceDocsForUI.length}
                      fileUploadSection={otherReferenceDocs}
                      fileUploadType={fileUploadType}
                      getDataSaveAsDraft={getDataSaveAsDraft}
                      File_NameFromAPI={item.File_Name}
                      updateUbdData={updateUbdData}
                      setWrongFileName={setWrongFileName}
                      disableDelete={
                        otherRefernceDocsForUI.length === 1 && !item.File_Name
                      }
                      // setAzureFile={setAzureFile}
                    />
                  );
                }
              })}
          </>
        )}
      </div>
      <UBDFooterButtons
        handleCancel={handleCancel}
        onSaveAsDraft={onSaveAsDraft}
        onSubmit={onSubmit1}
        checkReadWriteAccess={checkReadWriteAccess}
        bottomFixed={true}
        formValid={!formValid}
        checkTaskISComplete={false}
        // submitAllowed={
        //   TaskDetailsData?.ArtworkAgilityTasks[0]?.Task_Status ===
        //     "In-Progress" &&
        //   (TaskDetailsData?.ArtworkAgilityTasks[0]?.GABriefList ||
        //     TaskDetailsData?.ArtworkAgilityTasks[0]?.OtherReferenceDoc ||
        //     formValid)
        // }
        submitAllowed={
          TaskDetailsData?.ArtworkAgilityTasks[0]?.GABriefList ||
          TaskDetailsData?.ArtworkAgilityTasks[0]?.OtherReferenceDoc ||
          formValid
        }
      />
    </PageLayout>
  );
}

export default UBD;
