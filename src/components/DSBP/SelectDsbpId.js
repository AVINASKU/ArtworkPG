import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import plusCollapseImg from "../../assets/images/plusCollapse.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import DsbpCommonPopup from "./DsbpCommonPopup";
import { addEllipsis, NumberConversion } from "../../utils";

const SelectDsbpId = ({
  dropdownlist,
  addDSBPIntoProject,
  totalNoOfDsbpId,
  totalNoOfPMP,
  totalNoOfPOA,
}) => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectDialog, setSelectDialog] = useState(false);
  const [selectedDsbpData, setSelectedDsbpData] = useState({});
  const [operation, setOperation] = useState({});


  const cityOptionTemplate = (option) => {
    return (
      <div className="city-option">
        <div className="city-name" onClick={(e) => e.stopPropagation()}>
          {option.InitiativeID} -- {addEllipsis(option.InitiativeName, 40)}
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
              onChangeSelect(option, "add");
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
              onChangeSelect(option, "delete");
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

  const onChangeSelect = (option, operation) => {
    setSelectDialog(true);
    setSelectedDsbpData(option);
    setOperation(operation);    
  };
  const handleOptionSelection = (option, operation) =>{
    console.log("operation", operation)
    const updatedSelectedCities = [...selectedCities];
    const index = updatedSelectedCities.indexOf(option.InitiativeID);
    if (index > -1) {
      updatedSelectedCities.splice(index, 1); // Deselect the option
    } else {
      updatedSelectedCities.push(option.InitiativeID); // Select the option
    }
    setSelectedCities(updatedSelectedCities); // Update selectedCities state
    addDSBPIntoProject(option.InitiativeID, operation);
    setSelectDialog(false);
  }

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
          <div>DSBP ID's : {NumberConversion(totalNoOfDsbpId)}</div>
          <div>PMP's Locked : {NumberConversion(0)}</div>
          <div> Added Project : {NumberConversion(1)}</div>
          <div> Total PMP's: {NumberConversion(totalNoOfPMP)}</div>
          <div> POA Created : {NumberConversion(totalNoOfPOA)}</div>
        </div>
      </div>
      { selectDialog &&
        <DsbpCommonPopup
          actionHeader={operation === "add" ? `Do you want to select this DSBP ID ?` : `Are you sure you want to delete this DSBP ID ?`}
          dasbpDialog={selectDialog}
          setDasbpDialog={setSelectDialog}
          onSubmit={() => handleOptionSelection(selectedDsbpData, operation)}
          
          >
            <>{selectedDsbpData.InitiativeName}
              {operation !== "add" &&
                <div style={{"color": "red", "fontSize": "10px", "paddingTop": "20px"}}>*Any changes you made will be lost</div>
              }            
            </>
          </DsbpCommonPopup>
      }
    </div>
  );
};

export default SelectDsbpId;
