import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import DsbpCommonPopup from "../../DSBP/DsbpCommonPopup";
import UploadFile from "../UBD/UploadFile";
import UpVersion from "../UBD/UpVersion";

const UploadBriefingDocuments = ({
  index,
  handleDelete,
  item,
  checkReadWriteAccess,
  length,
  fileUploadSection,
  fileUploadType,
  getDataSaveAsDraft,
  fileUploadWarning,
  File_NameFromAPI,
}) => {
  const [fileName, setFileName] = useState("");
  const [azureFile, setAzureFile] = useState("");
  const [selectDialog, setSelectDialog] = useState(false);
  const [uploadedWrongFilename, setUploadedWrongFilename] = useState(false);

  return (
    <div>
      {selectDialog && (
        <DsbpCommonPopup
          actionHeader="Are you sure you want to delete this file ?"
          dasbpDialog={selectDialog}
          setDasbpDialog={setSelectDialog}
          rejectFormData={[{}]}
          onSubmit={() => handleDelete(index, fileUploadSection)}
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
            key={item.Design_Job_ID}
            setAzureFile={setAzureFile}
            item={item}
            designData={[]}
            date={""}
            version={""}
            disabled={false}
            fileUploadSection={fileUploadSection}
            uploadFile={fileUploadType.uploadFile}
            sequence={index + 1}
            getDataSaveAsDraft={getDataSaveAsDraft}
            setUploadedWrongFilename={setUploadedWrongFilename}
            File_NameFromAPI={File_NameFromAPI}
            setFileName={setFileName}
            fileName={fileName}
            // disabled={!checkReadWriteAccess || data.Task_Status === "Complete"}
            // ArtworkAgilityPage={TaskDetailsData?.ArtworkAgilityPage}
            // version={version}
          />
        </Col>
        <Col sm={2}>
          <UpVersion
            key={item.Design_Job_ID}
            setAzureFile={setAzureFile}
            item={item}
            designData={[]}
            date={""}
            version={""}
            disabled={false}
            fileUploadSection={fileUploadSection}
            upVersion={fileUploadType.upVersion}
            sequence={index + 1}
            getDataSaveAsDraft={getDataSaveAsDraft}
            setUploadedWrongFilename={setUploadedWrongFilename}
            File_NameFromAPI={File_NameFromAPI}
            setFileName={setFileName}
            fileName={fileName}
            // disabled={!checkReadWriteAccess || data.Task_Status === "Complete"}
            // ArtworkAgilityPage={TaskDetailsData?.ArtworkAgilityPage}
            // version={version}
          />
        </Col>
        <Col sm={3}>
          <div className="d-flex flex-column text-center">
            <label htmlFor="additional">Delete</label>
            <div style={{ marginTop: 7 }}>
              <img
                src={deleteIcon}
                alt="filter logo"
                onClick={() => checkReadWriteAccess && setSelectDialog(true)}
                className="header-icons"
                disabled={!checkReadWriteAccess}
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
