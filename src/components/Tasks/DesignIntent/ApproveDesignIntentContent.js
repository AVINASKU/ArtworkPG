import React from "react";

const ApproveDesignIntentContent = () => {
  const DesignHeader = (di_name) => {
    return (
      <>
        <div
          style={{
            marginLeft: 20,
            padding: 5,
          }}
          className="font-color"
        >
          {di_name}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="design-intent-header">{DesignHeader("pranali")}</div>
    </>
  );
};

export default ApproveDesignIntentContent;
