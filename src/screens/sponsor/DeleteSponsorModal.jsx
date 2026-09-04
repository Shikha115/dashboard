import { Modal } from "react-bootstrap";
import { CiWarning } from "react-icons/ci";

import DeleteConfirmModal from "../../components/DeleteConfirmModal";
const DeleteSponsorModal = ({ deleteModal, setDeleteModal, DeleteBank }) => {
  return (
    <DeleteConfirmModal
      show={deleteModal}
      onHide={() => setDeleteModal(false)}
      onConfirm={DeleteBank}
      confirmLabel="Continue"
    />
  );
};

export default DeleteSponsorModal;
