import React from "react";
import { useSelector } from "react-redux";
import CustomizeViewDialog from "./CustomizeViewDialog";

const CustomizeView = ({ showTaskDialog, onClose, setCustomizeViewFields, customizeViewFields, dependencyMappingData, headerName, CDPTPageData, IQData, RDTData }) => {
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const BU = selectedProjectDetails?.BU;
  const allBUAttributesData = useSelector(
    (state) => state.DropDownValuesReducer
  );
  const allBUAttributes = allBUAttributesData.DropDownValuesData;

  let buWiseAttributeList =
    allBUAttributes?.ArtWorkProjectSetupPage?.Artwork_BU;
  let attributeList = [];
  if (buWiseAttributeList) {
    attributeList =
      buWiseAttributeList.find((item) => item.BU_Name === BU)?.Attribute_List ||
      [];
  }

  let availableFields = [];
  if (attributeList && attributeList.length) {
    availableFields = [...attributeList].sort((a, b) => {
      return parseInt(a.Sequence) - parseInt(b.Sequence);
    });
  }

  return (
    <>
      <CustomizeViewDialog
        onClose={onClose}
        showTaskDialog={showTaskDialog}
        availableFields={availableFields}
        setCustomizeViewFields={setCustomizeViewFields}
        customizeViewFields={customizeViewFields}
        headerName={headerName}
        CDPTPageData={CDPTPageData}
        IQData={IQData}
        RDTData={RDTData}
      />
    </>
  );
};

export default CustomizeView;
