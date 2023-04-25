import React, { useState, useEffect, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { ProjectService } from "../../../service/PegaService";
import ConfirmationPopUp from "../ConfirmationPopUp";
import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import { Tag } from "primereact/tag";
import filter from "../../../assets/images/filter.svg";
import { projectPlan } from "../../../store/actions/ProjectActions";
import { changeDateFormat } from "../utils";
import BlueFilter from "../../../assets/images/BlueFilterIcon.svg";

const ProjectPlanList = (props) => {
  const [pegadata, setPegaData] = useState(null);
  const [ProjectFrozen, setProjectFrozen] = useState(false);
  const [frozenCoulmns, setFrozenColumn] = useState([]);
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [projectColumnName, setProjectColumnNames] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [isSearch, isSearchSet] = useState(false);

  const myProjectList = useSelector((state) => state.myProject);
  console.log("myProjectList:", myProjectList);
  const { loading } = myProjectList;
  const dispatch = useDispatch();

  const searchHeader = projectColumnName.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }),
    {}
  );

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
    if (!myProjectList.projectPlan.length) {
      const updatedUsers = dispatch(projectPlan());
      console.log("projectPlan::", updatedUsers);
    }
  }, [dispatch, myProjectList.projectPlan]);

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
        let jsonFrozenrData1 = localStorage.getItem("frozenData");
        const frozenData = JSON.parse(jsonFrozenrData1);
        if (frozenData && frozenData.length) {
          setFrozenColumn(frozenData);
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

  const fullKitReadinessBody = (options, rowData) => {
    let field = rowData.field;
    let categoryNames = [];
    let SMOName = [];
    let brandName = [];
    let projectId = options["Task"];
    // if (field === "Artwork_Category") {
    //   categoryNames = options[field]
    //     .map((item) => item.Category_Name)
    //     .join(",");
    // }

    // if (field === "Artwork_SMO" && options[field]) {
    //   console.log('field:', options[field]);
    //   SMOName = options[field].map((item) => item.SMO_Name).join(",");
    // }
    // if (field === "Artwork_Brand" && options[field]) {
    //   brandName = options[field].map((item) => item.Brand_Name).join(",");
    // }

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
          <a href={`/addProject/${projectId}`}> {options[field]} </a>
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
  const allowExpansion = (rowData) => {
    if (rowData.SubTask) return rowData.SubTask.length > 0;
    else return true;
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

  const onGlobalFilterChange = (e) => {
    const value = e.value;
    setSelectedCities(value);
    setFilters(value);
  };

  const onColumnResizeEnd = (event) => {
    console.log("updated column name", event, event?.element?.clientWidth);
  };

  const saveSettings = () => {
    localStorage.setItem("columnWiseFilterData", JSON.stringify(filters));
    localStorage.setItem("frozenData", JSON.stringify(frozenCoulmns));
    localStorage.setItem("sortingData", JSON.stringify(sortData));
    localStorage.setItem(
      "projectPlanAllColumnNames",
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
      "projectPlanAllColumnNames",
      JSON.stringify(projectColumnName)
    );
    setProjectColumnNames(projectColumnName);
  };

  const clearColumnWiseFilter = () => {
    let jsonFrozenItem = localStorage.getItem("frozenData");
    const frozenItem = JSON.parse(jsonFrozenItem);
    if (
      frozenItem &&
      frozenItem.length &&
      frozenItem.includes(selectedColumnName)
    ) {
      const index = frozenItem.indexOf(selectedColumnName);
      frozenItem.splice(index, 1);
      localStorage.setItem("frozenData", JSON.stringify(frozenItem));
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

  const [expandedRows, setExpandedRows] = useState(null);
  const rowExpansionColumnNames = [
    "Test",
    "Task",
    "Dependancy",
    "Role",
    "Owner",
    "State",
    "Duration(Days)",
    "Start Date",
    "End Date",
    "Consumed Buffer",
    "Help Needed",
  ];

  const rowExpansionHeader = (options) => {
    return <div style={{ display: "none" }}>{options}</div>;
  };
  const rowExpansionColumns = () => {
    if (rowExpansionColumnNames.length) {
      return rowExpansionColumnNames.map((ele, i) => {
        return (
          <Column
            key={ele}
            field={ele}
            header={rowExpansionHeader(ele)}
            columnKey={i + ele}
            alignFrozen="center"
            className="font-bold"
            // body={fullKitReadinessBody}
          />
        );
      });
    }
  };
  const rowExpansionTemplate = (data) => {
    return (
      <div className="rowExpansionTemplate">
        <DataTable
          dataKey="Task"
          value={data.SubTask}
          scrollable
          responsiveLayout="scroll"
          loading={loading}
        >
          {rowExpansionColumns()}
        </DataTable>
      </div>
    );
  };

  const getTreeTableNodesData = () => {
    return [
      {
          key: '0',
          data: {
              name: 'Applications',
              size: '100kb',
              type: 'Folder'
          },
          children: [
              {
                  key: '0-0',
                  data: {
                      name: 'React',
                      size: '25kb',
                      type: 'Folder'
                  },
                  children: [
                      {
                          key: '0-0-0',
                          data: {
                              name: 'react.app',
                              size: '10kb',
                              type: 'Application'
                          }
                      },
                      {
                          key: '0-0-1',
                          data: {
                              name: 'native.app',
                              size: '10kb',
                              type: 'Application'
                          }
                      },
                      {
                          key: '0-0-2',
                          data: {
                              name: 'mobile.app',
                              size: '5kb',
                              type: 'Application'
                          }
                      }
                  ]
              },
              {
                  key: '0-1',
                  data: {
                      name: 'editor.app',
                      size: '25kb',
                      type: 'Application'
                  }
              },
              {
                  key: '0-2',
                  data: {
                      name: 'settings.app',
                      size: '50kb',
                      type: 'Application'
                  }
              }
          ]
      },
      {
          key: '1',
          data: {
              name: 'Cloud',
              size: '20kb',
              type: 'Folder'
          },
          children: [
              {
                  key: '1-0',
                  data: {
                      name: 'backup-1.zip',
                      size: '10kb',
                      type: 'Zip'
                  }
              },
              {
                  key: '1-1',
                  data: {
                      name: 'backup-2.zip',
                      size: '10kb',
                      type: 'Zip'
                  }
              }
          ]
      },
      {
          key: '2',
          data: {
              name: 'Desktop',
              size: '150kb',
              type: 'Folder'
          },
          children: [
              {
                  key: '2-0',
                  data: {
                      name: 'note-meeting.txt',
                      size: '50kb',
                      type: 'Text'
                  }
              },
              {
                  key: '2-1',
                  data: {
                      name: 'note-todo.txt',
                      size: '100kb',
                      type: 'Text'
                  }
              }
          ]
      },
      {
          key: '3',
          data: {
              name: 'Documents',
              size: '75kb',
              type: 'Folder'
          },
          children: [
              {
                  key: '3-0',
                  data: {
                      name: 'Work',
                      size: '55kb',
                      type: 'Folder'
                  },
                  children: [
                      {
                          key: '3-0-0',
                          data: {
                              name: 'Expenses.doc',
                              size: '30kb',
                              type: 'Document'
                          }
                      },
                      {
                          key: '3-0-1',
                          data: {
                              name: 'Resume.doc',
                              size: '25kb',
                              type: 'Resume'
                          }
                      }
                  ]
              },
              {
                  key: '3-1',
                  data: {
                      name: 'Home',
                      size: '20kb',
                      type: 'Folder'
                  },
                  children: [
                      {
                          key: '3-1-0',
                          data: {
                              name: 'Invoices',
                              size: '20kb',
                              type: 'Text'
                          }
                      }
                  ]
              }
          ]
      },
      {
          key: '4',
          data: {
              name: 'Downloads',
              size: '25kb',
              type: 'Folder'
          },
          children: [
              {
                  key: '4-0',
                  data: {
                      name: 'Spanish',
                      size: '10kb',
                      type: 'Folder'
                  },
                  children: [
                      {
                          key: '4-0-0',
                          data: {
                              name: 'tutorial-a1.txt',
                              size: '5kb',
                              type: 'Text'
                          }
                      },
                      {
                          key: '4-0-1',
                          data: {
                              name: 'tutorial-a2.txt',
                              size: '5kb',
                              type: 'Text'
                          }
                      }
                  ]
              },
              {
                  key: '4-1',
                  data: {
                      name: 'Travel',
                      size: '15kb',
                      type: 'Text'
                  },
                  children: [
                      {
                          key: '4-1-0',
                          data: {
                              name: 'Hotel.pdf',
                              size: '10kb',
                              type: 'PDF'
                          }
                      },
                      {
                          key: '4-1-1',
                          data: {
                              name: 'Flight.pdf',
                              size: '5kb',
                              type: 'PDF'
                          }
                      }
                  ]
              }
          ]
      },
      {
          key: '5',
          data: {
              name: 'Main',
              size: '50kb',
              type: 'Folder'
          },
          children: [
              {
                  key: '5-0',
                  data: {
                      name: 'bin',
                      size: '50kb',
                      type: 'Link'
                  }
              },
              {
                  key: '5-1',
                  data: {
                      name: 'etc',
                      size: '100kb',
                      type: 'Link'
                  }
              },
              {
                  key: '5-2',
                  data: {
                      name: 'var',
                      size: '100kb',
                      type: 'Link'
                  }
              }
          ]
      },
      {
          key: '6',
          data: {
              name: 'Other',
              size: '5kb',
              type: 'Folder'
          },
          children: [
              {
                  key: '6-0',
                  data: {
                      name: 'todo.txt',
                      size: '3kb',
                      type: 'Text'
                  }
              },
              {
                  key: '6-1',
                  data: {
                      name: 'logo.png',
                      size: '2kb',
                      type: 'Picture'
                  }
              }
          ]
      },
      {
          key: '7',
          data: {
              name: 'Pictures',
              size: '150kb',
              type: 'Folder'
          },
          children: [
              {
                  key: '7-0',
                  data: {
                      name: 'barcelona.jpg',
                      size: '90kb',
                      type: 'Picture'
                  }
              },
              {
                  key: '7-1',
                  data: {
                      name: 'primeng.png',
                      size: '30kb',
                      type: 'Picture'
                  }
              },
              {
                  key: '7-2',
                  data: {
                      name: 'prime.jpg',
                      size: '30kb',
                      type: 'Picture'
                  }
              }
          ]
      },
      {
          key: '8',
          data: {
              name: 'Videos',
              size: '1500kb',
              type: 'Folder'
          },
          children: [
              {
                  key: '8-0',
                  data: {
                      name: 'primefaces.mkv',
                      size: '1000kb',
                      type: 'Video'
                  }
              },
              {
                  key: '8-1',
                  data: {
                      name: 'intro.avi',
                      size: '500kb',
                      type: 'Video'
                  }
              }
          ]
      }
  ];
}

  return (
    <div className="myProjectAnddAllProjectList">
      <Suspense fallback={<div>Loading...</div>}>
        <Toast ref={toast} />

        {/* <ConfirmationPopUp
          onSort={onSort}
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
        /> */}
        {/* <TreeTable
          value={getTreeNodesData()}
          tableStyle={{ minWidth: "50rem" }}
        >
          {dynamicColumns()}
        </TreeTable> */}
        <div className="card">
            <TreeTable value={getTreeTableNodesData()} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
                <Column field="size" header="Size1"></Column>
                <Column field="type" header="Type1"></Column>
                <Column field="size" header="Size2"></Column>
                <Column field="type" header="Type2"></Column>
                <Column field="size" header="Size3"></Column>
                <Column field="type" header="Type3"></Column>
                <Column field="size" header="Size4"></Column>
                <Column field="type" header="Type4"></Column>
            </TreeTable>
        </div>
        {/* <DataTable
          resizableColumns
          dataKey="Task"
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
          ref={dt}
          tableStyle={{ minWidth: "50rem" }}
          onRowToggle={(e) => setExpandedRows(e.data)}
          expandedRows={expandedRows}
          rowExpansionTemplate={rowExpansionTemplate}
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          {dynamicColumns()}
        </DataTable> */}
      </Suspense>
    </div>
  );
};
export default ProjectPlanList;
