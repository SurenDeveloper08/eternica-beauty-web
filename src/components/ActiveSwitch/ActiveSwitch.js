import React from "react";
import { Form, Badge } from "react-bootstrap";
import "./ActiveSwitch.css";

const ActiveSwitch = ({ checked, onChange }) => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2">
      <Form.Check
        type="switch"
        id={`active-switch-${Math.random()}`}
        className={`custom-switch ${checked ? "active" : "inactive"}`}
        checked={checked}
        onChange={onChange}
      />
      <Badge bg={checked ? "success" : "secondary"}>
        {checked ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
};

export default ActiveSwitch;
