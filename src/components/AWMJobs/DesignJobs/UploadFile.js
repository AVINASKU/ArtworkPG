import React, { useEffect, useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { Row, Col } from "react-bootstrap";
import { useProofScopeURL } from "../../ProofScope/ViewFiles";

const UploadFile = ({
  Design_Intent_Name,
  upload,
  approve,
  file_name,
  setformattedValue,
  setFileName,
  setAzureFile,
  item,
  data,
  jobName,
  ArtworkAgilityPage,
  fileName,
  designData,
  date,
  version,
  disabled
}) => {
  console.log("data", data);
  console.log("item here here", item);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const [updatedImg, setUpdatedImg] = useState("");
  const viewProofScopeFile = useProofScopeURL();

  useEffect(() => {
    console.log("item ----", item);
    if (item?.FileMetaDataList[0]) {
      console.log("here here", item?.FileMetaDataList[0]);
      let uploadedFileName =
        item?.FileMetaDataList[0]?.File_Name;
      setUpdatedImg(uploadedFileName);
    }
  });
  
  const handleViewProofScopeClick = async (event, fileUrl) => {
    event.preventDefault();
    viewProofScopeFile(`cloudflow://PP_FILE_STORE/aacdata/${fileUrl}`);
  };

  let di_name;
  di_name =
    version !== "V0" && designData && designData[0]?.FileMetaDataList[0]?.Timestamp !== ""
      ? `${data?.Task_Name}_${version}_${date}`
      : `${data?.Task_Name}`;

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
  };

  const itemTemplate = (file) => {
    setformattedValue(file.size);
    return (
      <div className="upload-row">
        <img role="presentation" src={file.objectURL} width={50} />
        <div className="flex flex-column text-left ml-3">{di_name}</div>
      </div>
    );
  };

  const onTemplateSelect = (e) => {
    const renamedFile = {
      objectURL: e.files[0].objectURL,
      lastModified: e.files[0].lastModified,
      lastModifiedDate: e.files[0].lastModifiedDate,
      name: di_name,
      size: e.files[0].size,
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
    setFileName(di_name);
  };

  return (
    <Col sm={2}>
      <label htmlFor="upload"> Upload File</label>
      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        url="/api/upload"
        accept="image/*"
        customUpload
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        itemTemplate={itemTemplate}
        disabled={disabled}
      />
      <div>
        {designData[0]?.FileMetaDataList[0]?.File_Name === "" ? (fileName === "" ? `No files uploaded yet please upload file!` : ``) : (fileName === "" ? di_name : '')}
      </div>
    </Col>
  );
};

export default UploadFile;
