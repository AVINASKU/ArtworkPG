import React, { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import plusCollapseImg from "../../assets/images/plusCollapse.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import DsbpCommonPopup from "./DsbpCommonPopup";
import { addEllipsis } from "../../utils";
import { NumberConversion } from "./utils";

const SelectDsbpId = ({
  dropdownlist,
  addDSBPIntoProject,
  totalNoOfDsbpId,
  totalNoOfPMP,
  totalNoOfPOA,
  totalNoOfAddedProject,
  totalNoOfPMPLocked,
  listOfInitiativeId,
  mappedPOAS,
  userHasAccess
}) => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectDialog, setSelectDialog] = useState(false);
  const [selectedDsbpData, setSelectedDsbpData] = useState({});
  const [operation, setOperation] = useState({});

  useEffect(() => {
    setSelectedCities(listOfInitiativeId);
  }, [listOfInitiativeId]);

      let selectedInitiativeName =
      selectedDsbpData?.InitiativeID +
      "_" +
      selectedDsbpData?.InitiativeName +
      "_" +
      selectedDsbpData?.IL +
      "_" +
      selectedDsbpData?.Scope;

  const cityOptionTemplate = (option) => {
    let initiativeName =
      option.InitiativeID +
      "_" +
      option.InitiativeName +
      "_" +
      option.IL +
      "_" +
      option.Scope;
    // console.log("here here", initiativeName, option);
    return (
      <div className="city-option">
        <div className="city-name" onClick={(e) => e.stopPropagation()}>
          {addEllipsis(initiativeName, 75)}
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
            //  !userHasAccess && onChangeSelect(option, "add");
            onChangeSelect(option, "add");
            }}
            alt=""
            style={{ height: 12 }}
            disabled={userHasAccess}
          />
        </div>
        <div>
          <img
            src={deleteIcon}
            onClick={(e) => {
              e.stopPropagation();
            // !userHasAccess &&  onChangeSelect(option, "delete");
            onChangeSelect(option, "delete");
            }}
            alt="filter logo"
            className={`header-icons ${
              ((selectedCities &&
                !selectedCities.includes(option.InitiativeID)) ||
                !selectedCities) &&
              "disable-icons"
            }`}
            style={{ height: 12 }}
            disabled={userHasAccess}
          />
        </div>
      </div>
    );
  };

  const onChangeSelect = (option, operation) => {
    console.log("option", option, mappedPOAS);

    if (operation === "delete" && mappedPOAS.includes(option.InitiativeID)) {
      setOperation("poaCreated");
    } else {
      setOperation(operation);
    }
    setSelectDialog(true);
    setSelectedDsbpData(option);
  };
  const handleOptionSelection = (option, operation) => {
    console.log("operation", operation);
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
  };

  let title;

  switch (operation) {
    case "delete":
      title = "Are you sure you want to delete this DSBP ID ?";
      break;
    case "add":
      title = "Do you want to select this DSBP ID ?";
      break;
    case "poaCreated":
      title = "This DSBP can't be deleted as POAs already created.";
      break;
    default:
      title = "Unknown operation";
      break;
  }

  return (
    <div className="margin-left">
      <div>Select DSBP ID</div>
      <div className="actions dsbp-select p-0">
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
          style={{ maxWidth: 370, width: "300%" }}
          
        />

        <div className="action-buttons margin-right">
          <div>
            DSBP ID's :{" "}
            <span style={{ color: "#003DA5", fontWeight: 600 }}>
              {NumberConversion(totalNoOfDsbpId)}{" "}
            </span>
          </div>
          <div>
            PMP's Locked :{" "}
            <span style={{ color: "#003DA5", fontWeight: 600 }}>
              {" "}
              {NumberConversion(totalNoOfPMPLocked)}{" "}
            </span>{" "}
          </div>
          <div>
            {" "}
            Added to Project :
            <span style={{ color: "#003DA5", fontWeight: 600 }}>
              {" "}
              {NumberConversion(totalNoOfAddedProject)}{" "}
            </span>{" "}
          </div>
          <div>
            {" "}
            Total PMP's:
            <span style={{ color: "#003DA5", fontWeight: 600 }}>
              {" "}
              {NumberConversion(totalNoOfPMP)}{" "}
            </span>{" "}
          </div>
          <div>
            {" "}
            POA Created :
            <span style={{ color: "#003DA5", fontWeight: 600 }}>
              {" "}
              {NumberConversion(totalNoOfPOA)}{" "}
            </span>{" "}
          </div>
        </div>
      </div>
      {selectDialog && (
        <DsbpCommonPopup
          actionHeader={title}
          dasbpDialog={selectDialog}
          setDasbpDialog={setSelectDialog}
          onSubmit={() => handleOptionSelection(selectedDsbpData, operation)}
          okButtonShow={operation === "poaCreated" ? true : false}
        >
          <>
            {selectedInitiativeName}
            {operation === "delete" && (
              <div
                style={{ color: "red", fontSize: "10px", paddingTop: "20px" }}
              >
                *Any changes you made will be lost
              </div>
            )}
          </>
        </DsbpCommonPopup>
      )}
    </div>
  );
};

export default SelectDsbpId;
