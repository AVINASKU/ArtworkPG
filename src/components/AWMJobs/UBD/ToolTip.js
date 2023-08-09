import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import infoIcon from "../../../assets/images/infoIcon.svg";

const ToolTip = () => {
  return (
    <OverlayTrigger
      placement="right"
      // show
      overlay={
        <Tooltip className="tooltip1" style={{ margin: "23px 0 0 -1.5px" }}>
          <div className="toolname1">
            Please check the file name before uploading. Remove not allowed
            special characters.
            <br />
            Please follow these standard guidelines for file name:
            <ul>
              <li>
                Create file names that are logical, meaningful to users, simple
                to read and relevant.
              </li>
              <li>Do not include spaces.</li>
              <li>
                File name should not exceed 31 characters. Total length of file
                paths should be limited to a maximum of 255 characters.
                Characters are restricted to letters, numbers and _ (underscore)
                only.
              </li>
              <li>
                Do not use the following characters: ...{" "}
                {`(  ) {  }  [  ] \  / < > @ $ % &`} # ? : , * ” ˜ # â € œ =
              </li>
              <li>
                Always ensure that file extensions are used and in lower case
                when saving files using Macintosh.
              </li>
              <li>Periods(.) are only to be used for the file extension.</li>
              <li>
                When numbering similar types of files or sequences try to
                anticipate maximum numbers.
              </li>
              <li>
                Format dates in a simple manner. For example the date
                June23,2023 can be represented as 23June2024 or 230624
              </li>
              <li>Use underscores instead of periods or spaces.</li>
            </ul>
          </div>
        </Tooltip>
      }
    >
      <div className="infoIcon">
        <img src={infoIcon} alt="" />
      </div>
    </OverlayTrigger>
  );
};

export default ToolTip;
