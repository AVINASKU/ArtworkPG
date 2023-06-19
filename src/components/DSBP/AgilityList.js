import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import filter from "../../../assets/images/filter.svg";
import filter from "../../assets/images/filter.svg";

import "../Projects/MyProjects/index.scss";

const AgilityList = () => {
  const products = [
    {
      "InitiativeID": "1000",
      PMP: "894567",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      "InitiativeID": "1001",
      PMP: "456389",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      quantity: 61,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      "InitiativeID": "1002",
      PMP: "674567",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: "blue-band.jpg",
      price: 79,
      category: "Fitness",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      "InitiativeID": "1003",
      PMP: "223156",
      code: "244wgerg2",
      name: "Blue T-Shirt",
      description: "Product Description",
      image: "blue-t-shirt.jpg",
      price: 29,
      category: "Clothing",
      quantity: 25,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      "InitiativeID": "1004",
      PMP: "902345",
      code: "h456wer53",
      name: "Bracelet",
      description: "Product Description",
      image: "bracelet.jpg",
      price: 15,
      category: "Accessories",
      quantity: 73,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      "InitiativeID": "1005",
      PMP: "234512",
      code: "av2231fwg",
      name: "Brown Purse",
      description: "Product Description",
      image: "brown-purse.jpg",
      price: 120,
      category: "Accessories",
      quantity: 0,
      inventoryStatus: "OUTOFSTOCK",
      rating: 4,
    },
    {
      "InitiativeID": "1006",
      PMP: "765645",
      code: "bib36pfvm",
      name: "Chakra Bracelet",
      description: "Product Description",
      image: "chakra-bracelet.jpg",
      price: 32,
      category: "Accessories",
      quantity: 5,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      "InitiativeID": "1007",
      PMP: "778890",
      code: "mbvjkgip5",
      name: "Galaxy Earrings",
      description: "Product Description",
      image: "galaxy-earrings.jpg",
      price: 34,
      category: "Accessories",
      quantity: 23,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      "InitiativeID": "1008",
      PMP: "901234",
      code: "vbb124btr",
      name: "Game Controller",
      description: "Product Description",
      image: "game-controller.jpg",
      price: 99,
      category: "Electronics",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 4,
    },
  ];

  const columnName = [
    "InitiativeID",
    "PMP",
    "Locked in DSBP",
    "Add to Project",
    "POA #",
    "POAA Creation Status",
    "Rejection reason",
    "RTA Rejection Reason",
    "Assign a Tagging",
    "Assembly Mech",
    "Artwork Reference Material",
    "AISE",
    "Biocide",
    "Brand",
    "Product Form/Sub Brand",
    "PO Flavor/Scent",
    "Ref COS",
    "PO Languages",
    "PO POA #",
    "PO FPC",
    "PO FPC DESC",
  ];

  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);

  const addBody = (options, rowData) => {
    let field = rowData.field;
    return <>
      <div className="flex align-items-center gap-2">
        <input
          type="checkbox"
          className="p-checkbox-box p-highlight"
          checked={selected?.some((item)=>item.InitiativeID === options.InitiativeID)}
          onChange={() => handleSelect(options)}
        />
        {options[field]}        
      </div>
    </>;
  };

  const handleSelect = (item) => {
    if (selected?.some((d)=>d.InitiativeID === item.InitiativeID)) {
      setSelected(selected.filter((i) => i.InitiativeID !== item.InitiativeID));
    } else {
      if (selected.length === 0) {
        const selectedList = [];
        selectedList.push(item);
        setSelected(selectedList);
      } else {
        setSelected([...selected, item]);
      }
    }
  };

const handleSelectAll = (e) => {
  if (e.target.checked) {
    setSelectAllChecked(true);
    setSelected(products);
  } else {
    setSelectAllChecked(false);
    setSelected([]);
  }
};

  const renderHeader = (field, isFilterActivated = false) => {
    return (
      <span key={field}>
      {field === "InitiativeID" && (
        <input
          type="checkbox"
          checked={selectAllChecked}
          onChange={handleSelectAll}
        />
      )}
        <img
          src={filter}
          key={field}
          alt="Column Filter"
          // onClick={(e) => projectNameOnClick(e, options)}
          className={
            isFilterActivated
              ? "columnFilterIcon filter-color-change"
              : "columnFilterIcon"
          }
        />
        {field}
      </span>
    );
  };


  const renderColumns = () => {
    if (columnName && columnName.length) {
      return columnName.map((field, index) => {
        return (
          <Column
            field={field}
            header={() => renderHeader(field)}
            body={field === "InitiativeID" && addBody}
            key={field}
            columnKey={field}
            showFilterMenu={false}
            alignFrozen="left"
            filterField={field}
          />
        );
      });
    }
  };
  return (
    <DataTable
      dataKey="InitiativeID"
      scrollable
      resizableColumns
      reorderableColumns
      responsiveLayout="scroll"
      columnResizeMode="expand"
      value={products}
      className="mt-3"
      tableStyle={{ width: "max-content", minWidth: "100%" }}
      selection={selected}
      onSelectionChange={(e) => setSelected(e.value)}
    >
      {renderColumns()}
    </DataTable>
  );
};

export default AgilityList;
