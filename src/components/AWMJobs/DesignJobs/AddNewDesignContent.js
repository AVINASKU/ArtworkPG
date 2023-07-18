import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Checkbox } from "primereact/checkbox";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import infoIcon from "../../../assets/images/infoIcon.svg";
import { AutoComplete } from "primereact/autocomplete";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";
import upVersion from "../../../assets/images/upVersion.svg";
import upload from "../../../assets/images/upload.svg";
import DsbpCommonPopup from "../../DSBP/DsbpCommonPopup";
import { FileUpload } from "primereact/fileupload";

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
  clickCount,
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
                {`(  ) {  }  [  ] \  / < > @ $ % &`} # ? : , * ” ˜ # â € œ =( in
                mock up this list is incomplete . use this from this email)
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

  const DesignHeader = (di_name) => {
    return (
      <>
        <div
          className="font-color"
        >
          {taskName === "Graphic Adaption Brief*" ||
          taskName2 === "Other Reference Documents & Assets"
            ? !di_name
              ? `${taskName}`
              : di_name
            : !di_name
            ? `${taskName} ${index + 1}`
            : di_name}
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
console.log("selectDialog:",selectDialog);
  const handledelete = (data, data1) => {
  };
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

  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

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
          <Col sm={2} style={{ display: "flex" }}>
            <div style={{display: "flex", width: "max-content"}}>
            <div style={{ paddingRight: "8px" }}><label>{clickCount}.</label></div>
            </div>
            <div className="upload-wrap">
            <div  style={{ display: "flex" }}>
              <label htmlFor="select" style={{ paddingRight: "6px" }}> Upload File </label>
              {tooltip}
              </div>
              
              <div>
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
              {/* <img
                src={upload}
                alt="filter logo"
                // onClick={() => checkReadWriteAccess && handleDelete(index)}
                className="header-icons"
                disabled={!checkReadWriteAccess}
              ></img> */}
            </div>
            </div>
            
          </Col>
          <Col sm={2} style={{ display: "flex" }}>
            <div style={{display: "flex", width: "max-content"}}>
            </div>
            <div className="upload-wrap">
            <div  style={{ display: "flex" }}>
              <label htmlFor="select" style={{ paddingRight: "6px" }}> Up Version </label>
              </div>
              
              <div>
              <FileUpload
                ref={fileUploadRef}
                name="demo[]"
                url="/api/upload"
                accept="image/*"
                customUpload
                onUpload={onTemplateUpload}
                onSelect={onTemplateSelect}
                itemTemplate={itemTemplate}
                // cancelOptions={cancelOptions}
              />
              {/* <img
                src={upload}
                alt="filter logo"
                // onClick={() => checkReadWriteAccess && handleDelete(index)}
                className="header-icons"
                disabled={!checkReadWriteAccess}
              ></img> */}
            </div>
            </div>
            
          </Col>
          {/* <Col sm={4} style={{marginLeft: 44}}>
            <label>Up Version</label>
            <div>
              <img
                src={upVersion}
                alt="filter logo"
                // onClick={() => checkReadWriteAccess && handleDelete(index)}
                className="header-icons"
                disabled={!checkReadWriteAccess}
              ></img>
            </div>
          </Col> */}
          <Col sm={2}>
            <div className="upload-wrap-delete">
              <label htmlFor="select" style={{ paddingBottom: "15px" }}> Delete </label>
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
          {/* <Col sm={1}>
            <label>Delete</label>
            <div>
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
              ></img>
            </div>
          </Col> */}
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

  return (
    <div>
      {selectDialog && (
        <DsbpCommonPopup
          actionHeader="Are you sure you want to delete this file ?"
          dasbpDialog={selectDialog}
          setDasbpDialog={setSelectDialog}
          onSubmit={() => handledelete()}
          okButtonShow={false}
        >
          <>
            {data}
          </>
        </DsbpCommonPopup>
      )}
      <div className="design-intent-header">{DesignHeader(di_name)}</div>
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
            <label>Graphic Adaption Brief 1</label>
          </div>
          {BriefDocument(taskName)}
          <div className="design-intent-header">
            {DesignHeader(di_name, taskName2)}
          </div>
          {BriefDocument(taskName2)}
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
            )}{" "}
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
