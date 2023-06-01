import moment from "moment";
import { useLocation } from "react-router-dom";

export const changeDateFormat = (value) => {
  let newDate = value
    ? moment(value, "YYYYMMDDTHHmmss.SSS [GMT]").format("DD-MMM-YY")
    : value;
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
export const onSort =
  (column, direction, pegadata, setPegaData, setSortData) => (event) => {
    const sortedData = [...pegadata].sort((a, b) => {
      return a[column] > b[column] ? 1 : -1;
    });

    if (direction === "desc") {
      sortedData.reverse();
    }
    setPegaData(sortedData);
    setSortData([column, direction]);
  };

export const convertCategoryIntoString = (array) => {
  let categoryString = array.map((item) => item.Category_Name).join(",");

  return categoryString;
};

export const convertBrandIntoString = (Brand) => {
  let brandString = Brand.map((item) => item.Brand_Name).join(",");
  return brandString;
};

export const AddNavigation = (breadcrumbLabel) => {
  const location = useLocation();
  const currentUrl = location.pathname;
  let url = currentUrl.split("/")[1];
  let breadcrumbSubLabel = url === "AllTasks" ? "All Tasks" : "My Tasks";
  url = "/" + url;

  const breadcrumb = [
    { label: breadcrumbSubLabel, url: url },
    { label: breadcrumbLabel },
  ];

  return breadcrumb;
};
/* 
Role based access matrix
*/
export const getAccessDetails = (userLogin, accessMatrix) => {
  const result = {
    pages: [],
  };

  for (const role of accessMatrix) {
    if (role.role === userLogin) {
      for (const page of role.pages) {
        result.pages.push(page);
      }
      break;
    }
  }

  return result;
};

export const getUnAuthoirzedAccess = (role, accessMatrix, pathname) => {
  const roleDetails = accessMatrix.find((item) => item.role === role);
  if (!roleDetails) {
    return null; // Role not found in accessMatrix
  }
  const pageDetails = roleDetails.pages.find((page) => page.path === pathname);
  if (!pageDetails) {
    return null; // Page not found in accessMatrix for the given role and pathname
  }
  const hasAccess = pageDetails.access.length > 0;
  return hasAccess ? pageDetails.access : null;
};
