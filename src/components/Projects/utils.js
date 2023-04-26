import moment from "moment";

export const changeDateFormat = (value) => {
  let newDate = moment(value, "YYYYMMDDTHHmmss.SSS [GMT]").format("DD-MMM-YY");
  return newDate;
};

export const onSortData = (column, direction, data) => {
  const sortedData = [...data].sort((a, b) => {
    return a[column] > b[column] ? 1 : -1;
  });

  if (direction === "desc") {
    sortedData.reverse();
  }
  return sortedData;
};
