import React, { useEffect, useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { Row, Col } from "react-bootstrap";

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
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
  };
  const itemTemplate = (file, props) => {
    setformattedValue(props.formatSize);
    setFileName(file.name);
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
  const onTemplateSelect = (e) => {
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
