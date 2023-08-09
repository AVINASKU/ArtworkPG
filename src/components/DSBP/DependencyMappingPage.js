import React, { useEffect, useState } from "react";
import { onSortData, Loading, hasAllAccess } from "../../utils";
import { useNavigate } from "react-router-dom";
import ArtworkHeader from "./ArtworkHeader";
import FooterButtons from "../AWMJobs/DesignJobs/FooterButtons";
import { useSelector } from "react-redux";
import {
  getDependencyMappingDetails,
  onSubmitDependencyMappingAction,
  createNewGaBriefTask,
} from "../../apis/dsbpApi";
import DependencyMappingList from "./DependencyMappingList";
import "./index.scss";

const headerName = "Dependency Mapping";
const DependencyMapping = () => {
  const [dependencyMappingData, setDependencyMappingData] = useState([]);
  // const [dependencyColumnNames, setDependencyColumnNames] = useState([]);
  const [updatedDataToSubmit, setUpdatedDataToSubmit] = useState([]);
  const [CDPTPageData, setCDPTPageData] = useState([]);
  const [IQData, setIQData] = useState([]);
  const [RDTData, setRDTData] = useState([]);
  const [GABriefData, setGABriefData] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [tableRender, setTableRender] = useState(false);
  const [isSearch, isSearchSet] = useState(false);
  const [filteredDependencyMappingData, setFiltersDependencyMappingData] =
    useState([]);
  const [dropdownDataForLayoutAndDesign, setDropdownDataForLayoutAndDesign] =
    useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const [customizeViewFields, setCustomizeViewFields] = useState(
    localStorage.getItem("customizeViewDependancyFields")
  );
  const selectedProjectDetails = projectSetup.selectedProject;
  const ProjectID = selectedProjectDetails?.Project_ID;
  const navigate = useNavigate();
  const userHasAccess = !hasAllAccess();

  const handleCancel = () => {
    return navigate(`/myProjects`);
  };
  console.log("selected outside", selected);

  const updateDropDownData = (value, columnName, id) => {
    const updatedData = dependencyMappingData.map((data) => {
      const isMatchingId = selected.some(selectedData =>
        selectedData.DSBP_PMP_PIMaterialID === data.DSBP_PMP_PIMaterialID
      );
  
      if (!isMatchingId && data.DSBP_PMP_PIMaterialID !== id) {
        return data;
      }
  
      const columnsToUpdate = [
        "AWM_CIC_Needed",
        "AWM_Supporting_PMP_Design",
        "AWM_Supporting_PMP_Layout",
        "AWM_Other_Reference",
        "AWM_RDT_Page",
        "AWM_GA_Brief",
        "AWM_CIC_Matrix",
      ];
  
      if (columnsToUpdate.includes(columnName)) {
        data[columnName] = value;
      } else {
        data[columnName] = value;
      }
  
      data["updated"] = true;
      return data;
    });
  
    const filteredDataToSubmit = updatedData.filter(item => item.updated === true);
    const data = updatedData.filter(data => data?.AWM_CIC_Needed === "Yes" && data);
    const dropdownDataForLayoutAndDesign1 = data.map(item => item.DSBP_PMP_PIMaterialID);
  
    setDropdownDataForLayoutAndDesign(dropdownDataForLayoutAndDesign1);
    setDependencyMappingData(updatedData);
    setSubmittedData(filteredDataToSubmit);
    setDataUpdated(!dataUpdated);
  };

  useEffect(() => {
  setLoader(true);
    fetchData();
  }, [ProjectID]);

  useEffect(() => {
    setSubmittedData(submittedData)
  }, [submittedData]);

  const onSort = (column, direction) => {
    const sortedData = onSortData(column, direction, dependencyMappingData);
    setDependencyMappingData(sortedData);
  };

  const handleSelect = (item) => {
    if (selected?.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
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
      setSelected(dependencyMappingData);
    } else {
      setSelectAllChecked(false);
      setSelected([]);
    }
  };

  async function fetchData() {
    setTableLoader(true)
    const {
      dependencyTableData,
      isRDTData,
      isIQData,
      isCDPTData,
      isGABrifData,
    } = await getDependencyMappingDetails(ProjectID);

    setLoader(false);

    if (dependencyTableData && dependencyTableData.length) {
      let data = dependencyTableData.filter(
        (data) =>
          data?.AWM_CIC_Page?.[0]?.AWM_CIC_Needed === "Yes" &&
          data.DSBP_PMP_PIMaterialID
      );
      let dropdownDataForLayoutAndDesign1 = data?.map(
        (item) => item.DSBP_PMP_PIMaterialID
      );
      setDropdownDataForLayoutAndDesign(dropdownDataForLayoutAndDesign1);
    }

    if (dependencyTableData && dependencyTableData.length) {
      const transformedData = dependencyTableData.map((item) => {
        let transformedItem = {
          DSBP_InitiativeID: item.DSBP_InitiativeID,
          DSBP_PMP_PIMaterialDescription: item.DSBP_PMP_PIMaterialDescription,
          DSBP_PMP_PIMaterialID: item.DSBP_PMP_PIMaterialID,
          DSBP_PMP_PIMaterialNumber: item.DSBP_PMP_PIMaterialNumber,
        };

          transformedItem.AWM_RDT_Page =
            item?.Preselected_AWM_RDT_Page?.map(
              (item) => item.AWM_Design_Job_ID
            ) || [];

          transformedItem.AWM_CDPT_Page =
            item?.Preselected_AWM_CDPT_Page?.map(
              (item) => item.AWM_Design_Job_ID
            ) || [];
        
          transformedItem.AWM_IQ_Page =
            item?.Preselected_AWM_IQ_Page?.map(
              (item) => item.AWM_Design_Job_ID
            ) || [];
        
        transformedItem = {
          ...transformedItem,
          AWM_CIC_Needed: item?.AWM_CIC_Page?.[0]?.AWM_CIC_Needed || "",
          AWM_Supporting_PMP_Layout:
            item?.AWM_CIC_Page?.[0]?.AWM_Supporting_PMP_Layout || "",
          AWM_Supporting_PMP_Design:
            item?.AWM_CIC_Page?.[0]?.AWM_Supporting_PMP_Design || "",
          AWM_Other_Reference:
            item?.AWM_CIC_Page?.[0]?.AWM_Other_Reference || "",
          AWM_CIC_Matrix: item?.AWM_CIC_Page?.[0]?.AWM_CIC_Matrix || "",
          AWM_GA_Brief: item?.Preselected_DSBP_GA_Brief || [],
          AWM_CIC_Matrix_Requested:
            item?.AWM_CIC_Page?.[0]?.AWM_CIC_Matrix_Requested || "",
        };

        transformedItem = {
          ...transformedItem,
          DSM_PICountry_Countries: item.DSM_PICountry_Countries,
          DSM_PILanguage_Languages: item.DSM_PILanguage_Languages,
          DSM_PMP_PMPPackagingComponentType:
            item.DSM_PMP_PMPPackagingComponentType,
          DSM_PMP_PackagingSize: item.DSM_PMP_PackagingSize,
          DSM_PMP_PrinterPrimary: item.DSM_PMP_PrinterPrimary,
          DSM_PMP_PrinterSecondary: item.DSM_PMP_PrinterSecondary,
          DSM_PMP_PrintingProcess: item.DSM_PMP_PrintingProcess,
          DSM_PMP_SubstrateColor: item.DSM_PMP_SubstrateColor,
          DSM_PMP_TD_TDStatus: item.DSM_PMP_TD_TDStatus,
          DSM_PMP_TD_TDValue: item.DSM_PMP_TD_TDValue,
          DSM_PO_PMP_poMaterialNumber: item.DSM_PO_PMP_poMaterialNumber,
          ...item?.FPCStagingPage?.[0],
        };
        return transformedItem;
      });
      let columnNames = Object.keys(transformedData[0]);
      const filteredColumnNames = columnNames.filter(
        (property) => property !== "FPCStagingPage"
      );
      let columnInLocal = JSON.parse(
        localStorage.getItem("setDependencyMappingColumnNames")
      );

      if (!columnInLocal || !columnInLocal.length) {
        let groupedColumnNames = [];

        filteredColumnNames.map((colName, index) => {
          let groupedObject = {};
          let splittedCol = colName.split("_");
          groupedObject["field"] = colName;
          groupedObject["width"] = 250;
          groupedObject["freeze"] = false;
          groupedObject["Sequence"] = index;
          if (splittedCol[0] === "DSBP") {
            groupedObject["group"] = 1;
          }
          if (splittedCol[0] === "AWM") {
            groupedObject["group"] = 2;
          }
          if (splittedCol[0] === "DSM") {
            groupedObject["group"] = 3;
          }
          groupedColumnNames.push(groupedObject);
          return groupedColumnNames;
        });
        
        localStorage.setItem(
          "setDependencyMappingColumnNames",
          JSON.stringify(groupedColumnNames)
        );
      }

      setCDPTPageData(isCDPTData);
      setIQData(isIQData);
      setRDTData(isRDTData);
      setGABriefData(isGABrifData);
      setDependencyMappingData(transformedData);
    }
    setTableLoader(false)
  }
  const isSubmitEnable = submittedData.length && !actionDialog ? true : false;

  const onSubmit = async () => {
    //add your logic here
    setLoader(true);
    let submittedJson = [];
    if (isSubmitEnable || actionDialog) {
      submittedData.map((ele) => {
        let submittedObject = {};

        // cdpt
        let DSBP_CDPT_Page = [];
        let DSBP_CDPT_Page_data = [];
        if (ele.AWM_CDPT_Page) {
          DSBP_CDPT_Page = CDPTPageData.filter(
            (cdptData) =>
              ele.AWM_CDPT_Page.includes(cdptData.AWM_Design_Job_ID) && cdptData
          );
          DSBP_CDPT_Page_data = DSBP_CDPT_Page.map((item) => ({
            Design_Job_Name: item.AWM_Design_Job_Name,
            Design_Job_ID: item.AWM_Design_Job_ID,
          }));
        }
        submittedObject.DSBP_CDPT_Page = DSBP_CDPT_Page_data;
        //rdt
        let DSBP_RDT_Page = [];
        let DSBP_RDT_Page_data = [];
        if (ele.AWM_RDT_Page) {
          DSBP_RDT_Page = RDTData.filter((rdtData) => {
            if (ele.AWM_RDT_Page.includes(rdtData.AWM_Design_Job_ID))
              return rdtData;
          });
          DSBP_RDT_Page_data = DSBP_RDT_Page.map((item) => ({
            Design_Job_Name: item.AWM_Design_Job_Name,
            Design_Job_ID: item.AWM_Design_Job_ID,
          }));
        }
        submittedObject.DSBP_RDT_Page = DSBP_RDT_Page_data;

        //IQ
        let DSBP_IQ_Page = [];
        let DSBP_IQ_Page_data = [];
        if (ele.AWM_IQ_Page) {
          DSBP_IQ_Page = IQData.filter((iqData) => {
            if (ele.AWM_IQ_Page.includes(iqData.AWM_Design_Job_ID))
              return iqData;
          });
          DSBP_IQ_Page_data = DSBP_IQ_Page.map((item) => ({
            Design_Job_Name: item.AWM_Design_Job_Name,
            Design_Job_ID: item.AWM_Design_Job_ID,
          }));
        }
        submittedObject.DSBP_IQ_Page = DSBP_IQ_Page_data;

        submittedObject.DSBP_InitiativeID = ele.DSBP_InitiativeID;
        submittedObject.DSBP_PMP_PIMaterialID = ele.DSBP_PMP_PIMaterialID;
        submittedObject.DSBP_PMP_PIMaterialNumber =
          ele.DSBP_PMP_PIMaterialNumber;
        submittedObject["AWM_CICNeeded"] = ele.AWM_CIC_Needed;
        submittedObject["AWM_SupportingPMPLayout"] =
          ele.AWM_Supporting_PMP_Layout ? ele.AWM_Supporting_PMP_Layout : "";
        submittedObject["AWM_SupportingPMPDesign"] =
          ele.AWM_Supporting_PMP_Design ? ele.AWM_Supporting_PMP_Design : "";
        submittedObject["AWM_OtherReference"] = ele.AWM_Other_Reference
          ? ele.AWM_Other_Reference
          : "";
        submittedObject["AWM_GABrief"] = ele?.AWM_GA_Brief?.length
          ? ele.AWM_GA_Brief === "New"
            ? ""
            : ele.AWM_GA_Brief
          : "";

        submittedJson.push(submittedObject);
      });
    }
    console.log("submitted json", submittedJson);
    let formData = {
      DSBPValues: submittedJson,
    };
    // let formData1 = [{
    //   NewGABTask: "Yes",
    //   AWM_Project_ID: ProjectID,
    //   AWM_Task_ID: "",
    //   Project_Name: selectedProjectDetails?.Project_Name,
    //   BU: selectedProjectDetails?.BU,
    //   Region: selectedProjectDetails?.Project_region,
    // }];
    // let res = await createNewGaBriefTask(formData1);

    let resp = await onSubmitDependencyMappingAction(formData, ProjectID);
    if (resp.status === 200 || resp.status === 201) {
      setSubmittedData([]);
    }
    if(actionDialog){
      setActionDialog(false);
      await fetchData();
      setSelected([]);
    }
    setLoader(false);
  };

  const onClickClearFilter = () => {
    let columnNamesData = JSON.parse(
      localStorage.getItem("setDependencyMappingColumnNames")
    );
    columnNamesData?.map((ele) => {
      if (ele) {
        ele["sortZtoA"] = false;
        ele["sortAtoZ"] = false;
        ele["freeze"] = false;
        ele["width"] = 250;
        ele["reorder"] = false;
      }
    });
    localStorage.setItem(
      "setDependencyMappingColumnNames",
      JSON.stringify(columnNamesData)
    );
    setDataUpdated(!dataUpdated);
    setDependencyMappingData(dependencyMappingData);
    setFiltersDependencyMappingData([]);
    setTableRender(!tableRender);
  };

  const onGlobalFilterChange = (e, colName) => {
    const value = e.value;
    setSelectedFields(value);
    const artworkValues = value;

    if (artworkValues.length) {
      let filteredDsbpData = dependencyMappingData.filter((item) => {
        if (item && item[colName]) {
          const hasWords = artworkValues.some((word) =>
            Number.isInteger(word)
              ? item[colName] === word
              : item[colName]?.includes(word)
          );
          if (hasWords) {
            return item;
          }
        }
      });
      setFiltersDependencyMappingData(filteredDsbpData);
    } else setFiltersDependencyMappingData([]);
  };

  let columnNamesData = JSON.parse(
    localStorage.getItem("setDependencyMappingColumnNames")
  );
  let columnNames = [];
  if (columnNamesData) {
    columnNames = columnNamesData?.map((item) => item.field);
  }

  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };

  let isFilterActivatedInDependencyMapping = [];

  if (columnNamesData) {
    isFilterActivatedInDependencyMapping = columnNamesData.filter((ele) => {
      if (
        ele.freeze === true ||
        ele.sortAtoZ === true ||
        ele.sortZtoA === true ||
        ele.width !== 250 ||
        ele?.reorder === true
      ) {
        return ele;
      }
    });
  }

  const handleNewGaBrief = async () => {
    let formData = {
      NewGABTask: "Yes",
      AWM_Project_ID: ProjectID,
      AWM_Task_ID: "",
      Project_Name: selectedProjectDetails?.Project_Name,
      BU: selectedProjectDetails?.BU,
      Region: selectedProjectDetails?.Project_region,
    };
    let res = await createNewGaBriefTask(formData);
    console.log("res", res);
  };

  return (
    console.log("isSubmitEnable", isSubmitEnable),
    <div className="artwork-dsbp dependency-mapping">
    
      <>
        <ArtworkHeader
          headerName={headerName}
          selected={[]}
          label="Dependency Mapping"
          customizeViewFields={customizeViewFields}
          setCustomizeViewFields={setCustomizeViewFields}
          dependencyMappingData={dependencyMappingData}
          selectedProjectDetails={selectedProjectDetails}
          columnNames={columnNames}
          filteredDependencyMappingData={filteredDependencyMappingData}
          userHasAccess={userHasAccess}
          isDependencyMapping={true}
          onSearchClick={onSearchClick}
          onClickClearFilter={onClickClearFilter}
          isFilterActivatedInDependencyMapping={
            isFilterActivatedInDependencyMapping
          }
        />
        {loader ? <Loading /> :
        <>
        <DependencyMappingList
          dependencyMappingData={dependencyMappingData}
          // dependencyColumnNames={dependencyColumnNames}
          CDPTPageData={CDPTPageData}
          IQData={IQData}
          RDTData={RDTData}
          GABriefData={GABriefData}
          dropdownDataForLayoutAndDesign={dropdownDataForLayoutAndDesign}
          updateDropDownData={updateDropDownData}
          userHasAccess={userHasAccess}
          customizeViewFields={customizeViewFields}
          setCustomizeViewFields={setCustomizeViewFields}
          onSort={onSort}
          onGlobalFilterChange={onGlobalFilterChange}
          filteredDependencyMappingData={filteredDependencyMappingData}
          setFiltersDependencyMappingData={setFiltersDependencyMappingData}
          setDataUpdated={setDataUpdated}
          dataUpdated={dataUpdated}
          selectedFields={selectedFields}
          setSelectedFields={setSelectedFields}
          setTableRender={setTableRender}
          tableRender={tableRender}
          isSearch={isSearch}
          columnNames={columnNames}
          handleNewGaBrief={handleNewGaBrief}
        />
        <FooterButtons
          handleCancel={handleCancel}
          hideSaveButton={true}
          onSubmit={onSubmit}
          formValid={!isSubmitEnable}
          checkReadWriteAccess={!false}
        />
        </>
}
      </>
    </div>
  );
};

export default DependencyMapping;
