import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Checkbox } from "primereact/checkbox";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import infoIcon from "../../../assets/images/infoIcon.svg";
import { AutoComplete } from "primereact/autocomplete";
import plusCollapseImg from "../../../assets/images/plusCollapse.svg";
import upVersion from "../../../assets/images/upVersion.svg";
import upload from "../../../assets/images/upload.svg";

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
  displayBriefDocumentData,
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

  const DesignHeader = (di_name) => {
    return (
      <>
        <div
          style={{
            marginLeft: 20,
            padding: 5,
            display: "flex",
          }}
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

          <OverlayTrigger
            placement="right"
            show
            overlay={
              <Tooltip className="tooltip1" style={{ margin: "0 0 0 -7px" }}>
                <div className="toolname1">
                  TExtTExtTExtTExt TExt dddd TExtTExtTExtTExt TExt dd333
                  TExtTExtTExtTExt TExt dddd TExtTExtTExtTExt TExt dd333
                  TExtTExtTExtTExt TExt dddd TExtTExtTExtTExt TExt dd333
                  TExtTExtTExtTExt TExt dddd TExtTExtTExtTExt TExt dd333
                  TExtTExtTExtTExt TExt dddd TExtTExtTExtTExt TExt dd333
                </div>
              </Tooltip>
            }
          >
            <div className="infoIcon">
              <img src={infoIcon} alt="" />
            </div>
          </OverlayTrigger>
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
                onClick={() => displayBriefDocument(mydata)}
                className="header-icons"
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
          <Col sm={1}>
            <label htmlFor="select"> Upload File</label>
            <div>
              <img
                src={upload}
                alt="filter logo"
                // onClick={() => checkReadWriteAccess && handleDelete(index)}
                className="header-icons"
                disabled={!checkReadWriteAccess}
              ></img>
            </div>
          </Col>
          <Col sm={4}>
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
          </Col>
          <Col sm={1}>
            <label>Delete</label>
            <div>
              <img
                src={deleteIcon}
                alt="filter logo"
                onClick={() => {
                  // if (checkReadWriteAccess) {
                  displayBriefDocumentData.map((index) => {
                    handleDelete(index);
                    console.log("let us see this", index);
                  });
                  console.log("handle click clicked", index);
                }}
                // }
                className="header-icons"
              ></img>
            </div>
          </Col>
        </Row>
      </>
    );
    // displayBriefDocument(mydata);
    return displayBriefDocumentData;
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
          ></div>
          <label>Graphic Adaption Brief 1</label>
          {BriefDocument(taskName)}
          <div className="design-intent-header">
            {DesignHeader(di_name, taskName2)}
          </div>
          <label>{taskName2}</label>
          {BriefDocument(taskName2)}
          {/* {displayBriefDocumentData} */}
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
