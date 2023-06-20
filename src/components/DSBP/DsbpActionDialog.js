
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './ProductService';

const DsbpActionDialog = ({actionHeader, actionDialog, setActionDialog, selected, actionNameObject}) => {
    const [packageName, setPackageName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [aiseName, setAISEName] = useState("");
    let updatedData = actionNameObject.filter((data)=>data.header === actionHeader);;
   
    const footerContent = (
        <div>
            <Button
                variant="secondary"
                onClick={() => setActionDialog(false)}
            >
                Cancel
            </Button>
            <Button
                type="submit"
            >
                Submit
            </Button>
           
        </div>
    );
    console.log("selectedv action", selected);
    console.log("updatedData data",updatedData[0]?.value);
    return (
      <div className="card flex justify-content-center">
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
                  <DataTable
                    value={selected}
                    dataKey="id"
                  >
                        <Column field="InitiativeID" header="InitiativeID"></Column>
                        <Column field="PMP" header="PMP"></Column>
                  </DataTable>
                </div>
              )}
            </Col>
            <Col sm={6}>
              {updatedData[0]?.value === "Mass Update" &&
                    <Row>
                       <Col sm={9}>
                        <Form.Group
                          className={`mb-2`}
                          controlId="groupName.ControlInput1"
                          >
                          <Form.Label>
                          Assembly Mechanism
                          </Form.Label>
                          <div>
                            <Form.Select
                              value="select"
                              placeholder="Select Assembly Mechanism"
                            >
                              <option value="">BVE</option>
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
                              onChange={(e) => setAISEName(e.target.value)}
                              defaultValue={aiseName}
                            >
                              <option value="1">Company Logo</option>
                              <option value="2">Green Ribbon</option>
                              <option value="3">Non-sellable </option>
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
                            placeholder="Enter Package Name"
                            onChange={(e) => setPackageName(e.target.value)}
                            value={packageName}
                          />
                        </Form.Group>
                       </Col>
                    </Row>
                      
                  }
                {updatedData[0]?.value === "Group PMPs" &&
                    <Form.Group
                    className={`mb-2`}
                    controlId="groupName.ControlInput1"
                    >
                    <Form.Label>Group Name<sup>*</sup></Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Group Name"
                      onChange={(e) => setGroupName(e.target.value)}
                      value={groupName}
                    />
                  </Form.Group>
                }
                {updatedData[0]?.value === "Create POAA" &&
                    <Form.Group
                    className={`mb-2`}
                    controlId="groupName.ControlInput1"
                    >
                    <Form.Label>Package Name<sup>*</sup></Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Package Name"
                      onChange={(e) => setPackageName(e.target.value)}
                      value={packageName}
                    />
                  </Form.Group>
                }
            </Col>
          </Row>
        </Dialog>
      </div>
    );
}
export default DsbpActionDialog;