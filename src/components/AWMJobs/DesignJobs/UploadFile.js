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
  version,
}) => {
  console.log("data", data.Consumed_Buffer);
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
  di_name = item?.Task_Name;

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
  };

  const itemTemplate = (file, props) => {
    console.log("file here 1", file);
    setformattedValue(props.formatSize.substring(0, props.formatSize.length - 3));
    setFileName(file.name);
    setAzureFile(file);
    //   seFileData(file);
    return (
      <div className="upload-row">
        <img
          alt={file.name}
          role="presentation"
          src={file.objectURL}
          width={50}
        />
        <a
          className="flex flex-column text-left ml-3"
          onClick={(event) =>
            handleViewProofScopeClick(event, "pranali-test-proofscope.png")
          }
        >
          {file.name}
        </a>
      </div>
    );
  };

  const onTemplateSelect = (e) => {
    const uploadedFile = e.files[0];
    const renamedFile = {
      ...uploadedFile,
      name: di_name,
      size: uploadedFile.size,
      type: uploadedFile.type,
      lastModified: uploadedFile.lastModified,
      lastModifiedDate: uploadedFile.lastModifiedDate,
      webkitRelativePath: uploadedFile.webkitRelativePath,
    };
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
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
      />
    </Col>
  );
};

export default UploadFile;
