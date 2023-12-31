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
  updateDropdownList,
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
    return (
      <div
        className="city-option"
        style={{ opacity: option.sequence === 3 ? 0.4 : 1 }}
      >
        <div
          className={
            option.sequence === 1
              ? "city-name dropdown-name-color"
              : "city-name"
          }
          onClick={(e) => e.stopPropagation()}
        >
          {addEllipsis(initiativeName, 90)}
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
              if (option.sequence !== 3) {
                onChangeSelect(option, "add");
              }
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
              if (option.sequence !== 3) {
                onChangeSelect(option, "delete");
              }
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
    if (operation === "delete" && mappedPOAS.includes(option.InitiativeID)) {
      setOperation("poaCreated");
    } else {
      setOperation(operation);
    }
    setSelectDialog(true);
    setSelectedDsbpData(option);
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
    updateDropdownList(updatedSelectedCities);
    addDSBPIntoProject(option.InitiativeID, operation);
    setSelectDialog(false);
  };

  let title;

  switch (operation) {
    case "delete":
      title = "Are you sure you want to disconnect this DSBP ID ?";
      break;
    case "add":
      title = "Do you want to select this DSBP ID ?";
      break;
    case "poaCreated":
      title = "This DSBP can’t be disconnected as POA is already created.";
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
          optionLabel={(option) =>
            `${option.InitiativeID}_${option.InitiativeName}_${option.IL}_${option.Scope}`
          }
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
          poaCreated={operation === "poaCreated"}
          deleteButtonShow={false}
          submitButtonShow={true}
          // yesButtonShow={false}
          yesButtonShow={operation === "add" ? false : true} 
          disconnectButtonShow={operation === "delete" ? false : true} 
          cancelButtonShow={operation === "delete" ? false : true}
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
