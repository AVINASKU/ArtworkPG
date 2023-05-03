import React from "react";
import { Button, Row } from "react-bootstrap";

const FooterButtons = ({ onSaveAsDraft, onSubmit, handleCancel }) => {
  return (
    <Row className="form-buttons">
      <Button
        className="button-layout cancel-button"
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
      <Button
        onClick={() => onSaveAsDraft()}
        className="button-layout save-as-draft-button"
      >
        Save as Draft
      </Button>
      <Button
        className="button-layout submit-di-button"
        type="submit"
        onClick={() => onSubmit()}
      >
        Submit
      </Button>
    </Row>
  );
};

export default FooterButtons;