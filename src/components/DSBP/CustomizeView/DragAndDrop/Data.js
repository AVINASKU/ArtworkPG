// @flow
const entities = (availableFieldsFromAPI, headerName) => {
  const header = headerName === "Dependency Mapping" ? true : false;

  const taskMap = availableFieldsFromAPI.reduce((previous, current) => {
    previous[current.Field_Name] = current;
    return previous;
  }, {});

  const propertyKeysArray = availableFieldsFromAPI && Object.keys(availableFieldsFromAPI[0]);
  const dependancyMappingFields = {};
  propertyKeysArray.forEach((key) => {
    dependancyMappingFields[key] = {
      Field_Name: key
    };
  }); 

  const availableFields = {
    id: "availableFields",
    title: "Available Fields",
    fieldsData: header ? propertyKeysArray : availableFieldsFromAPI.map((task) => task.Field_Name),
  };

  const selectedFields = {
    id: "selectedFields",
    title: "Selected Fields",
    fieldsData: [],
  };
  const freezedColumns = {
    id: "freezedColumns",
    title: "Freezed Columns",
    fieldsData: [],
  };

  return {
    columnOrder: [availableFields.id, selectedFields.id, freezedColumns.id],
    columns: {
      [availableFields.id]: availableFields,
      [selectedFields.id]: selectedFields,
      [freezedColumns.id]: freezedColumns,
    },
    tasks: header ? dependancyMappingFields : taskMap,
  };
};

export default entities;
