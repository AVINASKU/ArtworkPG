import React, { useEffect, useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { useProofScopeURL } from "../../ProofScope/ViewFiles";

const ApproveDesignIntentContent = ({
  designIntent,
  Design_Intent_Name,
  upload,
  approve,
  file_name,
  setformattedValue,
  setFileName,
  fileName,
  setMappedFiles,
  setAzureFile,
  item,
  roleName,
  ArtworkAgilityPage,
  version,
  date,
}) => {
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const viewProofScopeFile = useProofScopeURL();

  const handleViewProofScopeClick = (event, fileUrl) => {
    event.preventDefault();
    viewProofScopeFile(`cloudflow://PP_FILE_STORE/aacdata/${fileUrl}`);
  };

  let di_name;
  di_name =
    version !== "V0" || designIntent[0]?.FileMetaDataList[0]?.Timestamp !== ""
      ? `${item?.Task_Name}_${version}_${date}`
      : `${item?.Task_Name}`;

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
    <div style={{ height: "300px" }}>
      <div className="design-intent-header">{DesignHeader(di_name)}</div>
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
            <div> {fileName === "" && version !== "" && di_name}</div>
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
                color: "#003DA5",
                fontSize: 12,
                width: 150,
                cursor: "pointer",
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
