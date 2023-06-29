export const NumberConversion = (number) => {
  const convertedNumber = String(number).padStart(2, "0");
  return convertedNumber;
};
