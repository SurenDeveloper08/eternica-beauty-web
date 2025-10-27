// ConfirmToast.js
import React from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

const ConfirmToast = ({ message, onConfirm }) => {
  const toastId = toast.custom((t) => (
    <div
      className={`toast show align-items-center text-white bg-danger border-0 shadow-sm`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        minWidth: "320px",
        borderRadius: "6px",
        zIndex: 9999,
      }}
    >
      <div className="d-flex flex-column p-3">
        <div className="mb-2">
          <strong>⚠️ Confirm Action</strong>
          <div>{message || "Are you sure you want to continue?"}</div>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="light"
            size="sm"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (onConfirm) onConfirm();
              toast.dismiss(t.id);
            }}
          >
            Yes, Confirm
          </Button>
        </div>
      </div>
    </div>
  ), {
    duration: 5000, // Auto-dismiss after 5 seconds
    position: "top-center",
    id: "confirm-toast", // Optional: Prevent stacking
  });

  return toastId;
};

export default ConfirmToast;
