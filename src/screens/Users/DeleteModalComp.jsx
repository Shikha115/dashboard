import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";

function DeleteModalComp(props) {
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
        <button
          type="button"
          className="btn btn-danger my-2"
          onClick={() => props.setDeleteModal(false)}
        >
          Continue
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModalComp;
