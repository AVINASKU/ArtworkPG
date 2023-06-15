import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import plusCollapseImg from "../../assets/images/plusCollapse.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";

const SelectDsbpId = () => {
  const [selectedCities, setSelectedCities] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

    const selectedCityTemplate = (option) => {
    return option.name;
  };

   const cityOptionTemplate = (option) => {
    return (
      <div className="city-option">
        <div className="city-name">{option.name}</div>
        <div>
         <img
              src={plusCollapseImg}
              className="add-new-design-intent-icon"
              alt=""
              style={{height:12}}
            />
        </div>
        <div> 
        <img
            src={deleteIcon}
            alt="filter logo"
            className="header-icons"
            style={{height:12}}
          />
          </div>

      </div>
    );
  };

  const customStyles = {
    '.p-checkbox': {
      display: 'none',
      // Add any other custom styles you want to override
    },
  };


  return (
    <>
      <div className="margin-left">Select DSBP ID</div>

      <div className="actions multiselect-padding margin-left dsbp-select">
            <MultiSelect
      value={selectedCities}
      onChange={(e) => setSelectedCities(e.value)}
      options={cities}
      optionLabel="name"
      optionValue="name" // Set optionValue to "name" to remove checkboxes
      placeholder="Select Cities"
      filter
      valueTemplate={selectedCityTemplate}
      itemTemplate={cityOptionTemplate}
      maxSelectedLabels={3}
      className="dsbp-select1"
      style={{ maxWidth: 330, width: "300%" }}
    />

        <div className="action-buttons margin-right">
          <div>DSBP ID's : 00</div>
          <div>PMP's Locked : 00</div>
          <div> Added Project : 01</div>
          <div> Total PMP's: 09</div>
          <div> POA Created : 12</div>
        </div>
      </div>
    </>
  );
};

export default SelectDsbpId;
