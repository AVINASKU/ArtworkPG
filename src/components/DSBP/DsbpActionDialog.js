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
  const [CDPT, setCDPT] = useState([]);
  const [IQ, setIQ] = useState([]);
  const [RDT, setRDT] = useState([]);
  const [GABrief, setGABrief] = useState([]);
  
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

  const handleClose = (e) => {
    setActionDialog(false);
    setSubmittedData([])
  };

  const footerContent = (
    <div>
      <Button variant="secondary" onClick={handleClose}>
      {(updatedData && updatedData[0]?.value === "Add to Project") || rowData ? "No" : "Cancel"}
      </Button>
      <Button
        disabled={(updatedData && updatedData[0]?.value === "Add to Project") || rowData || !isSubmitEnable ? false : Object.keys(formData).length === 0}
        onClick={() => ((updatedData && updatedData[0]?.value === "Add to Project") || rowData) ? onActionSubmit("AddToProject", selected) : onActionSubmit(formData)}
      >
        {(updatedData && updatedData[0]?.value === "Mass Update") ? "Save" : (updatedData && updatedData[0]?.value === "Add to Project") || rowData ? "Yes" : "Save"}
      </Button>
    </div>
  );
  const notAddedToProjectRows = selected.filter((item) => (item.AWM_AddedToProject !== "Yes"));
  const addedToProjectRows = selected.filter((item) => (item.AWM_AddedToProject === "Yes"));

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
          <Row style={{ "height": "100%"}}>
          {rowData || (updatedData && updatedData[0]?.value === "Add to Project") ? (
                <Col sm={12} style={{ "height": "100%"}}>
                  {notAddedToProjectRows && (
                      <DataTable value={notAddedToProjectRows} dataKey="id" className="addToProjectTable" scrollable>
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
                      { (headerName !== "Dependency Mapping") && (addedToProjectRows) && updatedData && updatedData[0]?.value !== "Add to Project" && (
                        <div className="card" style={{ "height": "100%"}}>
                          <DataTable value={addedToProjectRows} dataKey="id" emptyMessage="Please add the PMP to project before you can update." scrollable>
                            <Column
                              field="DSBP_PMP_PIMaterialNumber"
                              header="PMP "
                            ></Column>
                            <Column field="DSBP_PMP_PIMaterialDescription" header="PMP Description"></Column>
                          </DataTable>
                        </div>
                      )}
                      { (headerName === "Dependency Mapping") && (
                        <div className="card" style={{ "height": "100%"}}>
                          <DataTable value={selected} dataKey="id" emptyMessage="Please add the PMP to project before you can update." scrollable>
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
                        headerName !== "Dependency Mapping" ?
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
                                    disabled={addedToProjectRows.length === 0}
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
                                    disabled={addedToProjectRows.length === 0}
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
                                    disabled={addedToProjectRows.length === 0}
                                  />
                                </Form.Group>
                              </Col>
                            </>
                          }
                          
                        </Row> :
                        <Row>
                          {RDTData.length > 1 &&
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
                                      updateDropDownData(
                                        e.value,
                                        "AWM_RDT_Page"
                                      );
                                      setRDT(e.value);
                                    }}
                                    options={
                                      RDTData
                                        ? RDTData.map((obj) => ({
                                            label: obj.AWM_Design_Job_Name,
                                            value: obj.AWM_Design_Job_ID,
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
                          }
                          {CDPTPageData.length > 1 &&
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
                                          })).filter(option => option.label !== "") // Filter out options with empty labels
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
                          }
                          {IQData.length > 1 &&
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
                                      updateDropDownData(
                                        e.value,
                                        "AWM_IQ_Page"
                                      );
                                      setIQ(e.value);
                                    }}
                                    options={
                                      IQData
                                        ? IQData.map((obj) => ({
                                            label: obj.AWM_Design_Job_Name,
                                            value: obj.AWM_Design_Job_ID,
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
                          }
                          { GABriefData &&
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
                                      onChange={(e) =>
                                        {updateDropDownData(
                                          e.target.value,
                                          "AWM_GA_Brief"
                                        );
                                        setGABrief(e.target.value);
                                      }
                                      }
                                    >
                                      <option value="">Select</option>
    
                                      {GABriefData?.map((data, index) =>
                                        data.File_Name !== "New" && (
                                          <option key={`${data.File_Name}_${index}`} value={data.File_Name}>
                                            {data.File_Name}
                                          </option>
                                        )
                                      )}
                                    </Form.Select>
                                  </div>
                                </Form.Group>
                              </Col>  
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