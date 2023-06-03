import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Row, Col } from "react-bootstrap";
import { Checkbox } from "primereact/checkbox";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import { AutoComplete } from "primereact/autocomplete";

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
  }, [item]);

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
          }}
          className="font-color"
        >
          {!di_name ? `Design Intent ${index + 1}` : di_name}
        </div>
        <div>
          <img
            src={deleteIcon}
            alt="filter logo"
            onClick={() => checkReadWriteAccess && handleDelete(index)}
            className="header-icons"
            disabled={!checkReadWriteAccess}
          />
        </div>
      </>
    );
  };

  let di_name;
  let clubBrandName =
    Brand?.length && Brand.map((item) => item.Brand_Name).join(",");
  let clubCategory =
    Category?.length && Category.map((item) => item.Category_Name).join(",");

    if(clubBrandName === "" || Brand===undefined) clubBrandName = "Brand";

    if(clubCategory === "" || Category ===undefined) clubCategory = "Category";

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
              className="margin-right"
            ></Checkbox>
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label htmlFor="agency">Agency Reference * </label>
            <InputText
              id="agency"
              value={agencyRef}
              onChange={(e) => {
                addData("Agency_Reference", index, e.target.value, di_name);
                setAgency(e.target.value);
              }}
              aria-describedby="agency-help"
            />
          </div>
          {(agencyRef === "" || agencyRef === undefined) && (
            <div className="error-text-di">Field Remaining</div>
          )}
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
              }}
              aria-describedby="cluster-help"
            />
          </div>
          {(clusters === "" || clusters === undefined) && (
            <span className="error-text-di">Field Remaining</span>
          )}{" "}
        </Col>
        {checkBU && (
          <Col sm={2} className="set-autocomplete-height">
            <div>
              <label htmlFor="cluster">Tier </label>
              <AutoComplete
                value={tier}
                suggestions={items}
                completeMethod={search}
                onChange={(e) => setTier(e.value)}
                dropdown
              />
            </div>
          </Col>
        )}

        <Col sm={2}>
          <div>
            <label htmlFor="additional">Additional Info </label>
            <InputText
              id="additional"
              value={additionalInformation}
              onChange={(e) => {
                addData("Additional_Info", index, e.target.value, di_name);
                setAdditionalInfo(e.target.value);
              }}
              aria-describedby="info-help"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddNewDesignContent;
