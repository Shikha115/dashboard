import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";
import useAuthStore from "../store/authStore";

// Shared confirmation for every destructive action in the dashboard.
//
// The passcode is compiled into the JavaScript bundle, so anyone who opens
// devtools can read it. Treat it as a speed bump that stops an accidental
// click on a row, not as an access control: a user who should not be able to
// delete must be blocked by their `access` permissions on the server, which is
// what the backend's requireAccess() gate enforces.
export const DELETE_PASSCODE = "1234567890";

function DeleteConfirmModal({
  show,
  onHide,
  onConfirm,
  title = "Are You Sure?",
  message = "Warning: You are about to delete this item. This action cannot be undone. Are you sure you want to proceed with the deletion?",
  confirmLabel = "Continue",
}) {
  const { theme } = useAuthStore();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  // Never leave a typed passcode behind for the next row the user opens.
  useEffect(() => {
    setPasscode("");
    setError("");
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode !== DELETE_PASSCODE) {
      setError("Incorrect password. The deletion was not performed.");
      return;
    }
    onConfirm();
  };

  return (
    <Modal
      className={theme ? theme : ""}
      size="sm"
      show={show}
      centered
      onHide={onHide}
    >
      <Modal.Body className="text-center p-4">
        <CiWarning className="fs-48 text-danger" />
        <h4 className="mt-2">{title}</h4>
        <p className="mt-3">{message}</p>

        <form onSubmit={handleSubmit}>
          <label
            className="form-label text-start w-100"
            htmlFor="delete-confirm-passcode"
          >
            Enter the delete password to confirm
          </label>
          <input
            id="delete-confirm-passcode"
            type="password"
            className="form-control"
            autoComplete="off"
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value);
              if (error) setError("");
            }}
          />
          {error ? (
            <div className="text-danger mt-2 small">{error}</div>
          ) : null}

          <div className="d-flex justify-content-center gap-2 mt-3">
            <button
              type="button"
              className="btn btn-light"
              onClick={onHide}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              disabled={!passcode}
            >
              {confirmLabel}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteConfirmModal;
