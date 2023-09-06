export const NumberConversion = (number) => {
  const convertedNumber = String(number).padStart(2, "0");
  return convertedNumber;
};

export const dependancyMappingFields = (dependencyColumnNames1, CDPTPageData, RDTData, IQData, CICs, headerName) => {
  if(headerName === "Dependency Mapping"){
    const dependencyColumnNames2 = CDPTPageData?.length
      ? dependencyColumnNames1
      : dependencyColumnNames1.filter((item) => item.field !== "AWM_CDPT_Page");
    const dependencyColumnNames3 = RDTData?.length
      ? dependencyColumnNames2
      : dependencyColumnNames2.filter((item) => item.field !== "AWM_RDT_Page");
    let dependencyColumnNames4 = IQData?.length
      ? dependencyColumnNames3
      : dependencyColumnNames3.filter((item) => item.field !== "AWM_IQ_Page");

    let dependencyColumnNames = dependencyColumnNames4;

    if (CICs === false) {
      dependencyColumnNames = dependencyColumnNames4.filter(
        (item) =>
          item.field !== "AWM_CIC_Needed" &&
          item.field !== "AWM_GA_Brief" &&
          item.field !== "AWM_Supporting_PMP_Layout" &&
          item.field !== "AWM_Supporting_PMP_Design" &&
          item.field !== "AWM_Other_Reference" &&
          item.field !== "AWM_CIC_Matrix" &&
          item.field !== "AWM_CIC_Matrix_Requested"
      );
      return dependencyColumnNames;      
    }
    return dependencyColumnNames;
  }
}
