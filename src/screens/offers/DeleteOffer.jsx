import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";

import DeleteConfirmModal from "../../components/DeleteConfirmModal";
function DeleteOfferModal(props) {
  return (
    <DeleteConfirmModal
      show={props.deleteModal}
      onHide={() => props.setDeleteModal(false)}
      onConfirm={props.deleteData}
      confirmLabel="Delete"
    />
  );
}

export default DeleteOfferModal;
