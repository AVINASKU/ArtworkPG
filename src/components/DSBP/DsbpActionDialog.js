
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './ProductService';

const DsbpActionDialog = ({actionDialog, setActionDialog}) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
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
              {products && (
                <div className="card">
                  <DataTable
                    value={products}
                    tableStyle={{ minWidth: "50rem" }}
                    selection={selectedProducts}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id"
                  >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3rem" }}
                        ></Column>
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
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