import React, { useEffect, useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { Row, Col } from "react-bootstrap";
import { useProofScopeURL } from "../../ProofScope/ViewFiles";
import "./UploadFile.scss";
import { downloadFileAzure } from "../../../store/actions/AzureFileDownload";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
  disabled,
  azureSubFolder,
}) => {
  console.log("data", data);
  console.log("item here here", item);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const [updatedImg, setUpdatedImg] = useState("");
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const BU = selectedProjectDetails?.BU;
  const projectName = selectedProjectDetails?.Project_Name;
  let { ProjectID } = useParams();
  const dispatch = useDispatch();
  let viewFileName = designData[0]?.FileMetaDataList[0]?.File_Name;

  useEffect(() => {
    console.log("item ----", item);
    if (item?.FileMetaDataList[0]) {
      console.log("here here", item?.FileMetaDataList[0]);
      let uploadedFileName = item?.FileMetaDataList[0]?.File_Name;
      setUpdatedImg(uploadedFileName);
    }
  });

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

  const itemTemplate = (file) => {
    setformattedValue(file.size);
    return (
      <div className="upload-row">
        <img role="presentation" src={file.objectURL} width={50} />
        {/* <div className="flex flex-column text-left ml-3">{di_name}</div> */}
        <div className="flex flex-column text-left ml-3">{file.name}</div>
      </div>
    );
  };

  const onTemplateSelect = (e) => {
    // const renamedFile = {
    //   objectURL: e.files[0].objectURL,
    //   lastModified: e.files[0].lastModified,
    //   lastModifiedDate: e.files[0].lastModifiedDate,
    //   name: di_name,
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
    // setFileName(di_name);
    setFileName(e.files[0].name);
  };
  const downloadAzure = async (event, fileUrl) => {
    event.preventDefault();
    dispatch(
      downloadFileAzure(fileUrl, ProjectID + projectName, BU, azureSubFolder)
    );
  };

  return (
    <Col sm={2} className="IQCD">
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
        {viewFileName === "" ? (
          fileName === "" ? (
            `No files uploaded yet please upload file!`
          ) : (
            ``
          )
        ) : fileName === "" ? (
          <a
            className="flex flex-column text-left ml-3"
            onClick={(event) => downloadAzure(event, `${viewFileName}`)}
          >
            {viewFileName}
          </a>
        ) : (
          ""
        )}
      </div>
    </Col>
  );
};

export default UploadFile;
