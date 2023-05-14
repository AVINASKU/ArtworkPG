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

  const numColumns = 4;
  const numRows = Math.ceil(allColumnNames.length / numColumns);

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
        className="btn btn-secondary"
        onClick={() => {
          resetToPgDefault(selectedCategories);
          setVisible(false);
        }}
      >
        Reset to Default View
      </button>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => saveAsPersonaliDefault(selectedCategories)}
      >
        Save as Personal View
      </button>
    </>
  );

  const capitalizeFirstLetter = (str) => {
    let colNames = str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return colNames;
  };

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
        <div>
          {" "}
          {[...Array(numColumns)].map((_, colIndex) => (
            <Row key={colIndex}>
              {" "}
              {[...Array(numRows)].map((_, rowIndex) => {
                const startIndex =
                  colIndex * 8 * numRows + rowIndex * 2 * numColumns;
                return (
                  <Col sm={3} key={rowIndex}>
                    {" "}
                    {allColumnNames
                      .slice(startIndex, startIndex + 2 * numColumns)
                      .map((category) => (
                        <div key={category} className="checkbox-columnnames">
                          <Checkbox
                            inputId={category}
                            name="category"
                            value={category}
                            onChange={onCategoryChange}
                            checked={selectedCategories.some(
                              (item) => item === category
                            )}
                          />
                          <label htmlFor={category} className="ml-2">
                            {/* {category && category.split("_").join(" ")} */}
                            {category === "Artwork_SMO" && "SMO"}
                            {category === "Artwork_Category" && "Category"}
                            {category === "Artwork_Brand" && "Brand"}
                            {category &&
                              category !== "Artwork_SMO" &&
                              category !== "Artwork_Category" &&
                              category !== "Artwork_Brand" &&
                              capitalizeFirstLetter(category)}
                          </label>
                        </div>
                      ))}
                  </Col>
                );
              })}
            </Row>
          ))}
        </div>
      </Dialog>
    </>
  );
}
