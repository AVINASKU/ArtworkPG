import React, { useState, useEffect, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { ProjectService } from "../../../service/PegaService";
import ConfirmationPopUp from "../ConfirmationPopUp";
import { Toast } from "primereact/toast";
import filter from "../../../assets/images/filter.svg";
import { projectPlan } from "../../../store/actions/ProjectActions";
import { changeDateFormat, onSort } from "../../../utils";
import BlueFilter from "../../../assets/images/BlueFilterIcon.svg";
import complete from "../../../assets/images/complete.svg";
import hyphen from "../../../assets/images/hyphen.svg";
import inprogress from "../../../assets/images/inprogress.svg";
import lock from "../../../assets/images/lock.svg";
import Awaiting from "../../../assets/images/Awaiting.svg";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { selectedProject } from "../../../store/actions/ProjectSetupActions";
import { InputNumber } from "primereact/inputnumber";
import "./index.scss";

const ProjectPlanList = (props) => {
  const [pegadata, setPegaData] = useState(null);
  const [ProjectFrozen, setProjectFrozen] = useState(false);
  const [frozenCoulmns, setFrozenColumn] = useState([]);
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [projectColumnName, setProjectColumnNames] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortData, setSortData] = useState([]);

  const myProjectList = useSelector((state) => state.myProject);
  const { loading } = myProjectList;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const op = useRef(null);
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Saved Successfully",
      life: 3000,
    });
  };

  useEffect(() => {
    const updatedUsers = dispatch(projectPlan());
    console.log("projectPlan::", updatedUsers);
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const ProjectData = myProjectList.projectPlan;

        let filteredPegaDataJson = localStorage.getItem("columnWiseFilterData");
        const filteredPegaData = JSON.parse(filteredPegaDataJson);

        if (filteredPegaData && filteredPegaData.length) {
          setFilters(filteredPegaData);
          setSelectedCities(filteredPegaData);
          setPegaData(ProjectData);
        } else setPegaData(ProjectData);

        // according to pathname we need to call api and store column name in local storage
        let columnNamesJson = localStorage.getItem("projectPlanAllColumnNames");
        const columnNames = JSON.parse(columnNamesJson);
        if (columnNames != null && columnNames.length) {
          setProjectColumnNames(columnNames);
        } else {
          const columnNames = ProjectService.getProjectPlanAllColumnNames();
          localStorage.setItem(
            "projectPlanAllColumnNames",
            JSON.stringify(columnNames)
          );
          setProjectColumnNames(columnNames);
        }

        // get sort data from local storage and add in state
        let jsonSortingData1 = localStorage.getItem("sortingData");
        const sortingData = JSON.parse(jsonSortingData1);

        if (sortingData && sortingData.length) {
          const sortedData = [...ProjectData].sort((a, b) => {
            return a[sortingData[0]] > b[sortingData[0]] ? 1 : -1;
          });

          if (sortingData[1] === "desc") {
            sortedData.reverse();
          }
          setPegaData(sortedData);
          setSortData([sortingData[0], sortingData[1]]);
        }

        //get frozen data from local storage and add in state
        let jsonFrozenrData1 = localStorage.getItem("frozenDataProjectPlan");
        const frozenDataProjectPlan = JSON.parse(jsonFrozenrData1);
        if (frozenDataProjectPlan && frozenDataProjectPlan.length) {
          setFrozenColumn(frozenDataProjectPlan);
        }
      } catch (err) {
        console.log("error", err);
      }
    })();
    // setLoading(false);
  }, [myProjectList.projectPlan]);

  const addFrozenColumns = (name) => {
    if (!frozenCoulmns.includes(name)) {
      frozenCoulmns.push(name);
      setFrozenColumn(frozenCoulmns);
    } else {
      let columnIndex = frozenCoulmns.indexOf(name);
      frozenCoulmns.splice(columnIndex, 1);
      setFrozenColumn(frozenCoulmns);
    }
  };

  const projectNameHeader = (options) => {
    const isFilterActivated =
      (frozenCoulmns &&
        frozenCoulmns.length &&
        frozenCoulmns.includes(options)) ||
      (sortData && sortData.length && sortData[0] === options);

    return (
      <div>
        {isFilterActivated ? (
          <>
            <img
              src={BlueFilter}
              alt="Column Filter"
              onClick={(e) => {
                op.current.toggle(e);
                setSelectedColumnName(options);
              }}
              className="columnFilterIcon"
            />
            <span style={{ color: "#003DA5" }}>{options}</span>
          </>
        ) : (
          <>
            <img
              src={filter}
              alt="Column Filter"
              onClick={(e) => {
                op.current.toggle(e);

                setSelectedColumnName(options);
              }}
              className="columnFilterIcon"
            />
            {options}
          </>
        )}
      </div>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.value;
    setSelectedCities(value);
    setFilters(value);
  };

  const saveSettings = () => {
    localStorage.setItem("columnWiseFilterData", JSON.stringify(filters));
    localStorage.setItem(
      "frozenDataProjectPlan",
      JSON.stringify(frozenCoulmns)
    );
    localStorage.setItem("sortingData", JSON.stringify(sortData));
    localStorage.setItem(
      "projectPlanAllColumnNames",
      JSON.stringify(projectColumnName)
    );
    showSuccess();
  };

  const clearColumnWiseFilter = () => {
    let jsonFrozenItem = localStorage.getItem("frozenDataProjectPlan");
    const frozenItem = JSON.parse(jsonFrozenItem);
    if (
      frozenItem &&
      frozenItem.length &&
      frozenItem.includes(selectedColumnName)
    ) {
      const index = frozenItem.indexOf(selectedColumnName);
      frozenItem.splice(index, 1);
      localStorage.setItem("frozenDataProjectPlan", JSON.stringify(frozenItem));
      setFrozenColumn(frozenItem);
    }
    if (frozenCoulmns.includes(selectedColumnName)) {
      const index = frozenCoulmns.indexOf(selectedColumnName);
      frozenCoulmns.splice(index, 1);
      setFrozenColumn(frozenCoulmns);
      setProjectFrozen(!ProjectFrozen);
    }
    let jsonSortItem = localStorage.getItem("sortingData");
    const sortItem = JSON.parse(jsonSortItem);
    if (sortItem && sortItem.length && sortItem[0] === selectedColumnName) {
      localStorage.setItem("sortingData", JSON.stringify([]));
    }
    if (sortData && sortData.length && sortData[0] === selectedColumnName) {
      setSortData([]);
    }
    if (filters && filters.length) {
      localStorage.setItem("columnWiseFilterData", JSON.stringify({}));
      setSelectedCities([]);
      setFilters([]);
    }
  };

  const rowExpansionColumnNames = [
    "Task",
    "Dependancy",
    "Role",
    "Owner",
    "State",
    "Duration",
    "StartDate",
    "EndDate",
    "ConsumedBuffer",
    "HelpNeeded",
  ];

  const elementTemplate = (options, rowData) => {
    const field = rowData.field;

    return (
      <>
        {field === "Task" && (
          <span
            className="TaskStyles"
            onClick={() => {
              if (field && field.length) {
                dispatch(selectedProject(options.data, "My Projects"));
                navigate(`/projectPlan/${options.data[field]}`);
              }
            }}
          >
            {options.data[field]}
          </span>
        )}

        {options.children && options.children.length > 0 ? (
          <>
            {(field === "Role" ||
              field === "Owner" ||
              field === "State" ||
              field === "Duration") && (
              <img
                src={hyphen}
                alt="Hyphen"
                onClick={(e) => {
                  op.current.toggle(e);
                }}
              />
            )}
          </>
        ) : (
          <>
            {(field === "Role" || field === "Owner") && (
              <Dropdown
                editable
                value={options?.data[field]}
                onChange={(e) => onDropdownChange(options, e, field)}
                options={
                  field === "Role"
                    ? options.data["RoleOptions"]
                    : field === "Owner"
                    ? options.data["OwnerOptions"]
                    : []
                }
                optionLabel="name"
                placeholder={`Select ${field}`}
                className="w-full md:w-14rem"
              />
            )}
            {field === "State" && options.data[field] === "Complete" ? (
              <>
                <img
                  src={complete}
                  alt="Check"
                  onClick={(e) => {
                    op.current.toggle(e);
                  }}
                  className="iconsStyle"
                />
                <span className="iconsTextStyle" onClick={() => {}}>
                  {options.data[field]}
                </span>
              </>
            ) : field === "State" && options.data[field] === "In Progress" ? (
              <>
                <img
                  src={inprogress}
                  alt="In Progress"
                  onClick={(e) => {
                    op.current.toggle(e);
                  }}
                  className="iconsStyle"
                />
                <span
                  className="iconsTextStyle iconInprogress"
                  onClick={() => {}}
                >
                  {options.data[field]}
                </span>
              </>
            ) : field === "State" && options.data[field] === "Available" ? (
              <>
                <img
                  src={lock}
                  alt="Lock"
                  onClick={(e) => {
                    op.current.toggle(e);
                  }}
                  className="iconsStyle"
                />
                <span className="iconsTextStyle iconLock" onClick={() => {}}>
                  {options.data[field]}
                </span>
              </>
            ) : field === "State" && options.data[field] === "Awaiting" ? (
              <>
                <img
                  src={Awaiting}
                  alt="Awaiting"
                  onClick={(e) => {
                    op.current.toggle(e);
                  }}
                  className="iconsStyle"
                />
                <span
                  className="iconsTextStyle iconAwaiting"
                  onClick={() => {}}
                >
                  {options.data[field]}
                </span>
              </>
            ) : (
              <>{field === "State" && options.data[field]}</>
            )}
            {field === "Duration" && (
              <InputNumber
                className="input-duration"
                inputId="integeronly"
                value={options?.data[field]}
                onValueChange={(e) => onDurationChange(options, e, field)}
              />
            )}
          </>
        )}

        {field === "HelpNeeded" && (
          <button type="button" className="btn btn-success helpNeeded">
            {options.data[field]}
          </button>
        )}

        {field === "StartDate" && changeDateFormat(options.data[field])}
        {field === "EndDate" && (
          <span>{changeDateFormat(options.data[field])}</span>
        )}
        {field !== "Task" &&
          field !== "Role" &&
          field !== "Owner" &&
          field !== "State" &&
          field !== "StartDate" &&
          field !== "EndDate" &&
          field !== "Duration" &&
          field !== "HelpNeeded" && <>{options.data[field]}</>}
      </>
    );
  };

  const onDropdownChange = (rowData, { value }, ele) => {
    // Update the data with the new value
    rowData.data[ele] = value.name;
    console.log("Pegadata: ", pegadata);
    setPegaData([...pegadata]);
  };

  const onDurationChange = (rowData, { value }, ele) => {
    rowData.data[ele] = value < 1 ? "0" : value?.toString();
    console.log("Pegadata: ", pegadata);
    setPegaData([...pegadata]);
  };

  const rowExpansionColumns = () => {
    if (rowExpansionColumnNames.length) {
      return rowExpansionColumnNames.map((ele, i) => {
        return (
          <Column
            key={ele}
            field={ele}
            filterField={ele}
            header={projectNameHeader(ele)}
            expander={ele === "Task"}
            columnKey={ele || i}
            frozen={frozenCoulmns.includes(ele)}
            alignFrozen="left"
            className={
              frozenCoulmns.includes(ele)
                ? "font-bold"
                : ""
            }
            showFilterMenu={false}
            body={elementTemplate}
          />
        );
      });
    }
  };

  const data = () => {
    const data = pegadata?.map((obj) => obj.data);
    console.log("data:", data);
    return data || [];
  };
  return (
    <div className="myProjectAnddAllProjectList">
      <Suspense fallback={<div>Loading...</div>}>
        <Toast ref={toast} />
        <div className="card">
          <ConfirmationPopUp
            onSort={(column, direction) =>
              onSort(column, direction, pegadata, setPegaData, setSortData)
            }
            setProjectFrozen={setProjectFrozen}
            saveSettings={saveSettings}
            projectData={pegadata}
            addFrozenColumns={addFrozenColumns}
            onGlobalFilterChange={onGlobalFilterChange}
            selectedColumnName={selectedColumnName}
            ProjectFrozen={ProjectFrozen}
            selectedCities={selectedCities}
            setFrozenColumn={setFrozenColumn}
            frozenCoulmns={frozenCoulmns}
            sortData={sortData}
            setSortData={setSortData}
            setFilters={setFilters}
            filters={filters}
            op={op}
            clearColumnWiseFilter={clearColumnWiseFilter}
          />
          <TreeTable
            resizableColumns
            dataKey="Task"
            reorderableColumns
            value={filters.length ? filters : pegadata}
            loading={loading}
            className="mt-3 textAlignTreeTable"
            tableStyle={{ minWidth: "119rem", tableLayout: "auto" }}
          >
            {/* <Column header="" expander={true}></Column> */}
            {rowExpansionColumns()}
          </TreeTable>
        </div>
      </Suspense>
    </div>
  );
};

export default ProjectPlanList;
