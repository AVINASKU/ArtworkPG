
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './ProductService';

const DsbpActionDialog = ({actionDialog, setActionDialog, selected}) => {
    const [products, setProducts] = useState([]);
    const [packageName, setPackageName] = useState("");

    useEffect(() => {
        ProductService.getProductsMini().then(data => setProducts(data));
    }, []);

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
    console.log("products", products)
    return (
      <div className="card flex justify-content-center">
        <Dialog
          header="Are you sure you want to create POAs for below PMPs in RTA ?"
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
              <Form.Group
                className={`mb-2`}
                controlId="groupName.ControlInput1"
              >
                <Form.Label>Package Name*</Form.Label>
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
        </Dialog>
      </div>
    );
}
export default DsbpActionDialog;