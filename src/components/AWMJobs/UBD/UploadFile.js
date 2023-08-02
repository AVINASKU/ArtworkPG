import React, { useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { useProofScopeURL } from "../../ProofScope/ViewFiles";
import ToolTip from "./ToolTip";

const UploadFile = ({
  setAzureFile,
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
}) => {
  const [totalSize, setTotalSize] = useState(0);
  const [fileUploadWarning, setFileUploadWarning] = useState(false);
  const fileUploadRef = useRef(null);

  const viewProofScopeFile = useProofScopeURL();
  const handleViewProofScopeClick = (event, fileUrl) => {
    event.preventDefault();
    viewProofScopeFile(`cloudflow://PP_FILE_STORE/aacdata/${fileUrl}`);
  };

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
      {file.name.length > 22 ? (
        <div
          className="flex flex-column text-left fileName"
          data-toggle="tooltip"
          data-placement="top"
          title={file.name}
        >
          {file.name}
        </div>
      ) : (
        <div className="flex flex-column text-left fileName">{file.name}</div>
      )}
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

    const renamedFile = {
      objectURL: e.files[0].objectURL,
      lastModified: e.files[0].lastModified,
      lastModifiedDate: e.files[0].lastModifiedDate,
      name: di_name,
      size: e.files[0].size,
      length: e.files[0].length,
      type: e.files[0].type,
      webkitRelativePath: e.files[0].webkitRelativePath,
    };
    setAzureFile(renamedFile);
    let _totalSize = totalSize;
    let files = e.files;
    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
    setAzureFile(renamedFile);
    // setFileName(di_name);
    getDataSaveAsDraft(e, fileUploadSection + uploadFile, sequence);
  };

  const customUploader = () => {};

  const onImageClose = () => {
    setFileUploadWarning(false);
    setUploadedWrongFilename(false);
    setFileName("");
  };

  return (
    <>
      <div className="displayFlex">
        <label htmlFor="upload" className="paddingRight">
          {uploadFile}
        </label>
        <ToolTip />
      </div>
      <div
        className={`${
          fileName || File_NameFromAPI !== ""
            ? "uploadImageAndupVersionImage"
            : "uploadImageAndupVersionImage1"
        }`}
        id={`${File_NameFromAPI && fileName === "" ? "File_NameFromAPIPaddingId" : ""}`}
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
          // disabled={fileName !== ""}
        />
        <div hidden={fileName} className="File_NameFromAPIPadding">
          {File_NameFromAPI.length > 22 ? (
            <div
              className="File_NameFromAPI"
              data-toggle="tooltip"
              data-placement="top"
              title={File_NameFromAPI}
            >
              {File_NameFromAPI}
            </div>
          ) : (
            <div className="File_NameFromAPI">{File_NameFromAPI}</div>
          )}
        </div>
      </div>
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
