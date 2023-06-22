import React from "react";
import PageLayout from "./components/PageLayout";

function Role() {
  return (
    <PageLayout>
      <div className="content-layout" id="tableDiv">
        <div className="tabular-view">
          <div className="roles">
            <div>
              <h5>Please Select the Role(s) You Want to Test</h5>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
export default Role;
