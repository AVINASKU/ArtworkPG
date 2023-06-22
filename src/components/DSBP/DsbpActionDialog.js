import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const DsbpActionDialog = ({
  actionHeader,
  actionDialog,
  setActionDialog,
  selected,
  actionNameObject,
  onActionSubmit,
  aiseList,
  assemblyMechanismList
}) => {
  const [packageName, setPackageName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [aiseName, setAISEName] = useState("");
  const [assemblyMechanismChange, setAssemblyMechanismChange] = useState("");
  const [bioside, setBioside] = useState("");
  const [formData, setFormData] = useState({});

  let updatedData = actionNameObject.filter(
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
        Cancel
      </Button>
      <Button
        disabled={Object.keys(formData).length === 0}
        onClick={() => onActionSubmit(formData)}
      >
        {updatedData[0]?.value === "Mass Update" ? "Update" : "Submit"}
      </Button>
    </div>
  );
  console.log("selectedv action", selected);

  return (
    console.log("formData", Object.keys(formData).length === 0),
    (
      <div className="card flex justify-content-center dsbp-action-dialog">
        <Dialog
          header={actionHeader}
          visible={actionDialog}
          style={{ width: "50vw" }}
          onHide={() => setActionDialog(false)}
          footer={footerContent}
        >
          <Row>
            <Col sm={6}>
              {selected && (
                <div className="card">
                  <DataTable value={selected} dataKey="id">
                    <Column
                      field="DSBP_InitiativeID"
                      header="DSBP_InitiativeID"
                    ></Column>
                    <Column field="DSBP_IL" header="DSBP_IL"></Column>
                  </DataTable>
                </div>
              )}
            </Col>
            <Col sm={6}>
              {updatedData[0]?.value === "Mass Update" && (
                <Row>
                  <Col sm={9}>
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
                  <Col sm={9}>
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
                  <Col sm={9}>
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
                </Row>
              )}
              {updatedData[0]?.value === "Group PMPs" && (
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
              {updatedData[0]?.value === "Create POAA" && (
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
          </Row>
        </Dialog>
      </div>
    )
  );
};
export default DsbpActionDialog;
