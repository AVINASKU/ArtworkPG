import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";

const SelectDsbpId = () => {
  const [selectedCities, setSelectedCities] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];


  const itemTemplate = (options) => {
    console.log("options", options);

    return <div>{options.name}</div>;
  };

  return (
    <div>
      <div className="margin-left">Select DSBP ID</div>

      <div className="actions multiselect-padding margin-left">
        <div>
          <MultiSelect
            value={selectedCities}
            onChange={(e) => setSelectedCities(e.value)}
            options={cities}
            optionLabel="name"
            filter
            placeholder="Select"
            maxSelectedLabels={3}
            className="w-full md:w-30rem"
            style={{ maxWidth: 330, width: "300%" }}
            itemTemplate={itemTemplate}
            checkboxIcon={false}
          />
        </div>

        <div className="action-buttons margin-right">
          <div>DSBP ID's : 00</div>
          <div>PMP's Locked : 00</div>
          <div> Added Project : 01</div>
          <div> Total PMP's: 09</div>
          <div> POA Created : 12</div>
        </div>
      </div>
    </div>
  );
};

export default SelectDsbpId;
