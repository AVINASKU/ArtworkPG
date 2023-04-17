import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { Col, Row } from "react-bootstrap";
import PGDefault from "../../../assets/images/PGDefault.svg";
import personalDefault from "../../../assets/images/personalDefault.svg";
import "./index.scss";

export default function CustomisedView({
  visible,
  setVisible,
  allColumnNames,
  projectColumnName,
  setProjectColumnNames,
  saveAsPersonaliDefault,
  resetToPgDefault,
}) {
  const [checked, setChecked] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setSelectedCategories(projectColumnName);
  }, [projectColumnName, selectedCategories, setSelectedCategories]);

  const onCategoryChange = (e) => {
    if (e.checked && !selectedCategories.includes(e.value)) {
      selectedCategories.push(e.value);
      setSelectedCategories(selectedCategories);
      setChecked(!checked);
    }

    if (!e.checked) {
      const index = selectedCategories.indexOf(e.value);
      selectedCategories.splice(index, 1);
      setSelectedCategories(selectedCategories);
      setChecked(!checked);
    }
  };

  const footerContent = (
    <div>
      <img
        src={PGDefault}
        alt="Reset to default"
        style={{
          width: 234,
          height: 34,
          cursor: "pointer",
        }}
        onClick={() => {
          resetToPgDefault(selectedCategories);
          setVisible(false);
        }}
      />
      <img
        src={personalDefault}
        alt="Save as personal Default"
        style={{
          width: 264,
          height: 34,
          margin: 15,
          cursor: "pointer",
        }}
        onClick={() => saveAsPersonaliDefault(selectedCategories)}
      />
    </div>
  );

  return (
    <div>
      <Dialog
        header="Customise Fields"
        visible={visible}
        style={{
          width: "75vw",
          height: "540px",
        }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <Row>
          {allColumnNames.map((category) => {
            return (
              <Col sm={3} key={category} style={{ marginBottom: 10 }}>
                <Checkbox
                  inputId={category}
                  name="category"
                  value={category}
                  onChange={onCategoryChange}
                  checked={selectedCategories.some((item) => item === category)}
                />
                <label htmlFor={category} className="ml-2">
                  {category}
                </label>
              </Col>
            );
          })}
        </Row>
      </Dialog>
    </div>
  );
}
