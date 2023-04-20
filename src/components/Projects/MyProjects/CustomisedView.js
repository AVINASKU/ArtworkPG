import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { Col, Row } from "react-bootstrap";
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
    <>
       <button
          type="button"
          className="btn btn-secondary reset-to-default-view"
           onClick={() => {
          resetToPgDefault(selectedCategories);
          setVisible(false);
        }}
        >
          Reset to Default View
        </button>

        <button
          type="button"
          className="btn btn-secondary save-as-personal-view"
           onClick={() => saveAsPersonaliDefault(selectedCategories)}
        >
          Save as Personal View
        </button>

    </>
  );

  return (
    <>
      <Dialog
        header="Customise View"
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
    </>
  );
}
