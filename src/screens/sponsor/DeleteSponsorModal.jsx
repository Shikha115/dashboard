import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";

const DeleteSponsorModal = ({ deleteModal, setDeleteModal, DeleteBank }) => {
  return (
    <Modal
      size="sm"
      show={deleteModal}
      centered
      onHide={() => setDeleteModal(false)}
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
          onClick={DeleteBank}
        >
          Continue
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteSponsorModal;
