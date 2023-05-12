import React from "react";
import { Button } from "react-bootstrap";

const FooterButtons = ({ onSaveAsDraft, onSubmit, handleCancel, approve }) => {
  return (
    <div className="form-buttons">
      <Button
        className="button-layout"
        variant="secondary"
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
      { !approve &&
        <> 
        <Button className="button-layout" variant="secondary" onClick={() => onSaveAsDraft()}>Save as Draft</Button>        
        <Button
          className="button-layout"
          type="submit"
          onClick={() => onSubmit()}
          disabled = {false}
        >
          Submit
        </Button>
        </>       
      }
      
    </div>
  );
};

export default FooterButtons;
