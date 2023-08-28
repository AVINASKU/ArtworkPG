import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { MultiSelect } from "primereact/multiselect";

const DsbpActionDialog = ({
  actionHeader,
  actionDialog,
  setActionDialog,
  selected,
  actionNameObject,
  onActionSubmit,
  aiseList,
  assemblyMechanismList,
  rowData,
  headerName,
  CDPTPageData,
  IQData,
  RDTData,
  GABriefData,
  updateDropDownData,
  handleNewGaBrief,
  isSubmitEnable,
  submittedData,
  setSubmittedData
}) => {
  const [packageName, setPackageName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [aiseName, setAISEName] = useState("");
  const [assemblyMechanismChange, setAssemblyMechanismChange] = useState("");
  const [bioside, setBioside] = useState("");
  const [sellable, setSellable] = useState("");
  const [formData, setFormData] = useState({});
  const [emptyMessage, setEmptyMessage] = useState("");
  const [CDPT, setCDPT] = useState([]);
  const [IQ, setIQ] = useState([]);
  const [RDT, setRDT] = useState([]);
  const [GABrief, setGABrief] = useState([]);
  const optionsList = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
  ];

  const { selectedProject } = useSelector((state) => state.ProjectSetupReducer);

  let updatedData = actionNameObject?.filter(
    (data) => data.header === actionHeader
  );

  const handleAiseChange = (e) => {
    setAISEName(e.target.value);
    setFormData({
      ...formData,
      AWM_AISE: e.target.value,
    });
  };

  const handleAssemblyMechanismChange = (e) => {
    setAssemblyMechanismChange(e.target.value);
    setFormData({
      ...formData,
      AWM_AssemblyMechanism: e.target.value,
    });
  };

  const handleBiosideChange = (e) => {
    setBioside(e.target.value);
    setFormData({ ...formData, AWM_Biocide: e.target.value });
  };

  const handleSellableChange = (e) => {
    setSellable(e.target.value);
    setFormData({ ...formData, AWM_Sellable: e.target.value });
  };

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
    setFormData({
      ...formData,
      AWM_GroupPMP: e.target.value,
    });
  };

  const handlePackageName = (e) => {
    setPackageName(e.target.value);
    setFormData({
      ...formData,
      POAPackageName: e.target.value,
    });
  };

  const handleClose = (e) => {
    setActionDialog(false);
    headerName === "Dependency Mapping" && setSubmittedData([]);
  };
  if(headerName !== "Dependency Mapping"){
    if(updatedData && updatedData[0]?.value === "Add to Project"){
      selected = selected.filter(
        (item) => item.AWM_AddedToProject !== "Yes" && item.DSBP_PMP_AWReadinessGateStatus === "LOCKED"
      );
    } else if(updatedData && updatedData[0]?.value === "Create POAA"){
      selected = selected.filter(
        (item) =>
          item.AWM_AddedToProject === "Yes" &&
          item.DSBP_PMP_AWReadinessGateStatus === "LOCKED" &&
          item.AWM_POARequested !== "Yes"
      );
    } else if (rowData) {
      selected = [rowData];
    } else {
      selected = selected.filter(
        (item) => item.AWM_AddedToProject === "Yes" && item.AWM_AWJStatus !== "Complete"
      );
    }
  }
  
  const addedToProjectRows = selected.filter(
    (item) => (item.AWM_AddedToProject === "Yes" && item.AWM_AWJStatus !== "Complete")
  );

  const footerContent = (
    <div>
      <Button variant="secondary" onClick={handleClose}>
        {(updatedData && updatedData[0]?.value === "Add to Project") || rowData
          ? "No"
          : "Cancel"}
      </Button>
      <Button
        disabled={
          rowData ||
          (isSubmitEnable !== undefined && !isSubmitEnable)
            ? false
            : updatedData && updatedData[0]?.value === "Add to Project" ? selected.length === 0 : Object.keys(formData).length === 0
        }
        onClick={() =>
          (updatedData && updatedData[0]?.value === "Add to Project") || rowData
            ? onActionSubmit("AddToProject", selected)
            : onActionSubmit(formData, selected)
        }
      >
        {updatedData && updatedData[0]?.value === "Mass Update"
          ? "Save"
          : (updatedData && updatedData[0]?.value === "Add to Project") ||
            rowData
          ? "Yes"
          : "Save"}
      </Button>
    </div>
  );
  

  return (
    (
      <div className="card flex justify-content-center dsbp-action-dialog">
        <Dialog
          header={actionHeader}
          visible={actionDialog}
          style={{ width: "832px" }}
          onHide={() => setActionDialog(false)}
          footer={footerContent}
          className="actionDialog"
        >
          <Row style={{ height: "100%" }}>
            {rowData ||
            (updatedData && updatedData[0]?.value === "Add to Project") ? (
              <Col sm={12} style={{ height: "100%" }}>
                {selected && (
                  <DataTable
                    value={selected}
                    dataKey="id"
                    className="addToProjectTable"
                    emptyMessage={"No PMPs are Locked in DSBP"}
                    scrollable
                  >
                    <Column
                      field="DSBP_PMP_PIMaterialNumber"
                      header="PMP "
                    ></Column>
                    <Column
                      field="DSBP_PMP_PIMaterialDescription"
                      header="PMP Description"
                    ></Column>
                  </DataTable>
                )}
              </Col>
            ) : (
              <>
                <Col sm={7} style={{ height: "100%" }}>                  
                  <div className="card" style={{ height: "100%" }}>
                    <DataTable
                      value={selected}
                      dataKey="id"
                      emptyMessage={updatedData && updatedData[0]?.value !== "Add to Project" && "Either POA-A is already triggered for the selected PMP or PMP is not added to project"}
                      scrollable
                    >
                      <Column
                        field="DSBP_PMP_PIMaterialNumber"
                        header="PMP "
                      ></Column>
                      <Column
                        field="DSBP_PMP_PIMaterialDescription"
                        header="PMP Description"
                      ></Column>
                    </DataTable>
                  </div>                  
                </Col>
                <Col sm={5}>
                  {updatedData &&
                    updatedData[0]?.value === "Mass Update" &&
                    (headerName !== "Dependency Mapping" ? (
                      <Row>
                        <Col sm={12}>
                          <Form.Group
                            className={`mb-2`}
                            controlId="groupName.ControlInput1"
                          >
                            <Form.Label>Assembly Mechanism</Form.Label>
                            <div>
                              <Form.Select
                                value={assemblyMechanismChange}
                                placeholder="Select Assembly Mechanism"
                                onChange={handleAssemblyMechanismChange}
                                disabled={addedToProjectRows.length === 0}
                              >
                                <option value="">
                                  Select Assembly Mechanism
                                </option>
                                {assemblyMechanismList.map((aise) => (
                                  <option
                                    key={aise.code}
                                    value={aise.AWM_AssemblyMechanism}
                                  >
                                    {aise.AWM_AssemblyMechanism}
                                  </option>
                                ))}
                              </Form.Select>
                            </div>
                          </Form.Group>
                        </Col>
                        {selectedProject?.BU === "Home Care" && (
                          <>
                            <Col sm={12}>
                              <Form.Group
                                className={`mb-2`}
                                controlId="groupName.ControlInput1"
                              >
                                <Form.Label>AISE</Form.Label>
                                <Form.Select
                                  value={aiseName}
                                  placeholder="Select AISE"
                                  onChange={handleAiseChange}
                                  disabled={addedToProjectRows.length === 0}
                                >
                                  <option value="">Select AISE</option>
                                  {aiseList.map((aise) => (
                                    <option
                                      key={aise.code}
                                      value={aise.AWM_AISE}
                                    >
                                      {aise.AWM_AISE}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col sm={12}>
                              <Form.Group
                                className={`mb-2`}
                                controlId="groupName.ControlInput1"
                              >
                                <Form.Label>Bioside</Form.Label>
                                <div>
                                  <Form.Select
                                    value={bioside}
                                    placeholder="Select Bioside"
                                    onChange={handleBiosideChange}
                                    disabled={addedToProjectRows.length === 0}
                                  >
                                    <option value="">Select Bioside</option>
                                    {optionsList.map((data) => (
                                      <option key={data.code} value={data.name}>
                                        {data.name}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </div>
                              </Form.Group>
                            </Col>
                            <Col sm={12}>
                              <Form.Group
                                className={`mb-2`}
                                controlId="groupName.ControlInput1"
                              >
                                <Form.Label>Sellable</Form.Label>
                                <div>
                                  <Form.Select
                                    value={sellable}
                                    placeholder="Select Sellable"
                                    onChange={handleSellableChange}
                                    disabled={addedToProjectRows.length === 0}
                                  >
                                    <option value="">Select Sellable</option>
                                    {optionsList.map((data) => (
                                      <option key={data.code} value={data.name}>
                                        {data.name}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </div>
                              </Form.Group>
                            </Col>
                          </>
                        )}
                      </Row>
                    ) : (
                      <Row>
                        { RDTData && RDTData?.length && (
                          <Col sm={12}>
                            <Form.Group
                              className={`mb-2`}
                              controlId="groupName.ControlInput1"
                            >
                              <Form.Label>RDT</Form.Label>
                              <div>
                                <MultiSelect
                                  value={RDT}
                                  onChange={(e) => {
                                    updateDropDownData(e.value, "AWM_RDT_Page");
                                    setRDT(e.value);
                                  }}
                                  options={
                                    RDTData
                                      ? RDTData.map((obj) => ({
                                          label: obj.AWM_Design_Job_Name,
                                          value: obj.AWM_Design_Job_ID,
                                          disabled:
                                            (RDT.length &&
                                              RDT.includes("DT_DJobN/A") &&
                                              obj.AWM_Design_Job_ID !==
                                                "DT_DJobN/A") ||
                                            (RDT.length &&
                                              !RDT.includes("DT_DJobN/A") &&
                                              obj.AWM_Design_Job_ID ===
                                                "DT_DJobN/A"),
                                        }))
                                      : []
                                  }
                                  filter
                                  placeholder={`Select`}
                                  maxSelectedLabels={3}
                                  className="p-column-filter"
                                />
                              </div>
                            </Form.Group>
                          </Col>
                        )}
                        { CDPTPageData && CDPTPageData?.length && (
                          <Col sm={12}>
                            <Form.Group
                              className={`mb-2`}
                              controlId="groupName.ControlInput1"
                            >
                              <Form.Label>CD/PT</Form.Label>
                              <div>
                                <MultiSelect
                                  value={CDPT}
                                  onChange={(e) => {
                                    updateDropDownData(
                                      e.value,
                                      "AWM_CDPT_Page"
                                    );
                                    setCDPT(e.value);
                                  }}
                                  options={
                                    CDPTPageData
                                      ? CDPTPageData.map((obj) => ({
                                          label: obj.AWM_Design_Job_Name,
                                          value: obj.AWM_Design_Job_ID,
                                          disabled:
                                            (CDPT.length &&
                                              CDPT.includes("NPF_DJobN/A") &&
                                              obj.AWM_Design_Job_ID !==
                                                "NPF_DJobN/A") ||
                                            (CDPT.length &&
                                              !CDPT.includes("NPF_DJobN/A") &&
                                              obj.AWM_Design_Job_ID ===
                                                "NPF_DJobN/A"),
                                        })).filter(
                                          (option) => option.label !== ""
                                        ) // Filter out options with empty labels
                                      : []
                                  }
                                  filter
                                  placeholder={`Select`}
                                  maxSelectedLabels={3}
                                  className="p-column-filter"
                                />
                              </div>
                            </Form.Group>
                          </Col>
                        )}
                        {IQData?.length && (
                          <Col sm={12}>
                            <Form.Group
                              className={`mb-2`}
                              controlId="groupName.ControlInput1"
                            >
                              <Form.Label>IQ</Form.Label>
                              <div>
                                <MultiSelect
                                  value={IQ}
                                  onChange={(e) => {
                                    updateDropDownData(e.value, "AWM_IQ_Page");
                                    setIQ(e.value);
                                  }}
                                  options={
                                    IQData
                                      ? IQData.map((obj) => ({
                                          label: obj.AWM_Design_Job_Name,
                                          value: obj.AWM_Design_Job_ID,
                                          disabled:
                                            (IQ.length &&
                                              IQ.includes("IQ_DJobN/A") &&
                                              obj.AWM_Design_Job_ID !==
                                                "IQ_DJobN/A") ||
                                            (IQ.length &&
                                              !IQ.includes("IQ_DJobN/A") &&
                                              obj.AWM_Design_Job_ID ===
                                                "IQ_DJobN/A"),
                                        }))
                                      : []
                                  }
                                  filter
                                  placeholder={`Select`}
                                  maxSelectedLabels={3}
                                  className="p-column-filter"
                                />
                              </div>
                            </Form.Group>
                          </Col>
                        )}
                        {GABriefData && (
                          <Col sm={12}>
                            <Form.Group
                              className={`mb-2`}
                              controlId="groupName.ControlInput1"
                            >
                              <Form.Label>GA Brief</Form.Label>
                              <div>
                                <Form.Select
                                  value={GABrief}
                                  placeholder="Select"
                                  onChange={(e) => {
                                    updateDropDownData(
                                      e.target.value,
                                      "AWM_GA_Brief"
                                    );
                                    setGABrief(e.target.value);
                                  }}
                                >
                                  <option value="">Select</option>

                                  {GABriefData?.map(
                                    (data, index) =>
                                      data.File_Name !== "Add GA Brief" && (
                                        <option
                                          key={`${data.File_Name}_${index}`}
                                          value={data.File_Name}
                                        >
                                          {data.File_Name}
                                        </option>
                                      )
                                  )}
                                </Form.Select>
                              </div>
                            </Form.Group>
                          </Col>
                        )}
                      </Row>
                    ))}
                  {updatedData && updatedData[0]?.value === "Group PMPs" && (
                    <Form.Group
                      className={`mb-2`}
                      controlId="groupName.ControlInput1"
                    >
                      <Form.Label>
                        Group Name<sup>*</sup>
                      </Form.Label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Group Name"
                        onChange={handleGroupName}
                        value={groupName}
                        disabled={addedToProjectRows.length === 0}
                      />
                    </Form.Group>
                  )}
                  {updatedData && updatedData[0]?.value === "Create POAA" && (
                    <Form.Group
                      className={`mb-2`}
                      controlId="groupName.ControlInput1"
                    >
                      <Form.Label>
                        Package Name<sup>*</sup>
                      </Form.Label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Package Name"
                        onChange={handlePackageName}
                        value={packageName}
                        disabled={selected.length === 0}
                      />
                    </Form.Group>
                  )}
                </Col>
              </>
            )}
          </Row>
        </Dialog>
      </div>
    )
  );
};
export default DsbpActionDialog;