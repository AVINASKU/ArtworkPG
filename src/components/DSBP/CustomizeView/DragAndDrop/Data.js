// @flow
const entities = (availableFieldsFromAPI) => {
  const taskMap = availableFieldsFromAPI.reduce((previous, current) => {
    previous[current.Field_Name] = current;
    return previous;
  }, {});

  const availableFields = {
    id: "availableFields",
    title: "Available Fields",
    fieldsData: availableFieldsFromAPI.map((task) => task.Field_Name),
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
    tasks: taskMap,
  };
};

export default entities;
