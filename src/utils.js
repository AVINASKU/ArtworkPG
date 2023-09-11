import { useEffect } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccessMatrix } from "./store/actions/RoleBasedActions";
import { TrainingMode } from "./trainingmode.js";
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

export const CheckReadOnlyAccess = () => {
  const dispatch1 = useDispatch();
  const { accessMatrix } = useSelector((state) => state?.accessMatrixReducer);
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const location = useLocation();
  // if read only access then returns true otherwise return false
  useEffect(() => {
    dispatch1(fetchAccessMatrix());
  }, [dispatch1]);

  const accessDetails = getAccessDetails(userInformation.role, accessMatrix);
  const currentUrl = location.pathname;
  let url;
  if (currentUrl.includes("projectPlan")) {
    url = currentUrl.split("/")[2]; // Extract the project plan ID from URL
  } else {
    url = currentUrl.split("/")[1]; // Extract the URL without project plan
  }
  let checkReadOnlyAccess = true;
  accessDetails.pages.forEach((page, index) => {
    if (page.name === url) {
      console.log("page", page);
      let checkAccess = page?.access;
      if (
        checkAccess &&
        checkAccess.length === 1 &&
        checkAccess.includes("Read")
      )
        checkReadOnlyAccess = false;
      if (checkAccess.length === 0) checkReadOnlyAccess = false;
    }
  });
  return checkReadOnlyAccess;
};

export const Loading = () => {
  return (
    <div className="align-item-center">
      <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
    </div>
  );
};

export const optionList = (data, fieldName) => {
  const uniqueSMOs = new Set();

  // Iterate over the array and add "Artwork_SMO" values to the Set
  if (data && data.length) {
    data.forEach((item) => {
      if (item[fieldName] || item[fieldName] === 0) {
        uniqueSMOs.add(item[fieldName]);
      }
    });
  }

  // Convert the Set to an array
  const optionList = Array.from(uniqueSMOs);

  return optionList;
};

export const optionListDependencyMapping = (data, fieldName, DropDownData) => {
  const uniqueArray = new Set();
  if (DropDownData?.length) {
  uniqueArray.add(DropDownData);
  } else  if (data && data.length) {
    data.forEach((item) => {
      if (item[fieldName] || item[fieldName] === 0) {
        uniqueArray.add(item[fieldName]);
      }
    });
  }


  // Convert the Set to an array
  const optionList = Array.from(uniqueArray);
  console.log("unique array", optionList);

  return optionList;
};

// export const generateUniqueKey = (fieldName) => {
//   const timestamp = new Date().getTime();
//   return `${fieldName}_${timestamp}`;
// };

export const roles = JSON.parse(localStorage.getItem("roles"))?.map(
  (selection) => selection?.UserRole
);

export const BusinessUnit = JSON.parse(localStorage.getItem("roles"))
  ?.ArtworkAgilityPage?.UserGroup?.map((selection) =>
    selection?.UserBU?.map((role) => role?.BU_Name)
  )
  .flat();

export const Regions = JSON.parse(localStorage.getItem("roles"))
  ?.ArtworkAgilityPage?.UserGroup?.map((selection) =>
    selection?.UserRegion?.map((role) => role?.Region_Name)
  )
  .flat();

//get this data from training mode json
const GetPageRoles = () => {
  const url = window.location.pathname;
  const { accessRoles } = useSelector((state) => state?.accessMatrixReducer);
  const UserProfile = useSelector((state) => state.UserReducer);
  const Role = UserProfile?.userProfile;
  const roles = Role?.role || [];
  if (Array.isArray(accessRoles)) {
    const matchingAccessRoles = accessRoles.filter((accessRole) =>
      url?.includes(accessRole?.page)
    );
    // Extract the access roles for the specified roles
    const extractedAccessRoles = matchingAccessRoles.map((accessRole) => {
      const roleAccess = accessRole?.roles?.filter((roleObj) =>
        roles?.includes(roleObj.name)
      );
      return {
        page: accessRole.page,
        path: accessRole.path,
        roles: roleAccess,
      };
    });

    // Convert the access roles to the desired format
    const formattedAccessRoles = extractedAccessRoles.map((accessRole) => ({
      page: accessRole.page,
      path: accessRole.path,
      roles: accessRole?.roles?.map((roleObj) => ({
        name: roleObj.name,
        access: roleObj.access,
      })),
    }));

    return formattedAccessRoles;
  }

  return [];
};

export const hasEmptyAccessForProjectSetup = () => {
  const matchingPageRole = GetPageRoles()?.find((pageRole) => {
    return (
      pageRole.page === "projectPlan" && pageRole.path.includes("ProjectSetup")
    );
  });

  if (matchingPageRole) {
    return matchingPageRole.roles.every((role) => {
      return role?.access?.length === 0;
    });
  }

  return false;
};

export const hasProjectPlanAccess = () => {
  const matchingPageRole = GetPageRoles()?.find((pageRole) => {
    return (
      pageRole.page === "projectPlan" && pageRole.path.includes("ProjectPlan")
    );
  });

  if (matchingPageRole) {
    const hasAllAccess = matchingPageRole?.roles.some((role) => {
      return (
        role.access.includes("Read") &&
        role.access.includes("Write") &&
        role.access.includes("Edit") &&
        role.access.includes("Delete")
      );
    });

    if (hasAllAccess) {
      return true;
    }
  }

  return false;
};

export function hasAllAccess() {
  return GetPageRoles()?.some((pageRole) => {
    return pageRole?.roles?.some((role) => {
      return (
        role.access.includes("Read") &&
        role.access.includes("Write") &&
        role.access.includes("Edit") &&
        role.access.includes("Delete")
      );
    });
  });
}

// const hasReadAccess = (pageRoles) => {
//   return pageRoles.some((pageRole) => {
//     return pageRole.roles.some((role) => {
//       return (
//         role.access.includes("Read") &&
//         !role.access.includes("Write") &&
//         !role.access.includes("Edit") &&
//         !role.access.includes("Delete")
//       );
//     });
//   });
// };

// const hasReadAccessForMyProjects = hasReadAccess(
//   pageRoles.filter((pageRole) => pageRole.page === urls?.split("/")[1])
// );
// // console.log(hasReadAccessForMyProjects); // true
export const generateUniqueKey = (fieldName) => {
  const timestamp = new Date().getTime();
  return `${fieldName}_${timestamp}`;
};

export const addEllipsis = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }

  const trimmedText = text.substring(0, maxLength);
  return trimmedText + "...";
};

export const selectedDesignItems = (getData, setEnableSubmit) => {
  let allSelectedItemsValid = false;
  const selectedValues = getData.every((item) => {
    if (item.Select) {
      const isValid = item.Agency_Reference !== "" && item.Cluster !== "";
      // If any selected item is invalid, set allSelectedItemsValid to false.
      if (!isValid) {
        allSelectedItemsValid = false;
      }
      return isValid;
    } else {
      // Filter selected items and check if any of them are valid.
      const selectedItems = getData.filter(
        (selectedItem) =>
          selectedItem.Select && selectedItem.Agency_Reference !== "" && selectedItem.Cluster !== ""
      );
      const isValid = selectedItems.length > 0;
      allSelectedItemsValid = isValid;
      return isValid;
    }
  });
  setEnableSubmit(allSelectedItemsValid);
  return selectedValues;
};
export const getEnvironmentFromURL = () => {
  const url = window.location.href;
  const domainRegex = /https?:\/\/([^/]+)\//; // Regular expression to match the domain part of the URL

  const match = url.match(domainRegex);
  let domain = "";

  if (match && match.length > 1) {
    domain = match[1]; // Extract the matched part
  }

  let env;

  switch (domain) {
    case "awflowdev.pg.com":
      env = "DEV";
      break;
    case "awflowqa.pg.com":
      env = "QA";
      break;
    case "awflowsit.pg.com":
      env = "SIT";
      break;
    case "awflow.pg.com":
      env = "";
      break;
    default:
      env = "localEnv";
  }

  return env;
};

