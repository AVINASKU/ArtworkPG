 import React from "react";
 import {Button, Row} from "react-bootstrap";

  const FooterButtons = ({onSaveAsDraft,onSubmit }) => {
    return (
      <Row className="form-buttons">
        <Button className="button-layout cancel-button">Cancel</Button>
        <Button
          onClick={() => onSaveAsDraft()}
          className="button-layout save-as-draft-button"
        >
          Save as Draft
        </Button>
        <Button
          className="button-layout submit-button"
          type="submit"
          onClick={() => onSubmit()}
        >
          Submit
        </Button>
      </Row>
    );
  };

  export default FooterButtons;