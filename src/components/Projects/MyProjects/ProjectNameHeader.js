
import React from "react";
import filter from "../../../assets/images/filter.svg";


const ProjectNameHeader = (options , frozenCoulmns, sortData, projectNameOnClick) =>{
    let splittedCol = options.split("_").join(" ");
        const isFilterActivated =
      (frozenCoulmns &&
        frozenCoulmns.length &&
        frozenCoulmns.includes(options)) ||
      (sortData && sortData.length && sortData[0] === options);

    return (
      <div>
        <>
          <img
            src={filter}
            alt="Column Filter"
            onClick={(e) => projectNameOnClick(e, options)}
            className={
              isFilterActivated
                ? "columnFilterIcon filter-color-change"
                : "columnFilterIcon"
            }
          />
          <span className={isFilterActivated && "filter-color-change"}>
            {splittedCol === "Artwork SMO" && "SMO"}
            {splittedCol === "Artwork Category" && "Category"}
            {splittedCol === "Artwork Brand" && "Brand"}
            {splittedCol !== "Artwork SMO" && splittedCol !== "Artwork Category" && splittedCol !== "Artwork Brand" && splittedCol}
          </span>
        </>
      </div>
    );

}

export default ProjectNameHeader;