import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import plusCollapseImg from "../../assets/images/plusCollapse.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import { addEllipsis } from "../../utils";

const SelectDsbpId = ({
  dropdownlist,
  addDSBPIntoProject,
  totalNoOfDsbpId,
  totalNoOfPMP,
  totalNoOfPOA,
}) => {
  const [selectedCities, setSelectedCities] = useState([]);

  const cityOptionTemplate = (option) => {
    return (
      <div className="city-option">
        <div className="city-name" onClick={(e) => e.stopPropagation()}>
          {option.InitiativeID} --- {addEllipsis(option.InitiativeName, 40)}
          {/* need to uncomment below code and romove line no 20 above code is only for i need to know the initivative id */}
          {/* {addEllipsis(option.InitiativeName, 50)} */}
        </div>
        <div>
          <img
            src={plusCollapseImg}
            className={`add-new-design-intent-icon ${
              selectedCities &&
              selectedCities.length &&
              selectedCities.includes(option.InitiativeID) &&
              "disable-icons"
            }`}
            onClick={(e) => {
              handleOptionSelection(option, "add");
            }}
            alt=""
            style={{ height: 12 }}
          />
        </div>
        <div>
          <img
            src={deleteIcon}
            onClick={(e) => {
              e.stopPropagation();
              handleOptionSelection(option, "delete");
              // if (selectedCities.includes(option.InitiativeName)) {
              //   const updatedCities = selectedCities.filter(
              //     (item) => item !== option.InitiativeName
              //   );
              //   setSelectedCities(updatedCities);
              // }
            }}
            alt="filter logo"
            className={`header-icons ${
              ((selectedCities &&
                !selectedCities.includes(option.InitiativeID)) ||
                !selectedCities) &&
              "disable-icons"
            }`}
            style={{ height: 12 }}
          />
        </div>
      </div>
    );
  };

  const handleOptionSelection = (option, operation) => {
    const updatedSelectedCities = [...selectedCities];
    const index = updatedSelectedCities.indexOf(option.InitiativeID);
    if (index > -1) {
      updatedSelectedCities.splice(index, 1); // Deselect the option
    } else {
      updatedSelectedCities.push(option.InitiativeID); // Select the option
    }
    setSelectedCities(updatedSelectedCities); // Update selectedCities state
    addDSBPIntoProject(option.InitiativeID, operation);
  };

  return (
    <div style={{ textAlign: "initial" }}>
      <div className="margin-left">Select DSBP ID</div>
      <div className="actions margin-left dsbp-select">
        <MultiSelect
          value={selectedCities}
          // onChange={(e) => multiSelectOnChange(e)}
          options={dropdownlist}
          optionLabel="InitiativeName"
          optionValue="InitiativeID" // Set optionValue to "name" to remove checkboxes
          placeholder="Select"
          filter
          // valueTemplate={selectedCityTemplate}
          itemTemplate={cityOptionTemplate}
          maxSelectedLabels={3}
          panelClassName="dsbp-multiselect-dropdown"
          style={{ maxWidth: 330, width: "300%" }}
        />

        <div className="action-buttons margin-right">
          <div>DSBP ID's : {totalNoOfDsbpId}</div>
          <div>PMP's Locked : 00</div>
          <div> Added Project : 01</div>
          <div> Total PMP's: {totalNoOfPMP}</div>
          <div> POA Created : {totalNoOfPOA}</div>
        </div>
      </div>
    </div>
  );
};

export default SelectDsbpId;
