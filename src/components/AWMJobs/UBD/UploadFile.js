import React, { useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { useProofScopeURL } from "../../ProofScope/ViewFiles";
import ToolTip from "./ToolTip";
import { downloadFileAzure } from "../../../store/actions/AzureFileDownload";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const UploadFile = ({
  azureSubFolder,
  // setAzureFile,
  serial,
  item,
  data,
  designData,
  date,
  version,
  disabled,
  fileUploadSection,
  uploadFile,
  sequence,
  getDataSaveAsDraft,
  setUploadedWrongFilename,
  File_NameFromAPI,
  setFileName,
  fileName,
  updateUbdData,
  setFileNotFound,
}) => {
  const [totalSize, setTotalSize] = useState(0);
  const [azureErrMsg, setAzureErrMsg] = useState("");
  const [fileUploadWarning, setFileUploadWarning] = useState(false);
  const fileUploadRef = useRef(null);
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const BU = selectedProjectDetails?.BU;
  const projectName = selectedProjectDetails?.Project_Name;
  const dispatch = useDispatch();
  const viewProofScopeFile = useProofScopeURL();
  const handleViewProofScopeClick = (event, fileUrl) => {
    event.preventDefault();
    viewProofScopeFile(`cloudflow://PP_FILE_STORE/aacdata/${fileUrl}`);
  };
  let { page1, page2, pageType, TaskID, ProjectID } = useParams();

  let di_name;
  di_name =
    version !== "V0" &&
    designData &&
    designData[0]?.FileMetaDataList[0]?.Timestamp !== ""
      ? `${data?.Task_Name}_${version}_${date}`
      : `${data?.Task_Name}`;

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
  };

  const itemTemplate = (file) => (
    <div className="upload-row">
      <img role="presentation" src={file.objectURL} width={50} />
      <div
        className="flex flex-column text-left fileName"
        data-toggle="tooltip"
        data-placement="top"
        title={file.name}
      >
        {file.name}
      </div>
    </div>
  );

  const onTemplateSelect = (e) => {
    const MAX_FILENAME_LENGTH = 31;
    const MAX_PATH_LENGTH = 255;
    const regex = /^[a-zA-Z0-9_]+$/;
    const restrictedCharsRegex = /[...(){}\[\]\\\/<>@$%&#?:,*"˜#â€œ]+/;
    var re = /(?:\.([^.]+))?$/;
    const fileLength = e.files[0].name.length;
    const uploadFileName = e.files[0].name;
    const filePathLength = e.files[0].webkitRelativePath.length;
    setFileName(e.files[0].name);
    // console.log("onTemplateSelect:", e.files[0]);
    if (
      fileLength > MAX_FILENAME_LENGTH ||
      filePathLength > MAX_PATH_LENGTH ||
      regex.test(uploadFileName) ||
      restrictedCharsRegex.test(
        uploadFileName.split(re.exec(uploadFileName)[0])[0]
      )
    ) {
      setFileUploadWarning(true);
      setUploadedWrongFilename(true);
    }

    // const renamedFile = {
    //   objectURL: e.files[0].objectURL,
    //   lastModified: e.files[0].lastModified,
    //   lastModifiedDate: e.files[0].lastModifiedDate,
    //   name: di_name,
    //   size: e.files[0].size,
    //   length: e.files[0].length,
    //   type: e.files[0].type,
    //   webkitRelativePath: e.files[0].webkitRelativePath,
    // };
    // setAzureFile(renamedFile);
    // console.log("e.files[0]", e.files[0]);
    // setAzureFile(e.files[0]);
    let _totalSize = totalSize;
    let files = e.files;
    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
    // setFileName(di_name);
    // getDataSaveAsDraft(e, fileUploadSection + uploadFile, sequence, version);
    updateUbdData(
      e,
      fileUploadSection + uploadFile,
      sequence,
      version,
      item.FileID || item.Design_Job_ID
    );
  };
  const downloadAzure = async (event, fileUrl) => {
    event.preventDefault();
    const response = await dispatch(
      downloadFileAzure(
        fileUrl,
        ProjectID + " " + projectName,
        BU,
        azureSubFolder,
        fileUploadSection === "Graphic Adaptation Brief *"
          ? "File " + sequence
          : "Other Ref File " + sequence
      )
    );
    if (response?.includes("404")) {
      setFileNotFound(true);
    }
  };

  const customUploader = () => {};

  const onImageClose = () => {
    // console.log("onImageClose:", fileUploadRef.current.getFiles());
    setFileUploadWarning(false);
    setUploadedWrongFilename(false);
    setFileName("");
    updateUbdData(
      { files: [{ name: "" }] },
      fileUploadSection + uploadFile,
      sequence,
      version,
      item.FileID || item.Design_Job_ID
    );
  };

  return (
    <>
      <div className="d-flex">
        <label htmlFor="upload" className="paddingRight">
          {serial + 1}
          {".  "}
          {uploadFile}
        </label>
        <ToolTip />
      </div>
      <div
        className={`${
          fileName || File_NameFromAPI
            ? "uploadImageAndupVersionImage"
            : "uploadImageAndupVersionImage1"
        }`}
        id={`${
          File_NameFromAPI && fileName === "" ? "File_NameFromAPIPaddingId" : ""
        }`}
      >
        <FileUpload
          ref={fileUploadRef}
          name="demo[]"
          url="/api/upload"
          accept="*"
          customUpload
          uploadHandler={customUploader}
          onUpload={onTemplateUpload}
          onSelect={(e) => onTemplateSelect(e)}
          itemTemplate={itemTemplate}
          onClear={onImageClose}
          disabled={item.isNew !== true}
        />
        <div hidden={fileName} className="File_NameFromAPIPadding">
          <div
            className="File_NameFromAPI"
            data-toggle="tooltip"
            data-placement="top"
            title={File_NameFromAPI}
            onClick={(event) => downloadAzure(event, `${File_NameFromAPI}`)}
          >
            {File_NameFromAPI}
          </div>
        </div>
      </div>
      {/* <a href="#">{item.File_Name}</a> */}
      {/* <span>
        {fileUploadWarning && (
          <>
            <p className="wrongMsg">
              Filename Invalid. Click on <>&#9432;</> icon to learn more.
            </p>
          </>
        )}
      </span> */}
    </>
  );
};

export default UploadFile;
