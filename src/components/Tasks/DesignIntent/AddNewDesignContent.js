import React, { Fragment, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Form, Row, Col } from "react-bootstrap";
import { AutoComplete } from "primereact/autocomplete";
import { Checkbox } from "primereact/checkbox";
import deleteIcon from "../../../assets/images/deleteIcon.svg";

const AddNewDesignContent = ({
  name,
  prefix,
  varient,
  usage,
  suffex,
  index,
  handleDelete,
  id,
}) => {
  const [projectPrefix, setPrefix] = useState(prefix);
  const [projectVarient, setVarient] = useState(varient);
  const [awUsage, setAwUsage] = useState(usage);
  const [items, setItems] = useState([]);
  const [projectSuffex, setSuffex] = useState(suffex);
  const [checked, setChecked] = useState(false);

  const search = (event) => {
    let _items = [...Array(10).keys()];
    setItems(
      event.query
        ? [...Array(10).keys()].map((item) => event.query + "-" + item)
        : _items
    );
  };

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
          {!name ? `Design Intent ${index+1}` : di_name}
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
    let di_name = "DI_" + projectPrefix + "_" + projectVarient + "_" + awUsage + "_" + projectSuffex;
    console.log("suffex", projectSuffex);

  return (
  
    <div>
      <div className="design-intent-header">
        {DesignHeader(di_name)}
      </div>
      <Row style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
        <Col sm={2}>
          <div>
            <label htmlFor="username">Prefix</label>
            <InputText
              id="prefix"
              value={projectPrefix}
              onChange={(e)=>setPrefix(e.target.value)}
              aria-describedby="prefix-help"
            />
          </div>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <label>Select Variant *</label>
            <div style={{ width: 142 }}>
              <AutoComplete
                value={projectVarient}
                suggestions={items}
                completeMethod={search}
                onChange={(e) => setVarient(e.value)}
                dropdown
              />
            </div>
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <label>Select AW Usage *</label>
            <div style={{ width: 142 }}>
              <AutoComplete
                value={awUsage}
                suggestions={items}
                completeMethod={search}
                onChange={(e) => setAwUsage(e.value)}
                dropdown
              />
            </div>
          </Form.Group>
        </Col>
        <Col sm={1}>
          <div className="flex flex-column gap-2">
            <label htmlFor="suffix">Suffix</label>
            <InputText
              id="suffix"
              value={projectSuffex}
              onChange={(e)=> {
              setSuffex(e.target.value);
              }}
              style={{ width: "80px" }}
              aria-describedby="suffix-help"
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
