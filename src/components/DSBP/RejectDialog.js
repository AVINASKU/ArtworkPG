import React, {useState} from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const RejectDialog = ({
  onChangeData,
  rejectFormData,
  setRejectFormData,
  setSelectedReason
}) => {
    const [rejectReason, setRejectReason] = useState("");
    const [rejectionComment, setRejectionComment] = useState("");
    const { DropDownValuesData } = useSelector(
      (state) => state.DropDownValuesReducer
    );

    const rejectReasonList = DropDownValuesData?.ArtworkAgilityTasksPage?.Artwork_Alignment?.PMPRejectionReason;

    const handleRejectReasonChange = (e) => {
      setRejectReason(e.target.value);
      setSelectedReason(true);
      setRejectFormData({
          ...rejectFormData,
          ReasonforRejection: e.target.value,
        });
    };

    const handleRejectCommentChange = (e) => {
      setRejectionComment(e.target.value);
      setRejectFormData({
          ...rejectFormData,
          RejectionComment: e.target.value,
        });
    };

  return (
    <div>
      <Row>
        <Col sm={4} className="mb-3">
          <div>
            <Form.Label>PMP : </Form.Label>
            <span>{onChangeData?.DSBP_PMP_PIMaterialNumber}</span>
          </div>
        </Col>
        <Col sm={8} className="mb-3">
          <div className="d-flex align-items-start">
            <Form.Label>PMP Description : </Form.Label>
            <span style={{ flex: "1" }}>
              {onChangeData?.DSBP_PMP_PIMaterialDescription}
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} className="mb-3">
          <div>
            <Form.Group
              className="d-flex align-items-center"
              controlId="groupName.ControlInput1"
            >
              <Form.Label>Reject Reason :</Form.Label>
              <div>
                <Form.Select
                  value={rejectReason}
                  placeholder="Select"
                  onChange={handleRejectReasonChange}
                >
                  <option value="">Select</option>
                  {rejectReasonList.map((reson) => (
                    <option key={reson.code} value={reson.ReasonforRejection}>
                      {reson.ReasonforRejection}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} className="mb-3">
          <div>
            <Form.Group className="" controlId="groupName.ControlInput1">
              <Form.Label>Add Comment: </Form.Label>
              <textarea
                class="form-control text-area"
                placeholder="Start typing here...."
                onChange={handleRejectCommentChange}
                value={rejectionComment}
              ></textarea>
            </Form.Group>
          </div>
          <div className="info">
            * An e-mail will be sent to IL once submitted.
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default RejectDialog;
