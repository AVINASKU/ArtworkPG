import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Row, Col, Button } from "react-bootstrap";
import { Checkbox } from "primereact/checkbox";
import deleteIcon from "../../../assets/images/deleteIcon.svg";

const AddNewDesignContent = ({
  index,
  brand,
  category,
  projectName,
  handleDelete,
  item,
  addIntoDesignIntent,
  addData,
}) => {
  const { AgencyReference, AdditionalInfo, event,Select, Cluster } = item;

  console.log("Select --->", Select);

  const [checked, setChecked] = useState(false);
  const [agencyRef, setAgency] = useState(AgencyReference);
  const [clusters, setCluster] = useState(Cluster);
  const [additionalInformation, setAdditionalInfo] = useState(AdditionalInfo);
  const [additionalError,setAdditionalError]=useState("");
  const [clusterError, setClusterError]=useState("");

  console.log("checked--->", checked);

  useEffect(()=>{
  setChecked(Select);
  },[Select]);

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
          {/* {di_name} */}
          {!di_name ? `Design Intent ${index + 1}` : di_name}
        </div>
        <img
          src={deleteIcon}
          alt="filter logo"
          onClick={() => handleDelete(index)}
          className="header-icons"
          disabled={event === "submit" && true}
        />
      </>
    );
  };

  let di_name;

  if (agencyRef || clusters || additionalInformation) {
    di_name =
      "DI_" +
      (agencyRef && agencyRef + "_") +
      brand +
      "_" +
      category +
      "_" +
      projectName +
      "_" +
      (clusters && clusters + "_") +
      (additionalInformation && additionalInformation);
  }

  return (
    <div>
      <div className="design-intent-header">{DesignHeader(di_name)}</div>
      <Row
        style={{
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
          marginTop: 5,
        }}
      >
        <Col sm={2}>
          <div>
            <label htmlFor="agency">Agency Reference * </label>
            <InputText
              id="agency"
              value={agencyRef}
              onChange={(e) => {
                addData("AgencyReference", index, e.target.value, di_name);
                setAgency(e.target.value);
              }}
              aria-describedby="agency-help"
              disabled={event === "submit" && true}
            />
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label htmlFor="cluster">Cluster * </label>
            <InputText
              id="cluster"
              value={clusters}
              onChange={(e) => {
                addData("Cluster", index, e.target.value, di_name);
                setCluster(e.target.value);
                setClusterError("");
              }}
              aria-describedby="cluster-help"
              disabled={event === "submit" && true}
            />
            {clusterError && <div>{clusterError}</div>}
          </div>
        </Col>

        <Col sm={2}>
          <div>
            <label htmlFor="additional">Additional Info </label>
            <InputText
              id="additional"
              value={additionalInformation}
              onChange={(e) => {
                addData("AdditionalInfo", index, e.target.value, di_name);
                setAdditionalInfo(e.target.value);
              }}
              aria-describedby="info-help"
              disabled={event === "submit" && true}
            />
          </div>
        </Col>
        <Col sm={1}>
          <label htmlFor="select"> Select</label>
          <div>
            <Checkbox
              onChange={(e) => {
                if (!additionalInformation) {
                  setAdditionalError("Select Additional Info");
                }
                if (!clusters) {
                  setClusterError("Select Cluster");
                }
                addData("Select", index, e.checked, di_name);
                setChecked(e.checked);
              }}
              checked={event === "submit" ? true : checked}
              className="margin-right"
              disabled={event === "submit" && true}
            ></Checkbox>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddNewDesignContent;