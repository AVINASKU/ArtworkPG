// @flow

import { alphabeticalSort } from "./Utils";



const Entities = (availableFieldsFromAPI, headerName) => {
    
  const header = headerName === "Dependency Mapping" ? true : false;

  if(header && availableFieldsFromAPI){
    availableFieldsFromAPI = availableFieldsFromAPI?.map((item) => ({
      Field_Name: item.field,
      width: item.width,
      freeze: item.freeze,
      Sequence: item.Sequence,
      group: item.group,
    }));
    console.log("hello if availableFieldsFromAPI", availableFieldsFromAPI);
  }

  const taskMap = availableFieldsFromAPI?.reduce((previous, current) => {
    previous[current.Field_Name] = current;
    return previous;
  }, {});

  const availableFields = {
    id: "availableFields",
    title: "Available Fields",
    fieldsData: alphabeticalSort(availableFieldsFromAPI)
    .map((task) => task.Field_Name).sort((a,b)=>{
      if(a.Field_Name < b.Field_Name){
        return -1
      }if(a.Field_Name > b.Field_Name){
        return 1
      }
      return 0
    }),
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

export default Entities;
