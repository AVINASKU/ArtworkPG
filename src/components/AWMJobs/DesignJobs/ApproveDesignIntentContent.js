import React, { useEffect, useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { AzureFileDownloadJobs } from "../../../store/actions/AzureFileDownloadJobs";
import { deleteAzureFile } from "../../../store/actions/AzureFileDeletion.js";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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
  subFolder,
  BU,
  projectName,
}) => {
  const [totalSize, setTotalSize] = useState(0);
  let { ProjectID } = useParams();
  const fileUploadRef = useRef(null);
  const dispatch = useDispatch();
  let viewFileName = designIntent ? designIntent[0]?.FileMetaDataList[0]?.File_Name : "";
  let di_name = "";
  if (!approve) {
    di_name =
      version !== "V0" && designIntent[0]?.FileMetaDataList[0]?.Timestamp !== ""
        ? `${item?.Task_Name}_${version}_${date}`
        : `${item?.Task_Name}`;
  }

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
  };

  const itemTemplate = (file) => {
    // console.log("file here 1", file);
    // const fileNameParts = file.name.split(".");
    // const fileExtension = fileNameParts.pop().toLowerCase();

    // // Update the state with the extracted file extension
    // setFileExtension(fileExtension);
    setformattedValue(file.size);

    return (
      <div className="upload-row">
        <img role="presentation" src={file.objectURL} width={50} />

        <div className="flex flex-column text-left ml-3">{file.name}</div>
      </div>
    );
  };

  const onTemplateSelect = (e) => {
    // let f_name = di_name + fileExtension;

    // const fileNameParts = e.files[0].name.split(".");
    // const ff = fileNameParts.pop().toLowerCase();
    // console.log("file here 1", e.files[0].name.split(".").pop().toLowerCase());

    // const renamedFile = {
    //   objectURL: e.files[0].objectURL,
    //   lastModified: e.files[0].lastModified,
    //   lastModifiedDate: e.files[0].lastModifiedDate,
    //   // name: di_name + "." + e.files[0].name.split(".").pop().toLowerCase(),
    //   name: e.files[0].name,
    //   size: e.files[0].size,
    //   type: e.files[0].type,
    //   webkitRelativePath: e.files[0].webkitRelativePath,
    // };
    setAzureFile(e.files[0]);
    let _totalSize = totalSize;
    let files = e.files;
    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
    // setAzureFile(renamedFile);
    // setFileName(di_name + "."+e.files[0].name.split(".").pop().toLowerCase());
    setFileName(e.files[0].name);
  };
  const downloadAzure = async (event, fileUrl) => {
    event.preventDefault();
    dispatch(AzureFileDownloadJobs(fileUrl, ProjectID + " " + projectName, BU, subFolder));
  };
  const deleteAzure = async (event, fileUrl) => {
    event.preventDefault();
    dispatch(deleteAzureFile(fileUrl, subFolder));
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
              accept= '.pdf'
              customUpload
              onUpload={onTemplateUpload}
              onSelect={onTemplateSelect}
              itemTemplate={itemTemplate}
            />
            <div>
              {viewFileName === "" ? (
                fileName === "" ? (
                  `No files uploaded yet please upload file!`
                ) : (
                  ``
                )
              ) : fileName === "" ? (
                <>
                  <a
                    className="flex flex-column text-left ml-3"
                    onClick={(event) => downloadAzure(event, `${viewFileName}`)}
                  >
                    {viewFileName}
                  </a>
                  <br />
                  <a
                    className="flex flex-column text-left ml-3"
                    onClick={(event) => deleteAzure(event, `${viewFileName}`)}
                  >
                    remove from azure
                  </a>
                </>
              ) : (
                ""
              )}
            </div>
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
              <a
                className="flex flex-column text-left ml-3"
                onClick={(event) => downloadAzure(event, `${viewFileName}`)}
              >
                {viewFileName}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveDesignIntentContent;
