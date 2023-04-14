import moment from "moment";

export const changeDateFormat = (value) => {
  let newDate = moment(value, "YYYYMMDDTHHmmss.SSS [GMT]").format("DD-MMM-YY");
  return newDate;
};
