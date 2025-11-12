import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";

function DeleteOfferModal(props) {
  return (
    <Modal
      className={props.theme ? props.theme : ""}
      size="sm"
      show={props.deleteModal}
      centered
      onHide={() => props.setDeleteModal(false)}
    >
      <Modal.Body className="text-center p-4">
        <CiWarning className="fs-48 text-danger" />
        <h4 className="mt-2">Are You Sure?</h4>
        <p className="mt-3">
          Warning: You are about to delete this item. This action cannot be
          undone. Are you sure you want to proceed with the deletion?
        </p>
        <h5 className="mt-3">Enter password to delete</h5>
        <input
          type="search"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => props.setpassword(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-danger my-2"
          onClick={props.deleteData}
        >
          Delete
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteOfferModal;
