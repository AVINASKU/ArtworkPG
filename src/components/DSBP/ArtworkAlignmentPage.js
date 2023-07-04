import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArtworkHeader from "./ArtworkHeader";
import SelectDsbpId from "./SelectDsbpId";
import ProjectNameHeader from "./ProjectNameHeader";
import AgilityList from "./AgilityList";
import { getDSBPDropdownData } from "../../store/actions/DSBPActions";
import { getDropDownValues } from "../../store/actions/dropDownValuesAction";
import {
  addDsbpToProject,
  deleteDsbpFromProject,
  getDsbpPMPDetails,
  onSubmitDsbpAction,
} from "../../apis/dsbpApi";
import { useDispatch, useSelector } from "react-redux";
import FooterButtons from "../AWMJobs/DesignJobs/FooterButtons";
import "./index.scss";
import { onSortData, Loading } from "../../utils";

const ArtworkAlignment = ({
  setTabsList,
  tabsList,
  handleTabPanel,
  tabPanel,
}) => {
  const navigate = useNavigate();
  const [dropdownlist, setDropdownList] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const DropDownData = useSelector((state) => state.DSBPDropdownReducer);
  const [dsbpPmpData, setDsbpPmpData] = useState(null);
  const [selectedFields, setSelectedFields] = useState(null);
  const [filteredDsbpData, setFilteredDsbpData] = useState(null);
  const [totalNoOfDsbpId, setTotalNoOfDsbpId] = useState(0);
  const [totalNoOfPMP, setTotalNoOfPMP] = useState(0);
  const [totalNoOfPOA, setTotalNoOfPOA] = useState(0);
  const [totalNoOfPMPLocked, setTotalNoOfPMPLocked] = useState(0);
  const [totalNoOfAddedProject, setTotalNoOfAddedProject] = useState(0);
  const [actionDialog, setActionDialog] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [fieldUpdated, setFieldUpdated] = useState(false);
  const [buWiseSortedColumnNames, setBuWiseSortedColumnNames] = useState(null);
  const [listOfInitiativeId, setListOfInitiativeId] = useState([]);
    const [addSavedData, setSavedData] = useState([]);

  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const allBUAttributesData = useSelector(
    (state) => state.DropDownValuesReducer
  );
  const allBUAttributes = allBUAttributesData.DropDownValuesData;

  const breadcrumb = [
    { label: "My Tasks", url: "/myTasks" },
    { label: "Approve Regional Design Template" },
  ];

  const dispatch = useDispatch();
  const headerName = "Artwork Alignment";
  const BU = selectedProjectDetails?.BU;
  const Region = selectedProjectDetails?.Project_region;
  const ProjectID = selectedProjectDetails?.Project_ID;

  useEffect(() => {
    findAndSortBuWiseColumnNames();
    // dispatch(getDropDownValues());
  }, [dispatch]);

  const findAndSortBuWiseColumnNames = () => {
    let buWiseAttributeList =
      allBUAttributes?.ArtWorkProjectSetupPage?.Artwork_BU;
    console.log("all buWiseAttributeList", allBUAttributes);
    let attributeList = [];
    if (buWiseAttributeList) {
      attributeList =
        buWiseAttributeList.find((item) => item.BU_Name === BU)
          ?.Attribute_List || [];
    }
    let sortedData = [];
    if (attributeList && attributeList.length) {
      sortedData = [...attributeList].sort((a, b) => {
        return parseInt(a.Sequence) - parseInt(b.Sequence);
      });
    }
    setBuWiseSortedColumnNames(sortedData);
    let jsonColumnWidth = localStorage.getItem("columnWidthDSBPArtwork");
    let columnWidth = JSON.parse(jsonColumnWidth);

    if (!columnWidth || !columnWidth.length) {
      if (sortedData && sortedData.length) {
        sortedData.map((list) => {
          list["width"] = 250;
          list["freeze"] = false;
          list["sortAtoZ"] = false;
          list["sortZtoA"] = false;
          list["reorder"] = false;
        });
      }
      localStorage.setItem(
        "columnWidthDSBPArtwork",
        JSON.stringify(sortedData)
      );
    }

    if (columnWidth && columnWidth.length) {
      let sortedData1 = [];
      sortedData1 = [...columnWidth].sort((a, b) => {
        return parseInt(a.Sequence) - parseInt(b.Sequence);
      });
      localStorage.setItem(
        "columnWidthDSBPArtwork",
        JSON.stringify(sortedData1)
      );
    }
  };

  async function fetchData() {
    setTableLoader(true);
    const resp = await getDsbpPMPDetails(ProjectID);
    if (!resp) {
      setDsbpPmpData(null);
    }
    if (resp && resp?.length) {
      const transformedArray = resp?.flatMap((item) =>
        item.DSBP_PMP_PIMaterialIDPage?.map((person) => ({
          DSBP_InitiativeID: item.DSBP_InitiativeID,
          ...person,
        }))
      );

      setDsbpPmpData(transformedArray);
      setTotalNoOfPMP(transformedArray.length);

      const initiativeIDs = transformedArray.map(
        (task) => task.DSBP_InitiativeID
      );
      const uniqueIDs = [...new Set(initiativeIDs)];
      setListOfInitiativeId(uniqueIDs);

      const count = transformedArray.reduce((acc, obj) => {
        if (obj?.DSBP_PO_PMP_poPoa !== "") {
          return acc + 1;
        }
        return acc;
      }, 0);

      setTotalNoOfPOA(count);
      const noOfAddedProject = transformedArray.reduce((acc, obj) => {
        if (obj?.AWM_AddedToProject === "Yes") {
          return acc + 1;
        }
        return acc;
      }, 0);
      setTotalNoOfAddedProject(noOfAddedProject);

      const notOfPMPLocked = transformedArray.reduce((acc, obj) => {
        if (obj?.DSBP_PMP_AWReadinessGateStatus === "TRUE") {
          return acc + 1;
        }
        return acc;
      }, 0);

      setTotalNoOfPMPLocked(notOfPMPLocked);
    }
    setTotalNoOfDsbpId(resp?.length || 0);
    setTableLoader(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getDSBPDropdownData(BU, Region));
  }, [dispatch]);

  useEffect(() => {
    setDropdownList(DropDownData.DSBPDropdownData);
  }, [DropDownData]);

  const addDSBPIntoProject = async (InitiativeID, operation) => {
    setTableLoader(true);
    if (operation === "add") {
      let checkRes = await addDsbpToProject(ProjectID, InitiativeID);
      console.log("checkRes", checkRes);
    }
    if (operation === "delete") {
      let checkRes = await deleteDsbpFromProject(ProjectID, InitiativeID);
      console.log("check delete Res", checkRes);
    }
    // fetch dsbp project data after delete / add
    await fetchData();
    setTableLoader(false);
  };

  const onSort = (column, direction) => {
    const sortedData = onSortData(column, direction, dsbpPmpData);
    setDsbpPmpData(sortedData);
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
      setSelected(dsbpPmpData);
    } else {
      setSelectAllChecked(false);
      setSelected([]);
    }
  };

  const onSubmit = async()=>{
    if(addSavedData && addSavedData.length){
    const updatedPmpDetails = { ArtworkAgilityPMPs: addSavedData };
  await onSubmitDsbpAction(updatedPmpDetails);
  };
  }

  const onActionSubmit = async (formData, data) => {
    setLoader(true);
    let updatedData = {};
    let updatedDataList = [];
    const selectionData = data ? data : selected;

    updatedDataList = selectionData?.map((pmpDetails) => {
      updatedData = {
        DSBP_InitiativeID: pmpDetails.DSBP_InitiativeID,
        DSBP_PMP_PIMaterialID: pmpDetails.DSBP_PMP_PIMaterialID,
      };
      if (formData === "AddToProject") {
        updatedData.FK_AWMProjectID = pmpDetails.FK_AWMProjectID;
        updatedData.AWM_AddedToProject = "Yes";
      }
      if (formData.AWM_AISE !== undefined) {
        updatedData.AWM_AISE = formData?.AWM_AISE;
      }
      if (formData?.AWM_AssemblyMechanism !== undefined) {
        updatedData.AWM_AssemblyMechanism = formData?.AWM_AssemblyMechanism;
      }
      if (formData?.AWM_Biocide !== undefined) {
        updatedData.AWM_Biocide = formData?.AWM_Biocide;
      }
      if (formData?.AWM_GroupPMP !== undefined) {
        updatedData.AWM_GroupPMP = formData?.AWM_GroupPMP;
      }
      return updatedData;
    });

    console.log("updatedData", updatedDataList);

    const updatedPmpDetails = { ArtworkAgilityPMPs: updatedDataList };
    console.log("updatedPmpDetails", updatedPmpDetails);
    await onSubmitDsbpAction(updatedPmpDetails);
    setActionDialog(false);
    setLoader(false);
  };

  const handleCancel = () => {
    return navigate(`/myProjects`);
  };

  // const onSubmit = () => {
  //   return navigate(`/myProjects`);
  // };

  const onGlobalFilterChange = (e, colName) => {
    const value = e.value;
    setSelectedFields(value);
    const artworkValues = value;

    if (artworkValues.length) {
      let filteredDsbpData = dsbpPmpData.filter((item) => {
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
      setFilteredDsbpData(filteredDsbpData);
    } else setFilteredDsbpData([]);
  };


  let checkLength = addSavedData.length;
  console.log("hello ---------", fieldUpdated, checkLength);
  return (
    <div className="artwork-dsbp myProjectAnddAllProjectList">
      {loader || totalNoOfDsbpId === null ? (
        <Loading />
      ) : (
        <>
          <ArtworkHeader
            breadcrumb={breadcrumb}
            headerName={headerName}
            selected={selected}
            onActionSubmit={onActionSubmit}
            label="Artwork Alignment"
            actionDialog={actionDialog}
            setActionDialog={setActionDialog}
            setFieldUpdated={setFieldUpdated}
            fieldUpdated={fieldUpdated}
            buWiseSortedColumnNames={buWiseSortedColumnNames}
            setBuWiseSortedColumnNames={setBuWiseSortedColumnNames}
            setDsbpPmpData={setDsbpPmpData}
            dsbpPmpData={dsbpPmpData}
          />
          <ProjectNameHeader selectedProjectDetails={selectedProjectDetails} />
          <SelectDsbpId
            dropdownlist={dropdownlist}
            addDSBPIntoProject={addDSBPIntoProject}
            totalNoOfDsbpId={totalNoOfDsbpId}
            totalNoOfPMP={totalNoOfPMP}
            totalNoOfPOA={totalNoOfPOA}
            totalNoOfAddedProject={totalNoOfAddedProject}
            totalNoOfPMPLocked={totalNoOfPMPLocked}
            listOfInitiativeId={listOfInitiativeId}
          />
          {tableLoader ? (
            <Loading />
          ) : (
            <AgilityList
              selected={selected}
              setSelected={setSelected}
              selectAllChecked={selectAllChecked}
              handleSelect={handleSelect}
              handleSelectAll={handleSelectAll}
              dsbpPmpData={dsbpPmpData}
              filteredDsbpData={filteredDsbpData}
              onSort={onSort}
              onGlobalFilterChange={onGlobalFilterChange}
              selectedFields={selectedFields}
              setDsbpPmpData={setDsbpPmpData}
              onActionSubmit={onActionSubmit}
              buWiseSortedColumnNames={buWiseSortedColumnNames}
              setTabsList={setTabsList}
              tabsList={tabsList}
              handleTabPanel={handleTabPanel}
              tabPanel={tabPanel}
              setFieldUpdated={setFieldUpdated}
              fieldUpdated={fieldUpdated}
              setSavedData={setSavedData}
              addSavedData={addSavedData}
            />
          )}
          <FooterButtons
            handleCancel={handleCancel}
            hideSaveButton={true}
            onSubmit={onSubmit}
            formValid={!checkLength}
            checkReadWriteAccess={!false}
          />
        </>
      )}
    </div>
  );
};

export default ArtworkAlignment;
