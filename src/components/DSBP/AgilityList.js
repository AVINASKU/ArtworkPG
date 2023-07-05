import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Form } from "react-bootstrap";
import { Column } from "primereact/column";
import filter from "../../assets/images/filter.svg";
import DSBPFilter from "./DSBPFilter";
import "../Projects/MyProjects/index.scss";
import DsbpCommonPopup from "./DsbpCommonPopup";
import DsbpRejectDialog from "./RejectDialog";
import DsbpActionDialog from "./DsbpActionDialog";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArtWorkTabValuesAction } from "../../../src/store/actions/ArtWorkTabValuesActions";
import { generateUniqueKey } from "../../utils";
import { onSortData } from "../../utils";

const AgilityList = ({
  selected,
  dsbpPmpData,
  setSelected,
  selectAllChecked,
  handleSelect,
  handleSelectAll,
  onSort,
  selectedFields,
  onGlobalFilterChange,
  filteredDsbpData,
  setDsbpPmpData,
  onActionSubmit,
  buWiseSortedColumnNames,
  handleTabPanel,
  tabPanel,
  setFieldUpdated,
  fieldUpdated,
  setSavedData,
  addSavedData,
  handleYesAddToPRoject,
  setHandleYesAddToPRoject,
  rejectDialog,
  setRejectDialog,
  tableRender,
  setTableRender
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { artWorkTabValuesData } = useSelector(
    (state) => state.ArtWorkTabValuesReducer
  );
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const op = useRef(null);

  
  const [onChangeData, setOnChangeData] = useState(false);
  const [rejectFormData, setRejectFormData] = useState({});
  const [frozenUpdated, setFrozenUpdated] = useState(false);
  const [addedDataForSave, setAddedDataForSave] = useState([]);
  const [tabsList, setTabsList] = useState([
    { tabHeader: "Header 1", decription: "Header 1 data" },
  ]);

  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const allBUAttributesData = useSelector(
    (state) => state.DropDownValuesReducer
  );
  const allBUAttributes = allBUAttributesData.DropDownValuesData;

  let aiseList =
    allBUAttributes?.ArtworkAgilityTasksPage?.Artwork_Alignment?.AISE;
  let assemblyMechanismList =
    allBUAttributes?.ArtworkAgilityTasksPage?.Artwork_Alignment
      ?.Assembly_Mechanism;

  const addToProjectList = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
    { name: "Reject", code: "Reject" },
  ];

  const addToProjectListYes = [
    { name: "Yes", code: "Yes" }
  ];

  const addToProjectListNo = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
  ];

    const addToProjectListReject = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
  ];

  const BU = selectedProjectDetails?.BU;
  // check whether project is from home care or baby care
  let isBUHomeCare = false;
  if (BU === "Home Care") {
    isBUHomeCare = true;
  }

  const onchangeAddToProject = (rowData, e, ele) => {
    console.log("rowData", rowData, e.target.value, rowData[ele]);
    rowData[ele] = e.target.value;
    setDsbpPmpData([...dsbpPmpData]);
    setOnChangeData(rowData);
    if (e.target.value === "Reject") setRejectDialog(true);
    setRejectFormData({});
    if (e.target.value === "Yes" || e.target.value !== "Reject")
      setHandleYesAddToPRoject(true);
  };

  const projectNameOnClick = (e, options) => {
    op.current.toggle(e);
    setSelectedColumnName(options);
  };

  const concatenatedFPCStagingFormula = (data) => {
    const concatenatedData = data.reduce((result, item) => {
      for (const key in item) {
        if (result.hasOwnProperty(key)) {
          result[key] += `,${item[key]}`;
        } else {
          result[key] = item[key];
        }
      }
      return result;
    }, {});
    return concatenatedData;
  };

  const onHandlePmpTabView = (options, field) => {
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

    const newArray = Array.isArray(artWorkTabValuesData)
      ? [...artWorkTabValuesData, ...updatedTabsList]
      : updatedTabsList;

    const uniqueArray = Array.from(
      new Set(newArray.map((obj) => JSON.stringify(obj)))
    ).map(JSON.parse);
    dispatch(ArtWorkTabValuesAction(uniqueArray));
    navigate("/DSBP/tab", { replace: true });
  };

  const onChangeSelectField = (option, e, field) => {
    option[field] = e.target.value;
    setAddedDataForSave({ ...addedDataForSave, option });

    if (addSavedData && addSavedData.length) {
      addSavedData.map((ele) => {
        if (
          ele.DSBP_InitiativeID === option.DSBP_InitiativeID &&
          ele.DSBP_PMP_PIMaterialID === option.DSBP_PMP_PIMaterialID
          
        ) {
          ele[field] = e.target.value;
          return ele;
        }
      });
    }
    let checkDataIsPresentOrNot = addSavedData.filter(
      (ele) =>
        ele.DSBP_InitiativeID === option.DSBP_InitiativeID &&
        ele.DSBP_PMP_PIMaterialID === option.DSBP_PMP_PIMaterialID
    );
    if (!checkDataIsPresentOrNot.length) {
      let updatedData = {};
      updatedData.DSBP_InitiativeID = option.DSBP_InitiativeID;
      updatedData.DSBP_PMP_PIMaterialID = option.DSBP_PMP_PIMaterialID;
      updatedData.FK_AWMProjectID ="A-2828";
      updatedData[field] = e.target.value;
      addSavedData.push(updatedData);
    }
    console.log("add saved data", addSavedData);
    setSavedData(addSavedData);
    setFieldUpdated(!fieldUpdated);
  };

  console.log("option", addedDataForSave);



  const addBody = (options, rowData) => {
    let field = rowData.field;
    let FPCStagingFormula =
      options?.FPCStagingPage?.[0]?.FormulaCardStagingPage;
    // if(field === "AWM_AISE"){
    //  console.log("field", options[field]);
    // 
    let concatenatedFPCStagingFormulaData = {};
    if (FPCStagingFormula && FPCStagingFormula.length) {
      concatenatedFPCStagingFormulaData =
        concatenatedFPCStagingFormula(FPCStagingFormula);
    }

    return (
      <>
        {field === "DSBP_InitiativeID" && (
          <div className="flex align-items-center gap-2">
            <input
              type="checkbox"
              className="p-checkbox-box p-highlight"
              checked={selected?.includes(options)}
              onChange={() => handleSelect(options)}
            />
            {options[field]}
          </div>
        )}
        {options?.FPCStagingPage?.[0][field]}
        {concatenatedFPCStagingFormulaData?.[field]}
        {field === "DSBP_PMP_PIMaterialNumber" && (
          <a
            className="tabView"
            onClick={() => onHandlePmpTabView(options, field)}
          >
            {options[field]}
          </a>
        )}
        {field === "AWM_AddedToProject" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Select
              placeholder="Select"
              value={options[field]}
              onChange={(e) => onchangeAddToProject(options, e, field)}
              style={{ width: "80%", fontSize: 12 }}
            >
              <option value="">Select</option>
              {options[field] === "Yes" && 
              addToProjectListYes?.map((data) => (
                <option key={data.code} value={data.name}>
                  {data.name}
                </option>
              ))}
              {options[field] === "No" && 
              addToProjectListNo?.map((data) => (
                <option key={data.code} value={data.name}>
                  {data.name}
                </option>
              ))}
               {options[field] === "Reject" && 
              addToProjectListReject?.map((data) => (
                <option key={data.code} value={data.name}>
                  {data.name}
                </option>
              ))}
              {options[field] === "" && 
              addToProjectList?.map((data) => (
                <option key={data.code} value={data.name}>
                  {data.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        {field === "AWM_AISE" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Select
              placeholder="Select"
              value={options[field]}
              onChange={(e) => onChangeSelectField(options, e, field)}
              style={{ width: "80%", fontSize: 12 }}
            >
              <option value="">Select</option>
              {aiseList?.map((data) => (
                <option key={data.AWM_AISE} value={data.AWM_AISE}>
                  {data.AWM_AISE}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        {field === "AWM_AssemblyMechanism" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Select
              placeholder="Select"
              value={options[field]}
              onChange={(e) => onChangeSelectField(options, e, field)}
              style={{ width: "80%", fontSize: 12 }}
            >
              <option value="">Select</option>
              {assemblyMechanismList?.map((data) => (
                <option key={data.code} value={data.AWM_AssemblyMechanism}>
                  {data.AWM_AssemblyMechanism || options[field]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        {field === "AWM_Sellable" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Control
              type="text"
              value={options[field]}
              onChange={(e) => onChangeSelectField(options, e, field)}
              placeholder="Enter Sellable"
            />
          </Form.Group>
        )}

        {field === "AWM_Biocide" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Control
              type="text"
              value={options[field]}
              onChange={(e) => onChangeSelectField(options, e, field)}
              placeholder="Enter Biocide"
            />
          </Form.Group>
        )}

        {field !== "DSBP_InitiativeID" &&
          field !== "AWM_AddedToProject" &&
          field !== "DSBP_PMP_PIMaterialNumber" &&
          field !== "AWM_AISE" &&
          field !== "AWM_AssemblyMechanism" &&
          field !== "AWM_Biocide" &&
          field !== "AWM_Sellable" &&
          options[field]}
      </>
    );
  };

  const renderHeader = (field, isFilterActivated = false) => {
    let splittedCol = field.split("_").join(" ");
    return (
      <span key={field}>
        {field === "DSBP_InitiativeID" && (
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
          onClick={(e) => projectNameOnClick(e, field)}
          className={
            isFilterActivated
              ? "columnFilterIcon filter-color-change"
              : "columnFilterIcon"
          }
        />
        {splittedCol}
      </span>
    );
  };

  const renderColumns = () => {
    let jsonColumnWidth = isBUHomeCare
      ? localStorage.getItem("columnWidthDSBPArtworkHomeCare")
      : localStorage.getItem("columnWidthDSBPArtworkBabyCare");
    let allColumns = JSON.parse(jsonColumnWidth);

    if (allColumns && allColumns.length) {
      return allColumns.map((field, index) => {
        return (
          <Column
            field={field.Field_Name}
            header={() => renderHeader(field.Field_Name)}
            frozen={field.freeze}
            className={field.freeze ? "font-bold" : ""}
            body={addBody}
            key={field.Field_Name}
            columnKey={field.Field_Name}
            showFilterMenu={false}
            alignFrozen="left"
            filterField={field.Field_Name}
            style={{
              width: field.width,
            }}
          />
        );
      });
    }
  };

  const onColumnResizeEnd = (event) => {
    let columnWidth = [];
    let jsonColumnWidth = isBUHomeCare
      ? localStorage.getItem("columnWidthDSBPArtworkHomeCare")
      : localStorage.getItem("columnWidthDSBPArtworkBabyCare");
    if (jsonColumnWidth) {
      columnWidth = JSON.parse(jsonColumnWidth);
    }
    if (columnWidth) {
      columnWidth.map((list) => {
        if (event.column.props.field === list.Field_Name) {
          list.width = event.element.offsetWidth;
        }
      });
    }
    // localStorage.setItem("columnWidthDSBPArtwork", JSON.stringify(columnWidth));
    isBUHomeCare
      ? localStorage.setItem(
          "columnWidthDSBPArtworkHomeCare",
          JSON.stringify(columnWidth)
        )
      : localStorage.setItem(
          "columnWidthDSBPArtworkBabyCare",
          JSON.stringify(columnWidth)
        );
    setFieldUpdated(!fieldUpdated);
    setTableRender(false);
  };

  const storeReorderedColumns = (e) => {
    let columnNames = [];
    // let jsonColumnNames = localStorage.getItem("columnWidthDSBPArtwork");
    let jsonColumnNames = isBUHomeCare
      ? localStorage.getItem("columnWidthDSBPArtworkHomeCare")
      : localStorage.getItem("columnWidthDSBPArtworkBabyCare");
    if (jsonColumnNames) {
      columnNames = JSON.parse(jsonColumnNames);
    }
    const shiftedArray = [...columnNames]; // Create a copy of the array
    // Find the index of the element to be shifted
    if (e?.dragIndex !== -1) {
      const [removed] = shiftedArray.splice(e?.dragIndex, 1); // Remove the element from the array
      // shiftedArray.unshift(removed); // Place the removed element at the beginning of the array
      shiftedArray.splice(e?.dropIndex, 0, removed);
    }
    shiftedArray.map((ele, index) => {
      ele["Sequence"] = index;
      ele["reorder"] = true;
    });

    isBUHomeCare
      ? localStorage.setItem(
          "columnWidthDSBPArtworkHomeCare",
          JSON.stringify(shiftedArray)
        )
      : localStorage.setItem(
          "columnWidthDSBPArtworkBabyCare",
          JSON.stringify(shiftedArray)
        );
    // localStorage.setItem(
    //   "columnWidthDSBPArtwork",
    //   JSON.stringify(shiftedArray)
    // );
    setFieldUpdated(!fieldUpdated);
    setTableRender(false);
  };

  const timestamp = new Date().getTime();

  return (
    <>
      <DataTable
        dataKey="DSBP_PMP_PIMaterialID"
        key={tableRender ? `"DSBP_PMP_PIMaterialID" + timestamp` : ""}
        scrollable
        resizableColumns
        // key={generateUniqueKey("artwork")}
        reorderableColumns
        onColumnResizeEnd={onColumnResizeEnd}
        onColReorder={storeReorderedColumns}
        responsiveLayout="scroll"
        columnResizeMode="expand"
        value={
          filteredDsbpData && filteredDsbpData.length
            ? filteredDsbpData
            : dsbpPmpData
        }
        className="mt-3"
        tableStyle={{ width: "max-content", minWidth: "100%" }}
        selection={selected}
        onSelectionChange={(e) => setSelected(e.value)}
      >
        {renderColumns()}
      </DataTable>
      <DSBPFilter
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
      />
      {rejectDialog && (
        <DsbpCommonPopup
          actionHeader="Are you sure you want to reject this PMP?"
          dasbpDialog={rejectDialog}
          setDasbpDialog={setRejectDialog}
          rejectFormData={rejectFormData}
          onSubmit={() => onActionSubmit(rejectFormData, [onChangeData])}
        >
          <DsbpRejectDialog
            onChangeData={onChangeData}
            rejectFormData={rejectFormData}
            setRejectFormData={setRejectFormData}
          />
        </DsbpCommonPopup>
      )}
      {handleYesAddToPRoject && (
        <DsbpActionDialog
          actionHeader="Are you sure you want to add these PMP to Project ?"
          actionDialog={handleYesAddToPRoject}
          setActionDialog={setHandleYesAddToPRoject}
          onChangeData={onChangeData}
          rowData={onChangeData}
          onActionSubmit={onActionSubmit}
        />
      )}
    </>
  );
};

export default AgilityList;
