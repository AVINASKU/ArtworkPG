import React, { useEffect, useRef, useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { AutoComplete } from "primereact/autocomplete";
import { FileUpload } from "primereact/fileupload";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import infoIcon from "../../../assets/images/infoIcon.svg";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";
import upVersion from "../../../assets/images/upVersion.svg";
import upload from "../../../assets/images/upload.svg";
import editName from "../../../assets/images/editName.svg";
import TickUBD from "../../../assets/images/TickUBD.svg";
import CrossUBD from "../../../assets/images/CrossUBD.svg";
import DsbpCommonPopup from "../../DSBP/DsbpCommonPopup";

const AddNewDesignContent = ({
  index,
  Brand,
  Category,
  Project_Name,
  handleDelete,
  item,
  addData,
  roleName,
  checkBU,
  setSubmitActive,
  checkReadWriteAccess,
  taskName,
  taskName2,
  setAddNewDesign,
  displayBriefDocument,
  clickCountGraphicAdaption,
  clickCountReferenceDocuments,
  displayBriefDocumentDataGraphicAdaption,
  displayBriefDocumentDataReferenceDocuments,
}) => {
  const { Agency_Reference, Additional_Info, event, Select, Cluster } = item;

  const [checked, setChecked] = useState(false);
  const [agencyRef, setAgency] = useState(Agency_Reference);
  const [clusters, setCluster] = useState(Cluster);
  const [additionalInformation, setAdditionalInfo] = useState(Additional_Info);
  const [tier, setTier] = useState("");
  const [items, setItems] = useState([]);
  const [graphicAdaptionBriefName, setGraphicAdaptionBriefName] =
    useState(false);
  const [fileUploadWarning, setFileUploadWarning] = useState(false);
  const [editNameImg, setEditNameImg] = useState(true);

  useEffect(() => {
    if (item) {
      setAgency(Agency_Reference);
      setCluster(Cluster);
      setAdditionalInfo(Additional_Info);
    }
  }, [item, Agency_Reference, Cluster, Additional_Info]);

  const search = (event) => {
    let _items = [...Array(10).keys()];
    setItems(
      event.query
        ? [...Array(10).keys()].map((item) => event.query + "-" + item)
        : _items
    );
  };

  useEffect(() => {
    setChecked(Select);
  }, [Select]);

  const tooltip = (
    <OverlayTrigger
      placement="right"
      // show
      overlay={
        <Tooltip className="tooltip1" style={{ margin: "23px 0 0 -1.5px" }}>
          <div className="toolname1">
            Please check the file name before uploading. Remove not allowed
            special characters.
            <br />
            Please follow these standard guidelines for file name:
            <ul>
              <li>
                Create file names that are logical, meaningful to users, simple
                to read and relevant.
              </li>
              <li>Do not include spaces.</li>
              <li>
                File name should not exceed 31 characters. Total length of file
                paths should be limited to a maximum of 255 characters.
                Characters are restricted to letters, numbers and _ (underscore)
                only.
              </li>
              <li>
                Do not use the following characters: ...{" "}
                {`(  ) {  }  [  ] \  / < > @ $ % &`} # ? : , * ” ˜ # â € œ =
              </li>
              <li>
                Always ensure that file extensions are used and in lower case
                when saving files using Macintosh.
              </li>
              <li>Periods(.) are only to be used for the file extension.</li>
              <li>
                When numbering similar types of files or sequences try to
                anticipate maximum numbers.
              </li>
              <li>
                Format dates in a simple manner. For example the date
                June23,2023 can be represented as 23June2024 or 230624
              </li>
              <li>Use underscores instead of periods or spaces.</li>
            </ul>
          </div>
        </Tooltip>
      }
    >
      <div className="infoIcon">
        <img src={infoIcon} alt="" />
      </div>
    </OverlayTrigger>
  );

  const DesignHeader = (di_name, taskName) => {
    return (
      <>
        <div className="font-color">
          {taskName === "Graphic Adaption Brief*" ||
          taskName2 === "Other Reference Documents & Assets"
            ? !di_name
              ? `${taskName}`
              : di_name
            : !di_name
            ? `${taskName} ${index + 1}`
            : di_name}
          {/* {tooltip} */}
          {/* {!di_name ? `${taskName} ${index + 1}` : di_name} */}
        </div>
        <div>
          {taskName === "Graphic Adaption Brief*" ||
          taskName2 === "Other Reference Documents & Assets" ? (
            <div>
              <img
                src={plusCollapseImg}
                alt="filter logo"
                // onClick={() => setAddNewDesign()}
                onClick={() => displayBriefDocument(mydata, taskName)}
                className="header-icons"
                style={{ paddingRight: "4px" }}
                // disabled={!checkReadWriteAccess}
              />
              <span className="font-color">Add files</span>
            </div>
          ) : (
            <img
              src={deleteIcon}
              alt="filter logo"
              onClick={() => checkReadWriteAccess && handleDelete(index)}
              className="header-icons"
              disabled={!checkReadWriteAccess}
            />
          )}
        </div>
      </>
    );
  };

  const [selectDialog, setSelectDialog] = useState(false);
  const [data, setData] = useState({});

  const [azureFile, setAzureFile] = useState("");
  const [fileName, setFileName] = useState("");
  const handledelete = (data, data1) => {};
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
  };

  const itemTemplate = (file) => {
    // setformattedValue(file.size);
    return (
      <div className="upload-row">
        <img role="presentation" src={file.objectURL} width={50} />
        <div className="flex flex-column text-left fileName">{file.name}</div>
      </div>
    );
  };
  const onTemplateSelect = (e) => {
    const MAX_FILENAME_LENGTH = 31;
    const MAX_PATH_LENGTH = 255;
    const regex = /^[a-zA-Z0-9_]+$/;
    const restrictedCharsRegex = /[...(){}\[\]\\\/<>@$%&#?:,*"˜#â€œ]+/;

    console.log("e  here is objectURL", e.files[0].objectURL);
    console.log("e  here is files", e.files);
    console.log("e  here is lastModified", e.files[0].lastModified);
    console.log("e  here is lastModifiedDate", e.files[0].lastModifiedDate);
    console.log("e  here is size", e.files[0].size);
    console.log("e  here is type", e.files[0].type);
    console.log("e  here is length", e.files[0].length);
    console.log("e  here is webkitRelativePath", e.files[0].webkitRelativePath);
    console.log("e  here is di_name", di_name);
    console.log("e  here is name", e.files[0].name);
    console.log("e  here is name.length", e.files[0].name.length);
    const fileLength = e.files[0].name.length;
    const uploadFileName = e.files[0].name;
    const filePathLength = e.files[0].webkitRelativePath.length;
    setFileName(e.files[0].name);
    if (restrictedCharsRegex.test(uploadFileName)) {
      console.log(
        "restrictedCharsRegex arised",
        restrictedCharsRegex.test(uploadFileName)
      );
    }

    if (
      fileLength > MAX_FILENAME_LENGTH ||
      filePathLength > MAX_PATH_LENGTH ||
      regex.test(uploadFileName) ||
      restrictedCharsRegex.test(uploadFileName)
    ) {
      setFileUploadWarning(true);
      // fileUploadWarning = true;
      console.log("setFileUploadWarning is", fileUploadWarning, fileLength);
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

    console.log("e  here is webkitRelativePath", azureFile.webkitRelativePath);
    setTotalSize(_totalSize);
    setAzureFile(renamedFile);
    // setFileName(di_name);
    console.log("e  here is azureFile.name", azureFile.name);
  };

  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  const customUploader = () => {};

  const onImageClose = () => {
    setFileUploadWarning(false);
    setFileName("");
  };

  const BriefDocument = (taskName) => {
    mydata = (
      <>
        <Row
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 15,
            marginTop: 5,
          }}
        >
          <Col sm={3} style={{ display: "flex" }}>
            <div style={{ display: "flex", width: "max-content" }}>
              <div style={{ paddingRight: "8px" }}>
                <label>
                  {taskName === "Graphic Adaption Brief*"
                    ? clickCountGraphicAdaption
                    : clickCountReferenceDocuments}
                </label>
              </div>
            </div>
            <div className="upload-wrap">
              <div style={{ display: "flex" }}>
                <label htmlFor="select" style={{ paddingRight: "6px" }}>
                  Upload File
                </label>
                {tooltip}
              </div>

              <div
                id={`${
                  fileName !== ""
                    ? "uploadImageAndupVersionImage"
                    : "uploadImageAndupVersionImage1"
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
                  onSelect={onTemplateSelect}
                  itemTemplate={itemTemplate}
                  onClear={onImageClose}
                />
                {/* <img
                src={upload}
                alt="filter logo"
                // onClick={() => checkReadWriteAccess && handleDelete(index)}
                className="header-icons"
                disabled={!checkReadWriteAccess}
              ></img> */}
                {/* <div className="fileName">{fileName}</div> */}
              </div>
              <div style={{ color: "red" }}>
                {fileUploadWarning && <label>Wrong file uploaded</label>}
              </div>
            </div>
          </Col>
          <Col sm={3} style={{ display: "flex" }}>
            <div style={{ display: "flex", width: "max-content" }}></div>
            <div className="upload-wrap">
              <div style={{ display: "flex" }}>
                <label htmlFor="select" style={{ paddingRight: "6px" }}>
                  Up Version
                </label>
              </div>

              <div
                id={`${
                  fileName !== ""
                    ? "uploadImageAndupVersionImage"
                    : "uploadImageAndupVersionImage1"
                }`}
              >
                <FileUpload
                  ref={fileUploadRef}
                  name="demo[]"
                  url="/api/upload"
                  accept="image/*"
                  customUpload
                  onUpload={onTemplateUpload}
                  onSelect={onTemplateSelect}
                  itemTemplate={itemTemplate}
                  onClear={onImageClose}
                  // cancelOptions={cancelOptions}
                />
                {/* <img
                src={upload}
                alt="filter logo"
                // onClick={() => checkReadWriteAccess && handleDelete(index)}
                className="header-icons"
                disabled={!checkReadWriteAccess}
              ></img> */}
                {/* <div className="fileName">{fileName}</div> */}
              </div>
            </div>
          </Col>
          <Col sm={3}>
            <div className="upload-wrap-delete">
              <label htmlFor="select" style={{ paddingBottom: "15px" }}>
                Delete
              </label>
              <img
                src={deleteIcon}
                alt="filter logo"
                onClick={() => {
                  setSelectDialog(true);
                  setData(taskName);
                  // if (checkReadWriteAccess) {
                  displayBriefDocumentDataGraphicAdaption.map((index) => {
                    handleDelete(index);
                    console.log("let us see this", index);
                  });
                  console.log("handle click clicked", index);
                }}
                // }
                className="header-icons"
              />
              {/* <img
                src={upload}
                alt="filter logo"
                // onClick={() => checkReadWriteAccess && handleDelete(index)}
                className="header-icons"
                disabled={!checkReadWriteAccess}
              ></img> */}
            </div>
          </Col>
        </Row>
      </>
    );
    // displayBriefDocument(mydata);
    console.log("faskname is", taskName);
    const displayData =
      taskName === "Graphic Adaption Brief*"
        ? displayBriefDocumentDataGraphicAdaption
        : displayBriefDocumentDataReferenceDocuments;

    return displayData;
  };

  let mydata;
  let BriefDocument1 = BriefDocument(taskName);
  let BriefDocument2 = BriefDocument(taskName2);

  let di_name;
  let clubBrandName =
    Brand?.length && Brand.map((item) => item.Brand_Name).join(", ");
  let clubCategory =
    Category?.length && Category.map((item) => item.Category_Name).join(", ");

  if (clubBrandName === "" || Brand === undefined) clubBrandName = "Brand";

  if (clubCategory === "" || Category === undefined) clubCategory = "Category";

  if (agencyRef || clusters || additionalInformation) {
    di_name =
      roleName +
      (agencyRef && agencyRef + "_") +
      clubBrandName +
      "_" +
      clubCategory +
      "_" +
      Project_Name +
      "_" +
      (clusters && clusters + "_") +
      (additionalInformation && additionalInformation);
  }

  console.log("addNewEmptyDesign");

  return (
    <div>
      {selectDialog && (
        <DsbpCommonPopup
          actionHeader="Are you sure you want to delete this file ?"
          dasbpDialog={selectDialog}
          setDasbpDialog={setSelectDialog}
          rejectFormData={[{}]}
          onSubmit={() => handledelete()}
          okButtonShow={false}
          deleteButtonShow={true}
        >
          <>{data}</>
        </DsbpCommonPopup>
      )}
      <div className="design-intent-header">
        {DesignHeader(di_name, taskName)}
      </div>
      {taskName === "Graphic Adaption Brief*" ? (
        <>
          <div
            className="font-color"
            style={{
              marginLeft: 20,
              padding: 5,
              marginTop: 10,
            }}
          >
            <label
              // className={!editNameImg ? "my-condition-class" : ""}
              contentEditable={graphicAdaptionBriefName ? true : false}
              style={
                !editNameImg
                  ? {
                      borderBottom: "1.5px solid #003DA5",
                      paddingRight: "10px",
                    }
                  : { marginRight: "10px" }
              }
            >
              Graphic Adaption Brief 1
            </label>
            {/* <img
              // src={editName}
              src={editNameImg && editName}
              src={!editNameImg && TickUBD}
              src={!editNameImg && CrossUBD}
              alt="edit logo"
              onClick={() => {
                setGraphicAdaptionBriefName(true);
                setEditNameImg(false);
              }}
              className="header-icons"
              style={{ paddingRight: "4px" }}
              // disabled={!checkReadWriteAccess}
            /> */}
            {editNameImg ? (
              <img
                src={editName}
                alt="edit logo"
                onClick={() => {
                  setGraphicAdaptionBriefName(true);
                  setEditNameImg(false);
                }}
                className="header-icons"
                style={
                  !editNameImg
                    ? {
                        borderBottom: "1.5px solid #003DA5",
                        paddingRight: "4px",
                        paddingBottom: "1px",
                      }
                    : { paddingRight: "4px" }
                }
              />
            ) : (
              <>
                <img
                  src={TickUBD}
                  alt="TickUBD logo"
                  onClick={() => {
                    setGraphicAdaptionBriefName(true);
                    setEditNameImg(false);
                  }}
                  className="header-icons"
                  style={
                    !editNameImg
                      ? {
                          borderBottom: "1.5px solid #003DA5",
                          paddingRight: "4px",
                          marginBottom: "-2px",
                        }
                      : { paddingRight: "4px" }
                  }
                />
                <img
                  src={CrossUBD}
                  alt="CrossUBD logo"
                  onClick={() => {
                    setGraphicAdaptionBriefName(true);
                    setEditNameImg(true);
                  }}
                  className="header-icons"
                  style={
                    !editNameImg
                      ? {
                          borderBottom: "1.5px solid blue",
                          marginRight: "6px",
                          marginBottom: "-2px",
                        }
                      : { marginRight: "6px" }
                  }
                />
              </>
            )}
          </div>
          {/* {BriefDocument(taskName)}
           */}
          {mydata}
          {BriefDocument1}
          <div className="design-intent-header">
            {DesignHeader(di_name, taskName2)}
          </div>
          {mydata}
          {BriefDocument2}
          {/* {BriefDocument(taskName2)} */}
          {/* {  displayBriefDocumentDataGraphicAdaption} */}
        </>
      ) : (
        <Row
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 15,
            marginTop: 5,
          }}
        >
          <Col sm={1}>
            <label htmlFor="select"> Select</label>
            <div>
              <Checkbox
                onChange={(e) => {
                  addData("Select", index, e.checked, di_name);
                  setChecked(e.checked);
                  // setSubmitActive(e.checked ? false : true);
                }}
                checked={event === "submit" ? true : checked}
                disabled={!checkReadWriteAccess}
                className="margin-right"
              ></Checkbox>
            </div>
          </Col>
          <Col sm={2}>
            <div className="d-flex flex-column">
              <label htmlFor="agency">Agency Reference * </label>
              <InputText
                id="agency"
                value={agencyRef}
                onChange={(e) => {
                  addData("Agency_Reference", index, e.target.value, di_name);
                  setAgency(e.target.value);
                }}
                disabled={!checkReadWriteAccess}
                aria-describedby="agency-help"
              />
            </div>
            {(agencyRef === "" || agencyRef === undefined) && (
              <div className="error-text-di">Field Remaining</div>
            )}
          </Col>
          <Col sm={2}>
            <div className="d-flex flex-column">
              <label htmlFor="cluster">Cluster * </label>
              <InputText
                id="cluster"
                value={clusters}
                onChange={(e) => {
                  addData("Cluster", index, e.target.value, di_name);
                  setCluster(e.target.value);
                }}
                disabled={!checkReadWriteAccess}
                aria-describedby="cluster-help"
              />
            </div>
            {(clusters === "" || clusters === undefined) && (
              <span className="error-text-di">Field Remaining</span>
            )}
          </Col>
          {checkBU && (
            <Col sm={2} className="set-autocomplete-height">
              <div className="d-flex flex-column">
                <label htmlFor="tier">Tier </label>
                <AutoComplete
                  value={tier}
                  suggestions={items}
                  completeMethod={search}
                  onChange={(e) => setTier(e.value)}
                  dropdown
                  disabled={!checkReadWriteAccess}
                />
              </div>
            </Col>
          )}

          <Col sm={2}>
            <div className="d-flex flex-column">
              <label htmlFor="additional">Additional Info </label>
              <InputText
                id="additional"
                value={additionalInformation}
                onChange={(e) => {
                  addData("Additional_Info", index, e.target.value, di_name);
                  setAdditionalInfo(e.target.value);
                }}
                disabled={!checkReadWriteAccess}
                aria-describedby="info-help"
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AddNewDesignContent;
