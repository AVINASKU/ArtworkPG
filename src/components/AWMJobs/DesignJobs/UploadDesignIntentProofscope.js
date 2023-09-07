import React, { useEffect, useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { useProofScopeURL } from "../../ProofScope/ViewFiles";
// import { downloadFileAzure } from "../../../store/actions/AzureFileDownloadProofscope";
import { useDispatch, useSelector } from "react-redux";
import { getEnvironmentFromURL } from "../../../utils";

const UploadDesignIntentProofscope = ({
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
  buName,
  taskFolder,
  TaskID,
  projectName,
  ProjectID,
}) => {
  console.log("item here here", item);
  const dispatch = useDispatch();
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const [updatedImg, setUpdatedImg] = useState("");
  const [extention, setExtention] = useState("");
  const viewProofScopeFile = useProofScopeURL();
  const [fileExtension, setFileExtension] = useState("");

  useEffect(() => {
    console.log("item ----", item);
    if (item?.DesignJobDetails[0]?.FileMetaDataList[0]) {
      console.log("here here", item?.DesignJobDetails[0]?.FileMetaDataList[0]);
      let uploadedFileName =
        item?.DesignJobDetails[0]?.FileMetaDataList[0]?.File_Name;
      setUpdatedImg(uploadedFileName);
    }
  });

  function sanitizeFileName(fileName) {
    // Split the fileName into the name and extension parts
    const parts = fileName?.split(".");

    if (parts?.length > 1) {
      // Process the name part (parts[0]) to replace special characters and spaces
      const sanitizedName = parts[0].replace(
        /[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\| ]/g,
        (match) => {
          const charCode = match.charCodeAt(0);
          return "%" + charCode.toString(16).toUpperCase();
        }
      );

      // Reconstruct the sanitized fileName by combining the sanitized name and the original extension
      return sanitizedName + "." + parts.slice(1).join(".");
    } else {
      // If there is no extension, process the whole fileName
      return fileName?.replace(
        /[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\| ]/g,
        (match) => {
          const charCode = match.charCodeAt(0);
          return "%" + charCode.toString(16).toUpperCase();
        }
      );
    }
  }

  const handleViewProofScopeClick = async (event, fileUrl) => {
    event.preventDefault();

    // Sanitize various variables including fileUrl
    const sanitizedProjectName = sanitizeFileName(projectName);
    const sanitizedBuName = sanitizeFileName(buName);
    const sanitizedTaskFolder = sanitizeFileName(taskFolder);
    const sanitizedprojectId = sanitizeFileName(ProjectID);
    const sanitizedFileUrl = sanitizeFileName(fileUrl);

    const env = getEnvironmentFromURL();

    viewProofScopeFile(
      TaskID,
      `cloudflow://awm/${env}/${sanitizedprojectId}${sanitizedProjectName}/${sanitizedBuName}/${sanitizedTaskFolder}/${sanitizedFileUrl}`
    );
  };

  let di_name;
  if (!approve) {
    di_name =
      version !== "V0" &&
      item?.DesignJobDetails[0]?.FileMetaDataList[0]?.Timestamp !== ""
        ? `${item?.Task_Name}_${version}_${date}`
        : `${item?.Task_Name}`;
  }

  const onTemplateUpload = (e) => {
    let _totalSize = 0; // Array to store extensions
    alert(_totalSize);
    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    // Join extensions with comma and set as a string
  };

  const itemTemplate = (file, props) => {
    console.log("file here 1", file);
    const fileNameParts = file.name.split(".");
    const fileExtension = fileNameParts.pop().toLowerCase();

    // Update the state with the extracted file extension
    setFileExtension(fileExtension);
    setformattedValue(file.size);

    //   seFileData(file);
    return (
      <div className="upload-row">
        {/* <img role="presentation" src={file.objectURL} width={50} /> */}
        <a
          className="flex flex-column text-left ml-3"
          onClick={(event) => handleViewProofScopeClick(event, `${file.name}`)}
        >
          {file.name}
        </a>
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
    setAzureFile(e.files[0]);
    setFileName(e.files[0].name);
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
              accept=".pdf"
              customUpload
              onUpload={onTemplateUpload}
              onSelect={onTemplateSelect}
              itemTemplate={itemTemplate}
            />
          </div>
        )}
        {item?.DesignJobDetails[0]?.FileMetaDataList[0]?.File_Name === ""
          ? fileName === ""
            ? `No files uploaded yet please upload file!`
            : ``
          : fileName === ""
          ? di_name && (
              <a
                className="flex flex-column text-left ml-3"
                onClick={(event) =>
                  handleViewProofScopeClick(
                    event,
                    item?.DesignJobDetails[0]?.FileMetaDataList[0]?.File_Name
                  )
                }
              >
                {item?.DesignJobDetails[0]?.FileMetaDataList[0]?.File_Name}
              </a>
            )
          : ""}

        {approve && (
          <div
            style={{
              marginLeft: 20,
              padding: 5,
            }}
          >
            <div>Approve</div>
            <a
              className="flex flex-column text-left ml-3"
              onClick={(event) =>
                handleViewProofScopeClick(event, "pranali-test-proofscope.png")
              }
            >
              {updatedImg}
            </a>
            {/* <Image
                            src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg"
                            alt="Image"
                            width="25"
                        /> */}
            {/* <div
                            style={{
                                color: "#003DA5",
                                fontSize: 12,
                                width: 150,
                                cursor: "pointer",
                            }}
                        >
                            {file_name}
                        </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDesignIntentProofscope;
