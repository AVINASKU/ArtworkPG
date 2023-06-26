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
import { Button } from "primereact/button";
import PMPSpecificTabView from "./PMPSpecificTabView";

const projectId = "A-2316";

const DSBP = () => {
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
  const [actionDialog, setActionDialog] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;

  console.log("selectedProjectDetails", selectedProjectDetails);

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
    //if(DropDownValuesData === null)
    dispatch(getDropDownValues());
  }, [dispatch]);

  async function fetchData() {
  setTableLoader(true);
    const resp = await getDsbpPMPDetails(ProjectID);
    if (!resp) {
      setDsbpPmpData(null);
    }
    if (resp && resp.length) {
      const transformedArray = resp.flatMap((item) =>
        item.DSBP_PMP_PIMaterialIDPage.map((person) => ({
          DSBP_InitiativeID: item.DSBP_InitiativeID,
          ...person,
        }))
      );

      setDsbpPmpData(transformedArray);
      setTotalNoOfPMP(transformedArray.length);

      const count = transformedArray.reduce((acc, obj) => {
        if (obj.DSBP_PO_PMP_poPoa !== "") {
          return acc + 1;
        }
        return acc;
      }, 0);

      setTotalNoOfPOA(count);
    }
    setTotalNoOfDsbpId(resp?.length);
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
    console.log("dsbp id", InitiativeID, operation);
    if (operation === "add") {
      console.log("add operation");
      let checkRes = await addDsbpToProject(ProjectID, InitiativeID);
      console.log("checkRes", checkRes);
    }
    if (operation === "delete") {
      console.log("delete operation");
      let checkRes = await deleteDsbpFromProject(ProjectID, InitiativeID);
      console.log("check delete Res", checkRes);
    }
    // fetch dsbp project data after delete / add
    await fetchData();
    setTableLoader(false);
  };

  const onSort = (column, direction) => (event) => {
    const sortedData = onSortData(column, direction, dsbpPmpData);
    setDsbpPmpData(sortedData);
    console.log("sorted data", sortedData);
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

  const onActionSubmit = async (formData, data) => {
    setLoader(true);
    let updatedData = {};
    let updatedDataList = [];
    if (data) {
      const pmpDetails = data;
      updatedData = {
        DSBP_InitiativeID: pmpDetails.DSBP_InitiativeID,
        DSBP_PMP_PIMaterialID: pmpDetails.DSBP_PMP_PIMaterialID,
      };

      if (formData?.RTA_RTARejectionReason !== undefined) {
        updatedData.RTA_RTARejectionReason = formData?.RTA_RTARejectionReason;
      }
      updatedDataList = [updatedData];
    } else {
      updatedDataList = selected?.map((pmpDetails) => {
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
    }
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

  const onSubmit = () => {
    return navigate(`/myProjects`);
  };

  console.log("dropdownlist", dropdownlist);

  const onGlobalFilterChange = (e, colName) => {
    const value = e.value;
    console.log("value and e.value", value, e.value);
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
      console.log("filtered dsbp data", filteredDsbpData);
      setFilteredDsbpData(filteredDsbpData);
    } else setFilteredDsbpData([]);
  };

  const [tabsList, setTabsList] = useState([
    { tabHeader: "Header 1", decription: "Header 1 data" },
  ]);
  const [num, setNum] = useState(2);

  return (
    <div className="artwork-dsbp myProjectAnddAllProjectList">
      {loader || totalNoOfDsbpId === null ? (
        <Loading />
      ) : (
        <>
          <Button
            className="btn button-layout"
            variant="primary"
            onClick={() => {
              setTabsList([
                ...tabsList,
                {
                  tabHeader: `Header ${num}`,
                  decription: `Header ${num} data`,
                },
              ]);
              setNum(num + 1);
            }}
          >
            Add Tab
          </Button>
          <PMPSpecificTabView tabsList={tabsList} />
          <ArtworkHeader
            breadcrumb={breadcrumb}
            headerName={headerName}
            selected={selected}
            onActionSubmit={onActionSubmit}
            label="Artwork Alignment"
            actionDialog={actionDialog}
            setActionDialog={setActionDialog}
          />
          <ProjectNameHeader selectedProjectDetails={selectedProjectDetails} />
          <SelectDsbpId
            dropdownlist={dropdownlist}
            addDSBPIntoProject={addDSBPIntoProject}
            totalNoOfDsbpId={totalNoOfDsbpId}
            totalNoOfPMP={totalNoOfPMP}
            totalNoOfPOA={totalNoOfPOA}
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
            />
          )}
          <FooterButtons
            handleCancel={handleCancel}
            hideSaveButton={true}
            onSubmit={onSubmit}
          />
        </>
      )}
    </div>
  );
};

export default DSBP;
