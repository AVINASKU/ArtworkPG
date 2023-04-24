import React, { useState, useEffect, useRef, Suspense } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProjectService } from "../../../service/PegaService";
import ConfirmationPopUp from "../ConfirmationPopUp";
import { FilterMatchMode } from "primereact/api";
import ProjectListHeader from "../MyProjects/ProjectListHeader";
import { Tag } from "primereact/tag";
import { changeDateFormat } from "../utils";
import filter from "../../../assets/images/filter.svg";
import {
  getAllProject,
  // updateProject,
} from "../../../store/actions/ProjectActions";
import { selectedProject } from "../../../store/actions/projectSetup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomisedView = React.lazy(() => import("../MyProjects/CustomisedView"));

const AllProjectList = (props) => {
  const [pegadata, setPegaData] = useState(null);
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
  const [isReorderedColumn, setReorderedColumn] = useState(false);
  const allProjectList = useSelector((state) => state.myProject);
  const { loading } = allProjectList;
  const dispatch = useDispatch();
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
  const dt = useRef(null);

  const onSort = (column, direction) => (event) => {
    const sortedData = [...pegadata].sort((a, b) => {
      return a[column] > b[column] ? 1 : -1;
    });

    if (direction === "desc") {
      sortedData.reverse();
    }

    setPegaData(sortedData);
    setSortData([column, direction]);
    localStorage.setItem("allProjectSortingData", JSON.stringify(sortData));
  };

  useEffect(() => {
    const updatedUsers = dispatch(getAllProject());
    console.log("all projects", updatedUsers);
  }, [dispatch]);

  const reorderColumns = (columns) => {
    const requiredColumnOrderArray = [
      "Project_ID",
      "Project_Name",
      "Initiative_Group_Name",
      "Project_Description",
      "BU",
      "Artwork_Category",
      "Artwork_Brand",
      "Project_region",
      "Artwork_SMO",
      "Cluster",
      "Project_Scale",
      "Project_State",
      "Buffer_To_Work",
      "Estimated_No_Of_DI",
      "Estimated_No_Of_DT",
      "Estimated_No_Of_NPF",
      "Estimated_No_Of_IQ",
      "Estimated_No_Of_PRA",
      "Estimated_No_Of_CICs",
      "Estimated_No_Of_POAs",
      "Estimated_SOS",
      "Estimated_SOP",
      "Estimated_AW_Printer",
      "Estimated_AW_Readiness",
      "IL",
      "PM",
      "Comments",
      "Project_Type",
      "Production_Strategy",
      "Tier",
    ];

    let reorderedColumns = [];
    requiredColumnOrderArray.forEach((rcl) => {
      columns.forEach((cl) => {
        if (rcl === cl) {
          reorderedColumns.push(cl);
        }
      });
    });
    return reorderedColumns;
  };
  useEffect(() => {
    (async () => {
      try {
        // const ProjectData = await ProjectService.getProjectData();
        const ProjectData = allProjectList.allProjects;
        if (ProjectData.length) {
          setAllColumnNames(reorderColumns(Object.keys(ProjectData[0])));
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
  }, [allProjectList.allProjects]);

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
        <>
          <img
            src={filter}
            alt="Column Filter"
            onClick={(e) => {
              op.current.toggle(e);

              setSelectedColumnName(options);
            }}
            className={
              isFilterActivated
                ? "columnFilterIcon filter-color-change"
                : "columnFilterIcon"
            }
          />
          <span className={isFilterActivated && "filter-color-change"}>
            {options}
          </span>
        </>
      </div>
    );
  };

  const fullKitReadinessBody = (options, rowData) => {
    // console.log("row data",rowData, options);
    let field = rowData.field;
    let categoryNames = [];
    let SMOName = [];
    let brandName = [];
    let projectId = options["Project_ID"];
    if (field === "Artwork_Category") {
      categoryNames =
        options[field] &&
        options[field].map((item) => item.Category_Name).join(",");
    }

    if (field === "Artwork_SMO") {
      SMOName = options[field]?.map((item) => item.SMO_Name).join(",");
    }
    if (field === "Artwork_Brand") {
      brandName = options[field]?.map((item) => item.Brand_Name).join(",");
    }

    return (
      <>
        {field === "Project State" && (
          <Tag
            value=""
            style={{
              backgroundColor: "#DFEBFF",
              color: "#003DA5",
              border: "1px solid",
            }}
          >
            Active
          </Tag>
        )}
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

        {field === "Project_Name" && (
          <span
            style={{ color: "#003DA5", cursor: "pointer" }}
            onClick={() => {
              if (field && field.length) {
                dispatch(selectedProject(options, "All Projects"));
                navigate(`/addProject/${projectId}`);
              }
            }}
          >
            {" "}
            {options[field]}{" "}
          </span>
        )}

        {field === "Estimated_SOP" && changeDateFormat(options[field])}
        {field === "Estimated_AW_Printer" && changeDateFormat(options[field])}
        {field === "Artwork_Category" && categoryNames}
        {field === "Artwork_SMO" && SMOName}
        {field === "Artwork_Brand" && brandName}

        {field !== "Full Kit Readiness Tracking" &&
          field !== "Estimated_SOP" &&
          field !== "Estimated_AW_Printer" &&
          field !== "Artwork_Category" &&
          field !== "Project_Name" &&
          field !== "Artwork_SMO" &&
          field !== "Artwork_Brand" && <> {options[field]}</>}
      </>
    );
  };

  const dynamicColumns = (projectColumnName) => {
    // console.log("project column name dynamic header", projectColumnName);
    if (projectColumnName.length) {
      return projectColumnName.map((ele, i) => {
        return (
          <Column
            key={i}
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
    setProjectColumnNames(reorderColumns(selectedCategories));
    const columnNames = JSON.stringify(reorderColumns(selectedCategories));
    localStorage.setItem("allColumnNamesAllProjects", columnNames);
    setVisible(false);
  };

  const resetToPgDefault = () => {
    const defaultColName = [
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
    setProjectColumnNames(defaultColName);
    // const columnNames = ProjectService.getAllColumnNamesAllProjects();
    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(defaultColName)
    );
    setVisible(false);
  };

  const clearFilters = () => {
    const defaultCol = [
      "Project_ID",
      "Project_Name",
      "Artwork_Category",
      "Artwork_SMO",
      "PM",
      "Project_State",
      "Artwork_Brand",
      "Buffer_To_Work",
      "Estimated_AW_Printer",
      "Full Kit Readiness Tracking",
    ];
    console.log("all column name constant", defaultCol);

    setProjectColumnNames(defaultCol);

    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(defaultCol)
    );
    setReorderedColumn(false);
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

  // in header save setting button was there and due to requirement I removed that
  //code is kept here if requirement comes
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
  };

  const storeReorderedColumns = (e) => {
    const dragColumnName = projectColumnName[e?.dragIndex];
    const index = projectColumnName.indexOf(dragColumnName);
    if (index > -1) {
      // only splice array when item is found
      projectColumnName.splice(index, 1); // 2nd parameter means remove one item only
      projectColumnName.splice(e?.dropIndex, 0, dragColumnName);
      setReorderedColumn(true);
    }
    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(projectColumnName)
    );
    setProjectColumnNames(projectColumnName);
    setReorderedColumn(true);
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

  const isFilterEnabled =
    frozenCoulmns?.length || filters?.length || sortData?.length;

  const isResetEnabled = isReorderedColumn;

  // console.log("project column name", projectColumnName);

  return (
    <div className="myProjectAnddAllProjectList">
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectListHeader
          header={props.header}
          clearFilters={clearFilters}
          clearFilter={clearFilter}
          setVisible={setVisible}
          saveSettings={saveSettings}
          onSearchClick={onSearchClick}
          exportCSV={exportCSV}
          isFilterEnabled={isFilterEnabled}
          isResetEnabled={isResetEnabled}
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
          dataKey="Project_ID"
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
          // selectionMode="single"
          // onSelectionChange={(e) => {
          //   navigate(`/addProject/${e.value.ProjectID}`);
          // }}
        >
          {dynamicColumns(projectColumnName)}
        </DataTable>
      </Suspense>
    </div>
  );
};
export default AllProjectList;
