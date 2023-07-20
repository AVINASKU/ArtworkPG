import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import filter from "../../assets/images/filter.svg";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { DMTabValuesAction } from "../../store/actions/DMTabValuesActions";

const DependencyMappingList = ({
  dependencyMappingData,
  dependencyColumnNames,
  userHasAccess,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dmTabValuesData } = useSelector((state) => state.DMTabValuesReducer);
  const [tabsList, setTabsList] = useState([
    { tabHeader: "Header 1", decription: "Header 1 data" },
  ]);

  const cicNeededOptionList = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
    { name: "N/A", code: "N/A" },
  ];

  const onHandlePmpTabView = (options, field) => {
    console.log("column names: ", dependencyColumnNames, dependencyMappingData);
    const selectedTab = {
      tabHeader: options[field],
      description: options,
    };

    let updatedTabsList = [];
    if (
      tabsList.some(
        (tab) => JSON.stringify(tab) === JSON.stringify(selectedTab)
      )
    ) {
      // selectedTab is already present
    } else {
      updatedTabsList = [...tabsList, selectedTab];
    }

    const newArray = Array.isArray(dmTabValuesData)
      ? [...dmTabValuesData, ...updatedTabsList]
      : updatedTabsList;

    const uniqueArray = Array.from(
      new Set(newArray.map((obj) => JSON.stringify(obj)))
    ).map(JSON.parse);

    console.log("uniqueArray DM: ", uniqueArray);
    dispatch(DMTabValuesAction(uniqueArray));
    navigate("/DSBP/DMTab", { replace: true });
  };

  const renderHeader = (field) => {
    if (field === "checkbox") {
      // Render checkbox in header
      return (
        <div className="flex align-items-center gap-2">
          <input
            type="checkbox"
            className="p-checkbox-box p-highlight"
            // checked={selectAllChecked}
            // onChange={handleSelectAll}
          />
        </div>
      );
    }
    return (
      <span key={field}>
        <img
          src={filter}
          key={field}
          alt="Column Filter"
          style={{ height: 14, paddingLeft: 5, paddingRight: 5 }}
          // onClick={(e) => projectNameOnClick(e, field)}
          // className={
          //   isFilterActivated
          //     ? "columnFilterIcon filter-color-change"
          //     : "columnFilterIcon"
          // }
        />
        {field}
      </span>
    );
  };

  const renderMappingBody = (options, rowData) => {
    let field = rowData.field;
    console.log("options: ", options);
    console.log("field: ", field);
    if (field === "DSBP_PMP_PIMaterialNumber") {
      return (
        <a
          className="tabView"
          disabled={userHasAccess}
          onClick={() => !userHasAccess && onHandlePmpTabView(options, field)}
        >
          {options[field]}
        </a>
      );
    } else {
      return <>{options[field]}</>;
    }
  };

  // const renderMappingBody = (options, rowData) => {
  //   let field = rowData.field;
  //   return (
  //     <span>
  //       {field === "field_0" && ( // Add this condition to render a checkbox
  //         <div className="flex align-items-center gap-2">
  //           <input
  //             type="checkbox"
  //             className="p-checkbox-box p-highlight"
  //             // checked={selected?.includes(options)}
  //             // onChange={() => handleSelect(options)}
  //           />
  //         </div>
  //       )}
  //       {field === "CIC_Needed" && (
  //         <Form.Group
  //           controlId="groupName.ControlInput1"
  //           style={{ textAlign: "-webkit-center" }}
  //         >
  //           <Form.Select
  //             placeholder="Select"
  //             value={options[field]}
  //             onChange={(e) => console.log("e", e)}
  //             style={{ width: "80%", fontSize: 12 }}
  //           >
  //             <option value="">Select</option>
  //             {cicNeededOptionList?.map((data) => (
  //               <option key={data.code} value={data.name}>
  //                 {data.name}
  //               </option>
  //             ))}
  //           </Form.Select>
  //         </Form.Group>
  //       )}
  //       {options[field]}
  //     </span>
  //   );
  // };

  const dynamicColumns = () => {
    if (dependencyColumnNames && dependencyColumnNames.length) {
      return [
        <Column
          key="checkbox"
          body={renderMappingBody}
          frozen={true}
          columnKey="checkbox"
          header={() => renderHeader("checkbox")}
          style={{ width: "40px" }}
        />,
        ...dependencyColumnNames.map((field, index) => {
          return (
            <Column
              field={field}
              header={renderHeader(field)}
              // frozen={field.freeze}
              // className={field.freeze ? "font-bold" : ""}
              // bodyClassName={"change-bg-color"}
              body={renderMappingBody}
              key={field}
              columnKey={field}
              showFilterMenu={false}
              alignFrozen="left"
              filterField={field}
              style={{
                width: 250,
                height: 30,
              }}
            />
          );
        }),
      ];
    }
  };

  // const rowClassName = (rowData) => {
  //   let field = rowData.field;
  //   console.log("field and options", rowData.DSBP_PMP_PIMaterialNumber);
  //   if (
  //     rowData.DSBP_PMP_PIMaterialNumber === "90039166" ||
  //     rowData.DSBP_PMP_PIMaterialNumber === "90062074"
  //   ) {
  //     return "white-bg-color"; // class name for highlighted rows
  //   }
  //   return "pink-bg-color"; // default class name for other rows
  // };

  return (
    <DataTable
      // dataKey="DSBP_PMP_PIMaterialID"
      value={dependencyMappingData}
      // rowClassName={rowClassName}
      className="mt-3"
      responsiveLayout="scroll"
      columnResizeMode="expand"
      scrollable
      resizableColumns
      reorderableColumns
      tableStyle={{
        width: "max-content",
        minWidth: "100%",
      }}
    >
      {dynamicColumns()}
    </DataTable>
  );
};

export default DependencyMappingList;
