import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";

const DsbpActionDialog = ({
  actionHeader,
  actionDialog,
  setActionDialog,
  selected,
  actionNameObject,
  onActionSubmit,
  aiseList,
  assemblyMechanismList,
  rowData
}) => {
  const [packageName, setPackageName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [aiseName, setAISEName] = useState("");
  const [assemblyMechanismChange, setAssemblyMechanismChange] = useState("");
  const [bioside, setBioside] = useState("");
  const [sellable, setSellable] = useState("");
  const [formData, setFormData] = useState({});
  
  const { selectedProject } = useSelector((state) => state.ProjectSetupReducer);
  if(rowData){
    selected = [rowData];
  }

  let updatedData = actionNameObject?.filter(
    (data) => data.header === actionHeader
  );
  
    // if((updatedData && updatedData[0]?.value === "Add to Project") || rowData){
    //   setFormData("AddToProject")
    // }
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
    setGroupName(e.target.value)
    setFormData({
      ...formData,
      AWM_GroupPMP: e.target.value,
    });
  };

  const footerContent = (
    <div>
      <Button variant="secondary" onClick={() => setActionDialog(false)}>
      {(updatedData && updatedData[0]?.value === "Add to Project") || rowData ? "No" : "Cancel"}
      </Button>
      <Button
        disabled={(updatedData && updatedData[0]?.value === "Add to Project") || rowData ? false : Object.keys(formData).length === 0}
        onClick={() => ((updatedData && updatedData[0]?.value === "Add to Project") || rowData) ? onActionSubmit("AddToProject", selected) : onActionSubmit(formData)}
      >
        {(updatedData && updatedData[0]?.value === "Mass Update") ? "Update" : (updatedData && updatedData[0]?.value === "Add to Project") || rowData ? "Yes" : "Submit"}
      </Button>
    </div>
  );
  console.log("selectedv action", selected);

  return (
    console.log("formData", rowData),
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
          <Row style={{ "height": "100%"}}>
          {rowData || (updatedData && updatedData[0]?.value === "Add to Project") ? (
                <Col sm={12} style={{ "height": "100%"}}>
                  {selected && (
                      <DataTable value={selected} dataKey="id" className="addToProjectTable" scrollable>
                        <Column
                          field="DSBP_PMP_PIMaterialNumber"
                          header="PMP "
                        ></Column>
                        <Column field="DSBP_PMP_PIMaterialDescription" header="PMP Description"></Column>
                      </DataTable>
                  )}
                </Col>
              ) : (
                  <>
                    <Col sm={7} style={{ "height": "100%"}}>
                      {selected && updatedData && updatedData[0]?.value !== "Add to Project" && (
                        <div className="card" style={{ "height": "100%"}}>
                          <DataTable value={selected} dataKey="id" scrollable>
                            <Column
                              field="DSBP_PMP_PIMaterialNumber"
                              header="PMP "
                            ></Column>
                            <Column field="DSBP_PMP_PIMaterialDescription" header="PMP Description"></Column>
                          </DataTable>
                        </div>
                      )}
                    </Col>
                    <Col sm={5}>
                      {updatedData && updatedData[0]?.value === "Mass Update" && (
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
                                >
                                  <option value="">Select Assembly Mechanism</option>
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
                          {selectedProject?.BU === "Home Care" &&
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
                                  >
                                    <option value="">Select AISE</option>
                                    {aiseList.map((aise) => (
                                      <option key={aise.code} value={aise.AWM_AISE}>
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
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Bioside"
                                    onChange={handleBiosideChange}
                                    value={bioside}
                                  />
                                </Form.Group>
                              </Col>
                              <Col sm={12}>
                                <Form.Group
                                  className={`mb-2`}
                                  controlId="groupName.ControlInput1"
                                >
                                  <Form.Label>Sellable</Form.Label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Sellable"
                                    onChange={handleSellableChange}
                                    value={sellable}
                                  />
                                </Form.Group>
                              </Col>
                            </>
                          }
                          
                        </Row>
                      )}
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
                            onChange={(e) => setPackageName(e.target.value)}
                            value={packageName}
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