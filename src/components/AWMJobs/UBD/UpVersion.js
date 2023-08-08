import React, { useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { useProofScopeURL } from "../../ProofScope/ViewFiles";
import { AzureFileDownloadJobs } from "../../../store/actions/AzureFileDownloadJobs";
import { useDispatch } from "react-redux";

const UpVersion = ({
  // setAzureFile,
  item,
  data,
  designData,
  date,
  version,
  disabled,
  fileUploadSection,
  upVersion,
  sequence,
  getDataSaveAsDraft,
  setUploadedWrongFilename,
  updateUbdData,
}) => {
  const [fileName, setFileName] = useState("");
  const [totalSize, setTotalSize] = useState(0);
  const [fileUploadWarning, setFileUploadWarning] = useState(false);
  const fileUploadRef = useRef(null);
  const dispatch = useDispatch();
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
    // setAzureFile(e.files[0]);
    let _totalSize = totalSize;
    let files = e.files;
    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
    // setFileName(di_name);
    // getDataSaveAsDraft(e, fileUploadSection + upVersion, sequence, version);
    updateUbdData(
      e,
      fileUploadSection + upVersion,
      sequence,
      version,
      item.FileID || item.Design_Job_ID
    );
  };
  const downloadAzure = async (event, fileUrl) => {
    event.preventDefault();
    dispatch(AzureFileDownloadJobs(fileUrl));
  };

  const customUploader = () => {};

  const onImageClose = () => {
    setFileUploadWarning(false);
    setUploadedWrongFilename(false);
    setFileName("");
    updateUbdData(
      { files: [{ name: "" }] },
      fileUploadSection + upVersion,
      sequence,
      version,
      item.FileID || item.Design_Job_ID
    );
  };

  return (
    <>
      <label htmlFor="upload">{upVersion}</label>
      <div
        className={`${
          fileName !== ""
            ? "uploadImageAndupVersionImage"
            : "uploadImageAndupVersionImage2"
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
          disabled={item.isNew === true}
          // disabled={fileName !== ""}
        />
      </div>
      {/* <a href="#">{item.UV_File_Name}</a> */}
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

export default UpVersion;
