import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Form, Row, Col } from "react-bootstrap";
import { Checkbox } from "primereact/checkbox";
import deleteIcon from "../../../assets/images/deleteIcon.svg";

const AddNewDesignContent = ({
  name,
  agency,
  cluster,
  index,
  additionalInfo,
  handleDelete,
  id,
}) => {
  const [checked, setChecked] = useState(false);

  const [agencyRef, setAgency] = useState(null);
  const [clusters, setCluster] = useState(null);
  const [additionalInformation, setAdditionalInfo] = useState(null);

  const DesignHeader = (di_name) => {
    return (
      <>
        <div
          style={{
            marginLeft: 20,
            marginBottom: 10,
            marginRight: 15,
            padding: 5,
          }}
          className="font-color"
        >
          {/* {di_name} */}
          {!name ? `Design Intent ${index + 1}` : di_name}
        </div>
        <img
          src={deleteIcon}
          alt="filter logo"
          onClick={() => handleDelete(index)}
          className="header-icons"
        />
      </>
    );
  };
  let di_name = "DI_";
  //   "DI_" +
  //   projectPrefix +
  //   "_" +
  //   projectVarient +
  //   "_" +
  //   awUsage +
  //   "_" +
  //   projectSuffex;
  // console.log("suffex", projectSuffex);

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
              onChange={(e) => setAgency(e.target.value)}
              aria-describedby="agency-help"
            />
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label htmlFor="cluster">Cluster * </label>
            <InputText
              id="cluster"
              value={clusters}
              onChange={(e) => setCluster(e.target.value)}
              aria-describedby="cluster-help"
            />
          </div>
        </Col>

        <Col sm={2}>
          <div>
            <label htmlFor="additional">Additional Info </label>
            <InputText
              id="additional"
              value={additionalInformation}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              aria-describedby="info-help"
            />
          </div>
        </Col>
        <Col sm={1}>
          <label htmlFor="select"> Select</label>
          <div>
            <Checkbox
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
              className="margin-right"
            ></Checkbox>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddNewDesignContent;
