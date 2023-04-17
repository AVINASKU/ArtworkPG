import React, { useState, useEffect, useRef, Suspense } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProjectService } from "../../../service/PegaService";
import ConfirmationPopUp from "../ConfirmationPopUp";
import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import ProjectListHeader from "../MyProjects/ProjectListHeader";
import { Tag } from "primereact/tag";
import { changeDateFormat } from "../utils";
import { useNavigate } from "react-router-dom";
import filter from "../../../assets/images/filter.svg";

const CustomisedView = React.lazy(() => import("../MyProjects/CustomisedView"));

const AllProjectList = (props) => {
  const [pegadata, setPegaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ProjectFrozen, setProjectFrozen] = useState(false);
  const [frozenCoulmns, setFrozenColumn] = useState([]);
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [projectColumnName, setProjectColumnNames] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [filters, setFilters] = useState([]);
  const [visible, setVisible] = useState(false);
  const [sortData, setSortData] = useState([]);
  const [allColumnNames, setAllColumnNames] = useState([]);
  const [isSearch, isSearchSet] = useState(false);
  const navigate = useNavigate();

  const searchHeader = projectColumnName.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }),
    {}
  );

  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };

  const op = useRef(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Saved Successfully",
      life: 3000,
    });
  };

  const onSort = (column, direction) => (event) => {
    const sortedData = [...pegadata].sort((a, b) => {
      return a[column] > b[column] ? 1 : -1;
    });

    if (direction === "desc") {
      sortedData.reverse();
    }
    setPegaData(sortedData);
    setSortData([column, direction]);
  };

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const ProjectData = await ProjectService.getProjectData();

        if (ProjectData.length) {
          setAllColumnNames(Object.keys(ProjectData[0]));
        }
        // const columnNames = await ProjectService.getAllColumnNames();
        // localStorage.setItem("allColumnNames", JSON.stringify(columnNames));

        // const columnNamesAllProjects =
        //   await ProjectService.getAllColumnNamesAllProjects();
        // localStorage.setItem(
        //   "allColumnNamesAllProjects",
        //   JSON.stringify(columnNamesAllProjects)
        // );

        let filteredPegaDataJson = localStorage.getItem(
          "allProjectColumnWiseFilterData"
        );
        const filteredPegaData = JSON.parse(filteredPegaDataJson);

        if (filteredPegaData && filteredPegaData.length) {
          setFilters(filteredPegaData);
          setSelectedCities(filteredPegaData);
          setPegaData(ProjectData);
        } else setPegaData(ProjectData);

        // according to pathname we need to call api and store column name in local storage

        let columnNamesJson = localStorage.getItem("allColumnNamesAllProjects");
        const columnNames = JSON.parse(columnNamesJson);

        if (columnNames != null && columnNames.length) {
          setProjectColumnNames(columnNames);
        } else {
          const columnNames =
            await ProjectService.getAllColumnNamesAllProjects();
          localStorage.setItem(
            "allColumnNamesAllProjects",
            JSON.stringify(columnNames)
          );
          setProjectColumnNames(columnNames);
        }

        // const jsonSortingData = await ProjectService.getSortingData();
        //   localStorage.setItem('sortingData', JSON.stringify(jsonSortingData));
        // const jsonFilterData = await ProjectService.getFrozenData();
        // localStorage.setItem('frozenData', JSON.stringify(jsonFilterData))

        // get sort data from local storage and add in state
        let jsonSortingData1 = localStorage.getItem("allProjectSortingData");
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
        let jsonFrozenrData1 = localStorage.getItem("allProjectFrozenData");
        const frozenData = JSON.parse(jsonFrozenrData1);
        if (frozenData && frozenData.length) {
          setFrozenColumn(frozenData);
        }
      } catch (err) {
        console.log("error", err);
      }
    })();
    setLoading(false);
  }, []);

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
    return (
      <div>
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
      </div>
    );
  };

  const fullKitReadinessBody = (options, rowData) => {
    let field = rowData.field;

    return (
      <>
        {field === "Full Kit Readiness Tracking" && (
          <Tag
            value="view"
            style={{
              backgroundColor: "white",
              color: "gray",
              border: "1px solid",
            }}
          ></Tag>
        )}

        {field === "Estimated_SOP" && changeDateFormat(options[field])}

        {field === "EstimatedAWPrinters" && changeDateFormat(options[field])}

        {field === "Buffer to work" && <>-----</>}

        {field !== "Full Kit Readiness Tracking" &&
          field !== "Estimated_SOP" &&
          field !== "EstimatedAWPrinters" &&
          field !== "Buffer to work" && <> {options[field]}</>}
      </>
    );
  };

  const dynamicColumns = () => {
    if (projectColumnName.length) {
      return projectColumnName.map((ele, i) => {
        return (
          <Column
            key={ele}
            field={ele}
            filterField={ele}
            header={projectNameHeader(ele)}
            columnKey={i}
            frozen={frozenCoulmns.includes(ele)}
            alignFrozen="left"
            className={frozenCoulmns.includes(ele) ? "font-bold" : ""}
            filter
            showFilterMenu={false}
            filterPlaceholder={ele}
            body={fullKitReadinessBody}
          />
        );
      });
    }
  };

  const saveAsPersonaliDefault = (selectedCategories) => {
    setProjectColumnNames(selectedCategories);
    const columnNames = JSON.stringify(selectedCategories);
    localStorage.setItem("allColumnNamesAllProjects", columnNames);
    setVisible(false);
  };

  const resetToPgDefault = () => {
  // This const is added for todays demo purpose
    const allColumnNamesAllProjects = [
      "ProjectID",
      "ProjectName",
      "Project_Category",
      "Project_SMO",
      "PM",
      "Project_Brand",
      "EstimatedAWPrinters",
      "Full Kit Readiness Tracking",
      "Buffer to work",
    ];
    // const columnNames = ProjectService.getAllColumnNamesAllProjects();
    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(allColumnNamesAllProjects)
    );
    setProjectColumnNames(allColumnNamesAllProjects);
    setVisible(false);
  };

  const clearFilters = () => {
    const columnNames = ProjectService.getAllColumnNamesAllProjects();
    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(columnNames)
    );
    setProjectColumnNames(columnNames);
    setFilters([]);
    showSuccess();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.value;
    setSelectedCities(value);
    setFilters(value);
  };

  const onColumnResizeEnd = (event) => {
    console.log("updated column name", event, event?.element?.clientWidth);

    // const updatedColumns = [...columns];
    // const resizedColumn = updatedColumns.find(
    //   (col) => col.field === event.element.getAttribute("data-pr-field")
    // );
    // resizedColumn.width = event.width;

    // console.log("resized columns", resizedColumn);

    // setColumns(updatedColumns);
  };

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const saveSettings = () => {
    localStorage.setItem(
      "allProjectColumnWiseFilterData",
      JSON.stringify(filters)
    );
    localStorage.setItem("allProjectFrozenData", JSON.stringify(frozenCoulmns));
    localStorage.setItem("allProjectSortingData", JSON.stringify(sortData));
    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(projectColumnName)
    );
    showSuccess();
  };

  const storeReorderedColumns = (e) => {
    const dragColumnName = projectColumnName[e?.dragIndex];
    const index = projectColumnName.indexOf(dragColumnName);
    if (index > -1) {
      // only splice array when item is found
      projectColumnName.splice(index, 1); // 2nd parameter means remove one item only
      projectColumnName.splice(e?.dropIndex, 0, dragColumnName);
    }
    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(projectColumnName)
    );
    setProjectColumnNames(projectColumnName);
  };

  const clearFilter = () => {
    localStorage.setItem("allProjectColumnWiseFilterData", JSON.stringify({}));
    localStorage.setItem("allProjectSortingData", JSON.stringify({}));
    localStorage.setItem("allProjectFrozenData", JSON.stringify({}));
    setSelectedCities([]);
    setSortData([]);
    setFilters([]);
    setFrozenColumn([]);
  };

  const clearColumnWiseFilter = () => {
    let jsonFrozenItem = localStorage.getItem("allProjectFrozenData");
    const frozenItem = JSON.parse(jsonFrozenItem);
    if (
      frozenItem &&
      frozenItem.length &&
      frozenItem.includes(selectedColumnName)
    ) {
      const index = frozenItem.indexOf(selectedColumnName);
      frozenItem.splice(index, 1);
      localStorage.setItem("allProjectFrozenData", JSON.stringify(frozenItem));
      setFrozenColumn(frozenItem);
    }
    if (frozenCoulmns.includes(selectedColumnName)) {
      const index = frozenCoulmns.indexOf(selectedColumnName);
      frozenCoulmns.splice(index, 1);
      setFrozenColumn(frozenCoulmns);
      setProjectFrozen(!ProjectFrozen);
    }
    let jsonSortItem = localStorage.getItem("allProjectFrozenData");
    const sortItem = JSON.parse(jsonSortItem);
    if (sortItem && sortItem.length && sortItem[0] === selectedColumnName) {
      localStorage.setItem("allProjectFrozenData", JSON.stringify([]));
    }
    if (sortData && sortData.length && sortData[0] === selectedColumnName) {
      setSortData([]);
    }
    if (filters && filters.length) {
      localStorage.setItem(
        "allProjectColumnWiseFilterData",
        JSON.stringify({})
      );
      setSelectedCities([]);
      setFilters([]);
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Toast ref={toast} />
        <ProjectListHeader
          header={props.header}
          clearFilters={clearFilters}
          clearFilter={clearFilter}
          setVisible={setVisible}
          saveSettings={saveSettings}
          onSearchClick={onSearchClick}
          exportCSV={exportCSV}
        />

        <CustomisedView
          visible={visible}
          setProjectColumnNames={setProjectColumnNames}
          setVisible={setVisible}
          projectColumnName={projectColumnName}
          allColumnNames={allColumnNames}
          saveAsPersonaliDefault={saveAsPersonaliDefault}
          resetToPgDefault={resetToPgDefault}
        />

        <ConfirmationPopUp
          onSort={onSort}
          saveSettings={saveSettings}
          setProjectFrozen={setProjectFrozen}
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

        <DataTable
          resizableColumns
          dataKey="ProjectID"
          reorderableColumns
          onColReorder={storeReorderedColumns}
          onResize={(e) => console.log("resize", e)}
          onResizeCapture={(e) => console.log("e", e)}
          value={filters.length ? filters : pegadata}
          scrollable
          responsiveLayout="scroll"
          loading={loading}
          className="mt-3"
          columnResizeMode="expand"
          onColumnResizeEnd={onColumnResizeEnd}
          filters={searchHeader}
          filterDisplay={isSearch && "row"}
          tableStyle={{ minWidth: "50rem" }}
          ref={dt}
          selectionMode="single"
          onSelectionChange={(e) => {
            console.log("eee", e.value.ProjectID);
            navigate("/addProject");
            //below code is for future
            // navigate(`/addProject:${e.value.ProjectID}`)
          }}
        >
          {dynamicColumns()}
        </DataTable>
      </Suspense>
    </div>
  );
};
export default AllProjectList;
