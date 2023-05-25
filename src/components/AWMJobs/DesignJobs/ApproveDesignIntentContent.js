import React, { useEffect, useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";

const ApproveDesignIntentContent = ({
  Design_Intent_Name,
  upload,
  approve,
  file_name,
  setformattedValue,
  setFileName,
  setMappedFiles,
  setAzureFile,
  item,
  roleName,
  ArtworkAgilityPage,
  version
}) => {
  // console.log("item", item.Consumed_Buffer);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  let di_name;
    di_name =
      roleName +
      (item.Consumed_Buffer + "_") +
      ArtworkAgilityPage.Artwork_Brand[0].Brand_Name +
      "_" +
      ArtworkAgilityPage.Artwork_Category[0].Category_Name +
      "_" +
      item.Project_Name +
      "_" +
      version;

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
            <img alt={file.name} role="presentation" src={file.objectURL} width={50} />
            <div className="flex flex-column text-left ml-3">
                {file.name}
            </div>
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

  const DesignHeader = (di_name) => {
    return (
      <>
        <div
          style={{
            marginLeft: 20,
            padding: 5,
          }}
          className="font-color"
        >
          {di_name}
        </div>
        {approve && (
          <Tag
            style={{
              backgroundColor: "rgb(237, 244, 250)",
              color: "#03A000",
              fontSize: 14,
              marginRight: 10,
            }}
            className="mr-2"
            icon="pi pi-check"
            severity="Approved"
            value="Approved"
          ></Tag>
        )}
      </>
    );
  };

  

  return (
    
    <div>
      <div className="design-intent-header">
        {DesignHeader(di_name)}
      </div>
      <div className="approve-design-intent">
        {upload && (
          <div
            style={{
              marginLeft: 20,
              padding: 5,
            }}
          >
            <div>Upload</div>
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
          </div>
        )}
        {approve && (
          <div
            style={{
              marginLeft: 20,
              padding: 5,
            }}
          >
            <div>Approve</div>
            <Image
              src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg"
              alt="Image"
              width="25"
            />
            <div
              style={{
                color: '#003DA5',
                fontSize: 12,
                width: 150,
                cursor: 'pointer',
              }}
            >
              {file_name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveDesignIntentContent;
