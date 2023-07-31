import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import filter from "../../assets/images/filter.svg";
import { Form } from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { DMTabValuesAction, DMTabAttributesAction } from "../../store/actions/DMTabValuesActions";
import toggleOff from "../../assets/images/toggleOff.svg";
import toggleOn from "../../assets/images/toggleOn.svg";
import DSBPFilter from "./DSBPFilter";

const DependencyMappingList = ({
  dependencyMappingData,
  dependencyColumnNames,
  CDPTPageData,
  IQData,
  RDTData,
  GABriefData,
  updateDropDownData,
  dropdownDataForLayoutAndDesign,
  userHasAccess,
}) => {
  // console.log("CDPTPageData", CDPTPageData);
  // console.log("dropdownDataForLayoutAndDesign", dropdownDataForLayoutAndDesign);

  // CDPTPageData, IQData, RDTData
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

  const SPMPDesignData = [
    { name: "123", code: "123" },
    { name: "456", code: "456" },
    { name: "789", code: "789" },
  ];
  const SPMPLayoutData = [
    { name: "8888", code: "8888" },
    { name: "9999", code: "9999" },
    { name: "5555", code: "5555" },
  ];

  const onHandlePmpTabView = (options, field) => {
    console.log("column names: ", dependencyColumnNames, dependencyMappingData);
    const attributesData = {
      DMColumnNames: dependencyColumnNames,
      DMMappingData: dependencyMappingData,
      RDTData: RDTData,
      CDPTPageData: CDPTPageData,
      IQData: IQData,
      cicNeededOptionList: cicNeededOptionList,
      SPMPDesignData: SPMPDesignData,
      SPMPLayoutData: SPMPLayoutData,
      GABriefData: GABriefData,
    };
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

    console.log("###insideDependencyMappingList: ", uniqueArray);
    dispatch(DMTabValuesAction(uniqueArray));
    dispatch(DMTabAttributesAction(attributesData));
    navigate("/DSBP/tab/dependencyMapping", { replace: true });
  };

  const renderHeader = (field) => {
    // console.log("field", field);
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

    return (
      <span>
        {field === "field_0" && ( // Add this condition to render a checkbox
          <div className="flex align-items-center gap-2">
            <input type="checkbox" className="p-checkbox-box p-highlight" />
          </div>
        )}
        {field === "AWM_GA_Brief" && (
          <div>
            <Form.Group
              controlId="groupName.ControlInput1"
              style={{ textAlign: "-webkit-center" }}
            >
              <Form.Select
                placeholder="Select"
                value={options[field]}
                onChange={(e) =>
                  updateDropDownData(
                    e.target.value,
                    "AWM_GA_Brief",
                    options.DSBP_PMP_PIMaterialID
                  )
                }
                style={{ width: "80%", fontSize: 12 }}
              >
                <option value="">Select</option>

                {GABriefData?.map((data) => (
                  <option key={data.File_Name} value={data.File_Name}>
                    {data.File_Name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        )}

        {field === "AWM_CDPT_Page" && (
          <div>
            <MultiSelect
              value={options[field]}
              onChange={(e) =>
                updateDropDownData(
                  e.value,
                  "AWM_CDPT_Page",
                  options.DSBP_PMP_PIMaterialID
                )
              }
              options={
                CDPTPageData
                  ? CDPTPageData.map((obj) => ({
                      label: obj.AWM_Design_Job_Name,
                      value: obj.AWM_Design_Job_ID,
                    }))
                  : []
              }
              filter
              placeholder={`Select AWM CDPT Page`}
              maxSelectedLabels={3}
              className="p-column-filter"
            />
          </div>
        )}

        {field === "AWM_RDT_Page" && (
          <div>
            <MultiSelect
              value={options[field]}
              onChange={(e) =>
                updateDropDownData(
                  e.value,
                  "AWM_RDT_Page",
                  options.DSBP_PMP_PIMaterialID
                )
              }
              options={
                RDTData
                  ? RDTData.map((obj) => ({
                      label: obj.AWM_Design_Job_Name,
                      value: obj.AWM_Design_Job_ID,
                    }))
                  : []
              }
              filter
              placeholder={`Select AWM RDT Page`}
              maxSelectedLabels={3}
              className="p-column-filter"
            />
          </div>
        )}
        {field === "AWM_CIC_Matrix" &&
          (options.AWM_CIC_Needed === "" ||
          !options.AWM_CIC_Needed ||
          options.AWM_CIC_Needed === "No" ||
          options.AWM_CIC_Needed === "N/A" ? (
            " "
          ) : (
            <div>
              <span
                className={
                  options[field] === true
                    ? "cic-matrix-text-on"
                    : "cic-matrix-text-off"
                }
              >
                CIC Matrix Only
              </span>
              <img
                src={options[field] === true ? toggleOn : toggleOff}
                className="add-new-design-intent-icon"
                alt="Add role button"
                onClick={(e) =>
                  updateDropDownData(
                    options[field] ? !options[field] : true,
                    "AWM_CIC_Matrix",
                    options.DSBP_PMP_PIMaterialID
                  )
                }
              />
              <span
                className={
                  options[field] === false
                    ? "cic-matrix-text-on"
                    : "cic-matrix-text-off"
                }
              >
                CIC Matrix & CIC's
              </span>
            </div>
          ))}

        {field === "AWM_IQ_Page" && (
          <div>
            <MultiSelect
              value={options[field]}
              onChange={(e) =>
                updateDropDownData(
                  e.value,
                  "AWM_IQ_Page",
                  options.DSBP_PMP_PIMaterialID
                )
              }
              options={
                IQData
                  ? IQData.map((obj) => ({
                      label: obj.AWM_Design_Job_Name,
                      value: obj.AWM_Design_Job_ID,
                    }))
                  : []
              }
              filter
              placeholder={`Select AWM IQ Page`}
              maxSelectedLabels={3}
              className="p-column-filter"
            />
          </div>
        )}
        {field === "AWM_CIC_Needed" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Select
              placeholder="Select"
              value={options[field]}
              onChange={(e) =>
                updateDropDownData(
                  e.target.value,
                  "AWM_CIC_Needed",
                  options.DSBP_PMP_PIMaterialID
                )
              }
              style={{ width: "80%", fontSize: 12 }}
            >
              <option value="">Select</option>
              {cicNeededOptionList?.map((data) => (
                <option key={data.code} value={data.name}>
                  {data.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        {field === "AWM_Other_Reference" &&
          (options.AWM_CIC_Needed === "" ||
          !options.AWM_CIC_Needed ||
          options.AWM_CIC_Needed === "Yes" ||
          options.AWM_CIC_Needed === "No" ? (
            " "
          ) : (
            <Form.Group
              controlId="groupName.ControlInput1"
              style={{ textAlign: "-webkit-center" }}
            >
              <Form.Control
                type="number"
                maxLength={8}
                value={options[field]}
                onChange={(e) =>
                  updateDropDownData(
                    e.target.value,
                    "AWM_Other_Reference",
                    options.DSBP_PMP_PIMaterialID
                  )
                }
                // disabled={
                //   options.AWM_CIC_Needed === "Yes" ||
                //   options.AWM_CIC_Needed === "No"
                // }
                style={{ width: "80%", fontSize: 12 }}
              ></Form.Control>
            </Form.Group>
          ))}

        {field === "AWM_Supporting_PMP_Design" &&
          (options.AWM_CIC_Needed === "" ||
          !options.AWM_CIC_Needed ||
          options.AWM_CIC_Needed === "Yes" ||
          options.AWM_CIC_Needed === "N/A" ? (
            " "
          ) : (
            <Form.Group
              controlId="groupName.ControlInput1"
              style={{ textAlign: "-webkit-center" }}
            >
              <Form.Select
                placeholder="Select"
                value={options[field]}
                onChange={(e) =>
                  updateDropDownData(
                    e.target.value,
                    "AWM_Supporting_PMP_Design",
                    options.DSBP_PMP_PIMaterialID
                  )
                }
                // disabled={options.AWM_CIC_Needed === "Yes" || options.AWM_CIC_Needed === "N/A"}
                style={{ width: "80%", fontSize: 12 }}
              >
                <option value="">Select</option>
                {dropdownDataForLayoutAndDesign?.map((ele) => {
                  return (
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          ))}

        {field === "AWM_Supporting_PMP_Layout" &&
          (options.AWM_CIC_Needed === "" ||
          !options.AWM_CIC_Needed ||
          options.AWM_CIC_Needed === "Yes" ||
          options.AWM_CIC_Needed === "N/A" ? (
            " "
          ) : (
            <Form.Group
              controlId="groupName.ControlInput1"
              style={{ textAlign: "-webkit-center" }}
            >
              <Form.Select
                placeholder="Select"
                value={options[field]}
                onChange={(e) =>
                  updateDropDownData(
                    e.target.value,
                    "AWM_Supporting_PMP_Layout",
                    options.DSBP_PMP_PIMaterialID
                  )
                }
                // disabled={options.AWM_CIC_Needed === "Yes"|| options.AWM_CIC_Needed === "N/A"}
                style={{ width: "80%", fontSize: 12 }}
              >
                <option value="">Select</option>
                {dropdownDataForLayoutAndDesign?.map((ele) => {
                  return (
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          ))}

        {field === "DSBP_PMP_PIMaterialNumber" && (
          <a
            className="tabView"
            disabled={userHasAccess}
            onClick={() => !userHasAccess && onHandlePmpTabView(options, field)}
          >
            {options[field]}
          </a>
        )}
        {field !== "AWM_CDPT_Page" &&
          field !== "AWM_CIC_Needed" &&
          field !== "AWM_RDT_Page" &&
          field !== "AWM_IQ_Page" &&
          field !== "AWM_Other_Reference" &&
          field !== "AWM_Supporting_PMP_Layout" &&
          field !== "AWM_Supporting_PMP_Design" &&
          field !== "DSBP_PMP_PIMaterialNumber" &&
          field !== "AWM_GA_Brief" &&
          options[field]}
      </span>
    );
  };

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
        ...dependencyColumnNames.map((col, index) => {
          // console.log("field col-----", col);
          return (
            <Column
              field={col.field}
              header={renderHeader(col.field)}
              // frozen={field.freeze}
              // className={field.freeze ? "font-bold" : ""}
              // bodyClassName={"change-bg-color"}
              headerClassName={
                col.group === 2 ? "pink-bg-color" : "blue-bg-color"
              }
              body={renderMappingBody}
              key={col.field}
              columnKey={col.field}
              showFilterMenu={false}
              alignFrozen="left"
              filterField={col.field}
              style={{
                // width: col.width,
                width: 200,
                height: 30,
              }}
            />
          );
        }),
      ];
    }
  };

  const rowClassName = (rowData) => {
    let field = rowData.field;
    if (rowData.AWM_CIC_Needed === "No" || rowData.AWM_CIC_Needed === "N/A") {
      return "white-bg-color"; // class name for highlighted rows
    }
    return "pink-bg-color"; // default class name for other rows
  };

  return (
    <>
      {/* <DSBPFilter
        op={op}
        onSort={onSort}
        selectedColumnName={selectedColumnName}
        dsbpPmpData={dsbpPmpData}
        selectedFields={selectedFields}
        onGlobalFilterChange={onGlobalFilterChange}
        setFrozenUpdated={setFrozenUpdated}
        frozenUpdated={frozenUpdated}
        setFieldUpdated={setFieldUpdated}
        fieldUpdated={fieldUpdated}
      /> */}
      <DataTable
        // dataKey="DSBP_PMP_PIMaterialID"
        value={dependencyMappingData}
        rowClassName={rowClassName}
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
    </>
  );
};

export default DependencyMappingList;
