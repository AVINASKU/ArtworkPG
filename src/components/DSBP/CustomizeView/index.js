import React from "react";
import { useSelector } from "react-redux";
import CustomizeViewDialog from "./CustomizeViewDialog";

const CustomizeView = ({ showTaskDialog, onClose, setCustomizeViewFields, customizeViewFields, dependencyMappingData, headerName }) => {
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
  if(dependencyMappingData){
    console.log("dependencyMappingData", dependencyMappingData);
    availableFields = dependencyMappingData;
  } else if (attributeList && attributeList.length) {
    availableFields = [...attributeList].sort((a, b) => {
      return parseInt(a.Sequence) - parseInt(b.Sequence);
    });
  }

  return (
    console.log("dependencyMappingData availableFields index", availableFields),
    console.log("dependencyMappingData dependencyMappingData", dependencyMappingData),
    <>
      <CustomizeViewDialog
        onClose={onClose}
        showTaskDialog={showTaskDialog}
        availableFields={availableFields}
        setCustomizeViewFields={setCustomizeViewFields}
        customizeViewFields={customizeViewFields}
        headerName={headerName}
      />
    </>
  );
};

export default CustomizeView;
