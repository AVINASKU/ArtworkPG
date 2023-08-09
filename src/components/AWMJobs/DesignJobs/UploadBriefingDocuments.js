import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import enabledDelete from "../../../assets/images/enabled-delete.svg";
import disabledDelete from "../../../assets/images/disabled-delete.svg";
import DsbpCommonPopup from "../../DSBP/DsbpCommonPopup";
import UploadFile from "../UBD/UploadFile";
import UpVersion from "../UBD/UpVersion";

const UploadBriefingDocuments = ({
  azureSubFolder,
  serial,
  index,
  handleDelete,
  item,
  checkReadWriteAccess,
  length,
  fileUploadSection,
  fileUploadType,
  version,
  getDataSaveAsDraft,
  fileUploadWarning,
  File_NameFromAPI,
  updateUbdData,
  setWrongFileName,
  disableDelete,
  // setAzureFile,
}) => {
  const [fileName, setFileName] = useState("");

  console.log("item121:", index, item);
  const [selectDialog, setSelectDialog] = useState(false);
  const [uploadedWrongFilename, setUploadedWrongFilename] = useState(false);
  useEffect(() => {
    if (uploadedWrongFilename) {
      setWrongFileName(true);
    } else {
      setWrongFileName(false);
    }
  }, [uploadedWrongFilename]);

  return (
    <div>
      {selectDialog && (
        <DsbpCommonPopup
          actionHeader="Are you sure you want to delete this file ?"
          dasbpDialog={selectDialog}
          setDasbpDialog={setSelectDialog}
          rejectFormData={[{}]}
          onSubmit={() =>
            handleDelete(index, fileUploadSection, version, File_NameFromAPI)
          }
          okButtonShow={false}
          deleteButtonShow={true}
          yesButtonShow={true}
        >
          <>{item.File_Name !== "" ? item.File_Name : fileName}</>
        </DsbpCommonPopup>
      )}
      <Row
        style={{
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
          marginTop: 5,
        }}
      >
        <Col sm={2}>
          <UploadFile
            azureSubFolder={azureSubFolder}
            serial={serial}
            key={item.Design_Job_ID}
            // setAzureFile={setAzureFile}
            item={item}
            designData={[]}
            date={""}
            version={version}
            disabled={false}
            fileUploadSection={fileUploadSection}
            uploadFile={fileUploadType.uploadFile}
            sequence={index}
            getDataSaveAsDraft={getDataSaveAsDraft}
            setUploadedWrongFilename={setUploadedWrongFilename}
            File_NameFromAPI={File_NameFromAPI}
            setFileName={setFileName}
            fileName={fileName}
            updateUbdData={updateUbdData}
            // disabled={!checkReadWriteAccess || data.Task_Status === "Complete"}
            // ArtworkAgilityPage={TaskDetailsData?.ArtworkAgilityPage}
            // version={version}
          />
        </Col>
        <Col sm={2}>
          <UpVersion
            key={item.Design_Job_ID}
            // setAzureFile={setAzureFile}
            item={item}
            designData={[]}
            date={""}
            version={version}
            disabled={false}
            fileUploadSection={fileUploadSection}
            upVersion={fileUploadType.upVersion}
            sequence={index}
            getDataSaveAsDraft={getDataSaveAsDraft}
            setUploadedWrongFilename={setUploadedWrongFilename}
            File_NameFromAPI={File_NameFromAPI}
            setFileName={setFileName}
            fileName={fileName}
            updateUbdData={updateUbdData}
            // disabled={!checkReadWriteAccess || data.Task_Status === "Complete"}
            // ArtworkAgilityPage={TaskDetailsData?.ArtworkAgilityPage}
            // version={version}
          />
        </Col>
        <Col sm={3}>
          <div className="d-flex flex-column text-center">
            <label htmlFor="additional">Delete</label>
            <div style={{ marginTop: 13 }}>
              <img
                src={disableDelete ? disabledDelete : enabledDelete}
                alt="filter logo"
                onClick={() =>
                  checkReadWriteAccess &&
                  !disableDelete &&
                  setSelectDialog(true)
                }
                className="header-icons"
                disabled={!checkReadWriteAccess || disableDelete}
              />
            </div>
          </div>
        </Col>
        <Col sm={4}>
          {uploadedWrongFilename && (
            <p className="wrongMsg">
              Filename Invalid. Click on <>&#9432;</> icon to learn more.
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UploadBriefingDocuments;
